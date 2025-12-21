import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import MainChat from "../components/MainChat.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import DocumentUploadPanel from "../components/DocumentUploadPanel.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/chat" element={<MainChat />} />
            <Route path="/upload" element={<DocumentUploadPanel />} />
            <Route path="/admin" element={<AdminDashboard />} />

            <Route
              path="*"
              element={
                <div className="panel">
                  <h3 style={{ marginTop: 0, color: "var(--primary)" }}>
                    Page not found
                  </h3>
                  <p className="small">
                    Use the navigation to open a valid route.
                  </p>
                  <Link to="/" className="btn primary">Go Home</Link>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
