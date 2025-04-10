"use client";

import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  Download,
  PlusCircle,
  CircleCheckBig,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Music,
  Mic2,
  Headphones,
  Radio,
  Volume2,
  Disc,
  Heart,
  Star,
  Zap,
} from "lucide-react";

import { useAudioStore } from "@/app/zustand/store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import SheetComponent from "../SheetComponent";
import Link from "next/link";

const iconComponents = {
  Music,
  Mic2,
  Headphones,
  Radio,
  Volume2,
  Disc,
  Heart,
  Star,
  Zap,
};
const colors = [
  "bg-indigo-600",
  "bg-pink-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-orange-500",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

interface SoundCardProps {
  sound: {
    _id: string;
    audioUrl: string;
    category: string;
    slug: string;
    createdAt: number;
    tags: string[];
    title: string;
    uploadthingURL: string;
    _creationTime: number;
  };
}

export default function SoundCard({ sound }: SoundCardProps) {
  const { _id, title, category, uploadthingURL, slug } = sound;
  const router = useRouter();

  // Zustand store functions & state
  const {
    playAudio,
    stopAudio,
    progress,
    currentAudioId,
    addToSoundboard,
    removeFromSoundboard,
    isInSoundboard,
    setSheetOpen,
    sheetOpen,
    soundboard,
  } = useAudioStore();

  const isPlaying = currentAudioId === _id;
  const isAddedToSoundboard = isInSoundboard(_id);

  // Random icon and color for each card
  const [Icon] = useState(() =>
    getRandomElement(Object.values(iconComponents))
  );
  const [color] = useState(() => getRandomElement(colors));

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    isPlaying ? stopAudio() : playAudio(_id, uploadthingURL);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!uploadthingURL) return;

    try {
      const response = await fetch(uploadthingURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  const handleAddToSoundboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSheetOpen(true);

    if (isAddedToSoundboard) {
      removeFromSoundboard(_id);
    } else {
      addToSoundboard(sound);
    }
  };

  return (
    <Link
      // onClick={() => router.push(`/sounds/${slug}`)}
      href={`/sounds/${slug}`}
      className="bg-white rounded-xl cursor-pointer shadow-lg p-4 py-8 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all"
    >
      <div className="w-20 h-20 relative">
        {/* Circular Progress Bar */}
        <CircularProgressbar
          value={isPlaying ? progress : 0}
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />
        {Icon && (
          <Icon
            className={`absolute inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] ${color}`}
          />
        )}
      </div>

      {/* Title & Category */}
      <TooltipProvider>
        <div className="text-center">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <p className="text-sm text-gray-500 capitalize">{category}</p>
        </div>

        {/* Buttons: Play/Pause, Download, Add to Soundboard */}
        <div className="flex items-center gap-4 mt-3">
          {uploadthingURL && (
            <button
              className="bg-indigo-600 hover:scale-95 active:scale-85 transition-all cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full flex"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          )}

          {uploadthingURL && (
            <span onClick={handleDownload}>
              <Tooltip>
                <TooltipTrigger className="bg-gray-200 flex items-center justify-center cursor-pointer p-3 rounded-full hover:bg-gray-300">
                  <Download size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </span>
          )}

          {uploadthingURL && (
            <span onClick={handleAddToSoundboard}>
              <Tooltip>
                <TooltipTrigger
                  className={` ${isAddedToSoundboard ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-200 hover:bg-gray-300"} flex items-center justify-center cursor-pointer p-3 rounded-full `}
                >
                  {isAddedToSoundboard ? (
                    <CircleCheckBig className="text-white" size={20} />
                  ) : (
                    <PlusCircle size={20} />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {isAddedToSoundboard ? (
                    <p>Remove from Soundboard</p>
                  ) : (
                    <p>Add To Soundboard</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </span>
          )}
        </div>
      </TooltipProvider>
    </Link>
  );
}
