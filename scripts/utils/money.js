// Convert a price in cents into a dollar string with two decimals.
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}
