import { useState, useEffect } from "react";
import { Bell, Menu, X, ShieldCheck } from "lucide-react";
import LoanSummaryPanel from "./LoanSummaryPanel";
import DocumentUploadPanel from "./DocumentUploadPanel";
import { useLoanContext } from "../hooks/LoanContext";

export default function Header({
  userName = "Rajesh Kumar",
  role = "Customer",
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("summary");

  // 🔗 CONTEXT (single source of truth)
  const {
    applicationId,
    summary,
    startApplication,
  } = useLoanContext();

  // ⚠️ TEMP auto-start (explicitly marked, to be removed later)
  useEffect(() => {
    if (!applicationId) {
      startApplication();
    }
  }, [applicationId, startApplication]);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
            LL
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">LoanLink AI</p>
            <p className="text-xs text-green-600 font-medium">
              AI Loan Orchestration
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
          <ShieldCheck size={14} className="text-green-600" />
          Bank-Grade Security
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ================= SLIDE-IN PANEL ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-96 bg-white border-l shadow-lg z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* PANEL HEADER */}
        <div className="h-16 flex items-center justify-between px-5 border-b">
          <div className="flex gap-3 text-sm font-medium">
            <button
              onClick={() => setTab("summary")}
              className={`pb-1 ${
                tab === "summary"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Summary
            </button>

            <button
              onClick={() => setTab("documents")}
              className={`pb-1 ${
                tab === "documents"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Documents
            </button>
          </div>

          <button onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* PANEL BODY */}
        <div className="p-5 overflow-y-auto h-[calc(100%-4rem)]">
          {tab === "summary" && summary && (
            <LoanSummaryPanel {...summary} />
          )}

          {tab === "documents" && <DocumentUploadPanel />}
        </div>
      </aside>
    </>
  );
}
