import { Menu } from "lucide-react";

export default function TopBar({ onToggleIntel, onProfile }) {
  return (
    <header className="h-14 bg-white px-6 flex items-center justify-end gap-4 border-b border-gray-200">
      {/* PROFILE */}
      <button
        onClick={onProfile}
        className="flex items-center gap-2"
      >
        <img src="/profile.jpeg" className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium text-gray-900">
          Rajesh Kumar
        </span>
      </button>

      {/* THREE LINE MENU */}
      <button
        onClick={onToggleIntel}
        className="p-2 hover:bg-gray-100 rounded-md"
      >
        <Menu size={18} />
      </button>
    </header>
  );
}
