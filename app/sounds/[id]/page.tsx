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
  Loader2,
  PlayIcon,
  PauseIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import Card from "../Card";
import { toast } from "sonner";
import { useAudioStore } from "@/app/zustand/store";
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
import RecommendedSounds from "@/app/components/Recommended";

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

export default function SoundDetailsPage() {
  const { id } = useParams();

  const router = useRouter();
  const sound = useQuery(api.sound.getSoundBySlug, {
    slug: id as string,
  });

  // Random icon and color for each card
  const [Icon] = useState(() =>
    getRandomElement(Object.values(iconComponents))
  );
  const [color] = useState(() => getRandomElement(colors));

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

  if (!sound || !id)
    return (
      <p className="min-h-screen text-center py-10">
        <div className="flex justify-center py-48">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
      </p>
    );

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
        <h1 className="text-2xl font-bold capitalize">
          {sound.title} - Meme Sound Effect Button for Soundboard
        </h1>
        <p className="text-gray-500 flex text-sm items-center gap-2 mb-6 capitalize">
          <Mic size={14} className="mt-1" />
          {sound.category} • {new Date(sound.createdAt).toLocaleDateString()}
        </p>

        {/* Audio Player & Visualizer */}
        <div className="bg-gray-100 relative border rounded-md p-6 flex flex-col justify-center items-center">
          <Card
            progress={progress}
            icon={Icon} // Default icon
            color={color} // Default color
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
          <button
            onClick={handlePlayPause}
            className={`flex items-center w-full sm:col-span-2 cursor-pointer justify-center gap-2 px-4 py-3 rounded-md transition-all ${
              isPlaying
                ? "bg-gray-400 hover:bg-gray-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isPlaying ? (
              <PauseIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5" />
            )}
            {isPlaying ? "Pause Sound" : "Play Sound"}
          </button>

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

      {/* Minimalist SEO content */}
      <div className="py-10 w-full mt-16 text-sm  leading-relaxed space-y-4 px-12 bg-white rounded-md border mx-auto">
        <h2 className="text-lg  text-indigo-500 font-bold">
          About "{sound.title}"
        </h2>

        <p className="text-muted-foreground/95 font-semibold">
          <span className="text-indigo-500 font-bold capitalize">
            {sound.title}
          </span>{" "}
          is a popular sound from the{" "}
          <strong className="text-indigo-500 font-bold">
            {sound.category}
          </strong>{" "}
          category. Use it to add humor or context to memes, videos, or reels.
        </p>

        <ul className="list-disc pl-5 space-y-1 text-muted-foreground/95 font-semibold">
          <li>✅ Instant playback and download</li>
          <li>🎧 Great for TikToks, Shorts, and Reels</li>
          <li>📤 Shareable on any social platform</li>
          <li>🔊 Free MP3 available for use</li>
        </ul>

        <p className="text-muted-foreground/95 font-semibold">
          You can{" "}
          <Link
            href={"#"}
            className="text-indigo-600 underline font-medium"
            download
          >
            download "{sound.title}"
          </Link>{" "}
          as an MP3 or copy the link to share it with others.
        </p>

        <p className="text-muted-foreground/95 font-semibold">
          Looking for more? Explore other sounds in the{" "}
          <Link
            href={`/category/${sound.category}`}
            className="text-indigo-600 capitalize font-medium underline"
          >
            {sound.category}
          </Link>{" "}
          category.
        </p>
      </div>

      {sound._id && (
        <div>
          <RecommendedSounds soundId={sound._id} />
        </div>
      )}
    </div>
  );
}
