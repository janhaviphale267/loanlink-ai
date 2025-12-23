// frontend/components/Sidebar.jsx
import {
  MessageSquare,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ activeView, setActiveView, onLogout }) {
  return (
    <aside className="w-64 bg-[#F4F5F7] flex flex-col justify-between border-r border-gray-200">
      {/* TOP LOGO */}
      <div>
        <div className="h-14 px-5 border-b border-gray-200 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">
            LL
          </div>
          <span className="font-semibold text-gray-900">
            LoanLink AI
          </span>
        </div>

        {/* NAV */}
        <nav className="px-3 py-4 space-y-1 text-sm">
          <Item
            label="Chat"
            active={activeView === "chat"}
            onClick={() => setActiveView("chat")}
          />
          <Item
            label="Applications"
            active={activeView === "applications"}
            onClick={() => setActiveView("applications")}
          />
          <Item
            label="Documents"
            active={activeView === "documents"}
            onClick={() => setActiveView("documents")}
          />
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-3">
        <button className="flex items-center gap-2 text-sm text-gray-700">
          <Settings size={16} /> Settings
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-red-600"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

function Item({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md transition
        ${
          active
            ? "bg-white shadow-sm font-medium"
            : "hover:bg-white"
        }`}
    >
      {label}
    </button>
  );
}
