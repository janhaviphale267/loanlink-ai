export default function ProfileDrawer({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-[520px] bg-white h-full overflow-auto p-6 space-y-6">
        <button onClick={onClose} className="text-sm text-blue-600">
          ← Back
        </button>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <img src="/profile.jpeg" className="w-32 h-40 rounded border mb-4" />
          <Field label="Full Name" value="Rajesh Kumar" />
          <Field label="Date of Birth" value="12 Aug 1996" />
          <Field label="Gender" value="Male" />
          <Field label="Marital Status" value="Single" />
          <Field label="Nationality" value="Indian" />
          <Field label="PAN / Aadhaar" value="ABCDE1234F / XXXX4321" />
        </Section>

        <Section title="Contact Details">
          <Field label="Primary Mobile" value="+91 xxxxx 43210" />
          <Field label="Emergency Contact" value="+91 xxxxx 56789" />
          <Field label="Email" value="rajesh.kumar@dummy.com" />
          <Field label="Current Address" value="Pune, Maharashtra" />
          <Field label="Address Type" value="Owned" />
        </Section>

        <Section title="Professional & Financial">
          <Field label="Employment Status" value="Salaried" />
          <Field label="Employer" value="TCS Ltd." />
          <Field label="Monthly Income" value="₹85,000" />
          <Field label="Experience" value="4.5 Years" />
          <Field label="Bank Account" value="HDFC • XXXX7890" />
        </Section>

        <Section title="Application Status">
          <Field label="Current Stage" value="Underwriting" />
          <Field label="Assigned Agent" value="Master Agent A1" />
          <Field label="Credit Score" value="788" />
          <Field label="Active Loans" value="1" />
          <Field label="Outstanding Debt" value="₹3,20,000" />
          <Field label="Repayment History" value="On-time" />
        </Section>

        <Section title="Document Vault">
          <Field label="Identity Proof" value="Verified" />
          <Field label="Address Proof" value="Verified" />
          <Field label="Income Proof" value="Pending" />
          <Field label="Signed Agreements" value="Available" />
        </Section>

        <Section title="Security & Preferences">
          <Field label="Login Type" value="Password + OTP" />
          <Field label="Preferred Communication" value="WhatsApp" />
          <Field label="Last Login" value="Today, 10:42 AM" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
