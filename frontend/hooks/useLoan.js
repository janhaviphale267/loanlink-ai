import { useEffect, useState } from "react";
import { applyLoan } from "../api/loanApi";

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

      // Backend returns LoanApplication object
      const id = String(res.id);
      setApplicationId(id);
      localStorage.setItem(STORAGE_KEY, id);

      // Minimal summary until underwriting runs
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
