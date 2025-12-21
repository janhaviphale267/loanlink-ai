import React from "react";

export default function ChatBubble({ from = "ai", children, meta = {} }) {
  return (
    <div
      className={`bubble ${from === "ai" ? "ai" : "user"}`}
      role="article"
      aria-label={`${from === "ai" ? "AI" : "User"} message`}
    >
      <div style={{ fontWeight: 600, marginBottom: 6 }}>
        {from === "ai" ? "LoanLink AI" : "You"}
        {typeof meta.confidence === "number" && from === "ai" && (
          <span
            style={{
              marginLeft: 8,
              fontSize: 12,
              color: "#475569",
            }}
          >
            {" "}
            • confidence {(meta.confidence * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <div>{children}</div>

      {meta.timestamp && (
        <div className="small" style={{ marginTop: 8, opacity: 0.8 }}>
          {new Date(meta.timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
}
