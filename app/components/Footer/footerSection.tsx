import React from "react";
import FooterLinks from "./footerLinks";
import FooterSocial from "./footerSocial";
import FooterCopyright from "./footerCopyright";

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About InstantSoundboard</h3>
            <p className="text-sm text-gray-400">
              Discover and share the best sound effects, memes, and audio clips.
              Create your own soundboard and join our growing community of sound
              enthusiasts.
            </p>
            <FooterSocial />
          </div>
          <FooterLinks />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
