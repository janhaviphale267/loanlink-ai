import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="h-14 bg-white flex items-center justify-between px-6 border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">
          LL
        </div>
        <div>
          <p className="text-sm font-semibold">LoanLink AI</p>
          <p className="text-xs text-gray-500">AI Loan Orchestration</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600">
        <ShieldCheck size={14} className="text-green-600" />
        Bank-Grade Security
      </div>
    </header>
  );
}
