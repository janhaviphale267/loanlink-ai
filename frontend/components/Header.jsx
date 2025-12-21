import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 border-b bg-white">
      {/* BRAND */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
          LL
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">LoanLink AI</p>
          <p className="text-xs text-green-600">AI Loan Orchestration</p>
        </div>
      </div>

      {/* SECURITY */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <ShieldCheck size={14} className="text-green-600" />
        Bank-Grade Security
      </div>
    </header>
  );
}
