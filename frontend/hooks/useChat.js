import { useEffect, useState } from "react";
import {
  startChatSession,
  sendChatMessage,
  fetchConversation,
} from "../api/loanApi";

const STORAGE_KEY = "loanlink_chat_session_id";

export default function useChat() {
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Start or restore chat session
  useEffect(() => {
    if (sessionId) {
      fetchConversation(sessionId)
        .then((history) => {
          const mapped = history.map((m) => ({
            sender: m.from_ === "ai" ? "ai" : "user",
            message: m.text,
            confidence: m.meta?.confidence,
          }));
          setMessages(mapped);
        })
        .catch(() => {
          setMessages([]);
        });
      return;
    }

    async function initSession() {
      try {
        const res = await startChatSession();
        setSessionId(res.sessionId);
        localStorage.setItem(STORAGE_KEY, res.sessionId);
      } catch (err) {
        setError("Failed to start chat session");
      }
    }

    initSession();
  }, [sessionId]);

  async function sendMessage(text) {
    if (!text?.trim() || !sessionId) return;

    const userMsg = {
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const res = await sendChatMessage({
        sessionId,
        message: text,
      });

      const aiMsg = {
        sender: "ai",
        message: res.message.text,
        confidence: res.message.meta?.confidence,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setMessages([]);
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    resetChat,
  };
}
