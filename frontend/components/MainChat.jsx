// frontend/components/MainChat.jsx
import { Mic, Send } from "lucide-react";
import { useState } from "react";
import ChatBubble from "./ChatBubble";

export default function MainChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", message: "Hello 👋 I’m your AI Loan Officer." },
  ]);

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { sender: "user", message: input }]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      {/* CHAT AREA */}
      <div className="flex-1 overflow-auto space-y-4 pb-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} {...m} />
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="pt-3 flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 h-12 text-sm"
        />

        {/* MIC */}
        <button className="h-12 w-12 flex items-center justify-center rounded-full border text-gray-600 hover:text-blue-600">
          <Mic size={21} />
        </button>

        {/* SEND */}
        <button
          onClick={send}
          className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 text-white"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
