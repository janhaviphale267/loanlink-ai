// frontend/components/ChatBubble.jsx
export default function ChatBubble({ sender, message, confidence }) {
  const isAI = sender === "ai";

  return (
    <div
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-xl text-sm leading-relaxed
          ${isAI
            ? "bg-white border text-gray-800"
            : "bg-blue-600 text-white"}
        `}
      >
        <p>{message}</p>

        {/* Confidence Badge (AI only) */}
        {isAI && confidence !== undefined && (
          <div className="mt-2 flex justify-end">
            <span className="text-[10px] px-2 py-[2px] rounded-full bg-green-100 text-green-700 font-medium">
              Confidence {confidence}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
