// Document upload and verification API wrappers
import api from "./apiClient";
import * as mock from "./mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function uploadDocument(loanId, file, metadata = {}) {
  if (USE_MOCK) return mock.uploadDocument(loanId, file, metadata);

  const form = new FormData();
  form.append("file", file);
  form.append("metadata", JSON.stringify(metadata));

  const res = await api.post(
    `/documents/upload?loan_id=${encodeURIComponent(loanId)}`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function listDocuments(loanId) {
  if (USE_MOCK) return mock.listDocuments(loanId);

  const res = await api.get(
    `/documents?loan_id=${encodeURIComponent(loanId)}`
  );
  return res.data;
}

export async function verifyDocument(documentId) {
  if (USE_MOCK) return mock.verifyDocument(documentId);

  const res = await api.post(
    `/documents/${encodeURIComponent(documentId)}/verify`
  );
  return res.data;
}
