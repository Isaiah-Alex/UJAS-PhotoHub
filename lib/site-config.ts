/**
 * Site-wide currency settings. Change symbol/locale here to update the whole app.
 */
export const CURRENCY = {
  symbol: "₦",
  code: "NGN",
  locale: "en-NG",
} as const;

/** Format a whole amount (marketplace, earnings, etc.) */
export function formatMoney(amount: number): string {
  return `${CURRENCY.symbol}${amount.toLocaleString(CURRENCY.locale, {
    maximumFractionDigits: 0,
  })}`;
}

/** Hourly photographer rate */
export function formatHourlyRate(amount: number): string {
  return `${formatMoney(amount)}/hr`;
}

/** Large stats e.g. ₦420M+ */
export function formatMoneyCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${CURRENCY.symbol}${(amount / 1_000_000_000).toFixed(1)}B+`;
  }
  if (amount >= 1_000_000) {
    return `${CURRENCY.symbol}${(amount / 1_000_000).toFixed(1)}M+`;
  }
  if (amount >= 1_000) {
    return `${CURRENCY.symbol}${(amount / 1_000).toFixed(1)}K+`;
  }
  return `${formatMoney(amount)}+`;
}

/** Platform highlight figures (hero cards, stats band) */
export const SITE_STATS = {
  monthlyEarnings: 2_450_000,
  recentSaleAmount: 12_500,
  platformEarnings: 420_000_000,
} as const;
