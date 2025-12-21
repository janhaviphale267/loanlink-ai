const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/* ---------- GENERIC ---------- */
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "API request failed");
  }

  return res.json();
}

/* ---------- LOANS ---------- */
export function applyLoan(payload) {
  return request("/api/loans/apply", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ✅ ADD THIS FUNCTION
export function fetchLoanSummary(loanId) {
  return request(`/api/loans/${loanId}/summary`);
}

/* ---------- CHAT ---------- */
export function startChatSession() {
  return request("/api/chat/session", {
    method: "POST",
  });
}

export function sendChatMessage({ sessionId, message }) {
  return request("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ sessionId, message }),
  });
}

export function fetchConversation(sessionId) {
  return request(`/api/chat/conversation/${sessionId}`);
}
