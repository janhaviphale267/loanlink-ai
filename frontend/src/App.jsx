import { useState } from "react";
import Header from "./components/Header";
import MainChat from "./components/MainChat";
import ApplicationStatus from "./components/ApplicationStatus";
import DocumentUploadPanel from "./components/DocumentUploadPanel";
import { Settings } from "lucide-react";
import profileImg from "./assets/profile.png";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* TOP BAR */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-gray-200 flex flex-col justify-between">
          {/* TOP */}
          <div>
            <div className="px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">
                LL
              </div>
              <div>
                <p className="text-sm font-semibold">LoanLink AI</p>
                <p className="text-xs text-gray-600">
                  AI Loan Orchestration
                </p>
              </div>
            </div>

            <nav className="px-4 space-y-1">
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

          {/* BOTTOM */}
          <div className="border-t px-4 py-4 space-y-4">
            <SidebarItem
              label="Settings"
              icon={<Settings size={16} />}
            />

            <div className="flex items-center gap-3">
              <img
                src={profileImg}
                alt="profile"
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
        <main className="flex-1 bg-white p-6 overflow-y-auto">
          {activeView !== "chat" && (
            <button
              onClick={() => setActiveView("chat")}
              className="mb-4 text-sm text-blue-600 hover:underline"
            >
              ← Back to Chat
            </button>
          )}

          {activeView === "chat" && <MainChat />}
          {activeView === "applications" && <ApplicationStatus />}
          {activeView === "documents" && <DocumentUploadPanel />}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm
        ${
          active
            ? "bg-white text-blue-600"
            : "text-gray-700 hover:bg-gray-300"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
