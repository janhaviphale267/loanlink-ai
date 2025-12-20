import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header" role="banner">
      <div className="brand" aria-hidden="true">
        <div className="logo" aria-hidden="true">LL</div>
        <div>
          <div style={{ fontWeight: 700, color: "var(--primary)" }}>
            LoanLink AI
          </div>
          <div className="small">Conversational Loan Processing</div>
        </div>
      </div>

      <nav
        style={{ marginLeft: 20, display: "flex", gap: 12 }}
        aria-label="Main navigation"
      >
        <Link to="/" className="small">Dashboard</Link>
        <Link to="/chat" className="small">Chat</Link>
        <Link to="/upload" className="small">Uploads</Link>
        <Link to="/admin" className="small">Admin</Link>
      </nav>

      <div className="trust" aria-live="polite">
        <span className="small">🔒 Your data is encrypted</span>

        {user ? (
          <div
            style={{
              marginLeft: 12,
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span className="small">Hi, {user.name || "User"}</span>
            <button
              type="button"
              className="btn ghost small"
              onClick={logout}
              aria-label="Sign out"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: 12 }}>
            <Link to="/login" className="btn ghost small">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
