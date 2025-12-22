import { useState } from "react";
import MainChat from "./MainChat";
import ApplicationStatus from "./ApplicationStatus";
import DocumentUploadPanel from "./DocumentUploadPanel";
import { Settings } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#f2f3f5] flex flex-col justify-between px-4 py-6 flex-shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
              LL
            </div>
            <div>
              <p className="font-semibold text-gray-900">LoanLink AI</p>
              <p className="text-xs text-gray-600">AI Loan Orchestration</p>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarItem label="Chat" active={activeView === "chat"} onClick={() => setActiveView("chat")} />
            <SidebarItem label="Applications" active={activeView === "applications"} onClick={() => setActiveView("applications")} />
            <SidebarItem label="Documents" active={activeView === "documents"} onClick={() => setActiveView("documents")} />
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Settings size={16} />
            <span>Settings</span>
          </div>

          <button onClick={() => setActiveView("profile")} className="flex items-center gap-3">
            <img src="/profile.jpeg" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium">Rajesh Kumar</p>
              <p className="text-xs text-gray-600">Customer</p>
            </div>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-10 py-6">
          {activeView !== "chat" && (
            <button onClick={() => setActiveView("chat")} className="text-sm text-blue-600 mb-4">
              ← Back to Chat
            </button>
          )}

          {activeView === "chat" && <MainChat />}
          {activeView === "applications" && <ApplicationStatus />}
          {activeView === "documents" && <DocumentUploadPanel />}
          {activeView === "profile" && <CustomerProfile />}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-md text-sm ${
        active ? "bg-white text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ================= CUSTOMER PROFILE ================= */

function CustomerProfile() {
  return (
    <div className="max-w-5xl bg-white border rounded-xl p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Customer Profile</h2>

      <Section title="Personal Information">
        <Field label="Full Name" value="Rajesh Kumar" />
        <Field label="Date of Birth" value="12 Aug 1994" />
        <Field label="Gender" value="Male" />
        <Field label="Marital Status" value="Single" />
        <Field label="Nationality" value="Indian" />
        <Field label="PAN / Aadhaar" value="XXXX-XXXX-4321" />
        <Field label="Profile Picture" value="Live Selfie Captured" highlight />
      </Section>

      <Section title="Contact Details">
        <Field label="Primary Mobile" value="+91 98XXXX3210" />
        <Field label="Emergency Contact" value="+91 99XXXX1122" />
        <Field label="Email" value="rajesh.demo@email.com" />
        <Field label="Current Address" value="Bangalore, Karnataka" />
        <Field label="Permanent Address" value="Same as Current" />
        <Field label="Address Type" value="Rented" />
      </Section>

      <Section title="Professional & Financial Profile">
        <Field label="Employment Status" value="Salaried" />
        <Field label="Employer Name" value="Demo Technologies Pvt Ltd" />
        <Field label="Monthly Income" value="₹75,000" highlight />
        <Field label="Total Experience" value="4.5 Years" />
        <Field label="Industry Sector" value="Information Technology" />
        <Field label="Bank Account" value="HDFC Bank • IFSC HDFC0001234" />
      </Section>

      <Section title="Application Status & History">
        <Field label="Current Stage" value="KYC Verification" highlight />
        <Field label="Assigned Banker" value="Anita Sharma" />
        <Field label="Credit Score" value="742" highlight />
        <Field label="Active Loans" value="1" />
        <Field label="Outstanding Debt" value="₹1,20,000" />
        <Field label="Repayment History" value="On-time" />
      </Section>

      <Section title="Document Vault">
        <Field label="Identity Proof" value="Verified" highlight />
        <Field label="Address Proof" value="Pending" />
        <Field label="Income Proof" value="Verified" />
        <Field label="Signed Agreements" value="Sanction Letter Uploaded" />
      </Section>

      <Section title="Security & Preferences">
        <Field label="Account Security" value="Biometric Enabled" />
        <Field label="Communication Preference" value="WhatsApp & Email" />
        <Field label="Last Login" value="22 Dec 2025, 10:45 AM" />
        <Field label="Session Activity" value="No suspicious activity" />
      </Section>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700 mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Field({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm ${highlight ? "text-blue-600 font-medium" : "text-gray-900"}`}>
        {value}
      </p>
    </div>
  );
}
