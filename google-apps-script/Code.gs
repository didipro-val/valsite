const SPREADSHEET_ID = "1xF_Y1zMhjSqj2QSV4YUWs7UnjFFYEkbKH91ObCDcXPw";
const 


= "Catalogue";
const HEADER_ROW = 1;
const STOCK_COLUMN = 6;
const TITLE_COLUMN = 5;
const REFERENCE_COLUMN = 11;
// Filet de sécurité si le webhook d'expiration n'arrive pas. La session Stripe expire après 30 minutes.
const RESERVATION_TTL_MS = 60 * 60 * 1000;

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
    if (!["reserve", "confirm", "release"].includes(request.action)) {
      return jsonResponse_({ ok: false, code: "UNKNOWN_ACTION", message: "Action inconnue." });
    }

    const orderId = validateOrderId_(request.orderId);
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    cleanupExpiredReservations_();

    if (request.action === "reserve") return reserveOrder_(orderId, normalizeItems_(request.items));
    if (request.action === "confirm") return confirmOrder_(orderId, request.stripeSessionId);
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

function confirmOrder_(orderId, stripeSessionId) {
  const properties = PropertiesService.getScriptProperties();
  const orderKey = `order:${orderId}`;
  const catalogue = readCatalogue_();
  if (properties.getProperty(orderKey)) {
    return jsonResponse_({ ok: true, duplicate: true, stocks: availableStocks_(catalogue) });
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
  properties.setProperty(orderKey, JSON.stringify({
    completedAt: new Date().toISOString(),
    stripeSessionId: String(stripeSessionId || ""),
    items: reservation.items
  }));
  const updatedCatalogue = readCatalogue_();
  return jsonResponse_({ ok: true, stocks: availableStocks_(updatedCatalogue) });
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
