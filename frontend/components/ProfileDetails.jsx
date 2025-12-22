// frontend/components/ProfileDetails.jsx

export default function ProfileDetails() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl border p-8">
      <h1 className="text-2xl font-semibold mb-6">Customer Profile</h1>

      {/* PERSONAL INFORMATION */}
      <section className="mb-10">
        <div className="grid grid-cols-3 gap-10 items-start">
          {/* COLUMN 1 */}
          <div className="space-y-4">
            <h2 className="text-blue-600 font-semibold mb-2">
              Personal Information
            </h2>

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">Rajesh Kumar</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">Male</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium">Indian</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Aadhaar Card Number</p>
              <p className="font-medium">XXXX XXXX 4321</p>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">12 Aug 1996</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Marital Status</p>
              <p className="font-medium">Single</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">PAN Card Number</p>
              <p className="font-medium">ABCDEXXXX</p>
            </div>
          </div>

          {/* COLUMN 3 – PASSPORT PHOTO */}
          <div className="flex flex-col items-start -mt-10">
            <p className="text-sm text-gray-500 mb-3">
              Passport Size Photograph
            </p>
            <img
              src="/profile.jpeg"
              alt="Rajesh Kumar"
              className="w-40 h-52 object-cover rounded-lg border shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="mb-10">
        <h2 className="text-blue-600 font-semibold mb-4">
          Contact Details
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500">Primary Mobile Number</p>
            <p className="font-medium">XXXXXX3210</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Emergency Contact</p>
            <p className="font-medium">XXXXXX6789</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">rajesh.kumar@dummy.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Current Address</p>
            <p className="font-medium">
              Bangalore, Karnataka, India
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Permanent Address</p>
            <p className="font-medium">Same as current address</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address Type</p>
            <p className="font-medium">Rented</p>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL & FINANCIAL */}
      <section className="mb-10">
        <h2 className="text-blue-600 font-semibold mb-4">
          Professional & Financial Profile
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500">Employment Status</p>
            <p className="font-medium">Salaried</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Employer Name</p>
            <p className="font-medium">Dummy Technologies Pvt Ltd</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Monthly In-Hand Income</p>
            <p className="font-medium">₹75,000</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Work Experience</p>
            <p className="font-medium">4 Years</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Industry Sector</p>
            <p className="font-medium">IT Services</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Primary Bank Account</p>
            <p className="font-medium">XXXXXX7890 | IFSC: DUMM01234</p>
          </div>
        </div>
      </section>

      {/* APPLICATION STATUS */}
      <section className="mb-10">
        <h2 className="text-blue-600 font-semibold mb-4">
          Application Status & History
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500">
              Current Loan Application Stage
            </p>
            <p className="font-medium">KYC Verification</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Assigned Master Agent
            </p>
            <p className="font-medium">Amit Sharma</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Credit Score</p>
            <p className="font-medium">750</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Active Loans</p>
            <p className="font-medium">1</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Outstanding Debt
            </p>
            <p className="font-medium">₹2,40,000</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Repayment History
            </p>
            <p className="font-medium text-green-600">
              On-time
            </p>
          </div>
        </div>
      </section>

      {/* DOCUMENT VAULT */}
      <section className="mb-10">
        <h2 className="text-blue-600 font-semibold mb-4">
          Document Vault
        </h2>

        <ul className="space-y-2 text-sm">
          <li>Identity Proof: <span className="text-green-600">Verified</span></li>
          <li>Address Proof: <span className="text-green-600">Verified</span></li>
          <li>Income Proof: <span className="text-yellow-600">Pending</span></li>
          <li>Sanction Letter: <span className="text-gray-500">Not Generated</span></li>
        </ul>
      </section>

      {/* SECURITY */}
      <section>
        <h2 className="text-blue-600 font-semibold mb-4">
          Security & Preferences
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-500">
              Authentication Method
            </p>
            <p className="font-medium">Password Enabled</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Communication Preference
            </p>
            <p className="font-medium">WhatsApp & Email</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Login</p>
            <p className="font-medium">22 Dec 2025, 10:45 AM</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Session Activity</p>
            <p className="font-medium">Active</p>
          </div>
        </div>
      </section>
    </div>
  );
}
