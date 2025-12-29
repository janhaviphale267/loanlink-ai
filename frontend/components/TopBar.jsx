// frontend/components/TopBar.jsx
import { Bell, Settings, Menu } from "lucide-react";

export default function TopBar({ onToggleIntel }) {
  return (
    <header className="h-14 bg-white px-6 flex items-center justify-end border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* NOTIFICATION */}
        <button className="relative p-2 hover:bg-gray-100 rounded-md">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* SETTINGS */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Settings size={20} />
        </button>

        {/* THREE LINE MENU */}
        <button
          onClick={onToggleIntel}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
