export const KZT_EXCHANGE_RATE = 470;

/**
 * Converts a base USD price to Kazakhstani Tenge (KZT).
 * @param usdPrice Price in USD
 * @returns Rounded price in KZT
 */
export function convertToKZT(usdPrice: number): number {
  return Math.round(usdPrice * KZT_EXCHANGE_RATE);
}

/**
 * Formats a number of Tenge into a readable string with thousand separators and "₸" symbol.
 * @param kztPrice Price in KZT
 * @returns Formatted price string (e.g. "188 000 ₸")
 */
export function formatKZT(kztPrice: number): string {
  // Use non-breaking space for nice display spacing
  return kztPrice.toLocaleString("ru-RU").replace(/\s/g, " ") + " ₸";
}

/**
 * Directly formats a base USD price into a KZT price string.
 * @param usdPrice Price in USD
 * @returns Formatted price string in KZT (e.g. "188 000 ₸")
 */
export function formatUsdToKZT(usdPrice: number): string {
  return formatKZT(convertToKZT(usdPrice));
}
