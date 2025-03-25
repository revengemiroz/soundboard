import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 py-12 rounded-md">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome to InstantSoundboard – Your Ultimate Sound Experience!
        </p>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            We aim to provide quick and easy access to thousands of high-quality
            sound buttons while offering a seamless and enjoyable experience.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Why Choose Us?</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Massive Library – Over 100,000+ free sound buttons.</li>
            <li>Create custom soundboards with your favorite sounds.</li>
            <li>Fast, intuitive interface for searching and playing sounds.</li>
            <li>
              Designed for content creators, gamers, and sound enthusiasts.
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Get Involved</h2>
          <p className="text-gray-700">
            InstantSoundboard is a community-driven platform where users can
            upload, share, and interact with their favorite sounds.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Stay Connected</h2>
          <p className="text-gray-700">
            📧 Contact us:{" "}
            <a
              href="mailto:contact.instantsoundboard@gmail.com"
              className="text-blue-500"
            >
              contact.instantsoundboard@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            🌐 Visit:{" "}
            <Link href="/" className="text-blue-500">
              InstantSoundboard.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
