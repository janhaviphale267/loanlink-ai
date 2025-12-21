import {
  LayoutDashboard,
  FileText,
  Settings,
  UserCircle,
} from "lucide-react";

export default function UserDashboard({
  activeView,
  onChangeView,
}) {
  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between">
      {/* TOP */}
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            LL
          </div>
          <span className="text-lg font-semibold">LoanLink</span>
        </div>

        <nav className="space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Applications"
            active={activeView === "applications"}
            onClick={() => onChangeView("applications")}
          />

          <NavItem
            icon={<FileText size={18} />}
            label="Documents"
            active={activeView === "documents"}
            onClick={() => onChangeView("documents")}
          />
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-4 border-t space-y-2">
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
        />

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
          <UserCircle size={32} className="text-gray-500" />
          <div>
            <p className="text-sm font-medium">Rajesh Kumar</p>
            <p className="text-xs text-gray-500">Customer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
      ${
        active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
