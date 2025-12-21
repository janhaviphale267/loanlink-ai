import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">LL</div>
        <div>
          <div style={{ fontWeight: 700, color: "var(--primary)" }}>
            LoanLink AI
          </div>
          <div className="small">Conversational Loan Processing</div>
        </div>
      </div>

      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}
