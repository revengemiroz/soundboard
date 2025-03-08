import { Shield } from "lucide-react";
import React from "react";

function TermsPage() {
  return (
    <div className="min-h-screen p-6 py-12 bg-gray-100 rounded-md">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="text-center ">
          <Shield className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">Terms of Use</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By using InstantSoundboard.com, you agree to follow these terms and
            our Privacy Policy.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">2. Use of Website</h2>
          <p className="text-gray-700">
            You may use the site for personal, non-commercial purposes. Do not
            copy, modify, or use automated tools to access our content.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">3. User Content</h2>
          <p className="text-gray-700">
            Users must own the content they upload. Inappropriate or copyrighted
            content may be removed.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this site belongs to us or is used with permission.
            Unauthorized use is not allowed.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">5. Third-Party Links</h2>
          <p className="text-gray-700">
            We may include links to third-party sites. We are not responsible
            for their content or policies.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">6. Liability</h2>
          <p className="text-gray-700">
            We provide the site "as-is" and are not responsible for any errors,
            downtime, or damages.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these terms. Continued use means you accept any
            changes.
          </p>
        </section>

        <p className="text-gray-600 text-sm mt-6 text-center">
          For questions, contact us at{" "}
          <a
            href="mailto:contact@instantsoundboard.com"
            className="text-blue-500"
          >
            contact@instantsoundboard.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
