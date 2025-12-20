/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} [email]
 * @property {Array<string>} [roles]
 * @property {string} [avatarUrl]
 */

/**
 * Create a User object
 * @param {Partial<User>} overrides
 * @returns {User}
 */
export function createUser(overrides = {}) {
  const base = {
    id: `user-${Math.floor(Math.random() * 90000)}`,
    name: "Demo User",
    email: "demo@example.com",
    roles: ["user"],
    avatarUrl: "",
  };

  return { ...base, ...overrides };
}

/**
 * Runtime check for User
 * @param {any} obj
 * @returns {boolean}
 */
export function isUser(obj) {
  return (
    !!obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.name === "string"
  );
}
