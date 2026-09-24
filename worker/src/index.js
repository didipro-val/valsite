import Stripe from "stripe";
import catalog from "./catalog.json" with { type: "json" };

const API_VERSION = "2026-08-26.dahlia";
const RESERVATION_SECONDS = 30 * 60;
const INTEGRATION_IDENTIFIER = "valmeo_checkout_qjrmxkpa";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return corsResponse(request, env, null, 204);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "valmeo-checkout" });
    }
    if (request.method === "GET" && url.pathname === "/checkout-session") {
      return getCheckoutSession(request, env, url);
    }
    if (request.method === "POST" && url.pathname === "/create-checkout-session") {
      return createCheckoutSession(request, env);
    }
    if (request.method === "POST" && url.pathname === "/webhook") {
      return handleWebhook(request, env);
    }
    return json({ ok: false, message: "Route introuvable." }, 404);
  }
};

async function createCheckoutSession(request, env) {
  if (!originAllowed(request, env)) return json({ ok: false, message: "Origine non autorisée." }, 403);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return corsResponse(request, env, { ok: false, message: "Requête JSON invalide." }, 400);
  }

  let order;
  try {
    order = normalizeOrder(payload);
  } catch (error) {
    return corsResponse(request, env, { ok: false, message: error.message }, 400);
  }

  const orderId = crypto.randomUUID();
  const inventoryItems = aggregateInventoryItems(order.items);
  const reserve = await callInventory(env, { action: "reserve", orderId, items: inventoryItems });
  if (!reserve.ok) return corsResponse(request, env, reserve, reserve.code === "INSUFFICIENT_STOCK" ? 409 : 502);

  try {
    const stripe = await createStripeClient(env);
    const siteUrl = new URL(env.SITE_URL);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      integration_identifier: INTEGRATION_IDENTIFIER,
      origin_context: "web",
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: item.product.unitAmount,
          product_data: {
            name: item.selectedChoice ? `${item.product.name} — ${item.selectedChoice}` : item.product.name,
            images: item.product.image ? [item.product.image] : undefined
          }
        }
      })),
      customer_email: order.customer.email,
      shipping_address_collection: { allowed_countries: ["FR"] },
      shipping_options: shippingOptions(env),
      expires_at: Math.floor(Date.now() / 1000) + RESERVATION_SECONDS,
      success_url: new URL("?checkout=success&session_id={CHECKOUT_SESSION_ID}#commande", siteUrl).href,
      cancel_url: new URL("?checkout=cancelled#commande", siteUrl).href,
      metadata: {
        order_id: orderId,
        customer_name: order.customer.name.slice(0, 200),
        customer_message: order.customer.message.slice(0, 450)
      }
    }, { idempotencyKey: `checkout-${orderId}` });

    return corsResponse(request, env, { ok: true, url: session.url });
  } catch (error) {
    await callInventory(env, { action: "release", orderId });
    console.error("Stripe Checkout creation failed", safeError(error));
    return corsResponse(request, env, { ok: false, message: "Le paiement n'a pas pu être préparé." }, 502);
  }
}

async function getCheckoutSession(request, env, url) {
  if (!originAllowed(request, env)) return json({ ok: false, message: "Origine non autorisée." }, 403);
  const sessionId = String(url.searchParams.get("session_id") || "");
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return corsResponse(request, env, { ok: false, message: "Session Stripe invalide." }, 400);
  }
  try {
    const stripe = await createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return corsResponse(request, env, {
      ok: true,
      paid: session.payment_status === "paid" || session.payment_status === "no_payment_required"
    });
  } catch (error) {
    console.error("Stripe Checkout retrieval failed", safeError(error));
    return corsResponse(request, env, { ok: false, message: "Vérification du paiement impossible." }, 502);
  }
}

async function handleWebhook(request, env) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return json({ ok: false, message: "Signature Stripe manquante." }, 400);

  const stripe = await createStripeClient(env);
  let event;
  try {
    const webhookSecret = await bindingValue(env.STRIPE_WEBHOOK_SECRET, "STRIPE_WEBHOOK_SECRET");
    event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (error) {
    console.error("Invalid Stripe webhook signature", safeError(error));
    return json({ ok: false, message: "Signature Stripe invalide." }, 400);
  }

  const session = event.data.object;
  const orderId = session?.metadata?.order_id;
  if (!orderId) return json({ received: true });

  if (
    (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") &&
    session.payment_status !== "unpaid"
  ) {
    const result = await callInventory(env, { action: "confirm", orderId, stripeSessionId: session.id });
    if (!result.ok) return json({ ok: false, message: "Confirmation du stock impossible." }, 502);
  }

  if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
    const result = await callInventory(env, { action: "release", orderId });
    if (!result.ok) return json({ ok: false, message: "Libération du stock impossible." }, 502);
  }

  return json({ received: true });
}

async function createStripeClient(env) {
  const apiKey = await bindingValue(env.STRIPE_RESTRICTED_KEY, "STRIPE_RESTRICTED_KEY");
  return new Stripe(apiKey, {
    apiVersion: API_VERSION,
    httpClient: Stripe.createFetchHttpClient()
  });
}

function normalizeOrder(payload) {
  if (!Array.isArray(payload?.items) || payload.items.length < 1 || payload.items.length > 20) {
    throw new Error("Le panier doit contenir entre 1 et 20 articles.");
  }
  const email = String(payload?.customer?.email || "").trim().toLowerCase();
  const name = String(payload?.customer?.name || "").trim();
  const message = String(payload?.customer?.message || "").trim();
  if (!name || name.length > 200) throw new Error("Nom invalide.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("E-mail invalide.");
  if (message.length > 450) throw new Error("Le message est trop long.");

  const items = payload.items.map((row) => {
    const id = String(row?.id || "").trim();
    const product = catalog[id];
    const quantity = Number(row?.quantity);
    const selectedChoice = String(row?.selectedChoice || "").trim().slice(0, 120);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Article ou quantité invalide.");
    }
    return { id, product, quantity, selectedChoice };
  });
  if (items.reduce((sum, item) => sum + item.quantity, 0) > 20) throw new Error("Quantité totale invalide.");
  return { items, customer: { name, email, message } };
}

function aggregateInventoryItems(items) {
  const totals = new Map();
  for (const item of items) totals.set(item.id, (totals.get(item.id) || 0) + item.quantity);
  return [...totals].map(([id, quantity]) => ({ id, quantity }));
}

function shippingOptions(env) {
  const amount = Number(env.SHIPPING_RATE_CENTS);
  if (!Number.isInteger(amount) || amount < 0) throw new Error("SHIPPING_RATE_CENTS invalide");
  return [{
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: { amount, currency: "eur" },
      display_name: env.SHIPPING_LABEL || "Livraison France"
    }
  }];
}

async function callInventory(env, payload) {
  if (!env.INVENTORY_API_URL || !env.INVENTORY_API_SECRET) {
    return { ok: false, code: "INVENTORY_NOT_CONFIGURED", message: "Service de stock non configuré." };
  }
  try {
    const inventorySecret = await bindingValue(env.INVENTORY_API_SECRET, "INVENTORY_API_SECRET");
    const body = new URLSearchParams({
      action: String(payload.action || ""),
      payload: JSON.stringify({ ...payload, secret: inventorySecret })
    });
    const response = await fetch(env.INVENTORY_API_URL, { method: "POST", body, redirect: "follow" });
    return await response.json();
  } catch (error) {
    console.error("Inventory API failed", safeError(error));
    return { ok: false, code: "INVENTORY_UNAVAILABLE", message: "Service de stock indisponible." };
  }
}

async function bindingValue(binding, name) {
  if (!binding) throw new Error(`${name} absent`);
  const value = typeof binding.get === "function" ? await binding.get() : binding;
  if (!value) throw new Error(`${name} vide`);
  return value;
}

function originAllowed(request, env) {
  return request.headers.get("origin") === env.ALLOWED_ORIGIN;
}

function corsResponse(request, env, body, status = 200) {
  const headers = { "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN, "Vary": "Origin" };
  if (request.method === "OPTIONS") {
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return body === null ? new Response(null, { status, headers }) : json(body, status, headers);
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
  });
}

function safeError(error) {
  return { name: error?.name, message: error?.message, type: error?.type, code: error?.code };
}
