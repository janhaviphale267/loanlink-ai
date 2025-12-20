/**
 * Format a number as Indian rupee currency (₹) with grouping.
 * @param {number} value
 * @param {Object} [opts]
 * @returns {string}
 */
export function formatCurrencyINR(value = 0, opts = {}) {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    locale = "en-IN",
  } = opts;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "INR",
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  } catch {
    return `₹${numberWithCommas(
      Number(value).toFixed(maximumFractionDigits)
    )}`;
  }
}

/**
 * Format a percentage value (0..1 or 0..100)
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercent(value = 0, decimals = 0) {
  const v = Math.abs(value) <= 1 ? value * 100 : value;
  return `${v.toFixed(decimals)}%`;
}

/**
 * Add thousands separators
 * @param {number|string} num
 * @returns {string}
 */
export function numberWithCommas(num) {
  if (num === null || num === undefined) return "";
  const s = String(num);
  const [intPart, decPart] = s.split(".");
  return (
    intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (decPart ? `.${decPart}` : "")
  );
}

/**
 * Format date for UI
 * @param {string|number|Date} input
 * @param {Object} [opts]
 * @returns {string}
 */
export function formatDate(input, opts = {}) {
  if (!input) return "";
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return String(input);

  const locale = opts.locale || "en-IN";
  const formatOpts =
    opts.formatOptions || {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

  try {
    return new Intl.DateTimeFormat(locale, formatOpts).format(date);
  } catch {
    return date.toISOString().split("T")[0];
  }
}

/**
 * Relative time helper
 * @param {string|number|Date} input
 * @returns {string}
 */
export function timeAgo(input) {
  if (!input) return "";
  const date = input instanceof Date ? input : new Date(input);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return formatDate(date);
}
