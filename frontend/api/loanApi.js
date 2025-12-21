const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/* ---------- GENERIC HELPERS ---------- */
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
    throw new Error(err.message || "API request failed");
  }

  return res.json();
}

/* ---------- LOAN FLOW ---------- */
export function startLoanApplication(payload) {
  return request("/loan/start", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function sendChatMessage(payload) {
  return request("/chat/message", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchLoanSummary(applicationId) {
  return request(`/loan/${applicationId}/summary`);
}

/* ---------- DOCUMENTS ---------- */
export function uploadDocument(applicationId, docType, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("doc_type", docType);

  return fetch(`${API_BASE}/documents/${applicationId}/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Document upload failed");
    return res.json();
  });
}
