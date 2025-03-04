import React from "react";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function FooterSocial() {
  const socials = [
    { icon: Twitter, label: "Twitter" },
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
      <div className="flex space-x-4">
        {socials.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={label}
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
    </div>
  );
}
