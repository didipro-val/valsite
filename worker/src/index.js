import Stripe from "stripe";
import catalog from "./catalog.json" with { type: "json" };
import { shippingOption } from "./shipping.js";

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
    if (request.method === "GET" && url.pathname === "/catalog") {
      return getPublishedCatalog(request, env);
    }
    if (request.method === "GET" && url.pathname.startsWith("/product-images/")) {
      return getPublishedImage(env, url.pathname);
    }
    if (request.method === "POST" && url.pathname === "/admin/products") {
      return publishProduct(request, env);
    }
    if (request.method === "DELETE" && url.pathname.startsWith("/admin/products/")) {
      return deletePublishedProduct(request, env, url.pathname);
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
    order = await normalizeOrder(payload, env);
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
    const subtotalCents = order.items.reduce(
      (sum, item) => sum + item.product.unitAmount * item.quantity,
      0
    );
    const shipping = shippingOption(env, subtotalCents);
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
        customer_first_name: order.customer.firstName,
        customer_last_name: order.customer.lastName,
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
      shipping_options: [shipping.option],
      expires_at: Math.floor(Date.now() / 1000) + RESERVATION_SECONDS,
      success_url: new URL("commande.html?checkout=success&session_id={CHECKOUT_SESSION_ID}", siteUrl).href,
      cancel_url: new URL("commande.html?checkout=cancelled", siteUrl).href,
      metadata: {
        order_id: orderId,
        product_subtotal_cents: String(subtotalCents),
        shipping_amount_cents: String(shipping.amount)
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
    let status = paid && orderId ? await callInventory(env, { action: "status", orderId }) : { ok: false };
    if (paid && orderId && !status.ok) console.error("Order status lookup failed", status);
    if (paid && status.confirmed && !status.emailSent) {
      const retry = await callInventory(env, {
        action: "confirm",
        orderId,
        stripeSessionId: session.id,
        order: checkoutDetails(session)
      });
      if (retry.ok) status = retry;
      else console.error("Order email retry failed", retry);
    }
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

async function normalizeOrder(payload, env) {
  if (!Array.isArray(payload?.items) || payload.items.length < 1 || payload.items.length > 20) {
    throw new Error("Le panier doit contenir entre 1 et 20 articles.");
  }
  const email = String(payload?.customer?.email || "").trim().toLowerCase();
  const firstName = String(payload?.customer?.firstName || "").trim();
  const lastName = String(payload?.customer?.lastName || "").trim();
  const legacyName = String(payload?.customer?.name || "").trim();
  const hasSeparatedName = Boolean(firstName || lastName);
  if (hasSeparatedName && (!firstName || firstName.length > 100)) throw new Error("Prénom invalide.");
  if (hasSeparatedName && (!lastName || lastName.length > 100)) throw new Error("Nom invalide.");
  const name = hasSeparatedName ? `${firstName} ${lastName}` : legacyName;
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

  const items = await Promise.all(payload.items.map(async (row) => {
    const id = String(row?.id || "").trim();
    const product = await dynamicCheckoutProduct(env, id) || catalog[id];
    const quantity = Number(row?.quantity);
    const selectedChoice = String(row?.selectedChoice || "").trim().slice(0, 120);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Article ou quantité invalide.");
    }
    return { id, product, quantity, selectedChoice };
  }));
  if (items.reduce((sum, item) => sum + item.quantity, 0) > 20) throw new Error("Quantité totale invalide.");
  return { items, customer: { firstName, lastName, name, email, phone, address, message } };
}

async function dynamicCheckoutProduct(env, id) {
  if (!env.CATALOG_KV || !/^[a-z0-9-]{1,100}$/.test(id)) return null;
  const product = await env.CATALOG_KV.get(`product:${id}`, "json");
  if (!product) return null;
  const unitAmount = Number(product.unitAmount);
  if (!Number.isInteger(unitAmount) || unitAmount <= 0) return null;
  return {
    name: String(product.name || "").slice(0, 120),
    unitAmount,
    image: String(product.image || "")
  };
}

async function getPublishedCatalog(request, env) {
  if (!env.CATALOG_KV) return publicCorsResponse(request, env, { ok: true, products: [] });
  const ids = await env.CATALOG_KV.get("catalog:index", "json") || [];
  const rows = await Promise.all(ids.map((id) => env.CATALOG_KV.get(`product:${id}`, "json")));
  return publicCorsResponse(request, env, { ok: true, products: rows.filter(Boolean) });
}

async function getPublishedImage(env, pathname) {
  if (!env.CATALOG_KV) return new Response("Image introuvable.", { status: 404 });
  const match = pathname.match(/^\/product-images\/([a-z0-9-]{1,100})\/(\d{1,2})$/);
  if (!match) return new Response("Image introuvable.", { status: 404 });
  const result = await env.CATALOG_KV.getWithMetadata(`image:${match[1]}:${match[2]}`, "arrayBuffer");
  if (!result.value) return new Response("Image introuvable.", { status: 404 });
  return new Response(result.value, {
    headers: {
      "Content-Type": String(result.metadata?.contentType || "application/octet-stream"),
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}

async function publishProduct(request, env) {
  if (!await adminAuthorized(request, env)) return json({ ok: false, message: "Accès non autorisé." }, 403);
  if (!env.CATALOG_KV) return json({ ok: false, message: "Catalogue dynamique non configuré." }, 500);
  try {
    const payload = await request.json();
    const id = String(payload?.id || "").trim().toLowerCase();
    const previousProduct = /^[a-z0-9-]{1,100}$/.test(id)
      ? await env.CATALOG_KV.get(`product:${id}`, "json")
      : null;
    const { product, images } = normalizePublishedProduct(payload, request.url, env.SITE_URL, previousProduct);
    for (let index = 0; index < images.length; index += 1) {
      const image = images[index];
      await env.CATALOG_KV.put(`image:${product.id}:${index}`, decodeBase64(image.data), {
        metadata: { contentType: image.contentType }
      });
    }
    if (images.length && Array.isArray(previousProduct?.gallery) && previousProduct.gallery.length > images.length) {
      await Promise.all(
        Array.from(
          { length: Math.min(3, previousProduct.gallery.length) - images.length },
          (_, offset) => env.CATALOG_KV.delete(`image:${product.id}:${images.length + offset}`)
        )
      );
    }
    await env.CATALOG_KV.put(`product:${product.id}`, JSON.stringify(product));
    const ids = await env.CATALOG_KV.get("catalog:index", "json") || [];
    if (!ids.includes(product.id)) {
      ids.push(product.id);
      await env.CATALOG_KV.put("catalog:index", JSON.stringify(ids));
    }
    return json({ ok: true, product });
  } catch (error) {
    console.error("Product publication failed", safeError(error));
    return json({ ok: false, message: error.message || "Publication impossible." }, 400);
  }
}

async function deletePublishedProduct(request, env, pathname) {
  if (!await adminAuthorized(request, env)) return json({ ok: false, message: "Accès non autorisé." }, 403);
  if (!env.CATALOG_KV) return json({ ok: false, message: "Catalogue dynamique non configuré." }, 500);
  const match = pathname.match(/^\/admin\/products\/([a-z0-9-]{1,100})$/);
  if (!match) return json({ ok: false, message: "Référence invalide." }, 400);
  const id = match[1];
  const product = await env.CATALOG_KV.get(`product:${id}`, "json");
  const imageCount = Math.min(3, Array.isArray(product?.gallery) ? product.gallery.length : 0);
  await Promise.all([
    env.CATALOG_KV.delete(`product:${id}`),
    ...Array.from({ length: imageCount }, (_, index) => env.CATALOG_KV.delete(`image:${id}:${index}`))
  ]);
  const ids = await env.CATALOG_KV.get("catalog:index", "json") || [];
  await env.CATALOG_KV.put("catalog:index", JSON.stringify(ids.filter((value) => value !== id)));
  return json({ ok: true });
}

function normalizePublishedProduct(payload, requestUrl, siteUrl, previousProduct = null) {
  const id = String(payload?.id || "").trim().toLowerCase();
  const name = String(payload?.name || "").trim();
  const category = String(payload?.category || "").trim();
  const tag = String(payload?.tag || "").trim();
  const price = Number(payload?.price);
  const order = Math.max(1, Math.floor(Number(payload?.order) || 1));
  const sourceRow = Math.max(2, Math.floor(Number(payload?.sourceRow) || 2));
  const stock = Math.max(0, Math.floor(Number(payload?.stock) || 0));
  const description = String(payload?.description || "").trim();
  const characteristics = Array.isArray(payload?.characteristics)
    ? payload.characteristics.map((value) => String(value || "").trim()).filter(Boolean).slice(0, 20)
    : [];
  const allowedCategories = new Set(["creatives", "faconnees", "florales", "perles", "esprit-nature"]);
  const images = Array.isArray(payload?.images) ? payload.images.slice(0, 3).map(normalizePublishedImage) : [];
  if (!/^[a-z0-9-]{1,100}$/.test(id)) throw new Error("Référence invalide.");
  if (!name || name.length > 120) throw new Error("Nom invalide.");
  if (!allowedCategories.has(category)) throw new Error("Catégorie invalide.");
  if (!tag || tag.length > 80) throw new Error("Libellé de catégorie invalide.");
  if (!Number.isFinite(price) || price <= 0 || price > 1000) throw new Error("Prix invalide.");
  if (!description || description.length > 4000) throw new Error("Description invalide.");
  if (!characteristics.length) throw new Error("Caractéristiques manquantes.");
  const baseUrl = new URL(requestUrl);
  const imageVersion = Date.now();
  const gallery = images.length
    ? images.map((_, index) => new URL(`/product-images/${id}/${index}?v=${imageVersion}`, baseUrl).href)
    : normalizeExistingGallery(payload?.existingGallery, siteUrl, baseUrl, previousProduct?.gallery);
  if (!gallery.length) throw new Error("Photo principale manquante.");
  const choiceCode = String(payload?.choiceCode || "Aucun");
  const choiceOptions = choiceCode === "C1"
    ? ["Attache dorée", "Attache argentée"]
    : choiceCode === "C2"
      ? ["Attache dorée", "Pince à vis dorée"]
      : [];
  if (!["Aucun", "C1", "C2"].includes(choiceCode)) throw new Error("Choix d’attache invalide.");
  const product = {
    id,
    name,
    category,
    tag,
    price,
    unitAmount: Math.round(price * 100),
    image: gallery[0],
    gallery,
    description,
    characteristics,
    sourceRow,
    order,
    stock
  };
  if (choiceOptions.length) product.choice = { code: choiceCode, options: choiceOptions };
  return { product, images };
}

function normalizeExistingGallery(values, siteUrl, workerUrl, previousGallery) {
  const candidates = Array.isArray(values) && values.length
    ? values
    : Array.isArray(previousGallery)
      ? previousGallery
      : [];
  let publicSite;
  try {
    publicSite = new URL(siteUrl);
  } catch {
    publicSite = new URL("https://valmeocreation.fr");
  }
  return candidates.slice(0, 3).map((value) => {
    let url;
    try {
      url = new URL(String(value || "").trim(), publicSite);
    } catch {
      throw new Error("Adresse de photo existante invalide.");
    }
    const allowedHosts = new Set([publicSite.hostname, workerUrl.hostname]);
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
      throw new Error("Adresse de photo existante non autorisée.");
    }
    return url.href;
  }).filter(Boolean);
}

function normalizePublishedImage(value) {
  const data = String(value?.data || "");
  const contentType = String(value?.contentType || "").toLowerCase();
  if (!["image/jpeg", "image/png", "image/webp"].includes(contentType)) throw new Error("Format d’image non pris en charge.");
  if (!/^[A-Za-z0-9+/=]+$/.test(data) || data.length > 16000000) throw new Error("Image invalide ou trop volumineuse.");
  return { data, contentType };
}

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

async function adminAuthorized(request, env) {
  const provided = request.headers.get("x-inventory-secret") || "";
  const expected = await bindingValue(env.INVENTORY_API_SECRET, "INVENTORY_API_SECRET");
  return provided.length > 20 && provided === expected;
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
  const firstName = String(customer?.metadata?.customer_first_name || "");
  const lastName = String(customer?.metadata?.customer_last_name || "");
  const phone = customer?.shipping?.phone || customer?.phone || session.customer_details?.phone || "";
  const email = customer?.email || session.customer_details?.email || "";
  const lines = session.line_items?.data || [];
  return {
    orderReference: String(session.metadata?.order_id || ""),
    amountTotal: Number(session.amount_total || 0),
    shippingTotal: Number(session.total_details?.amount_shipping || 0),
    currency: String(session.currency || "eur"),
    customer: {
      firstName,
      lastName,
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

function publicCorsResponse(request, env, body, status = 200) {
  const origin = request.headers.get("origin");
  const headers = {
    "Access-Control-Allow-Origin": origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN,
    "Vary": "Origin"
  };
  return json(body, status, headers);
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
