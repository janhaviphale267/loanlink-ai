import { useEffect, useState } from "react";
import {
  startLoanApplication,
  fetchLoanSummary,
} from "../api/loanApi";

const STORAGE_KEY = "loanlink_application_id";

export default function useLoan(initialPayload = null) {
  const [applicationId, setApplicationId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Start loan application (explicit trigger)
  async function startApplication(payload = initialPayload) {
    setLoading(true);
    setError(null);

    try {
      const res = await startLoanApplication(payload || {});
      setApplicationId(res.application_id);
      localStorage.setItem(STORAGE_KEY, res.application_id);
      return res.application_id;
    } catch (err) {
      setError(err.message || "Failed to start application");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Fetch summary when applicationId changes or restores
  useEffect(() => {
    if (!applicationId) return;

    async function loadSummary() {
      try {
        const data = await fetchLoanSummary(applicationId);
        setSummary(data);
      } catch (err) {
        setError(err.message || "Failed to fetch loan summary");
      }
    }

    loadSummary();
  }, [applicationId]);

  // Optional: clear persisted state (future use)
  function resetApplication() {
    localStorage.removeItem(STORAGE_KEY);
    setApplicationId(null);
    setSummary(null);
  }

  return {
    applicationId,
    summary,
    loading,
    error,
    startApplication,
    resetApplication,
  };
}
