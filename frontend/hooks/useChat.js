import { useState } from "react";
import { sendChatMessage } from "../api/loanApi";

export default function useChat(applicationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessage(text) {
    if (!text?.trim()) return;

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

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
