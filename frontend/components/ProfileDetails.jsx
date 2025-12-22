export default function ProfileDetails() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl border p-8 space-y-10">
      {/* PERSONAL INFORMATION */}
      <Section title="Personal Information">
        <Grid>
          <Item label="Full Name" value="Rajesh Kumar" />
          <Item label="Date of Birth" value="12 Aug 1996" />
          <Item label="Gender" value="Male" />
          <Item label="Marital Status" value="Single" />
          <Item label="Nationality" value="Indian" />
          <Item label="PAN Card Number" value="ABCDEXXXX" />
          <Item label="Aadhaar Card Number" value="XXXX XXXX 4321" />
        </Grid>
      </Section>

      {/* CONTACT DETAILS */}
      <Section title="Contact Details">
        <Grid>
          <Item label="Primary Mobile Number" value="XXXXXX3210" />
          <Item label="Emergency Contact" value="XXXXXX6789" />
          <Item label="Email Address" value="rajesh.kumar@dummy.com" />
          <Item label="Current Address" value="Bangalore, Karnataka, India" />
          <Item label="Permanent Address" value="Same as current address" />
          <Item label="Address Type" value="Rented" />
        </Grid>
      </Section>

      {/* PROFESSIONAL & FINANCIAL */}
      <Section title="Professional & Financial Profile">
        <Grid>
          <Item label="Employment Status" value="Salaried" />
          <Item label="Employer Name" value="ABC Tech Pvt Ltd" />
          <Item label="Monthly In-Hand Income" value="₹75,000" />
          <Item label="Total Work Experience" value="3 Years" />
          <Item label="Industry Sector" value="Information Technology" />
          <Item label="Primary Bank Account" value="HDFC •••• 2345" />
        </Grid>
      </Section>

      {/* APPLICATION STATUS */}
      <Section title="Application Status & History">
        <Grid>
          <Item label="Current Loan Stage" value="KYC Verification" />
          <Item label="Assigned Agent" value="Neha Sharma (Master Agent)" />
          <Item label="Credit Score" value="750" highlight />
          <Item label="Active Loans Count" value="1" />
          <Item label="Total Outstanding Debt" value="₹1,20,000" />
          <Item label="Repayment History" value="On-Time" />
        </Grid>
      </Section>

      {/* SECURITY */}
      <Section title="Security & Preferences">
        <Grid>
          <Item label="Authentication Method" value="Password + OTP" />
          <Item label="Communication Preference" value="WhatsApp, Email" />
          <Item label="Last Login" value="22 Dec 2025 • 10:40 AM" />
          <Item label="Session Activity" value="No suspicious activity" />
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
