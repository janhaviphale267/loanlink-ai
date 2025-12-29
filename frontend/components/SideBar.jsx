import {
  MessageSquare,
  ClipboardList,
  FileText,
  BarChart2,
  Upload,
  CreditCard,
  Users,
  LogOut,
  Brain,
  Calculator
} from "lucide-react";

export default function Sidebar({ activeView, setActiveView, onLogout }) {
  return (
    <aside className="w-64 bg-[#0F2A44] text-white flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">
            LL
          </div>
          <div>
            <p className="font-semibold leading-none">LoanLink AI</p>
            <p className="text-xs text-gray-300">AI Loan Orchestration</p>
          </div>
        </div>

        {/* MAIN NAV */}
        <nav className="px-3 py-4 space-y-1 text-sm">
          <NavItem icon={<MessageSquare size={18} />} label="Chat" active={activeView === "chat"} onClick={() => setActiveView("chat")} />
          <NavItem icon={<ClipboardList size={18} />} label="Applications" active={activeView === "applications"} onClick={() => setActiveView("applications")} />
          <NavItem icon={<FileText size={18} />} label="Documents" active={activeView === "documents"} onClick={() => setActiveView("documents")} />
          <NavItem icon={<BarChart2 size={18} />} label="Analytics" active={activeView === "analytics"} />
          <NavItem icon={<Brain size={18} />} label="Intelligence Panel" active={activeView === "intelligence"} />
        </nav>
      </div>

      {/* QUICK ACTIONS + PROFILE */}
      <div className="px-3 pb-3">
        <p className="text-xs text-gray-400 mb-2 px-2">QUICK ACTIONS</p>

        <QuickItem icon={<Upload size={18} />} label="Upload Documents" />
        <QuickItem icon={<CreditCard size={18} />} label="Make Payment" />
        <QuickItem icon={<Users size={18} />} label="Refer a Friend" />
        <QuickItem icon={<Calculator size={18} />} label="EMI Calculator" />

        <div
          className="border-t border-white/10 mt-2 pt-3 cursor-pointer"
          onClick={() => setActiveView("profile")}
        >
          <div className="flex items-center gap-3 px-2">
            <img src="/profile.jpeg" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-medium">Rajesh Kumar</p>
              <p className="text-xs text-gray-400">Customer</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 mt-3 pl-3 text-sm text-red-400"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md ${
        active ? "bg-white/10" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function QuickItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-2 py-2 text-sm hover:bg-white/10 rounded-md">
      {icon}
      <span>{label}</span>
    </button>
  );
}
