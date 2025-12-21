export default function LoanSummaryPanel({
  amount,
  tenure,
  rate,
  emi,
  creditScore,
  riskLevel,
}) {
  const isLoading =
    !amount || !tenure || !rate || !emi || creditScore === undefined;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded col-span-2" />
        </div>
        <div className="h-16 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-sm">
      {/* AMOUNT */}
      <section>
        <p className="text-xs text-gray-500">Loan Amount</p>
        <p className="text-2xl font-bold text-blue-600">{amount}</p>
      </section>

      {/* DETAILS */}
      <section className="grid grid-cols-2 gap-4">
        <Info label="Tenure" value={tenure} />
        <Info label="Interest Rate" value={rate} />
        <Info label="Estimated EMI" value={emi} highlight />
      </section>

      {/* RISK */}
      <section>
        <p className="text-xs text-gray-500 mb-1">Risk Assessment</p>
        <div className="flex items-center justify-between bg-gray-50 border rounded-md px-3 py-2">
          <span>Credit Score</span>
          <span className="font-medium">{creditScore}</span>
        </div>
        <p
          className={`mt-2 text-xs font-semibold ${
            riskLevel === "Low"
              ? "text-green-600"
              : riskLevel === "Medium"
              ? "text-yellow-600"
              : riskLevel === "High"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {riskLevel} Risk
        </p>
      </section>

      {/* CTA */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium">
        View Detailed Breakdown
      </button>
    </div>
  );
}

function Info({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`font-medium ${highlight ? "text-gray-900" : "text-gray-700"}`}>
        {value}
      </p>
    </div>
  );
}
