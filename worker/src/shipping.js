export function shippingOption(env, subtotalCents) {
  const standardAmount = Number(env.SHIPPING_RATE_CENTS);
  const freeThreshold = Number(env.FREE_SHIPPING_THRESHOLD_CENTS);
  if (!Number.isInteger(standardAmount) || standardAmount < 0) {
    throw new Error("SHIPPING_RATE_CENTS invalide");
  }
  if (!Number.isInteger(freeThreshold) || freeThreshold < 0) {
    throw new Error("FREE_SHIPPING_THRESHOLD_CENTS invalide");
  }

  const isFree = subtotalCents >= freeThreshold;
  const amount = isFree ? 0 : standardAmount;
  return {
    amount,
    option: {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount, currency: "eur" },
        display_name: isFree ? "Livraison offerte" : (env.SHIPPING_LABEL || "Livraison France")
      }
    }
  };
}
