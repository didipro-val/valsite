const SPREADSHEET_ID = "1xF_Y1zMhjSqj2QSV4YUWs7UnjFFYEkbKH91ObCDcXPw";
const SHEET_NAME = "Catalogue";
const HEADER_ROW = 1;
const STOCK_COLUMN = 6;
const TITLE_COLUMN = 5;
const REFERENCE_COLUMN = 11;
const EXPEDITIONS_SHEET_NAME = "Expéditions";
const EXPEDITIONS_HEADERS = [
  "Référence",
  "Commande payée le",
  "Prénom",
  "Nom",
  "E-mail",
  "Téléphone",
  "Statut",
  "Numéro de suivi",
  "E-mail de suivi envoyé le"
];
const TRACKING_COLUMN = 8;
const TRACKING_EMAIL_SENT_COLUMN = 9;
// Filet de sécurité si le webhook d'expiration n'arrive pas. La session Stripe expire après 30 minutes.
const RESERVATION_TTL_MS = 60 * 60 * 1000;

// À exécuter manuellement une seule fois après l'installation pour autoriser l'envoi des confirmations.
function autoriserEmails() {
  const quotaRestant = MailApp.getRemainingDailyQuota();
  console.log(`Autorisation e-mail active. Quota restant : ${quotaRestant}`);
}

// À exécuter manuellement une seule fois pour autoriser l'accès au tableur.
function autoriserTableur() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  console.log(`Accès au tableur autorisé : ${spreadsheet.getName()}`);
}

// À exécuter manuellement une seule fois. Crée l'onglet Expéditions et installe
// le déclencheur qui envoie l'e-mail de suivi lorsqu'un numéro La Poste est saisi.
function installerSuiviExpeditions() {
  ensureExpeditionsSheet_();
  const handler = "traiterNumeroSuivi_";
  const triggerExists = ScriptApp.getProjectTriggers().some((trigger) =>
    trigger.getHandlerFunction() === handler
  );
  if (!triggerExists) {
    ScriptApp.newTrigger(handler)
      .forSpreadsheet(SPREADSHEET_ID)
      .onEdit()
      .create();
  }
  const quotaRestant = MailApp.getRemainingDailyQuota();
  console.log(`Suivi des expéditions actif. Quota e-mail restant : ${quotaRestant}`);
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || "stocks");
  
  if (action !== "stocks") {
    return jsonResponse_({ ok: false, code: "UNKNOWN_ACTION", message: "Action inconnue." });
  }

  try {
    cleanupExpiredReservations_();
    const catalogue = readCatalogue_();
    return jsonResponse_({ ok: true, stocks: availableStocks_(catalogue) });
  } catch (error) {
    return jsonResponse_({ ok: false, code: "SERVER_ERROR", message: error.message });
  }
}

function doPost(e) {
  let lock;
  try {
    const request = parseRequest_(e);
    validateSecret_(request.secret);
    if (!["reserve", "confirm", "release", "status"].includes(request.action)) {
      return jsonResponse_({ ok: false, code: "UNKNOWN_ACTION", message: "Action inconnue." });
    }

    const orderId = validateOrderId_(request.orderId);
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    cleanupExpiredReservations_();

    if (request.action === "status") return statusOrder_(orderId);
    if (request.action === "reserve") return reserveOrder_(orderId, normalizeItems_(request.items));
    if (request.action === "confirm") return confirmOrder_(orderId, request.stripeSessionId, request.order);
    return releaseOrder_(orderId);
  } catch (error) {
    return jsonResponse_({ ok: false, code: "SERVER_ERROR", message: error.message });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function reserveOrder_(orderId, requestedItems) {
  const properties = PropertiesService.getScriptProperties();
  const reservationKey = `reservation:${orderId}`;
  if (properties.getProperty(`order:${orderId}`) || properties.getProperty(reservationKey)) {
    const catalogue = readCatalogue_();
    return jsonResponse_({ ok: true, duplicate: true, stocks: availableStocks_(catalogue) });
  }

  const catalogue = readCatalogue_();
  const stocks = availableStocks_(catalogue);
  const unavailable = [];
  requestedItems.forEach((item) => {
    const available = Number(stocks[item.id] || 0);
    if (available < item.quantity) unavailable.push({ id: item.id, requested: item.quantity, available });
  });

  if (unavailable.length) {
    return jsonResponse_({
      ok: false,
      code: "INSUFFICIENT_STOCK",
      message: "Stock insuffisant pour un ou plusieurs articles.",
      unavailable,
      stocks
    });
  }

  properties.setProperty(reservationKey, JSON.stringify({
    orderId,
    items: requestedItems,
    expiresAt: Date.now() + RESERVATION_TTL_MS
  }));
  return jsonResponse_({ ok: true, stocks: availableStocks_(catalogue) });
}

function confirmOrder_(orderId, stripeSessionId, orderDetails) {
  const properties = PropertiesService.getScriptProperties();
  const orderKey = `order:${orderId}`;
  const catalogue = readCatalogue_();
  const existingOrder = properties.getProperty(orderKey);
  if (existingOrder) {
    const record = JSON.parse(existingOrder);
    ensureExpeditionRow_(record);
    const notification = sendOrderEmails_(orderKey, record);
    return jsonResponse_({
      ok: true,
      duplicate: true,
      confirmed: true,
      emailSent: notification.customerEmailSent,
      ownerEmailSent: notification.ownerEmailSent,
      stocks: availableStocks_(catalogue)
    });
  }

  const reservationKey = `reservation:${orderId}`;
  const rawReservation = properties.getProperty(reservationKey);
  if (!rawReservation) {
    return jsonResponse_({ ok: false, code: "RESERVATION_NOT_FOUND", message: "Réservation introuvable ou expirée." });
  }
  const reservation = JSON.parse(rawReservation);
  reservation.items.forEach((item) => {
    const product = catalogue.byReference[item.id];
    if (!product || product.stock < item.quantity) throw new Error(`Stock incohérent pour ${item.id}.`);
    product.sheet.getRange(product.row, STOCK_COLUMN).setValue(product.stock - item.quantity);
  });
  SpreadsheetApp.flush();
  properties.deleteProperty(reservationKey);
  const record = {
    completedAt: new Date().toISOString(),
    stripeSessionId: String(stripeSessionId || ""),
    items: reservation.items,
    order: normalizeOrderDetails_(orderDetails),
    customerEmailSent: false,
    ownerEmailSent: false
  };
  properties.setProperty(orderKey, JSON.stringify(record));
  ensureExpeditionRow_(record);
  const notification = sendOrderEmails_(orderKey, record);
  const updatedCatalogue = readCatalogue_();
  return jsonResponse_({
    ok: true,
    confirmed: true,
    emailSent: notification.customerEmailSent,
    ownerEmailSent: notification.ownerEmailSent,
    stocks: availableStocks_(updatedCatalogue)
  });
}

function statusOrder_(orderId) {
  const raw = PropertiesService.getScriptProperties().getProperty(`order:${orderId}`);
  if (!raw) return jsonResponse_({ ok: true, confirmed: false, emailSent: false, ownerEmailSent: false });
  const record = JSON.parse(raw);
  return jsonResponse_({
    ok: true,
    confirmed: true,
    emailSent: Boolean(record.customerEmailSent),
    ownerEmailSent: Boolean(record.ownerEmailSent)
  });
}

function normalizeOrderDetails_(value) {
  const customer = value && value.customer || {};
  const address = customer.address || {};
  const items = Array.isArray(value && value.items) ? value.items.slice(0, 20).map((item) => ({
    description: String(item && item.description || "Article Valmeo").slice(0, 250),
    quantity: Math.max(1, Math.floor(Number(item && item.quantity) || 1)),
    amountTotal: Math.max(0, Math.floor(Number(item && item.amountTotal) || 0))
  })) : [];
  return {
    orderReference: String(value && value.orderReference || "").slice(0, 80),
    amountTotal: Math.max(0, Math.floor(Number(value && value.amountTotal) || 0)),
    shippingTotal: Math.max(0, Math.floor(Number(value && value.shippingTotal) || 0)),
    customer: {
      firstName: String(customer.firstName || "").slice(0, 100),
      lastName: String(customer.lastName || "").slice(0, 100),
      name: String(customer.name || [customer.firstName, customer.lastName].filter(Boolean).join(" ")).slice(0, 200),
      email: String(customer.email || "").slice(0, 254),
      phone: String(customer.phone || "").slice(0, 30),
      message: String(customer.message || "").slice(0, 450),
      address: {
        line1: String(address.line1 || "").slice(0, 200),
        line2: String(address.line2 || "").slice(0, 200),
        postalCode: String(address.postalCode || "").slice(0, 20),
        city: String(address.city || "").slice(0, 100),
        country: "FR"
      }
    },
    items
  };
}

function sendOrderEmails_(orderKey, record) {
  const properties = PropertiesService.getScriptProperties();
  const order = record.order || {};
  const customer = order.customer || {};
  if (!customer.email || !order.orderReference) return record;
  const customerName = [customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.name || "";
  const customerGreeting = customer.firstName || customerName;

  const subject = `Commande ${order.orderReference} confirmée`;
  const itemLines = (order.items || []).map((item) =>
    `${item.description} × ${item.quantity} — ${formatEuros_(item.amountTotal)}`
  ).join("\n");
  const addressLines = [
    customerName,
    customer.address && customer.address.line1,
    customer.address && customer.address.line2,
    `${customer.address && customer.address.postalCode || ""} ${customer.address && customer.address.city || ""}`.trim(),
    "France"
  ].filter(Boolean).join("\n");
  const customerText = [
    `Bonjour ${customerGreeting},`,
    "",
    "Votre paiement a bien été confirmé. Merci pour votre commande Valmeo Création.",
    "",
    `Référence : ${order.orderReference}`,
    itemLines,
    `Livraison : ${formatEuros_(order.shippingTotal)}`,
    `Total payé : ${formatEuros_(order.amountTotal)}`,
    "",
    "Adresse de livraison :",
    addressLines,
    "",
    "Votre commande va maintenant être préparée avec soin.",
    "Vous recevrez un second e-mail avec le numéro et le lien de suivi dès son expédition."
  ].join("\n");

  if (!record.customerEmailSent) {
    MailApp.sendEmail({
      to: customer.email,
      subject,
      body: customerText,
      htmlBody: emailHtml_("Merci pour votre commande !", customerText),
      name: "Valmeo Création"
    });
    record.customerEmailSent = true;
    properties.setProperty(orderKey, JSON.stringify(record));
  }

  if (!record.ownerEmailSent) {
    const ownerEmail = properties.getProperty("ORDER_NOTIFICATION_EMAIL") || Session.getEffectiveUser().getEmail();
    if (ownerEmail) {
      const ownerText = [
        "Une nouvelle commande payée doit être préparée.",
        "",
        `Référence : ${order.orderReference}`,
        `Client : ${customerName}`,
        `E-mail : ${customer.email}`,
        `Téléphone : ${customer.phone}`,
        "",
        "Articles :",
        itemLines,
        `Total payé : ${formatEuros_(order.amountTotal)}`,
        "",
        "Adresse de livraison :",
        addressLines,
        customer.message ? `\nMessage du client :\n${customer.message}` : ""
      ].join("\n");
      MailApp.sendEmail({
        to: ownerEmail,
        replyTo: customer.email,
        subject: `Nouvelle ${subject.toLowerCase()}`,
        body: ownerText,
        htmlBody: emailHtml_("Nouvelle commande payée", ownerText),
        name: "Commandes Valmeo"
      });
      record.ownerEmailSent = true;
      properties.setProperty(orderKey, JSON.stringify(record));
    }
  }
  return record;
}

function ensureExpeditionsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(EXPEDITIONS_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(EXPEDITIONS_SHEET_NAME);
  if (sheet.getLastRow() > 0 && String(sheet.getRange(1, 3).getValue()).trim() === "Client") {
    // Migration de l'ancien tableau : conserve le nom complet dans la colonne Nom.
    sheet.insertColumnBefore(3);
  }
  if (sheet.getLastRow() === 0) {
    sheet.setFrozenRows(1);
  }
  sheet.getRange(1, 1, 1, EXPEDITIONS_HEADERS.length).setValues([EXPEDITIONS_HEADERS]);
  sheet.getRange(1, 1, 1, EXPEDITIONS_HEADERS.length).setFontWeight("bold");
  sheet.setColumnWidths(1, EXPEDITIONS_HEADERS.length, 150);
  sheet.setColumnWidth(2, 190);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 190);
  sheet.setColumnWidth(5, 240);
  sheet.setColumnWidth(9, 190);
  return sheet;
}

function ensureExpeditionRow_(record) {
  const order = record.order || {};
  const customer = order.customer || {};
  const customerName = [customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.name || "";
  const reference = String(order.orderReference || "").trim();
  if (!reference || !customer.email) return;
  const sheet = ensureExpeditionsSheet_();
  const existing = sheet.getRange(1, 1, Math.max(1, sheet.getLastRow()), 1)
    .createTextFinder(reference)
    .matchEntireCell(true)
    .findNext();
  if (existing) return;
  sheet.appendRow([
    reference,
    record.completedAt ? new Date(record.completedAt) : new Date(),
    customer.firstName || "",
    customer.lastName || customerName,
    customer.email || "",
    customer.phone || "",
    "À préparer",
    "",
    ""
  ]);
}

function traiterNumeroSuivi_(event) {
  if (!event || !event.range) return;
  const range = event.range;
  let sheet = range.getSheet();
  if (sheet.getName() === EXPEDITIONS_SHEET_NAME) sheet = ensureExpeditionsSheet_();
  if (sheet.getName() !== EXPEDITIONS_SHEET_NAME || range.getLastColumn() < TRACKING_COLUMN || range.getColumn() > TRACKING_COLUMN) return;

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const firstRow = Math.max(2, range.getRow());
    const lastRow = range.getLastRow();
    for (let row = firstRow; row <= lastRow; row += 1) sendTrackingEmailForRow_(sheet, row);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function sendTrackingEmailForRow_(sheet, row) {
  const values = sheet.getRange(row, 1, 1, EXPEDITIONS_HEADERS.length).getDisplayValues()[0];
  const reference = String(values[0] || "").trim();
  const customerFirstName = String(values[2] || "").trim();
  const customerLastName = String(values[3] || "").trim();
  const customerGreeting = customerFirstName || customerLastName;
  const customerEmail = String(values[4] || "").trim().toLowerCase();
  const trackingNumber = String(values[TRACKING_COLUMN - 1] || "").toUpperCase().replace(/\s+/g, "");
  const alreadySent = String(values[TRACKING_EMAIL_SENT_COLUMN - 1] || "").trim();
  if (!reference || !customerEmail || !trackingNumber || alreadySent) return;
  if (!/^[A-Z0-9]{8,40}$/.test(trackingNumber)) throw new Error(`Numéro de suivi invalide à la ligne ${row}.`);

  const trackingUrl = `https://www.laposte.fr/outils/suivre-vos-envois?code=${encodeURIComponent(trackingNumber)}`;
  const text = [
    `Bonjour ${customerGreeting || ""},`.trim(),
    "",
    `Votre commande ${reference} vient d’être expédiée par La Poste en Lettre verte suivie.`,
    `Numéro de suivi : ${trackingNumber}`,
    "",
    `Suivre l’acheminement : ${trackingUrl}`,
    "",
    "Merci pour votre commande et à bientôt,",
    "Valmeo Création"
  ].join("\n");
  MailApp.sendEmail({
    to: customerEmail,
    subject: `Votre commande ${reference} a été expédiée`,
    body: text,
    htmlBody: trackingEmailHtml_(customerGreeting, reference, trackingNumber, trackingUrl),
    name: "Valmeo Création"
  });
  sheet.getRange(row, 7).setValue("Expédiée");
  sheet.getRange(row, TRACKING_EMAIL_SENT_COLUMN).setValue(new Date());
}

function trackingEmailHtml_(customerName, reference, trackingNumber, trackingUrl) {
  return `<div style="font-family:Arial,sans-serif;color:#292823;line-height:1.6;max-width:620px;margin:auto">` +
    `<h1 style="font-family:Georgia,serif;color:#bd7151">Votre commande est en route !</h1>` +
    `<div style="background:#fff9f0;border:1px solid #e6d9ca;border-radius:12px;padding:24px">` +
    `<p>Bonjour ${escapeHtml_(customerName)},</p>` +
    `<p>Votre commande <strong>${escapeHtml_(reference)}</strong> vient d’être expédiée par La Poste en Lettre verte suivie.</p>` +
    `<p>Numéro de suivi : <strong>${escapeHtml_(trackingNumber)}</strong></p>` +
    `<p style="margin:28px 0"><a href="${escapeHtml_(trackingUrl)}" style="background:#bd7151;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Suivre ma commande</a></p>` +
    `<p>Merci pour votre commande et à bientôt.</p></div>` +
    `<p style="color:#746d63;font-size:12px">Valmeo Création — bijoux artisanaux</p></div>`;
}

function emailHtml_(title, text) {
  return `<div style="font-family:Arial,sans-serif;color:#292823;line-height:1.6;max-width:620px;margin:auto">` +
    `<h1 style="font-family:Georgia,serif;color:#bd7151">${escapeHtml_(title)}</h1>` +
    `<div style="white-space:pre-line;background:#fff9f0;border:1px solid #e6d9ca;border-radius:12px;padding:24px">${escapeHtml_(text)}</div>` +
    `<p style="color:#746d63;font-size:12px">Valmeo Création — bijoux artisanaux</p></div>`;
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatEuros_(cents) {
  return (Number(cents || 0) / 100).toFixed(2).replace(".", ",") + " €";
}

function releaseOrder_(orderId) {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty(`order:${orderId}`)) properties.deleteProperty(`reservation:${orderId}`);
  const catalogue = readCatalogue_();
  return jsonResponse_({ ok: true, stocks: availableStocks_(catalogue) });
}

function parseRequest_(e) {
  const rawPayload =
    (e && e.parameter && e.parameter.payload) ||
    (e && e.postData && e.postData.contents) ||
    "{}";
  try {
    return JSON.parse(rawPayload);
  } catch (error) {
    throw new Error("Requête JSON invalide.");
  }
}

function validateOrderId_(value) {
  const orderId = String(value || "").trim();
  if (!/^[a-zA-Z0-9-]{8,80}$/.test(orderId)) {
    throw new Error("Identifiant de commande invalide.");
  }
  return orderId;
}

function validateSecret_(value) {
  const expected = PropertiesService.getScriptProperties().getProperty("INVENTORY_API_SECRET");
  if (!expected) throw new Error("Secret d'inventaire non configuré.");
  if (String(value || "") !== expected) throw new Error("Accès non autorisé.");
}

function normalizeItems_(items) {
  if (!Array.isArray(items) || !items.length || items.length > 20) {
    throw new Error("La commande doit contenir entre 1 et 20 articles.");
  }

  const totals = {};
  items.forEach((item) => {
    const id = String(item && item.id || "").trim();
    const quantity = Number(item && item.quantity);
    if (!/^[a-z0-9-]{1,100}$/.test(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Article ou quantité invalide.");
    }
    totals[id] = (totals[id] || 0) + quantity;
    if (totals[id] > 20) throw new Error("Quantité totale invalide.");
  });

  return Object.keys(totals).map((id) => ({ id, quantity: totals[id] }));
}

function readCatalogue_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`Onglet ${SHEET_NAME} introuvable.`);

  const lastRow = sheet.getLastRow();
  if (lastRow <= HEADER_ROW) return { sheet, stocks: {}, byReference: {} };

  const rowCount = lastRow - HEADER_ROW;
  const titles = sheet.getRange(HEADER_ROW + 1, TITLE_COLUMN, rowCount, 1).getDisplayValues();
  const stockValues = sheet.getRange(HEADER_ROW + 1, STOCK_COLUMN, rowCount, 1).getValues();
  const references = sheet.getRange(HEADER_ROW + 1, REFERENCE_COLUMN, rowCount, 1).getDisplayValues();
  const stocks = {};
  const byReference = {};

  references.forEach((row, index) => {
    const reference = String(row[0] || "").trim();
    if (!reference) return;
    if (byReference[reference]) throw new Error(`Référence dupliquée : ${reference}.`);

    const numericStock = Number(stockValues[index][0]);
    const stock = Number.isFinite(numericStock) && numericStock > 0 ? Math.floor(numericStock) : 0;
    const product = {
      sheet,
      row: HEADER_ROW + 1 + index,
      title: String(titles[index][0] || "").trim(),
      stock
    };
    stocks[reference] = stock;
    byReference[reference] = product;
  });

  return { sheet, stocks, byReference };
}

function availableStocks_(catalogue) {
  const stocks = Object.assign({}, catalogue.stocks);
  const properties = PropertiesService.getScriptProperties().getProperties();
  Object.keys(properties)
    .filter((key) => key.indexOf("reservation:") === 0)
    .forEach((key) => {
      try {
        const reservation = JSON.parse(properties[key]);
        if (Number(reservation.expiresAt) <= Date.now()) return;
        reservation.items.forEach((item) => {
          stocks[item.id] = Math.max(0, Number(stocks[item.id] || 0) - Number(item.quantity || 0));
        });
      } catch (error) {
        console.error(`Réservation invalide ${key}`, error);
      }
    });
  return stocks;
}

function cleanupExpiredReservations_() {
  const properties = PropertiesService.getScriptProperties();
  const all = properties.getProperties();
  Object.keys(all)
    .filter((key) => key.indexOf("reservation:") === 0)
    .forEach((key) => {
      try {
        const reservation = JSON.parse(all[key]);
        if (Number(reservation.expiresAt) <= Date.now()) properties.deleteProperty(key);
      } catch (error) {
        properties.deleteProperty(key);
      }
    });
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
