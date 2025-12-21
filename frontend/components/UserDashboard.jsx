import { PlusCircle, FileUp, History, Calculator } from "lucide-react";
import { useState } from "react";
import { useLoanContext } from "../hooks/LoanContext";

export default function UserDashboard() {
  const [showActions, setShowActions] = useState(false);

  const {
    applicationId,
    startApplication,
    loading,
  } = useLoanContext();

  async function handleStartLoan() {
    if (applicationId || loading) return;
    await startApplication();
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4">
      {/* ACTIVE APPLICATION */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">
          ACTIVE APPLICATION
        </h3>

        {applicationId ? (
          <div className="bg-white rounded-lg p-3 border">
            <p className="text-sm font-medium text-gray-900">Loan Application</p>
            <p className="text-xs text-blue-600 font-semibold">
              In Progress
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ID: {applicationId}
            </p>
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            No active application
          </div>
        )}
      </div>

      {/* PRIMARY CTA */}
      <button
        onClick={handleStartLoan}
        disabled={loading || applicationId}
        className="flex items-center justify-center gap-2 bg-blue-600 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-md mb-4 hover:bg-blue-700"
      >
        <PlusCircle size={16} />
        {applicationId ? "Application Started" : "Start Loan Application"}
      </button>

      {/* QUICK ACTIONS (COLLAPSIBLE) */}
      <div className="mt-auto">
        <button
          onClick={() => setShowActions(!showActions)}
          className="w-full text-left text-xs font-semibold text-gray-500 mb-2"
        >
          QUICK ACTIONS
        </button>

        {showActions && (
          <div className="space-y-2">
            <ActionItem icon={<FileUp size={14} />} label="Upload Documents" />
            <ActionItem icon={<Calculator size={14} />} label="EMI Calculator" />
            <ActionItem icon={<History size={14} />} label="Application History" />
          </div>
        )}
      </div>
    </aside>
  );
}

function ActionItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
      {icon}
      {label}
    </div>
  );
}
