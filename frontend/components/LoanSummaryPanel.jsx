import ApplicationStatus from "./ApplicationStatus";

export default function LoanSummaryPanel({
  currentStep = "requirements",
}) {
  return (
    <div className="space-y-6">
      <ApplicationStatus currentStep={currentStep} />
    </div>
  );
}
