import Link from "next/link";
import React from "react";

export default function FooterLinks() {
  const links = [
    {
      title: "Quick Links",
      items: [
        { label: "Home", to: "/" },
        { label: "Trending", to: "/trending" },
        { label: "Categories", to: "/categories" },
        { label: "Upload", to: "/upload" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "FAQ", to: "/faq" },
        { label: "Contact Us", to: "/contact" },
        { label: "Terms of Use", to: "/terms" },
        { label: "Privacy Policy", to: "/privacy" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {links.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.to}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
