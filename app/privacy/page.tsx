import { ScrollText } from "lucide-react";
import type { Metadata } from "next";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen p-6 py-12 rounded-md bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="text-center ">
          <ScrollText className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-gray-700">
            We collect personal data like name, email, and usage data, along
            with non-personal information such as IP address, browser type, and
            device details.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            We use your data to improve website functionality, respond to
            inquiries, analyze trends, and enhance security.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
          <p className="text-gray-700">
            We do not sell your data. However, we may share it with service
            providers, legal authorities, or in business transfers.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p className="text-gray-700">
            We implement security measures to protect your data, but no online
            platform is entirely secure.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">5. Your Rights and Choices</h2>
          <p className="text-gray-700">
            You can access, update, or delete your data and opt out of marketing
            communications.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">6. Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may link to external sites. We are not responsible for
            their privacy policies.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy. Continued use of our site implies
            acceptance of changes.
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
