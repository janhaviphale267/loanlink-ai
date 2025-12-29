export default function BackToChat({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center gap-1"
    >
      ← Back to Chat
    </button>
  );
}