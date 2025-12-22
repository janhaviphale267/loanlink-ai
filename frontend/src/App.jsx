import { useState } from "react";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import { Settings } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* LEFT SIDEBAR (FIXED, NON-SCROLLING) */}
      <aside className="w-64 bg-[#f2f3f5] flex flex-col justify-between px-4 py-6 flex-shrink-0">
        <div>
          {/* BRAND */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
              LL
            </div>
            <div>
              <p className="font-semibold text-gray-900">LoanLink AI</p>
              <p className="text-xs text-gray-600">AI Loan Orchestration</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            <SidebarItem
              label="Chat"
              active={activeView === "chat"}
              onClick={() => setActiveView("chat")}
            />
            <SidebarItem
              label="Applications"
              active={activeView === "applications"}
              onClick={() => setActiveView("applications")}
            />
            <SidebarItem
              label="Documents"
              active={activeView === "documents"}
              onClick={() => setActiveView("documents")}
            />
          </nav>
        </div>

        {/* FOOTER */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Settings size={16} />
            <span>Settings</span>
          </div>

          <button
            onClick={() => setActiveView("profile")}
            className="flex items-center gap-3 text-left"
          >
            <img
              src="/profile.jpeg"
              alt="Rajesh Kumar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Rajesh Kumar</p>
              <p className="text-xs text-gray-600">Customer</p>
            </div>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-white overflow-hidden">
        {/* INNER SCROLL CONTAINER */}
        <div className="h-full overflow-y-auto px-10 py-6">
          {/* BACK TO CHAT */}
          {activeView !== "chat" && (
            <div className="mb-4">
              <button
                onClick={() => setActiveView("chat")}
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to Chat
              </button>
            </div>
          )}

          {/* VIEWS */}
          {activeView === "chat" && <MainChat />}
          {activeView === "applications" && <ApplicationStatus />}
          {activeView === "documents" && <DocumentUploadPanel />}
          {activeView === "profile" && <ProfileView />}
        </div>
      </main>
    </div>
  );
}

/* SIDEBAR ITEM */
function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-md text-sm transition
        ${
          active
            ? "bg-white text-blue-600 font-medium shadow-sm"
            : "text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

/* PROFILE VIEW (CLICK ON RAJESH KUMAR) */
function ProfileView() {
  return (
    <div className="max-w-4xl bg-white rounded-xl border p-6 space-y-6">
      <h2 className="text-xl font-semibold">Customer Profile</h2>

      <Section title="Personal Information">
        <Field label="Full Name" value="Rajesh Kumar" />
        <Field label="Date of Birth" value="—" />
        <Field label="Gender" value="—" />
        <Field label="Marital Status" value="—" />
        <Field label="Nationality" value="Indian" />
        <Field label="PAN / Aadhaar" value="—" />
      </Section>

      <Section title="Contact Details">
        <Field label="Primary Mobile" value="—" />
        <Field label="Email" value="—" />
        <Field label="Current Address" value="—" />
      </Section>

      <Section title="Professional & Financial">
        <Field label="Employment Status" value="—" />
        <Field label="Monthly Income" value="—" />
        <Field label="Bank Account" value="—" />
      </Section>

      <Section title="Application Status">
        <Field label="Current Stage" value="KYC Verification" />
        <Field label="Credit Score" value="—" />
      </Section>
    </div>
  );
}

/* HELPERS */
function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
