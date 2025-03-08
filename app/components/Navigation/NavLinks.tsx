import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isNew?: boolean;
}

function NavLink({ to, children, isNew }: NavLinkProps) {
  return (
    <Link
      href={to}
      className="hover:text-indigo-600 relative px-3 py-2 text-sm text-gray-700 font-medium"
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
      <NavLink to="/create-soundboard">CREATE SOUNDBOARD</NavLink>
      <NavLink to="/trends">TRENDS</NavLink>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="flex items-center cursor-pointer no-underline text-sm font-medium uppercase"
          >
            Categories
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem className="cursor-pointer">Memes</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Anime</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Movies</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Music</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Sound Effects
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Discord Soundboard
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Viral Soundboard
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            TikTok Soundboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <NavLink to="/create">CREATE</NavLink> */}
      <NavLink to="/about">ABOUT</NavLink>
      {/* {<NavLink to="/admin">ADMIN</NavLink>} */}
    </div>
  );
}
