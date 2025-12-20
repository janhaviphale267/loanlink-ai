/**
 * Simple validators for forms and file uploads.
 */

/**
 * Validate an email address (basic).
 * @param {string} email
 * @returns {boolean}
 */
export function isEmail(email = "") {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate an Indian phone number.
 * @param {string} phone
 * @returns {boolean}
 */
export function isIndianPhone(phone = "") {
  if (!phone) return false;
  const normalized = phone.replace(/[\s\-()]/g, "");
  return /^(\+91|0)?[6-9]\d{9}$/.test(normalized);
}

/**
 * Check value is a positive finite number.
 * @param {any} n
 * @returns {boolean}
 */
export function isPositiveNumber(n) {
  return typeof n === "number" && Number.isFinite(n) && n > 0;
}

/**
 * Validate loan id pattern (e.g., LN-1234).
 * @param {string} loanId
 * @returns {boolean}
 */
export function isLoanId(loanId = "") {
  if (!loanId) return false;
  return /^LN-\d{3,10}$/.test(String(loanId).toUpperCase());
}

/**
 * Validate document mime type or extension.
 * @param {File|string} fileOrName
 * @param {Object} [opts]
 * @returns {boolean}
 */
export function validateDocumentType(fileOrName, opts = {}) {
  const allowedMimeTypes =
    opts.allowedMimeTypes || [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/heic",
    ];

  const allowedExtensions =
    opts.allowedExtensions || [".pdf", ".jpg", ".jpeg", ".png", ".heic"];

  if (!fileOrName) return false;

  if (typeof fileOrName === "string") {
    const lower = fileOrName.toLowerCase();
    return allowedExtensions.some((ext) => lower.endsWith(ext));
  }

  if (fileOrName instanceof File) {
    const mime = fileOrName.type || "";
    const name = (fileOrName.name || "").toLowerCase();
    if (mime && allowedMimeTypes.includes(mime)) return true;
    return allowedExtensions.some((ext) => name.endsWith(ext));
  }

  return false;
}

/**
 * Validate file size under limit.
 * @param {File} file
 * @param {number} maxBytes
 * @returns {{ok:boolean, reason?:string}}
 */
export function validateFileSize(file, maxBytes = 10 * 1024 * 1024) {
  if (!file) return { ok: false, reason: "No file provided" };
  if (file.size <= 0) return { ok: false, reason: "Empty file" };
  if (file.size > maxBytes) {
    return {
      ok: false,
      reason: `File too large (max ${Math.round(
        maxBytes / 1024 / 1024
      )}MB)`,
    };
  }
  return { ok: true };
}
