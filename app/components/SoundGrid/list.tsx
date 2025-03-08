"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });

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
      <div className="w-20 h-20 mb-3">
        <CircularProgressbar
          value={progress}
          text={
            isPlaying && duration > 0
              ? `${Math.round((progress / 100) * duration)}s`
              : "0s"
          }
          styles={buildStyles({
            textSize: "12px",
            pathColor: isPlaying ? "#4F46E5" : "#CBD5E0",
            trailColor: "#E5E7EB",
          })}
        />
      </div>

      {/* Title & Category */}
      <div className="text-center">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>

      {/* Play & Download Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={togglePlay}
          className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {soundUrl && (
          <span
            onClick={handleDownload}
            className="bg-gray-200 cursor-pointer p-3 rounded-full hover:bg-gray-300"
          >
            <Download size={20} />
          </span>
        )}

        {soundUrl && (
          <span
            onClick={addToSoundBoard}
            className="bg-gray-200 cursor-pointer p-3 rounded-full hover:bg-gray-300"
          >
            <PlusCircle size={20} />
          </span>
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
    </div>
  );
}
