import { useState } from "react";
import { useLoanContext } from "../hooks/LoanContext";

export default function LoanApplyForm({ onSuccess }) {
  const { startApplication, loanLoading, loanError } = useLoanContext();

  const [form, setForm] = useState({
    loan_amount: "",
    loan_purpose: "",
    tenure_months: "",
    annual_income: "",
    employment_type: "Salaried",
  });

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    const payload = {
      loan_amount: Number(form.loan_amount),
      loan_purpose: form.loan_purpose,
      tenure_months: Number(form.tenure_months),
      annual_income: Number(form.annual_income),
      employment_type: form.employment_type,
    };
    await startApplication(payload);
    onSuccess?.();
  }

  return (
    <form onSubmit={submit} className="space-y-4 bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900">Apply for a Loan</h3>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Loan Amount (₹)" name="loan_amount" value={form.loan_amount} onChange={update} />
        <Input label="Annual Income (₹)" name="annual_income" value={form.annual_income} onChange={update} />
        <Input label="Tenure (months)" name="tenure_months" value={form.tenure_months} onChange={update} />
        <Input label="Purpose" name="loan_purpose" value={form.loan_purpose} onChange={update} />
      </div>

      <div>
        <label className="text-xs text-gray-500">Employment Type</label>
        <select
          name="employment_type"
          value={form.employment_type}
          onChange={update}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        >
          <option>Salaried</option>
          <option>Self-Employed</option>
        </select>
      </div>

      {loanError && <p className="text-xs text-red-600">{loanError}</p>}

      <button
        type="submit"
        disabled={loanLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-md text-sm font-medium"
      >
        {loanLoading ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        {...props}
        required
        className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}
