import Link from "next/link";
import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <MobileLink to="/">HOME</MobileLink>
        <MobileLink to="/new">NEW</MobileLink>
        <MobileLink to="/trends">TRENDS</MobileLink>
        <MobileLink to="/categories">CATEGORIES</MobileLink>
        <MobileLink to="/create">CREATE SOUND</MobileLink>
        <MobileLink to="/about">ABOUT ME</MobileLink>
      </div>
      <div className="px-4 py-3 space-y-2 border-t">
        <button className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
          Log-in
        </button>
        <button className="w-full px-4 py-2 text-white bg-gray-800 hover:bg-gray-900 rounded-md">
          Sign-up
        </button>
        <button className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md">
          Upload
        </button>
      </div>
    </div>
  );
}

function MobileLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={to}
      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
    >
      {children}
    </Link>
  );
}
