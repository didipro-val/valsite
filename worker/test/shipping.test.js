import test from "node:test";
import assert from "node:assert/strict";
import { shippingOption } from "../src/shipping.js";

const env = {
  SHIPPING_RATE_CENTS: "490",
  FREE_SHIPPING_THRESHOLD_CENTS: "3500",
  SHIPPING_LABEL: "Lettre verte suivie"
};

test("les frais restent à 4,90 € sous 35 €", () => {
  const shipping = shippingOption(env, 3499);
  assert.equal(shipping.amount, 490);
  assert.equal(shipping.option.shipping_rate_data.fixed_amount.amount, 490);
  assert.equal(shipping.option.shipping_rate_data.display_name, "Lettre verte suivie");
});

test("la livraison est offerte dès 35 €", () => {
  for (const subtotal of [3500, 4400]) {
    const shipping = shippingOption(env, subtotal);
    assert.equal(shipping.amount, 0);
    assert.equal(shipping.option.shipping_rate_data.fixed_amount.amount, 0);
    assert.equal(shipping.option.shipping_rate_data.display_name, "Livraison offerte");
  }
});

test("une configuration de seuil invalide est refusée", () => {
  assert.throws(
    () => shippingOption({ ...env, FREE_SHIPPING_THRESHOLD_CENTS: "invalide" }, 3500),
    /FREE_SHIPPING_THRESHOLD_CENTS invalide/
  );
});
