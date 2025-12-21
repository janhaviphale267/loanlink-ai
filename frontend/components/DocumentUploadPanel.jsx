import { useState } from "react";
import DocumentItem from "./DocumentItem";

export default function DocumentUploadPanel() {
  const [docs, setDocs] = useState({
    salary: false,
    id: false,
    address: false,
  });

  function markUploaded(key) {
    setDocs(d => ({ ...d, [key]: true }));
  }

  const uploadedCount = Object.values(docs).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Documents</h3>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
          {uploadedCount}/3
        </span>
      </div>

      <DocumentItem
        title="Salary Slips"
        description="Last 3 months"
        uploaded={docs.salary}
        onUpload={() => markUploaded("salary")}
      />

      <DocumentItem
        title="ID Proof"
        description="Aadhaar / PAN Card"
        uploaded={docs.id}
        onUpload={() => markUploaded("id")}
      />

      <DocumentItem
        title="Address Proof"
        description="Utility Bill / Rent Agreement"
        uploaded={docs.address}
        onUpload={() => markUploaded("address")}
      />
    </div>
  );
}
