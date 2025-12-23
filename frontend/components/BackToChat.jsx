export default function BackToChat({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="text-sm text-blue-600 underline mb-4"
    >
      ← Back to Chat
    </button>
  );
}
