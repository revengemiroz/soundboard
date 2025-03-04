"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Id } from "@/convex/_generated/dataModel";

interface SoundCardProps {
  title: string;
  category: string;
  fileId: Id<"_storage">;
}

export default function SoundCard({ title, category, fileId }: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4">
        {/* Circular Progress Bar */}
        <div className="w-16 h-16">
          <CircularProgressbar
            value={progress}
            text={
              isPlaying ? `${Math.round((progress / 100) * duration)}s` : ""
            }
            styles={buildStyles({
              textSize: "12px",
              pathColor: isPlaying ? "#4F46E5" : "#CBD5E0",
              trailColor: "#E5E7EB",
            })}
          />
        </div>

        {/* Title & Category */}
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Download Button */}
        {soundUrl && (
          <a
            href={soundUrl}
            download
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <Download size={20} />
          </a>
        )}

        {/* Audio Element (Hidden) */}
        {soundUrl && (
          <audio
            ref={audioRef}
            src={soundUrl}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
          />
        )}
      </div>
    </div>
  );
}
