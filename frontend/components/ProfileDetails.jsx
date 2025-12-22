export default function ProfileDetails() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl border p-8 space-y-10">
      <Section title="Personal Information">
        <Grid>
          <Item label="Full Name" value="Rajesh Kumar" />
          <Item label="Date of Birth" value="12 Aug 1996" />
          <Item label="Gender" value="Male" />
          <Item label="Marital Status" value="Single" />
          <Item label="Nationality" value="Indian" />
          <Item label="PAN / Aadhaar" value="XXXX-XXXX-1234" />
        </Grid>
      </Section>

      <Section title="Contact Details">
        <Grid>
          <Item label="Primary Mobile" value="+91 98765 43210" />
          <Item label="Emergency Contact" value="+91 91234 56789" />
          <Item label="Email" value="dummy@email.com" />
          <Item label="Current Address" value="Bangalore, India" />
          <Item label="Address Type" value="Rented" />
        </Grid>
      </Section>

      <Section title="Professional & Financial">
        <Grid>
          <Item label="Employment Status" value="Salaried" />
          <Item label="Employer" value="ABC Tech Pvt Ltd" />
          <Item label="Monthly Income" value="₹75,000" />
          <Item label="Experience" value="3 Years" />
          <Item label="Industry" value="IT Services" />
          <Item label="Bank Account" value="HDFC •••• 2345" />
        </Grid>
      </Section>

      <Section title="Application Status & History">
        <Grid>
          <Item label="Current Stage" value="KYC Verification" />
          <Item label="Assigned Agent" value="Master Agent – Neha" />
          <Item label="Credit Score" value="750" highlight />
          <Item label="Active Loans" value="1" />
          <Item label="Outstanding Debt" value="₹1,20,000" />
          <Item label="Repayment History" value="On-Time" />
        </Grid>
      </Section>

      <Section title="Security & Preferences">
        <Grid>
          <Item label="Login Method" value="Password + OTP" />
          <Item label="Communication" value="WhatsApp, Email" />
          <Item label="Last Login" value="22 Dec 2025, 10:40 AM" />
        </Grid>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-blue-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-2 gap-6">{children}</div>;
}

function Item({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`font-medium ${highlight ? "text-green-600" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}
