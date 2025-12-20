/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'ai'|'user'|'system'} from
 * @property {string} text
 * @property {number} [ts]
 * @property {Object} [meta]
 * @property {number} [meta.confidence]
 */

/**
 * @typedef {Object} AgentReply
 * @property {string} id
 * @property {'ai'} from
 * @property {string} text
 * @property {Object} meta
 * @property {number} meta.confidence
 * @property {number} [ts]
 */

/**
 * Create a ChatMessage
 * @param {Object} props
 * @param {string} props.id
 * @param {'ai'|'user'|'system'} props.from
 * @param {string} props.text
 * @param {number} [props.ts]
 * @param {Object} [props.meta]
 * @returns {ChatMessage}
 */
export function createMessage({
  id,
  from = "ai",
  text = "",
  ts = Date.now(),
  meta = {},
}) {
  return { id, from, text, ts, meta };
}

/**
 * Runtime validator for ChatMessage-like objects
 * @param {any} obj
 * @returns {boolean}
 */
export function isChatMessage(obj) {
  return (
    !!obj &&
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.text === "string" &&
    (obj.from === "ai" ||
      obj.from === "user" ||
      obj.from === "system")
  );
}
