import React from "react";

export default function LoanSummaryPanel({
  application,
  onResume = () => {},
  onView = () => {},
}) {
  if (!application) {
    return (
      <aside className="panel loan-summary" aria-label="Loan summary">
        <div style={{ fontWeight: 700 }}>Loan Summary</div>
        <div className="small">No application selected</div>
      </aside>
    );
  }

  const {
    id,
    amount,
    tenureMonths,
    emi,
    interestRate,
    risk,
    confidence,
    status,
  } = application;

  return (
    <aside className="panel loan-summary" aria-label="Loan summary">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700 }}>Loan Summary</div>
        <div className="pill">{risk}</div>
      </div>

      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "var(--primary)",
        }}
      >
        ₹{amount.toLocaleString()}
      </div>

      <div className="small">
        Application: {id} • Status: {status}
      </div>
      <div className="small">Tenure: {tenureMonths} months</div>

      <div style={{ marginTop: 8 }}>
        <div className="metric">
          <div className="small">EMI</div>
          <div style={{ fontWeight: 700 }}>
            ₹{emi.toLocaleString()}
          </div>
        </div>

        <div className="metric">
          <div className="small">Interest Rate</div>
          <div>{interestRate}%</div>
        </div>

        <div className="metric">
          <div className="small">Credit Confidence</div>
          <div>{Math.round((confidence || 0) * 100)}%</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          className="btn primary"
          onClick={() => onResume(application)}
        >
          Resume Conversation
        </button>
        <button
          type="button"
          className="btn ghost"
          style={{ marginLeft: 8 }}
          onClick={() => onView(application)}
        >
          View Details
        </button>
      </div>
    </aside>
  );
}
