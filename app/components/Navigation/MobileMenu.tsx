"use client";

import { useAudioStore } from "@/app/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RequestSoundModal } from "../Request";

interface MobileMenuProps {
  isOpen: boolean;
}

function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;
  const { setSheetOpen } = useAudioStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        {/* <MobileLink to="/">HOME</MobileLink> */}
        {/* <MobileLink to="/new">NEW</MobileLink> */}
        <span
          className="block px-3 py-1 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          onClick={() => setSheetOpen(true)}
        >
          ADD TO SOUNDBOARD
        </span>
        <MobileLink to="/category">CATEGORIES</MobileLink>
        {/* <MobileLink to="/create">CREATE SOUND</MobileLink> */}
        <MobileLink to="/about">ABOUT ME</MobileLink>
        <span
          className="block px-3 py-1 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          onClick={() => setOpen(true)}
        >
          REQUEST SOUNDS
        </span>
      </div>
      <RequestSoundModal open={open} onOpenChange={setOpen} />
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
      className="block px-3 py-1 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
    >
      {children}
    </Link>
  );
}

export default MobileMenu;
