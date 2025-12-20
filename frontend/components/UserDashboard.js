import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApplications as fetchAppsFromMock } from "../api/mockApi"; // keep mock, UI unchanged

export default function UserDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchAppsFromMock()
      .then((list) => setApps(list || []))
      .catch((err) => console.error("Failed to fetch applications", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "var(--primary)" }}>
            Your Applications
          </h2>
          <div className="small">
            Resume conversations or view statuses
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn primary"
            onClick={() => {}}
          >
            Start new application
          </button>
        </div>
      </div>

      {loading && (
        <div className="panel center small">
          Loading applications...
        </div>
      )}

      <section className="applications" aria-label="Applications list">
        {apps.map((a) => (
          <article
            key={a.id}
            className="app-card"
            role="article"
            aria-labelledby={`app-${a.id}`}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <div
                  id={`app-${a.id}`}
                  style={{ fontWeight: 800 }}
                >
                  {a.id} • ₹{a.amount.toLocaleString()}
                </div>
                <div className="small">
                  Last activity:{" "}
                  {new Date(a.lastActivity).toLocaleDateString()}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="status">{a.status}</div>
                <div className="small">Risk: {a.risk}</div>
              </div>
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="small">
                EMI: ₹{a.emi.toLocaleString()} • IR: {a.interestRate}%
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => navigate("/chat")}
                >
                  Resume
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/upload")}
                >
                  Upload docs
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
