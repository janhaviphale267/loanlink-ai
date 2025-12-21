import ChatBubble from "./ChatBubble";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MainChat() {
  const [message, setMessage] = useState("");

  return (
    <section className="flex flex-col h-full bg-gray-50">
      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <ChatBubble
          sender="ai"
          message="Hello Rajesh 👋 I’m your AI Loan Officer. I can help you check eligibility, EMI, and guide you step-by-step."
          confidence={95}
        />

        <ChatBubble
          sender="user"
          message="I need a home loan of ₹45 lakhs. Can you help me check eligibility?"
        />

        <ChatBubble
          sender="ai"
          message="Sure. To assess eligibility, I’ll need your monthly income and existing EMIs."
          confidence={93}
        />
      </div>

      {/* INPUT BAR */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
            disabled={!message.trim()}
          >
            <Send size={16} />
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mt-2">
          Conversations are encrypted and compliant with banking standards.
        </p>
      </div>
    </section>
  );
}
