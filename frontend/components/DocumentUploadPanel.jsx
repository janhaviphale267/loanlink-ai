// frontend/components/DocumentUploadPanel.jsx
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const documents = [
  {
    name: "PAN Card",
    uploaded: "2025-01-10",
    verified: "2025-01-11",
    status: "verified",
  },
  {
    name: "Aadhaar Card",
    uploaded: "2025-01-10",
    verified: "2025-01-11",
    status: "verified",
  },
  {
    name: "Salary Slips (Last 3 months)",
    uploaded: "2025-01-12",
    verified: "2025-01-13",
    status: "verified",
  },
  {
    name: "Bank Statements (Last 6 months)",
    uploaded: "2025-01-14",
    status: "pending",
  },
  {
    name: "Form 16",
    status: "not_uploaded",
  },
  {
    name: "ITR (Last 2 years)",
    status: "not_uploaded",
  },
];

export default function DocumentUploadPanel() {
  const total = documents.length;
  const verified = documents.filter(d => d.status === "verified").length;
  const pending = documents.filter(d => d.status === "pending").length;
  const notUploaded = documents.filter(d => d.status === "not_uploaded").length;
  const progress = Math.round((verified / total) * 100);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
        <p className="text-sm text-gray-500">
          Manage and verify your loan documents
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="Total Documents" value={total} icon={<CheckCircle />} />
        <Stat title="Verified" value={verified} icon={<CheckCircle />} green />
        <Stat title="Pending" value={pending} icon={<Clock />} yellow />
        <Stat title="Not Uploaded" value={notUploaded} icon={<AlertCircle />} gray />
      </div>

      {/* PROGRESS */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Verification Progress</span>
          <span className="text-blue-600 font-medium">{progress}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Document Checklist</h3>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            <Upload size={16} /> Upload New Document
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc, i) => (
            <DocumentRow key={i} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Stat({ title, value, icon, green, yellow, gray }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div
        className={`p-2 rounded-full ${
          green
            ? "bg-green-100 text-green-600"
            : yellow
            ? "bg-yellow-100 text-yellow-600"
            : gray
            ? "bg-gray-100 text-gray-500"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {icon}
      </div>
    </div>
  );
}

function DocumentRow({ doc }) {
  const statusBadge =
    doc.status === "verified"
      ? "bg-green-100 text-green-700"
      : doc.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-500";

  const statusText =
    doc.status === "verified"
      ? "Verified"
      : doc.status === "pending"
      ? "Pending Review"
      : "Not Uploaded";

  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 ${
            doc.status === "verified"
              ? "text-green-600"
              : doc.status === "pending"
              ? "text-yellow-600"
              : "text-gray-400"
          }`}
        >
          {doc.status === "verified" ? (
            <CheckCircle size={18} />
          ) : doc.status === "pending" ? (
            <Clock size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
        </div>

        <div>
          <p className="font-medium text-gray-900">{doc.name}</p>
          {doc.uploaded && (
            <p className="text-xs text-gray-500">
              Uploaded: {doc.uploaded}
            </p>
          )}
          {doc.verified && (
            <p className="text-xs text-green-600">
              Verified: {doc.verified}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs ${statusBadge}`}>
          {statusText}
        </span>

        {doc.status !== "not_uploaded" && (
          <>
            <IconBtn icon={<Eye size={16} />} />
            <IconBtn icon={<Download size={16} />} />
          </>
        )}
        <IconBtn icon={<Trash2 size={16} />} danger />
      </div>
    </div>
  );
}

function IconBtn({ icon, danger }) {
  return (
    <button
      className={`p-2 rounded-md border ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
    </button>
  );
}
