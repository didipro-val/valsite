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

  const orderId = createOrderReference();
  const inventoryItems = aggregateInventoryItems(order.items);
  const reserve = await callInventory(env, { action: "reserve", orderId, items: inventoryItems });
  if (!reserve.ok) return corsResponse(request, env, reserve, reserve.code === "INSUFFICIENT_STOCK" ? 409 : 502);

  try {
    const stripe = await createStripeClient(env);
    const siteUrl = new URL(env.SITE_URL);
    const customer = await stripe.customers.create({
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phone,
      address: stripeAddress(order.customer.address),
      shipping: {
        name: order.customer.name,
        phone: order.customer.phone,
        address: stripeAddress(order.customer.address)
      },
      metadata: {
        order_id: orderId,
        customer_message: order.customer.message.slice(0, 450)
      }
    }, { idempotencyKey: `customer-${orderId}` });
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
      customer: customer.id,
      customer_update: { address: "auto", name: "auto", shipping: "auto" },
      shipping_address_collection: { allowed_countries: ["FR"] },
      shipping_options: shippingOptions(env),
      expires_at: Math.floor(Date.now() / 1000) + RESERVATION_SECONDS,
      success_url: new URL("commande.html?checkout=success&session_id={CHECKOUT_SESSION_ID}", siteUrl).href,
      cancel_url: new URL("commande.html?checkout=cancelled", siteUrl).href,
      metadata: {
        order_id: orderId
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
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["customer", "line_items"] });
    const paid = session.payment_status === "paid" || session.payment_status === "no_payment_required";
    const orderId = String(session.metadata?.order_id || "");
    const status = paid && orderId ? await callInventory(env, { action: "status", orderId }) : { ok: false };
    return corsResponse(request, env, {
      ok: true,
      paid,
      ...checkoutDetails(session),
      confirmed: Boolean(status.confirmed),
      emailSent: Boolean(status.emailSent)
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
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, { expand: ["customer", "line_items"] });
    const result = await callInventory(env, {
      action: "confirm",
      orderId,
      stripeSessionId: session.id,
      order: checkoutDetails(fullSession)
    });
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
  const phone = String(payload?.customer?.phone || "").trim();
  const message = String(payload?.customer?.message || "").trim();
  const address = {
    line1: String(payload?.customer?.address?.line1 || "").trim(),
    line2: String(payload?.customer?.address?.line2 || "").trim(),
    postalCode: String(payload?.customer?.address?.postalCode || "").trim(),
    city: String(payload?.customer?.address?.city || "").trim(),
    country: "FR"
  };
  if (!name || name.length > 200) throw new Error("Nom invalide.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("E-mail invalide.");
  if (phone.length < 6 || phone.length > 30) throw new Error("Numéro de téléphone invalide.");
  if (address.line1.length < 3 || address.line1.length > 200) throw new Error("Adresse invalide.");
  if (address.line2.length > 200) throw new Error("Complément d’adresse invalide.");
  if (!/^\d{5}$/.test(address.postalCode)) throw new Error("Code postal invalide.");
  if (address.city.length < 2 || address.city.length > 100) throw new Error("Ville invalide.");
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
  return { items, customer: { name, email, phone, address, message } };
}

function createOrderReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `VAL-${date}-${suffix}`;
}

function stripeAddress(address) {
  return {
    line1: address.line1,
    line2: address.line2 || undefined,
    postal_code: address.postalCode,
    city: address.city,
    country: "FR"
  };
}

function checkoutDetails(session) {
  const customer = typeof session.customer === "object" && session.customer ? session.customer : null;
  const address = customer?.shipping?.address || customer?.address || session.customer_details?.address || {};
  const name = customer?.shipping?.name || customer?.name || session.customer_details?.name || "";
  const phone = customer?.shipping?.phone || customer?.phone || session.customer_details?.phone || "";
  const email = customer?.email || session.customer_details?.email || "";
  const lines = session.line_items?.data || [];
  return {
    orderReference: String(session.metadata?.order_id || ""),
    amountTotal: Number(session.amount_total || 0),
    shippingTotal: Number(session.total_details?.amount_shipping || 0),
    currency: String(session.currency || "eur"),
    customer: {
      name,
      email,
      phone,
      address: {
        line1: String(address.line1 || ""),
        line2: String(address.line2 || ""),
        postalCode: String(address.postal_code || ""),
        city: String(address.city || ""),
        country: String(address.country || "FR")
      },
      message: String(customer?.metadata?.customer_message || "")
    },
    items: lines.map((line) => ({
      description: String(line.description || "Article Valmeo"),
      quantity: Number(line.quantity || 1),
      amountTotal: Number(line.amount_total || 0)
    }))
  };
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
