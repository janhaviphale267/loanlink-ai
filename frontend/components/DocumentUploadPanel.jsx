// frontend/components/DocumentUploadPanel.jsx
import { useState } from "react";
import DocumentItem from "./DocumentItem";

export default function DocumentUploadPanel() {
  const [docs, setDocs] = useState({
    aadhaar: false,
    pan: false,
    photo: false,
    salarySlips: false,
    bankStatement: false,
    form16: false,
    itr: false,
    pnl: false,
    balanceSheet: false,
    businessProof: false,
  });

  function markUploaded(key) {
    setDocs((d) => ({ ...d, [key]: true }));
  }

  const uploadedCount = Object.values(docs).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6 max-w-4xl">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Documents</h3>
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
          {uploadedCount}/{Object.keys(docs).length}
        </span>
      </div>

      {/* IDENTITY DOCUMENTS */}
      <Section title="Identity Proof">
        <DocumentItem
          title="Aadhaar Card"
          description="Government-issued identity & address proof"
          uploaded={docs.aadhaar}
          onUpload={() => markUploaded("aadhaar")}
        />
        <DocumentItem
          title="PAN Card"
          description="Mandatory for income verification"
          uploaded={docs.pan}
          onUpload={() => markUploaded("pan")}
        />
        <DocumentItem
          title="Passport Size Photograph"
          description="Recent color photograph"
          uploaded={docs.photo}
          onUpload={() => markUploaded("photo")}
        />
      </Section>

      {/* SALARIED */}
      <Section title="Salaried Individuals">
        <DocumentItem
          title="Salary Slips"
          description="Last 3 months"
          uploaded={docs.salarySlips}
          onUpload={() => markUploaded("salarySlips")}
        />
        <DocumentItem
          title="Bank Statements"
          description="Last 6 months"
          uploaded={docs.bankStatement}
          onUpload={() => markUploaded("bankStatement")}
        />
        <DocumentItem
          title="Form 16"
          description="Income tax certificate"
          uploaded={docs.form16}
          onUpload={() => markUploaded("form16")}
        />
      </Section>

      {/* SELF EMPLOYED */}
      <Section title="Self-Employed Individuals">
        <DocumentItem
          title="Income Tax Returns (ITR)"
          description="Last 2 years"
          uploaded={docs.itr}
          onUpload={() => markUploaded("itr")}
        />
        <DocumentItem
          title="Profit & Loss Statement"
          description="Last 2 years"
          uploaded={docs.pnl}
          onUpload={() => markUploaded("pnl")}
        />
        <DocumentItem
          title="Balance Sheet"
          description="Last 2 years"
          uploaded={docs.balanceSheet}
          onUpload={() => markUploaded("balanceSheet")}
        />
      </Section>

      {/* BUSINESS */}
      <Section title="Business Proof">
        <DocumentItem
          title="Business Proof"
          description="GST / Business License / Partnership Deed"
          uploaded={docs.businessProof}
          onUpload={() => markUploaded("businessProof")}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
