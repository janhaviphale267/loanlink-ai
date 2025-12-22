import { useState } from "react";
import Login from "../components/Login";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import ProfileDetails from "../components/ProfileDetails";
import { Settings, LogOut } from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("chat");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-gray-200 flex flex-col justify-between px-4 py-6">
        <div>
          {/* LOGO */}
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

        {/* BOTTOM SECTION */}
        <div className="space-y-4">
          {/* SETTINGS */}
          <div className="flex items-center gap-2 text-gray-700 text-sm px-4">
            <Settings size={16} />
            <span>Settings</span>
          </div>


          {/* PROFILE */}
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

          {/* LOGOUT */}
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setActiveView("chat");
            }}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-4"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white flex flex-col overflow-hidden">
        {activeView !== "chat" && (
          <div className="px-6 py-4">
            <button
              onClick={() => setActiveView("chat")}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Chat
            </button>
          </div>
        )}

        <div className="flex-1 overflow-auto px-6 pb-6">
          {activeView === "chat" && <MainChat />}
          {activeView === "applications" && <ApplicationStatus />}
          {activeView === "documents" && <DocumentUploadPanel />}
          {activeView === "profile" && <ProfileDetails />}
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
            ? "bg-white text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-300"
        }`}
    >
      {label}
    </button>
  );
}
