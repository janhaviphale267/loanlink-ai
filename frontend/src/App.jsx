import { useState } from "react";
import Header from "../components/Header";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";

export default function App() {
  const [activeView, setActiveView] = useState("chat"); 
  // chat | applications | documents

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 border-r bg-white flex flex-col justify-between">
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

          {/* BOTTOM SECTION */}
          <div className="border-t p-4 space-y-3">
            <SidebarItem label="Settings" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
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
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );
}
