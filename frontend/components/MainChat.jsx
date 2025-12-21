import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { useLoanContext } from "../hooks/LoanContext";

export default function MainChat() {
  const {
    messages,
    chatLoading,
    chatError,
    sendMessage,
  } = useLoanContext();

  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <section className="flex flex-col h-full bg-gray-50 relative">
      {/* CHAT STREAM */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <ChatBubble
            sender="ai"
            message="Hello 👋 I’m your AI Loan Officer. How can I help you today?"
            confidence={95}
          />
        )}

        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            sender={msg.sender}
            message={msg.message}
            confidence={msg.confidence}
          />
        ))}

        {chatLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="animate-spin" size={14} />
            AI is typing…
          </div>
        )}
      </div>

      {/* ERROR TOAST */}
      {chatError && (
        <div className="absolute bottom-24 right-6 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-md shadow">
          {chatError}
        </div>
      )}

      {/* INPUT BAR */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message…"
            className="flex-1 text-sm px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || chatLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-md"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
