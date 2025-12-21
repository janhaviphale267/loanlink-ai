import { useEffect, useState } from "react";
import { sendChatMessage } from "../api/loanApi";

function storageKey(appId) {
  return appId ? `loanlink_chat_${appId}` : null;
}

export default function useChat(applicationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Restore chat when applicationId becomes available/changes
  useEffect(() => {
    if (!applicationId) return;
    const key = storageKey(applicationId);
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        setMessages(JSON.parse(cached));
      } catch {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [applicationId]);

  // Persist chat on change
  useEffect(() => {
    if (!applicationId) return;
    const key = storageKey(applicationId);
    localStorage.setItem(key, JSON.stringify(messages));
  }, [messages, applicationId]);

  async function sendMessage(text) {
    if (!text?.trim() || !applicationId) return;

    const userMsg = {
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage({
        application_id: applicationId,
        message: text,
      });

      const aiMsg = {
        sender: "ai",
        message: response.reply,
        confidence: response.confidence,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  // Optional: clear chat for this application
  function resetChat() {
    if (!applicationId) return;
    localStorage.removeItem(storageKey(applicationId));
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
