import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import Header from "../components/Header";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL */}
        <aside className="w-64 bg-gray-200 flex flex-col justify-between px-4 py-6">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                LL
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  LoanLink AI
                </p>
                <p className="text-xs text-gray-600">AI Loan Orchestration</p>
              </div>
            </div>

            {/* Navigation */}
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

          {/* Settings + Profile */}
          <div className="mt-auto pt-4 border-t border-gray-300">
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 text-sm mb-3">
              <SettingsIcon size={16} />
              Settings
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/profile-bot.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Rajesh Kumar
                </p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Back to Chat */}
          {activeView !== "chat" && (
            <button
              onClick={() => setActiveView("chat")}
              className="text-sm text-blue-600 hover:underline mb-4"
            >
              ← Back to Chat
            </button>
          )}

          {/* Views */}
          {activeView === "chat" && (
            <div className="bg-white rounded-2xl shadow-md p-4">
              <MainChat />
            </div>
          )}
          {activeView === "applications" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <ApplicationStatus />
            </div>
          )}
          {activeView === "documents" && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <DocumentUploadPanel />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded text-sm font-medium
        ${active
          ? "bg-white text-blue-600 shadow"
          : "text-gray-800 hover:bg-gray-300"}
      `}
    >
      {label}
    </button>
  );
}
