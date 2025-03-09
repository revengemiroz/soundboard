"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Play, Pause, Download, PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Plus,
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
import { Card, CardContent } from "@/components/ui/card";
import "react-circular-progressbar/dist/styles.css";

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
  title: string;
  id: Id<"sounds">;
  category: string;
  fileId: Id<"_storage">;
}

export default function SoundCard({
  id,
  title,
  category,
  fileId,
}: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [Icon, setIcon] = useState<ReactNode>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });

  useEffect(() => {
    const randomIconKey = getRandomElement(Object.keys(iconComponents));
    setIcon(iconComponents[randomIconKey]);
    setColor(getRandomElement(colors));
  }, []);

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!soundUrl) return;

    try {
      const response = await fetch(soundUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = title + ".mp3"; // Ensure correct file extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setProgress(0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100); // Ensure progress reaches 100% when audio ends
    };

    // Attach event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [soundUrl]);

  const router = useRouter();

  const addToSoundBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => {
        router.push(`/sounds/${id}`);
      }}
      className="bg-white rounded-xl cursor-pointer shadow-lg p-4 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all"
    >
      {/* <Link href={`/sounds/${id}`} className="block"> */}
      {/* Circular Progress Bar for Audio Playback */}
      <div className="w-20 h-20 relative">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />
        {Icon && (
          <Icon
            className={`absolute inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white  m-auto p-[12px] ${color && color}`}
          />
        )}
      </div>

      {/* Title & Category */}
      <TooltipProvider>
        <div className="text-center">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <p className="text-sm text-gray-500 capitalize">{category}</p>
        </div>

        {/* Play & Download Buttons */}
        <div className="flex items-center gap-4 mt-3">
          {soundUrl && (
            <span onClick={togglePlay}>
              <Tooltip>
                <TooltipTrigger className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full flex">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </TooltipTrigger>
                <TooltipContent>{!isPlaying ? "Play" : "Pause"}</TooltipContent>
              </Tooltip>
            </span>
          )}

          {soundUrl && (
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

          {soundUrl && (
            <Tooltip>
              <TooltipTrigger className="bg-gray-200 flex items-center justify-center cursor-pointer p-3 rounded-full hover:bg-gray-300">
                <span onClick={addToSoundBoard}>
                  <PlusCircle size={20} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add To Soundboard</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Hidden Audio Element */}
        {soundUrl && (
          <audio
            ref={audioRef}
            src={soundUrl}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(100);
            }}
          />
        )}
      </TooltipProvider>
    </div>
  );
}
