const STEPS = [
  {
    key: "requirements",
    title: "Requirement Gathering",
    subtitle: "Collecting loan details",
  },
  {
    key: "kyc",
    title: "KYC Verification",
    subtitle: "Verifying identity",
  },
  {
    key: "underwriting",
    title: "Credit Underwriting",
    subtitle: "Assessing eligibility",
  },
  {
    key: "documents",
    title: "Document Review",
    subtitle: "Reviewing documents",
  },
  {
    key: "sanction",
    title: "Loan Sanction",
    subtitle: "Final approval",
  },
];

export default function ApplicationStatus({ currentStep = "requirements" }) {
  const completedIndex = STEPS.findIndex(
    (step) => step.key === currentStep
  );

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Application Status
      </h3>

      <div className="space-y-5">
        {STEPS.map((step, index) => {
          const completed = index <= completedIndex;
          const active = index === completedIndex + 1;

          return (
            <div key={step.key} className="flex items-start gap-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${
                  completed
                    ? "bg-green-600 text-white"
                    : active
                    ? "bg-blue-600 text-white"
                    : "border-2 border-gray-300"
                }`}
              >
                {completed ? "✓" : ""}
              </div>

              <div>
                <p
                  className={`font-medium ${
                    active
                      ? "text-blue-600"
                      : completed
                      ? "text-green-700"
                      : "text-gray-800"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-gray-500">
                  {step.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
