import React from "react";
import Link from "next/link";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isNew?: boolean;
}

function NavLink({ to, children, isNew }: NavLinkProps) {
  return (
    <Link
      href={to}
      className="relative px-3 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
    >
      {children}
      {isNew && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          NEW
        </span>
      )}
    </Link>
  );
}

export default function NavLinks() {
  return (
    <div className="hidden md:flex items-center space-x-1">
      {/* <NavLink to="/">HOME</NavLink> */}
      {/* <NavLink to="/new" isNew>
        NEW
      </NavLink> */}
      <NavLink to="/trends">TRENDS</NavLink>
      <NavLink to="/categories">CATEGORIES</NavLink>
      {/* <NavLink to="/create">CREATE</NavLink> */}
      <NavLink to="/about">ABOUT</NavLink>
      {/* {<NavLink to="/admin">ADMIN</NavLink>} */}
    </div>
  );
}
