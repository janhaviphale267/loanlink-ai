import ApplicationStatus from "./ApplicationStatus";
import { useLoanContext } from "../hooks/LoanContext";

export default function LoanSummaryPanel() {
  const { currentStep } = useLoanContext();

  return (
    <div className="space-y-6">
      <ApplicationStatus currentStep={currentStep} />
    </div>
  );
}
