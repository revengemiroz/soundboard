"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  Share,
  Download,
  ArrowLeft,
  Mic,
  Mic2,
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

import Card from "../Card";
import {
  Plus,
  Music,
  Headphones,
  Radio,
  Volume2,
  Disc,
  Heart,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

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
  const sound = useQuery(api.sound.getSoundById, {
    id: id as string as Id<"sounds">,
  });
  const fileId = sound?.fileId;
  const soundUrl = useQuery(api.sound.getSoundUrl, {
    fileId,
  });
  console.log({ sound }, { soundUrl });
  const [Icon, setIcon] = useState<ReactNode>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const randomIconKey = getRandomElement(Object.keys(iconComponents));
    setIcon(iconComponents[randomIconKey]);
    setColor(getRandomElement(colors));
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
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

  if (!sound) return <p className="text-center py-10">Loading sound...</p>;

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("123", audioRef);
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
      a.download = sound.title + ".mp3"; // Ensure correct file extension
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 ">
      <Link href="/">
        <button className="flex items-center cursor-pointer text-gray-600 hover:text-indigo-600 mb-4">
          <ArrowLeft size={18} className="mr-2" />
          Back to sounds
        </button>
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-6 border">
        <h1 className="text-2xl font-bold capitalize">{sound.title}</h1>
        <p className="text-gray-500 flex items-center gap-2 mb-6 capitalize">
          <Mic size={14} className="mt-1" />
          {sound.category} • {new Date(sound.createdAt).toLocaleDateString()}
        </p>

        {/* Audio Player & Visualizer */}
        <div className="bg-gray-100 relative border rounded-md p-6 flex flex-col justify-center items-center">
          {/* <button
            onClick={togglePlay}
            className="bg-blue-500 cursor-pointer z-9 text-white p-3 rounded-full hover:bg-blue-600 my-12"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button> */}

          <div onClick={togglePlay}>
            <Card
              progress={progress}
              icon={Icon}
              color={`${color}`}
              title={sound.title}
            />
          </div>
          {/* Real Audio Visualizer */}
          {/* <div className="absolute bottom-0 w-fit overflow-hidden">
            <AudioVisualizer
              audioRef={audioRef as React.RefObject<HTMLAudioElement>}
              isPlaying={isPlaying}
            />
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-4  mx-auto mt-6">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window ? window.location.href : "");
              toast.success("Link has been copied", {
                className: "!bg-white !text-black",
              });
            }}
            className="flex items-center cursor-pointer justify-center gap-2 bg-gray-100 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200"
          >
            <Share className="h-5 w-5" />
            Copy Link
          </button>

          <button className="flex items-center cursor-pointer justify-center gap-2 bg-gray-100 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200">
            <Download className="h-5 w-5" />
            Download MP3
          </button>
        </div>

        {/* Actions */}
        {/* <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => navigator.clipboard.writeText("a")}
            className="flex cursor-pointer items-center text-gray-600 hover:text-indigo-600"
          >
            <Share size={20} className="mr-2" />
            Share
          </button>
          {sound.fileUrl && (
            <button
              onClick={handleDownload}
              className="flex cursor-pointer items-center text-gray-600 hover:text-indigo-600"
            >
              <Download size={20} className="mr-2" />
              Download
            </button>
          )}
        </div> */}

        {/* Audio Element (Hidden) */}
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
    </div>
  );
}
