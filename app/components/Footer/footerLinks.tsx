import Link from "next/link";
import React from "react";

export default function FooterLinks() {
  const links = [
    {
      title: "Category Links",
      items: [
        { label: "Categories Memes", to: "/category/memes" },
        { label: "Categories Anime", to: "/category/anime" },
        { label: "Categories Movies", to: "/category/movies" },
        { label: "Categories Music", to: "/category/music" },
        { label: "Categories Sound Effects", to: "/category/sound-effects" },
        { label: "Categories Discord Soundboard", to: "/category/discord" },
        { label: "Categories Viral Soundboard", to: "/category/viral" },
        { label: "Categories Tiktok Soundboard", to: "/category/tiktok" },
        { label: "Categories Nepali Soundboard", to: "/category/nepali" },
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
