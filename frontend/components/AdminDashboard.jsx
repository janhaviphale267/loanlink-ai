import { ShieldCheck, Users, FileText, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <section className="p-6 space-y-6 bg-gray-50 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Admin Control Center
          </h2>
          <p className="text-xs text-gray-500">
            Monitoring • Compliance • Oversight
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full">
          <ShieldCheck size={14} />
          System Healthy
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Metric
          icon={<Users size={18} />}
          label="Active Applications"
          value="128"
        />
        <Metric
          icon={<FileText size={18} />}
          label="Pending Verifications"
          value="34"
        />
        <Metric
          icon={<AlertTriangle size={18} />}
          label="Risk Alerts"
          value="3"
          danger
        />
      </div>

      {/* AUDIT LOG */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Recent Audit Events
        </h3>

        <ul className="text-sm space-y-3">
          <AuditItem
            time="2 min ago"
            text="Income document verified for Application #LL-3421"
          />
          <AuditItem
            time="15 min ago"
            text="Risk score updated for Application #LL-3398"
          />
          <AuditItem
            time="1 hr ago"
            text="Manual review flagged for Application #LL-3372"
            alert
          />
        </ul>
      </div>
    </section>
  );
}

function Metric({ icon, label, value, danger }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center gap-4">
      <div
        className={`p-2 rounded-md ${
          danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p
          className={`text-lg font-semibold ${
            danger ? "text-red-600" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function AuditItem({ time, text, alert }) {
  return (
    <li
      className={`flex justify-between items-start ${
        alert ? "text-red-600" : "text-gray-700"
      }`}
    >
      <span>{text}</span>
      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
        {time}
      </span>
    </li>
  );
}

