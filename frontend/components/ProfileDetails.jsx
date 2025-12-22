export default function ProfileDetails() {
  return (
    <div className="p-8 max-w-5xl space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Customer Profile</h1>
        <p className="text-sm text-gray-500">Rajesh Kumar</p>
      </div>

      {/* 1. PERSONAL INFORMATION */}
      <Section title="Personal Information">
        <Item label="Full Name" value="Rajesh Kumar" />
        <Item label="Date of Birth" value="12 Aug 1995" />
        <Item label="Gender" value="Male" />
        <Item label="Marital Status" value="Single" />
        <Item label="Nationality" value="Indian" />
        <Item label="Unique ID (PAN/Aadhaar)" value="ABCDE1234F" />
        <Item label="Profile Picture" value="Live Selfie Verified" />
      </Section>

      {/* 2. CONTACT DETAILS */}
      <Section title="Contact Details">
        <Item label="Primary Mobile Number" value="+91 98765 43210" />
        <Item label="Emergency Contact" value="+91 91234 56789" />
        <Item label="Personal Email" value="rajesh.kumar@email.com" />
        <Item label="Current Address" value="123, MG Road, Bangalore" />
        <Item label="Permanent Address" value="Same as current" />
        <Item label="Address Type" value="Rented" />
      </Section>

      {/* 3. PROFESSIONAL & FINANCIAL */}
      <Section title="Professional & Financial Profile">
        <Item label="Employment Status" value="Salaried" />
        <Item label="Employer Name" value="Infosys Ltd." />
        <Item label="Monthly Income" value="₹75,000" />
        <Item label="Work Experience" value="4 Years" />
        <Item label="Industry" value="IT Services" />
        <Item label="Bank Account" value="HDFC • IFSC HDFC0001234" />
      </Section>

      {/* 4. APPLICATION STATUS */}
      <Section title="Application Status & History">
        <Item label="Current Stage" value="KYC Verification" />
        <Item label="Assigned Agent" value="Master Agent – LoanLink AI" />
        <Item label="Credit Score" value="750" />
        <Item label="Active Loans" value="1" />
        <Item label="Outstanding Debt" value="₹2,40,000" />
        <Item label="Repayment History" value="On-time" />
      </Section>

      {/* 5. DOCUMENT VAULT */}
      <Section title="Document Vault">
        <Item label="Identity Proof" value="Verified" />
        <Item label="Address Proof" value="Pending" />
        <Item label="Income Proof" value="Uploaded" />
        <Item label="Signed Agreements" value="Sanction Letter Signed" />
      </Section>

      {/* 6. SECURITY */}
      <Section title="Security & Preferences">
        <Item label="Authentication" value="Password + Biometric Enabled" />
        <Item label="Communication Preference" value="WhatsApp, Email" />
        <Item label="Last Login" value="22 Dec 2025, 10:58 AM" />
        <Item label="Session Activity" value="Active Session" />
      </Section>
    </div>
  );
}

/* REUSABLE COMPONENTS */
function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
