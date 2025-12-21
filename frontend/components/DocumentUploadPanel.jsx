import { useState } from "react";
import { Upload, CheckCircle, Clock } from "lucide-react";

const STEPS = [
  { id: 1, label: "Identity Proof", hint: "PAN / Aadhaar" },
  { id: 2, label: "Income Proof", hint: "Salary slips / ITR" },
  { id: 3, label: "Bank Statements", hint: "Last 6 months" },
];

export default function DocumentUploadPanel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState([]);

  const markComplete = (stepId) => {
    if (!completed.includes(stepId)) {
      setCompleted([...completed, stepId]);
      setCurrentStep(Math.min(stepId + 1, STEPS.length));
    }
  };

  return (
    <div className="bg-white border rounded-lg p-5 space-y-6">
      <h3 className="text-sm font-semibold text-gray-900">
        Document Upload
      </h3>

      {/* STEPS */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const isDone = completed.includes(step.id);
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-3 rounded-md border
                ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}
              `}
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {step.label}
                </p>
                <p className="text-xs text-gray-500">{step.hint}</p>
              </div>

              {isDone ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <button
                  onClick={() => markComplete(step.id)}
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
                >
                  <Upload size={14} />
                  Upload
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* STATUS */}
      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
        <Clock size={12} />
        {completed.length}/{STEPS.length} documents uploaded
      </div>
    </div>
  );
}

