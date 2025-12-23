// frontend/src/App.jsx
import { useState } from "react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import MainChat from "../components/MainChat";
import ApplicationStatus from "../components/ApplicationStatus";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import RightIntelligencePanel from "../components/RightIntelligencePanel";
import TopBar from "../components/TopBar";
import ProfileDetails from "../components/ProfileDetails";
import BackToChat from "../components/BackToChat";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("chat");
  const [showIntel, setShowIntel] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex bg-[#F7F8FA]">
      {/* LEFT SIDEBAR (FULL HEIGHT) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* RIGHT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR (SEPARATE STRIP) */}
        <TopBar
          onToggleIntel={() => setShowIntel((s) => !s)}
          onProfile={() => setShowProfile(true)}
        />

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {/* CENTER CONTENT */}
          <section className="flex-1 bg-white p-6 overflow-auto">
            {activeView !== "chat" && (
              <BackToChat onBack={() => setActiveView("chat")} />
            )}

            {activeView === "chat" && <MainChat />}
            {activeView === "applications" && <ApplicationStatus />}
            {activeView === "documents" && <DocumentUploadPanel />}
          </section>

          {/* RIGHT INTELLIGENCE PANEL */}
          {showIntel && <RightIntelligencePanel />}
        </div>
      </div>

      {/* PROFILE DRAWER */}
      {showProfile && (
        <ProfileDetails onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}
