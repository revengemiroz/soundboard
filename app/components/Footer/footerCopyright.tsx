import Link from "next/link";
import React from "react";

export default function FooterCopyright() {
  return (
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} InstantSoundboard. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Made with ♥ for the sound community
          </Link>
        </div>
      </div>
    </div>
  );
}
