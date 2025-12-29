import { FileText, Eye, Download, Upload } from "lucide-react";
import BackToChat from "./BackToChat";

const applications = [
  {
    type: "Personal Loan",
    status: "Under Review",
    statusColor: "bg-yellow-100 text-yellow-700",
    id: "LA001",
    amount: "₹5.0L",
    date: "2025-01-15",
    odds: "92%",
  },
  {
    type: "Home Loan",
    status: "Approved",
    statusColor: "bg-green-100 text-green-700",
    id: "LA002",
    amount: "₹35.0L",
    date: "2024-12-20",
    odds: "98%",
  },
];

export default function ApplicationStatus({ onBack }) {
  return (
    <div className="space-y-6 max-w-5xl">
      <BackToChat onBack={onBack} />

      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Active Applications
        </h2>
        <p className="text-sm text-gray-500">
          Track and manage your loan applications
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-5 flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={22} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{app.type}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">Application ID</p>
                <p className="text-sm font-medium text-gray-900">{app.id}</p>

                <div className="flex gap-3 mt-2">
                  <button className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md">
                    <Eye size={14} /> View Details
                  </button>
                  <button className="flex items-center gap-1 text-sm border px-3 py-1.5 rounded-md">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-sm text-gray-600">
              <div>
                <p className="text-xs">Loan Amount</p>
                <p className="font-semibold text-blue-600">{app.amount}</p>
              </div>
              <div>
                <p className="text-xs">Applied Date</p>
                <p className="font-medium text-gray-900">{app.date}</p>
              </div>
              <div>
                <p className="text-xs">Approval Odds</p>
                <p className="font-semibold text-green-600">{app.odds}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50 flex flex-col items-center text-center gap-3">
        <Upload size={32} className="text-blue-600" />
        <p className="font-semibold text-gray-900">Start New Application</p>
        <p className="text-sm text-gray-600 max-w-md">
          Apply for a new loan in minutes with our AI-powered assistant
        </p>
        <button className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md text-sm">
          Begin New Application
        </button>
      </div>
    </div>
  );
}
