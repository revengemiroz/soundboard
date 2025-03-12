"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Share,
  Download,
  ArrowLeft,
  Mic,
  CirclePlus,
  Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import Card from "../Card";
import { toast } from "sonner";
import { useAudioStore } from "@/app/zustand/store";

export default function SoundDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const sound = useQuery(api.sound.getSoundById, {
    id: id as string as Id<"soundsv1">,
  });

  const {
    playAudio,
    stopAudio,
    progress,
    currentAudioId,
    addToSoundboard,
    removeFromSoundboard,
    isInSoundboard,
    setSheetOpen,
    toggleRepeat,
    isLooping,
  } = useAudioStore();

  if (!sound)
    return <p className="min-h-screen text-center py-10">Loading sound...</p>;

  const isPlaying = currentAudioId === sound._id;
  const isAddedToSoundboard = isInSoundboard(sound._id);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    isPlaying ? stopAudio() : playAudio(sound._id, sound.uploadthingURL);
  };

  const handlePlayRepeat = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleRepeat(sound._id, sound.uploadthingURL);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window ? window.location.href : "");
    toast.success("Link has been copied", {
      className: "!bg-white !text-black",
    });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sound.uploadthingURL) return;

    try {
      const response = await fetch(sound.uploadthingURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${sound.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  const handleAddToSoundboard = () => {
    setSheetOpen(true);
    if (isAddedToSoundboard) {
      removeFromSoundboard(sound._id);
    } else {
      addToSoundboard(sound);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="flex items-center cursor-pointer text-gray-600 hover:text-indigo-600 mb-4"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to sounds
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <h1 className="text-2xl font-bold capitalize">{sound.title}</h1>
        <p className="text-gray-500 flex text-sm items-center gap-2 mb-6 capitalize">
          <Mic size={14} className="mt-1" />
          {sound.category} • {new Date(sound.createdAt).toLocaleDateString()}
        </p>

        {/* Audio Player & Visualizer */}
        <div className="bg-gray-100 relative border rounded-md p-6 flex flex-col justify-center items-center">
          <Card
            progress={progress}
            icon={Mic} // Default icon
            color={"bg-indigo-600"} // Default color
            title={sound.title}
            handlePlayPause={handlePlayPause}
            handleDownload={handleDownload}
            handlePlayRepeat={handlePlayRepeat}
            handleShare={handleShare}
            isLooping={isLooping}
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto mt-6 w-full ">
          {/* Copy Link Button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md 
    border-2 border-indigo-700 text-indigo-700 bg-transparent transition-all duration-300 
    hover:bg-indigo-700 hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
          >
            <Copy className="h-5 w-5" />
            Copy Link
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md 
    border-2 border-indigo-700 text-indigo-700 bg-transparent transition-all duration-300 
    hover:bg-indigo-700 hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="h-5 w-5" />
            Download MP3
          </button>

          {/* Soundboard Button - Always Full Width */}
          <button
            onClick={handleAddToSoundboard}
            className={`flex items-center w-full sm:col-span-2 cursor-pointer justify-center gap-2 px-4 py-3 rounded-md transition-all ${
              isAddedToSoundboard
                ? "bg-gray-400 hover:bg-gray-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <CirclePlus className="h-5 w-5" />
            {isAddedToSoundboard
              ? "Remove from Soundboard"
              : "Add to Soundboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
