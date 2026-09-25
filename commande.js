const CART_STORAGE_KEY = "valmeo-cart-reservation-v1";
const CHECKOUT_API_URL = "https://valmeo-checkout.valmeo-creation.workers.dev";
const SHIPPING_CENTS = 490;

const content = document.querySelector("[data-checkout-content]");
const statusPanel = document.querySelector("[data-checkout-status]");
const orderForm = document.querySelector("[data-order-form]");
const errorPanel = document.querySelector("[data-checkout-error]");
const summaryItems = document.querySelector("[data-summary-items]");
const subtotalNode = document.querySelector("[data-summary-subtotal]");
const totalNode = document.querySelector("[data-summary-total]");

let cartRows = [];
let catalog = {};

function formatMoney(cents) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "null");
    if (!saved?.expiresAt || saved.expiresAt <= Date.now() || !Array.isArray(saved.rows)) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
    return saved.rows.filter((row) => row?.id && Number(row.quantity) > 0);
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

async function loadCatalog() {
  const response = await fetch("./worker/src/catalog.json?v=1", { cache: "no-store" });
  if (!response.ok) throw new Error("Le catalogue ne peut pas être chargé.");
  return response.json();
}

function renderEmptyCart() {
  content.hidden = true;
  statusPanel.hidden = false;
  statusPanel.className = "checkout-status is-info";
  statusPanel.innerHTML = `
    <div class="status-icon" aria-hidden="true">♡</div>
    <p class="eyebrow">Votre panier</p>
    <h1>Votre panier est vide</h1>
    <p>Choisissez d’abord les bijoux qui vous plaisent dans la boutique.</p>
    <a class="button primary" href="./index.html#boutique">Découvrir la boutique</a>`;
}

function renderSummary() {
  let subtotal = 0;
  summaryItems.innerHTML = cartRows.map((row) => {
    const product = catalog[row.id];
    if (!product) return "";
    const quantity = Math.max(1, Number(row.quantity) || 1);
    subtotal += product.unitAmount * quantity;
    const option = row.selectedChoice ? `<p>${escapeHtml(row.selectedChoice)}</p>` : "";
    return `
      <article class="summary-item">
        <img src="${escapeHtml(product.image)}" alt="" />
        <div><h3>${escapeHtml(product.name)}</h3>${option}<p>Quantité : ${quantity}</p></div>
        <strong>${formatMoney(product.unitAmount * quantity)}</strong>
      </article>`;
  }).join("");
  subtotalNode.textContent = formatMoney(subtotal);
  totalNode.textContent = formatMoney(subtotal + SHIPPING_CENTS);
}

async function createCheckoutSession(customer) {
  const response = await fetch(`${CHECKOUT_API_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cartRows, customer }),
    cache: "no-store"
  });
  const payload = await response.json();
  if (!response.ok || !payload.url) {
    const error = new Error(payload.message || "Impossible de préparer le paiement.");
    error.payload = payload;
    throw error;
  }
  return payload;
}

function customerFromForm() {
  const data = new FormData(orderForm);
  return {
    firstName: String(data.get("firstName") || "").trim(),
    lastName: String(data.get("lastName") || "").trim(),
    email: String(data.get("email") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    address: {
      line1: String(data.get("line1") || "").trim(),
      line2: String(data.get("line2") || "").trim(),
      postalCode: String(data.get("postalCode") || "").trim(),
      city: String(data.get("city") || "").trim(),
      country: "FR"
    },
    message: String(data.get("message") || "").trim()
  };
}

function addressHtml(address) {
  if (!address) return "";
  const lines = [address.line1, address.line2, `${address.postalCode || ""} ${address.city || ""}`.trim(), "France"];
  return lines.filter(Boolean).map(escapeHtml).join("<br />");
}

function confirmationItemsHtml(items) {
  if (!Array.isArray(items) || !items.length) return "";
  return `<div class="confirmation-products">${items.map((item) => `
    <p><span>${escapeHtml(item.description)} × ${Number(item.quantity) || 1}</span><strong>${formatMoney(Number(item.amountTotal) || 0)}</strong></p>`).join("")}</div>`;
}

function renderConfirmation(order) {
  localStorage.removeItem(CART_STORAGE_KEY);
  content.hidden = true;
  statusPanel.hidden = false;
  statusPanel.className = "checkout-status is-success";
  const emailMessage = order.emailSent
    ? `Un e-mail de confirmation a été envoyé à <strong>${escapeHtml(order.customer?.email)}</strong>.`
    : `Votre paiement est confirmé. L’e-mail de confirmation destiné à <strong>${escapeHtml(order.customer?.email)}</strong> est en cours d’envoi.`;
  statusPanel.innerHTML = `
    <div class="status-icon" aria-hidden="true">✓</div>
    <p class="eyebrow">Commande validée</p>
    <h1>Merci pour votre commande&nbsp;!</h1>
    <p class="confirmation-lead">${emailMessage}</p>
    <p>Votre numéro et votre lien de suivi La Poste vous seront envoyés par e-mail dès l’expédition.</p>
    <div class="confirmation-reference"><span>Référence de commande</span><strong>${escapeHtml(order.orderReference)}</strong></div>
    ${confirmationItemsHtml(order.items)}
    <div class="confirmation-grid">
      <div><h2>Livraison</h2><p><strong>${escapeHtml(order.customer?.name)}</strong><br />${addressHtml(order.customer?.address)}</p></div>
      <div><h2>Total payé</h2><p class="confirmation-total">${formatMoney(Number(order.amountTotal) || 0)}</p><p>Le paiement a été traité de façon sécurisée par Stripe.</p></div>
    </div>
    <a class="button primary" href="./index.html#boutique">Retour à la boutique</a>`;
}

async function fetchOrder(sessionId) {
  const url = new URL(`${CHECKOUT_API_URL}/checkout-session`);
  url.searchParams.set("session_id", sessionId);
  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json();
  if (!response.ok || !payload.paid) throw new Error(payload.message || "Le paiement n’est pas encore confirmé.");
  return payload;
}

async function handleReturn() {
  const params = new URLSearchParams(window.location.search);
  const result = params.get("checkout");
  if (result === "cancelled") {
    errorPanel.textContent = "Paiement annulé : votre panier a été conservé et vous pouvez réessayer.";
    history.replaceState({}, "", window.location.pathname);
    return false;
  }
  if (result !== "success") return false;

  content.hidden = true;
  statusPanel.hidden = false;
  statusPanel.className = "checkout-status is-loading";
  statusPanel.innerHTML = '<div class="status-spinner" aria-hidden="true"></div><h1>Vérification de votre paiement…</h1><p>Quelques secondes suffisent généralement.</p>';
  try {
    const sessionId = params.get("session_id") || "";
    let order = await fetchOrder(sessionId);
    for (let attempt = 0; attempt < 4 && !order.emailSent; attempt += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      order = await fetchOrder(sessionId);
    }
    renderConfirmation(order);
    history.replaceState({}, "", `${window.location.pathname}?commande=${encodeURIComponent(order.orderReference)}`);
  } catch (error) {
    statusPanel.className = "checkout-status is-error";
    statusPanel.innerHTML = `<div class="status-icon" aria-hidden="true">!</div><h1>Vérification momentanément impossible</h1><p>${escapeHtml(error.message)} Si votre compte a été débité, ne recommencez pas le paiement et contactez Valmeo.</p><a class="button secondary" href="./index.html">Retour à l’accueil</a>`;
  }
  return true;
}

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const button = orderForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Préparation du paiement…";
  errorPanel.textContent = "";
  try {
    const result = await createCheckoutSession(customerFromForm());
    window.location.assign(result.url);
  } catch (error) {
    errorPanel.textContent = error.payload?.code === "INSUFFICIENT_STOCK"
      ? "Un article vient de devenir indisponible. Revenez au panier pour l’actualiser."
      : error.message || "Impossible de préparer le paiement. Réessayez dans quelques instants.";
    button.disabled = false;
    button.textContent = "Continuer vers le paiement sécurisé";
  }
});

async function init() {
  if (await handleReturn()) return;
  cartRows = readCart();
  if (!cartRows.length) return renderEmptyCart();
  try {
    catalog = await loadCatalog();
    cartRows = cartRows.filter((row) => catalog[row.id]);
    if (!cartRows.length) return renderEmptyCart();
    renderSummary();
  } catch (error) {
    errorPanel.textContent = error.message;
    orderForm.querySelector('button[type="submit"]').disabled = true;
  }
}

init();
