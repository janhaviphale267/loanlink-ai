// frontend/src/App.jsx
import { useState } from "react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import ProfileDetails from "../components/ProfileDetails";
import RightIntelligencePanel from "../components/RightIntelligencePanel";
import TopBar from "../components/TopBar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("chat");
  const [showIntel, setShowIntel] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* LEFT SIDEBAR */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onToggleIntel={() => setShowIntel(!showIntel)} />

        <div className="flex flex-1 overflow-hidden">
          {/* MAIN VIEW */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {activeView === "chat" && <MainChat />}

            {activeView === "applications" && (
              <ApplicationStatus onBack={() => setActiveView("chat")} />
            )}

            {activeView === "documents" && (
              <DocumentUploadPanel onBack={() => setActiveView("chat")} />
            )}

            {activeView === "profile" && (
              <ProfileDetails onBack={() => setActiveView("chat")} />
            )}
          </div>

          {showIntel && <RightIntelligencePanel />}
        </div>
      </div>
    </div>
  );
}
