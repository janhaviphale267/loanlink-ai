import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import Header from "../components/Header";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";

export default function App() {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r flex flex-col justify-between">
          {/* NAV */}
          <div className="p-4 space-y-2">
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

          {/* FOOTER */}
          <div className="border-t p-4 space-y-4">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
              <SettingsIcon size={16} />
              Settings
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/bot-avatar.png"
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6 overflow-y-auto">
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

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md text-sm
      ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );
}
