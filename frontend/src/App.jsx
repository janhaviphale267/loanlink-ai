import { useState } from "react";
import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
import LoanSummaryPanel from "../components/LoanSummaryPanel";
import DocumentUploadPanel from "../components/DocumentUploadPanel";
import MainChat from "../components/MainChat";

export default function App() {
  const [activeView, setActiveView] = useState("applications");

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <UserDashboard
          activeView={activeView}
          onChangeView={setActiveView}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 overflow-y-auto p-6">
          {activeView === "applications" && (
            <div className="space-y-6">
              <LoanSummaryPanel />
              <MainChat />
            </div>
          )}

          {activeView === "documents" && (
            <DocumentUploadPanel />
          )}
        </main>
      </div>
    </div>
  );
}
