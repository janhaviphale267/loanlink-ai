import {
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Upload
} from "lucide-react";

export default function DocumentUploadPanel({ onBack }) {
  const documents = [
    {
      name: "PAN Card",
      uploaded: "2025-01-10",
      status: "verified",
    },
    {
      name: "Aadhaar Card",
      uploaded: "2025-01-10",
      status: "verified",
    },
    {
      name: "Salary Slips (Last 3 Months)",
      uploaded: "2025-01-12",
      status: "verified",
    },
    {
      name: "Bank Statements",
      uploaded: "2025-01-14",
      status: "pending",
    },
    {
      name: "Form 16",
      status: "not_uploaded",
    },
    {
      name: "ITR (Last 2 Years)",
      status: "not_uploaded",
    },
  ];

  const total = documents.length;
  const verified = documents.filter(d => d.status === "verified").length;
  const pending = documents.filter(d => d.status === "pending").length;
  const notUploaded = documents.filter(d => d.status === "not_uploaded").length;

  return (
    <div className="space-y-6 max-w-6xl">

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline"
      >
        ← Back to Chat
      </button>

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">Documents</h2>
        <p className="text-gray-500">Manage and verify your loan documents</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="Total Documents" value={total} icon={<CheckCircle />} color="blue" />
        <Stat title="Verified" value={verified} icon={<CheckCircle />} color="green" />
        <Stat title="Pending" value={pending} icon={<Clock />} color="yellow" />
        <Stat title="Not Uploaded" value={notUploaded} icon={<AlertCircle />} color="gray" />
      </div>

      {/* PROGRESS */}
      <div className="border rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Verification Progress</span>
          <span className="text-blue-600">50% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div className="h-2 bg-blue-600 rounded w-1/2"></div>
        </div>
      </div>

      {/* DOCUMENT TIPS — MOVED HERE */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <h3 className="text-red-600 font-semibold mb-3 flex items-center gap-2">
          💡 Document Tips
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Ensure documents are clear and readable</li>
          <li>Upload files in PDF or JPG format (max 5MB)</li>
          <li>Bank statements should be from the last 6 months</li>
          <li>Avoid password-protected or encrypted files</li>
          <li>Make sure all details are clearly visible</li>
        </ul>
      </div>

      {/* DOCUMENT LIST */}
      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div className="flex gap-3 items-start">
              <div>
                {doc.status === "verified" && <CheckCircle className="text-green-600" />}
                {doc.status === "pending" && <Clock className="text-yellow-600" />}
                {doc.status === "not_uploaded" && <AlertCircle className="text-gray-400" />}
              </div>

              <div>
                <p className="font-medium">{doc.name}</p>
                {doc.uploaded && (
                  <p className="text-sm text-gray-500">
                    Uploaded: {doc.uploaded}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {doc.status !== "not_uploaded" && (
                <>
                  <button className="p-2 border rounded hover:bg-gray-100">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 border rounded hover:bg-gray-100">
                    <Download size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <div className={`p-2 rounded-full ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}
