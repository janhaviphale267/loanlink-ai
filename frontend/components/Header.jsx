import { useState } from "react";
import { Bell, ShieldCheck, Menu, X } from "lucide-react";

export default function Header({ userName = "Rajesh Kumar", role = "Customer" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER BAR ================= */}
      <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
        {/* LEFT: LOGO + STATUS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
              LL
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-sm text-gray-900">
                LoanLink AI
              </p>
              <p className="text-xs text-green-600 font-medium">
                AI-Powered Loan Processing
              </p>
            </div>
          </div>
        </div>

        {/* CENTER: SECURITY BADGE */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck size={16} className="text-green-600" />
          Bank-Grade Security
        </div>

        {/* RIGHT: USER + NOTIFICATION + MENU */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">
              {userName}
            </span>
            <span className="text-xs text-gray-500">{role}</span>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ================= SLIDE-IN RIGHT PANEL ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b">
          <h3 className="font-semibold text-gray-900">Loan Overview</h3>
          <button onClick={() => setMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Loan Summary */}
          <section>
            <p className="text-xs text-gray-500 mb-1">Requested Amount</p>
            <p className="text-xl font-bold text-blue-600">₹45,00,000</p>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>Tenure: <span className="font-medium">20 years</span></p>
              <p>Interest Rate: <span className="font-medium">8.5% p.a.</span></p>
              <p>Estimated EMI: <span className="font-semibold text-gray-900">₹38,765</span></p>
            </div>
          </section>

          {/* Risk Assessment */}
          <section>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Risk Assessment
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Credit Score: <span className="font-medium">780</span></p>
              <p>Debt-to-Income: <span className="font-medium">32%</span></p>
              <p className="text-green-600 font-medium">Low Risk</p>
            </div>
          </section>

          {/* Application Progress */}
          <section>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Application Progress
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="text-green-600">✔ Initial Assessment</li>
              <li className="text-blue-600">● Document Collection</li>
              <li className="text-gray-400">○ Verification</li>
              <li className="text-gray-400">○ Final Approval</li>
            </ul>
          </section>

          {/* Documents */}
          <section>
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Documents
            </p>
            <ul className="text-sm space-y-1">
              <li className="text-green-600">PAN Card – Verified</li>
              <li className="text-blue-600">Salary Slips – Uploaded</li>
              <li className="text-gray-400">Bank Statements – Pending</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}


