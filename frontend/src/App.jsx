import { useState } from "react";
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

          <div className="border-t p-4 space-y-3">
            <SidebarItem label="Settings" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="h-full flex flex-col">
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

{activeView === "chat" && <MainChat />}
{activeView === "applications" && <ApplicationStatus />}
{activeView === "documents" && <DocumentUploadPanel />}


          </div>
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
