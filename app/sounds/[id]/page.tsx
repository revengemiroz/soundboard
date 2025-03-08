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
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AudioVisualizer } from "../../components/AudioVisualizer";
import { Id } from "@/convex/_generated/dataModel";

import Card from "../Card";

export default function SoundDetailsPage() {
  const { id } = useParams();
  const sound = useQuery(api.sound.getSoundById, {
    id: id as string as Id<"sounds">,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!sound?.fileUrl) return;

    // Fetch the audio file as a Blob to bypass CORS
    fetch(sound.fileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      })
      .catch((err) => console.error("Error loading audio:", err));

    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [sound?.fileUrl]);

  if (!sound) return <p className="text-center py-10">Loading sound...</p>;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = async () => {
    if (!sound?.fileUrl) return;

    try {
      const response = await fetch(sound.fileUrl);
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

  console.log({ sound });

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
          <Mic size={18} />
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

          <Card icon={Mic2} color={"bg-[#A855F7]"} title={sound.title} />
          {/* Real Audio Visualizer */}
          {/* <div className="absolute bottom-0 w-fit overflow-hidden">
            <AudioVisualizer
              audioRef={audioRef as React.RefObject<HTMLAudioElement>}
              isPlaying={isPlaying}
            />
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-4  mx-auto mt-6">
          <button className="flex items-center cursor-pointer justify-center gap-2 bg-gray-100 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200">
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
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}
