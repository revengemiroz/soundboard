"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Play, Pause, Download, PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Howl } from "howler";
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
  setSheetOpen: (boolean) => void;
  fileId: Id<"_storage">;
}

export default function SoundCard({
  id,
  title,
  category,
  fileId,
  setSheetOpen,
}: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [Icon, setIcon] = useState<ReactNode>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });

  useEffect(() => {
    const randomIconKey = getRandomElement(Object.keys(iconComponents));
    setIcon(iconComponents[randomIconKey]);
    setColor(getRandomElement(colors));
  }, []);

  useEffect(() => {
    if (!soundUrl) return;

    // Initialize Howl instance
    soundRef.current = new Howl({
      src: [soundUrl],
      mute: false,
      html5: true, // Force HTML5 to avoid issues with CORS
      onplay: () => {
        setIsPlaying(true);
        startProgressTracking();
      },
      onpause: () => {
        setIsPlaying(false);
        stopProgressTracking();
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(100);
        // setProgress(0);
        stopProgressTracking();
      },
      onload: () => {
        // Set initial duration if needed
      },
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload(); // Clean up Howl instance
      }
      stopProgressTracking();
    };
  }, [soundUrl]);

  const startProgressTracking = () => {
    const updateProgress = () => {
      if (soundRef.current && soundRef.current.playing()) {
        const currentTime = soundRef.current.seek() || 0;
        const totalDuration = soundRef.current.duration() || 1;
        const newProgress = (currentTime / totalDuration) * 100;
        setProgress(newProgress);

        // Continue the loop
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    // Start the loop
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const stopProgressTracking = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
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

  const addToSoundBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSheetOpen(true);
  };

  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/sounds/${id}`);
      }}
      className="bg-white rounded-xl cursor-pointer shadow-lg p-4 py-8 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all"
    >
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
            <button
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full flex"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
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
            <span onClick={addToSoundBoard}>
              <Tooltip>
                <TooltipTrigger className="bg-gray-200 flex items-center justify-center cursor-pointer p-3 rounded-full hover:bg-gray-300">
                  <PlusCircle size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Soundboard</p>
                </TooltipContent>
              </Tooltip>
            </span>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
