import { Send, Loader2, Mic } from "lucide-react";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { useLoanContext } from "../hooks/LoanContext";

export default function MainChat() {
  const { messages, chatLoading, chatError, sendMessage } = useLoanContext();
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <section className="h-full flex flex-col bg-white">
      {/* CHAT STREAM */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
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

      {/* ERROR */}
      {chatError && (
        <div className="px-6 py-2 text-xs text-red-600">{chatError}</div>
      )}

      {/* INPUT BAR */}
      <div className="border-t px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type or speak your message…"
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="border p-2 rounded-md hover:bg-gray-100"
            title="Voice input"
          >
            <Mic size={16} />
          </button>

          <button
            onClick={handleSend}
            disabled={!input.trim() || chatLoading}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
