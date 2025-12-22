import { Send, Loader2, Mic } from "lucide-react";
import { useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useLoanContext } from "../hooks/LoanContext";

export default function MainChat() {
  const { messages, chatLoading, chatError, sendMessage } =
    useLoanContext();

  const [input, setInput] = useState("");
  const recognitionRef = useRef(null);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  function handleVoice() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }

  return (
    <section className="flex flex-col h-full">
      {/* CHAT STREAM */}
      <div className="flex-1 overflow-y-auto space-y-4">
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
        <div className="text-xs text-red-600 mt-2">{chatError}</div>
      )}

      {/* INPUT */}
      <div className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type or speak your message…"
          className="flex-1 border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleVoice}
          className="border p-2 rounded-md hover:bg-gray-100"
          title="Voice input"
        >
          <Mic size={16} />
        </button>

        <button
          onClick={handleSend}
          disabled={!input.trim() || chatLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          <Send size={16} />
        </button>
      </div>
    </section>
  );
}
