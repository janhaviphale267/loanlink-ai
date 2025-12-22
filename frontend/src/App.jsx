import { useState } from "react";
import MainChat from "./components/MainChat";
import ApplicationStatus from "./components/ApplicationStatus";
import DocumentUploadPanel from "./components/DocumentUploadPanel";
import { Settings } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex bg-gray-100">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-gray-200 flex flex-col justify-between px-4 py-6">
        {/* TOP */}
        <div>
          {/* BRAND (ONLY ONCE) */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              LL
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                LoanLink AI
              </p>
              <p className="text-xs text-gray-500">
                AI Loan Orchestration
              </p>
            </div>
          </div>

          {/* NAV */}
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
        </div>

        {/* BOTTOM */}
        <div className="space-y-4">
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <Settings size={16} />
            Settings
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/profile.png"
              alt="Rajesh Kumar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Rajesh Kumar
              </p>
              <p className="text-xs text-gray-500">
                Customer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 bg-white m-4 rounded-xl overflow-hidden">
        {activeView === "chat" && <MainChat />}
        {activeView === "applications" && <ApplicationStatus />}
        {activeView === "documents" && <DocumentUploadPanel />}
      </main>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md text-sm mb-1
        ${
          active
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-700 hover:bg-gray-300"
        }`}
    >
      {label}
    </button>
  );
}
