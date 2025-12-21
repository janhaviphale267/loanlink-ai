import { useState } from "react";
import DocumentItem from "./DocumentItem";
import { useLoanContext } from "../hooks/LoanContext";

export default function DocumentUploadPanel() {
  const [docs, setDocs] = useState({
    salary: false,
    id: false,
    address: false,
  });

  const { completeDocuments } = useLoanContext();

  function markUploaded(key) {
    setDocs((d) => {
      const updated = { ...d, [key]: true };

      const allUploaded = Object.values(updated).every(Boolean);
      if (allUploaded) {
        completeDocuments();
      }

      return updated;
    });
  }

  const uploadedCount = Object.values(docs).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Documents
        </h3>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
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
        description="Aadhaar or PAN Card"
        uploaded={docs.id}
        onUpload={() => markUploaded("id")}
      />

      <DocumentItem
        title="Address Proof"
        description="Utility Bill or Rent Agreement"
        uploaded={docs.address}
        onUpload={() => markUploaded("address")}
      />
    </div>
  );
}
