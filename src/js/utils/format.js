/**
 * Formatting helpers.
 */
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(amount) {
  return usd.format(amount);
}
