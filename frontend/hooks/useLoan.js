import { useEffect, useState } from "react";
import { applyLoan, fetchLoanSummary } from "../api/loanApi";

const STORAGE_KEY = "loanlink_application_id";

export default function useLoan() {
  const [applicationId, setApplicationId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function startApplication(payload) {
    if (!payload) {
      throw new Error("Loan payload is required to apply");
    }

    setLoading(true);
    setError(null);

    try {
      const res = await applyLoan(payload);
      const id = String(res.id);

      setApplicationId(id);
      localStorage.setItem(STORAGE_KEY, id);

      // Optimistic placeholder until summary loads
      setSummary({
        amount: `₹${payload.loan_amount.toLocaleString("en-IN")}`,
        tenure: `${payload.tenure_months / 12} Years`,
        rate: "—",
        emi: "—",
        creditScore: "—",
        riskLevel: "Pending",
      });

      return id;
    } catch (err) {
      setError(err.message || "Failed to apply for loan");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // 🔗 Fetch real summary when applicationId is present (or restored)
  useEffect(() => {
    if (!applicationId) return;

    let cancelled = false;

    async function loadSummary() {
      try {
        const data = await fetchLoanSummary(applicationId);
        if (!cancelled) setSummary(data);
      } catch (err) {
        // Keep existing summary if fetch fails
      }
    }

    loadSummary();
    return () => {
      cancelled = true;
    };
  }, [applicationId]);

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
