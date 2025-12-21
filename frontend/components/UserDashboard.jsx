import { useState } from "react";
import { PlusCircle, FileUp, History, Calculator } from "lucide-react";

export default function UserDashboard() {
  const [showActions, setShowActions] = useState(false);

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4">
      {/* ACTIVE APPLICATIONS */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-2">
          ACTIVE APPLICATIONS
        </h3>

        <div className="bg-white rounded-lg p-3 border mb-2">
          <p className="text-sm font-medium text-gray-900">Home Loan</p>
          <p className="text-xs text-yellow-600 font-semibold">Under Review</p>
          <p className="text-xs text-gray-500 mt-1">₹45,00,000</p>
        </div>

        <div className="bg-white rounded-lg p-3 border">
          <p className="text-sm font-medium text-gray-900">Personal Loan</p>
          <p className="text-xs text-green-600 font-semibold">Approved</p>
          <p className="text-xs text-gray-500 mt-1">₹3,00,000</p>
        </div>
      </div>

      {/* PRIMARY CTA */}
      <button className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2 rounded-md mb-4 hover:bg-blue-700">
        <PlusCircle size={16} />
        Start New Application
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


