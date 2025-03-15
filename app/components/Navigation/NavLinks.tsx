import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/app/zustand/store";
import { RequestSoundModal } from "@/app/components/Request";

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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    playAudio,
    stopAudio,
    progress,
    currentAudioId,
    addToSoundboard,
    removeFromSoundboard,
    isInSoundboard,
    soundboard,
    setSheetOpen,
  } = useAudioStore();

  return (
    <div className="hidden md:flex items-center space-x-1">
      {/* <NavLink to="/">HOME</NavLink> */}
      {/* <NavLink to="/new" isNew>
        NEW
      </NavLink> */}
      <button
        onClick={() => setSheetOpen(true)}
        className="hover:text-indigo-600  relative px-3 py-2 text-sm text-gray-700 font-medium"
      >
        <span className="cursor-pointer">MY SOUNDBOARD</span>
        <span
          className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs  ${soundboard.length > 0 ? "px-[7px] py-[2px] flex items-center justify-center" : "px-1.5 py-0.5"}  rounded-full`}
        >
          {soundboard.length > 0 ? soundboard.length : "New"}
        </span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="flex items-center cursor-pointer no-underline text-sm font-medium uppercase"
          >
            Categories
            <ChevronDown className="ml-[-5px]  h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem
            onClick={() => router.push("/category/memes")}
            className="cursor-pointer"
          >
            Memes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/anime")}
            className="cursor-pointer"
          >
            Anime
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/movies")}
            className="cursor-pointer"
          >
            Movies
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/music")}
            className="cursor-pointer"
          >
            Music
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/sound-effects")}
            className="cursor-pointer"
          >
            Sound Effects
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/discord")}
            className="cursor-pointer"
          >
            Discord Soundboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/viral")}
            className="cursor-pointer"
          >
            Viral Soundboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/tiktok")}
            className="cursor-pointer"
          >
            TikTok Soundboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/category/nepali")}
            className="cursor-pointer"
          >
            Nepali Soundboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <NavLink to="/create">CREATE</NavLink> */}
      <NavLink to="/about">ABOUT</NavLink>

      <button
        onClick={() => setOpen(true)}
        className="hover:text-indigo-600 cursor-pointer relative px-3 py-2 text-sm text-gray-700 font-medium"
      >
        REQUEST SOUND
      </button>

      <RequestSoundModal open={open} onOpenChange={setOpen} />
      {/* {<NavLink to="/admin">ADMIN</NavLink>} */}
    </div>
  );
}
