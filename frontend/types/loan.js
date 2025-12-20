/**
 * @typedef {Object} LoanApplication
 * @property {string} id
 * @property {number} amount
 * @property {number} tenureMonths
 * @property {string} status
 * @property {'Low'|'Medium'|'High'|'Pending'} risk
 * @property {number} emi
 * @property {number} interestRate
 * @property {number} dti
 * @property {number} confidence
 * @property {string} [lastActivity]
 */

/**
 * Create a default LoanApplication
 * @param {Partial<LoanApplication>} overrides
 * @returns {LoanApplication}
 */
export function createLoanApplication(overrides = {}) {
  const base = {
    id: `LN-${Math.floor(Math.random() * 9000) + 1000}`,
    amount: 100000,
    tenureMonths: 36,
    status: "Applied",
    risk: "Pending",
    emi: 3000,
    interestRate: 8.5,
    dti: 25,
    confidence: 0.5,
    lastActivity: new Date().toISOString(),
  };

  return { ...base, ...overrides };
}

/**
 * Runtime check for LoanApplication
 * @param {any} obj
 * @returns {boolean}
 */
export function isLoanApplication(obj) {
  return (
    !!obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.amount === "number" &&
    typeof obj.tenureMonths === "number"
  );
}
