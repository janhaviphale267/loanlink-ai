import { ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <ShieldCheck size={14} className="text-green-600" />
        Bank-Grade Security
      </div>
    </header>
  );
}
