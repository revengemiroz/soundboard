import React from "react";
import { Music } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90">
      <div className="bg-red-500 rounded-full p-2">
        <Music className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">InstantSoundboard</span>
    </Link>
  );
}
