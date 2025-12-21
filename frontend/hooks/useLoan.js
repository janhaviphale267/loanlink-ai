import { useEffect, useState } from "react";
import {
  startLoanApplication,
  fetchLoanSummary,
} from "../api/loanApi";

export default function useLoan(initialPayload = null) {
  const [applicationId, setApplicationId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Start loan application
  async function startApplication(payload = initialPayload) {
    setLoading(true);
    setError(null);

    try {
      const res = await startLoanApplication(payload || {});
      setApplicationId(res.application_id);
      return res.application_id;
    } catch (err) {
      setError(err.message || "Failed to start application");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Fetch summary when applicationId changes
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

  return {
    applicationId,
    summary,
    loading,
    error,
    startApplication,
  };
}
