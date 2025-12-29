export default function ProfileDetails({ onBack }) {
  return (
    <div className="p-6 max-w-5xl">
      {/* BACK */}
      <button
        onClick={onBack}
        className="text-blue-600 mb-6 hover:underline"
      >
        ← Back
      </button>

      {/* PERSONAL INFORMATION */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Full Name" value="Rajesh Kumar" />
          <Info label="Date of Birth" value="12 Aug 1996" />
          <Info label="Gender" value="Male" />
          <Info label="Marital Status" value="Single" />
          <Info label="Nationality" value="Indian" />
          <Info label="PAN / Aadhaar" value="ABCDE1234F / XXXX4321" />
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Mobile Number" value="+91 9876543210" />
          <Info label="Email Address" value="rajesh@gmail.com" />
          <Info label="Current Address" value="Bangalore, Karnataka, India" />
          <Info label="Permanent Address" value="Bangalore, Karnataka, India" />
        </div>
      </section>

      {/* PROFESSIONAL DETAILS */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Professional & Financial Details</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Employment Status" value="Salaried" />
          <Info label="Company Name" value="ABC Technologies Pvt Ltd" />
          <Info label="Monthly Income" value="₹85,000" />
          <Info label="Work Experience" value="5 Years" />
          <Info label="Industry" value="Information Technology" />
          <Info label="Primary Bank" value="HDFC Bank" />
        </div>
      </section>

      {/* APPLICATION & CREDIT */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Application & Credit Status</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Current Loan Status" value="Under Review" />
          <Info label="Assigned Agent" value="Amit Verma" />
          <Info label="Credit Score" value="786" />
          <Info label="Active Loans" value="1" />
          <Info label="Outstanding Amount" value="₹4,20,000" />
          <Info label="Repayment History" value="On-Time" />
        </div>
      </section>

      {/* SECURITY */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Security & Preferences</h2>

        <div className="grid grid-cols-2 gap-6">
          <Info label="Login Method" value="Password" />
          <Info label="Communication Preference" value="Email & WhatsApp" />
          <Info label="Last Login" value="28 Dec 2025, 10:42 AM" />
          <Info label="Session Status" value="Active" />
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
