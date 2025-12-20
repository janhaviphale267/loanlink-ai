// Admin endpoints: monitoring, overrides, audit trails
import api from "./apiClient";
import * as mock from "./mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchAdminApplications(filters = {}) {
  if (USE_MOCK) return mock.fetchAdminApplications(filters);

  const res = await api.get("/admin/applications", { params: filters });
  return res.data;
}

export async function getAuditTrail(loanId) {
  if (USE_MOCK) return mock.getAuditTrail(loanId);

  const res = await api.get(
    `/admin/audit/${encodeURIComponent(loanId)}`
  );
  return res.data;
}

export async function overrideDecision(loanId, overridePayload) {
  if (USE_MOCK) return mock.overrideDecision(loanId, overridePayload);

  const res = await api.post(
    `/admin/override/${encodeURIComponent(loanId)}`,
    overridePayload
  );
  return res.data;
}

export async function fetchRecommendations(loanId) {
  if (USE_MOCK) return mock.fetchRecommendations(loanId);

  const res = await api.get(
    `/admin/recommendations/${encodeURIComponent(loanId)}`
  );
  return res.data;
}
