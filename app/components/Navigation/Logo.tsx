import React from "react";
import { Music } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAudioStore } from "@/app/zustand/store";

export function Logo() {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useAudioStore();

  return (
    <button
      onClick={() => {
        router.push("/");
        setSearchTerm("");
      }}
      className="flex items-center cursor-pointer gap-2 hover:opacity-90"
    >
      <div className="bg-red-500 rounded-full p-2">
        <Music className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">InstantSoundboard</span>
    </button>
  );
}
