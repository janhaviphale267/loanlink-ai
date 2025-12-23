export default function RightIntelligencePanel() {
  return (
    <aside className="w-80 bg-gray-50 border-l px-4 py-6 space-y-4 overflow-auto">
      <Card title="Loan Summary">
        <p>Requested: ₹10,00,000</p>
        <p>Interest: 6.75%</p>
        <p>Tenure: 30 Years</p>
        <p className="text-2xl font-bold text-blue-600 mt-2">88%</p>
      </Card>

      <Card title="Approval Health">
        <Status label="Income Verified" ok />
        <Status label="Documents Pending" />
      </Card>

      <Card title="Document Health">
        <Status label="Bank Statement" />
        <Status label="Identity Proof" />
      </Card>

      <Card title="Application Progress">
        <ul className="text-sm space-y-1">
          <li>✔ Requirement Gathering</li>
          <li>✔ KYC Verification</li>
          <li>⏳ Underwriting</li>
          <li>⬜ Final Approval</li>
        </ul>
      </Card>
    </aside>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <p className="font-medium mb-2">{title}</p>
      {children}
    </div>
  );
}

function Status({ label, ok }) {
  return (
    <p className={`text-sm ${ok ? "text-green-600" : "text-yellow-600"}`}>
      {label}
    </p>
  );
}
