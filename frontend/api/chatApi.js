// Chat API wrappers
import api from "./apiClient";
import * as mock from "./mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function sendMessage(sessionId, message) {
  if (USE_MOCK) return mock.sendChatMessage(sessionId, message);

  const payload = { session_id: sessionId, message };
  const res = await api.post("/chat/message", payload);
  return res.data;
}

export async function getConversation(sessionId, limit = 100) {
  if (USE_MOCK) return mock.getConversation(sessionId, limit);

  const res = await api.get(
    `/chat/history/${encodeURIComponent(sessionId)}?limit=${limit}`
  );
  return res.data;
}

export async function startSession(userId) {
  if (USE_MOCK) return mock.startSession(userId);

  const res = await api.post("/chat/session", { user_id: userId });
  return res.data;
}

