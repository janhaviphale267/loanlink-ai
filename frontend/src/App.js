import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import MainChat from "./components/MainChat";
import UserDashboard from "./components/UserDashboard";
import DocumentUploadPanel from "./components/DocumentUploadPanel";
import AdminDashboard from "./components/AdminDashboard";

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
                  <div style={{ marginTop: 12 }}>
                    <Link to="/" className="btn ghost">
                      Go home
                    </Link>
                    <Link
                      to="/chat"
                      className="btn primary"
                      style={{ marginLeft: 8 }}
                    >
                      Open chat
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="app-footer">
        <div>LoanLink AI — Secure & Conversational Loan Processing</div>
        <nav style={{ marginTop: 8 }}>
          <Link to="/" className="small">
            Dashboard
          </Link>{" "}
          |{" "}
          <Link to="/chat" className="small">
            Chat
          </Link>{" "}
          |{" "}
          <Link to="/admin" className="small">
            Admin
          </Link>
        </nav>
      </footer>
    </div>
  );
}

