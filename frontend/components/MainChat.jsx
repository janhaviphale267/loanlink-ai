import { Send, Loader2, Mic } from "lucide-react";
import { useState, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useLoanContext } from "../hooks/LoanContext";

export default function MainChat() {
  const { messages, chatLoading, chatError, sendMessage } = useLoanContext();

  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  function handleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  }

  return (
    <section className="flex flex-col h-full bg-gray-50">
      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <ChatBubble
            sender="ai"
            message="Hello 👋 I’m your AI Loan Officer. How can I help you today?"
            confidence={95}
          />
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} {...msg} />
        ))}

        {chatLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="animate-spin" size={14} />
            AI is typing…
          </div>
        )}
      </div>

      {chatError && (
        <div className="text-xs text-red-600 px-6 pb-2">{chatError}</div>
      )}

      {/* INPUT */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type or speak your message…"
            className="flex-1 px-4 py-2 text-sm border rounded-md"
          />

          {/* VOICE BUTTON */}
          <button
            onClick={handleVoice}
            className={`p-2 rounded-md border ${
              listening
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Mic size={16} />
          </button>

          {/* SEND */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || chatLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
