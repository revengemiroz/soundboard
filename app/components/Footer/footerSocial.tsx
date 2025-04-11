import React from "react";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function FooterSocial() {
  const socials = [
    {
      icon: (
        <svg
          fill="#ffffff"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"></path>
          </g>
        </svg>
      ),
      label: "Tiktok",
      url: "https://www.tiktok.com/@instantsoundboard",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
      <div className="flex space-x-4">
        {socials.map(({ icon: Icon, label, url }) => (
          <Link
            key={label}
            href={url}
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={label}
          >
            {Icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
