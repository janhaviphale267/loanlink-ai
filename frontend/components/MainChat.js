import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBubble from "./ChatBubble";
import LoanSummaryPanel from "./LoanSummaryPanel";
import useChat from "../hooks/useChat";
import useVoice from "../hooks/useVoice";
import { fetchApplications } from "../api/mockApi"; // keep mock, UI unchanged

export default function MainChat() {
  const {
    messages,
    sendMessage,
    sessionId,
    refreshConversation,
    sending,
  } = useChat({ autoStart: true });

  const [input, setInput] = useState("");
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const messagesRef = useRef(null);
  const voice = useVoice();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications().then(setApplications).catch(console.error);
  }, []);

  useEffect(() => {
    if (applications.length && !selectedApp) {
      setSelectedApp(applications[0]);
    }
  }, [applications, selectedApp]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await sendMessage(input);
      setInput("");
      if (sessionId) await refreshConversation(sessionId);
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  const handleVoiceToggle = () => {
    if (voice.recording) {
      voice.stop();
    } else {
      voice.start().catch(console.error);
    }
  };

  const onResume = () => {
    navigate("/");
  };

  return (
    <div className="container grid-2">
      <div
        className="panel chat-window"
        role="region"
        aria-label="Loan conversation"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: "var(--primary)" }}>
              LoanLink AI — Chat
            </div>
            <div className="small">Conversational loan assistant</div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select aria-label="Language toggle" defaultValue="en">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
            <button className="btn ghost">Transcript</button>
          </div>
        </div>

        <div
          ref={messagesRef}
          className="chat-messages"
          aria-live="polite"
        >
          {messages?.length ? (
            messages.map((m) => (
              <ChatBubble
                key={m.id || m.ts}
                from={m.from}
                meta={{
                  confidence: m.meta?.confidence,
                  timestamp: m.ts || m.timestamp,
                }}
              >
                {m.text}
              </ChatBubble>
            ))
          ) : (
            <div className="small center">
              No messages yet — start the conversation.
            </div>
          )}

          {voice.recording && (
            <div className="small center">Recording…</div>
          )}
        </div>

        <div className="chat-input" aria-label="Message input">
          <input
            aria-label="Type your message"
            placeholder="Ask about loan eligibility, upload docs, or resume application..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #eef2ff",
            }}
          />

          <button
            type="button"
            className="btn"
            onClick={handleVoiceToggle}
            aria-pressed={voice.recording}
          >
            {voice.recording ? "Stop" : "🎤"}
          </button>

          <button
            type="button"
            className="btn primary"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>

      <LoanSummaryPanel
        application={selectedApp}
        onResume={onResume}
        onView={() => {}}
      />
    </div>
  );
}
