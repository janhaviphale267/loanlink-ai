import { useState } from "react";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import { Settings } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex bg-[#f5f6f8]">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#eef0f3] flex flex-col justify-between px-5 py-6">
        <div>
          {/* BRAND */}
          <div className="flex items-center gap-3 mb-10">
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

          <div className="flex items-center gap-3">
            <img
              src="/profile.jpeg"
              alt="Rajesh Kumar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Rajesh Kumar</p>
              <p className="text-xs text-gray-600">Customer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white ml-6 rounded-l-xl flex flex-col">
        {/* BACK TO CHAT */}
        {activeView !== "chat" && (
          <div className="px-8 py-5">
            <button
              onClick={() => setActiveView("chat")}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Chat
            </button>
          </div>
        )}

        <div className="flex-1 px-8 pb-6">
          {activeView === "chat" && <MainChat />}
          {activeView === "applications" && <ApplicationStatus />}
          {activeView === "documents" && <DocumentUploadPanel />}
        </div>
      </main>
    </div>
  );
}

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
