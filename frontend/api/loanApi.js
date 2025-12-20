// Loan-related API wrappers
import api from "./apiClient";
import * as mock from "./mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchApplications(params = {}) {
  if (USE_MOCK) return mock.fetchApplications(params);

  const res = await api.get("/loans", { params });
  return res.data;
}

export async function getApplication(loanId) {
  if (USE_MOCK) return mock.getApplication(loanId);

  const res = await api.get(`/loans/${encodeURIComponent(loanId)}`);
  return res.data;
}

export async function createApplication(payload) {
  if (USE_MOCK) return mock.createApplication(payload);

  const res = await api.post("/loans", payload);
  return res.data;
}

export async function updateApplication(loanId, updates) {
  if (USE_MOCK) return mock.updateApplication(loanId, updates);

  const res = await api.patch(
    `/loans/${encodeURIComponent(loanId)}`,
    updates
  );
  return res.data;
}

export async function updateStatus(loanId, status) {
  if (USE_MOCK) return mock.updateStatus(loanId, status);

  const res = await api.post(
    `/loans/${encodeURIComponent(loanId)}/status`,
    { status }
  );
  return res.data;
}
