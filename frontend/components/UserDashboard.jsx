import React, { useEffect, useState } from "react";
import { fetchApplications } from "../api/mockApi";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications().then(setApps);
  }, []);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: "var(--primary)", margin: 0 }}>
          Your Applications
        </h2>
        <div className="small">Resume conversations or view statuses</div>
      </div>

      <section className="applications">
        {apps.map(app => (
          <div key={app.id} className="app-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{app.id}</strong>
                <div className="small">₹{app.amount.toLocaleString()}</div>
              </div>
              <div className="status">{app.status}</div>
            </div>

            <div className="actions" style={{ marginTop: 12 }}>
              <button className="btn ghost" onClick={() => navigate("/chat")}>
                Resume
              </button>
              <button className="btn primary" onClick={() => navigate("/upload")}>
                Upload Docs
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
