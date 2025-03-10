import React, { ReactNode, useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
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
  X,
} from "lucide-react";

import "react-circular-progressbar/dist/styles.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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

function Index({ soundboardSounds, setSoundboardSounds }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 ">
      {soundboardSounds.map((sound) => {
        // Generate unique random values for each Card
        const RandomIcon = getRandomElement(Object.values(iconComponents));
        const randomColor = getRandomElement(colors);
        console.log("sheet", sound);
        const removeSounds = () => {
          const filteredSounds = soundboardSounds.filter(
            (s) => s._id !== sound._id
          );
          setSoundboardSounds(filteredSounds);
        };
        return (
          <Card
            key={sound._id}
            soundUrl={sound.audioUrl}
            category={sound.category}
            title={sound.title}
            Icon={RandomIcon}
            color={randomColor}
            removeSounds={removeSounds}
          />
        );
      })}
    </div>
  );
}

const Card = ({ title, category, Icon, color, soundUrl, removeSounds }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = async (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    if (!soundUrl) return;

    // Ensure the audio instance is created only once
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.muted = false;
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setProgress(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          );
        }
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(100);
      });
      audioRef.current.addEventListener("error", () => {
        console.error("Audio playback error detected, resetting...");
        setIsPlaying(false);
        setProgress(0);
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
      });
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("iOS Safari Play error:", error);
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
      // setDuration(audio.duration);
      setProgress(0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100); // Ensure progress reaches 100% when audio ends
    };

    const handleError = () => {
      console.error("Audio playback error detected, resetting...");
      setIsPlaying(false);
      setProgress(0);
      audio.pause();
      audio.currentTime = 0; // Reset audio position
    };

    // Attach event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [soundUrl]);
  // const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 py-4 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all">
      <div className="w-15 h-15 relative">
        <div
          onClick={() => {
            removeSounds();
            audioRef.current?.pause();
            audioRef.current = null;
          }}
          className="absolute cursor-pointer hover:scale-105 active:scale-90 transition-all top-[-8px] bg-gray-300 rounded-full p-1 right-[-40px]"
        >
          <X className="w-3 h-3" />
        </div>
        <div className="">
          <CircularProgressbar
            value={progress}
            styles={buildStyles({
              textSize: "24px",
              pathColor: "#4F46E5",
              trailColor: "#E5E7EB",
            })}
          />

          {Icon && (
            <button onClick={togglePlay}>
              <Icon
                className={`absolute transition-all hover:scale-105 cursor-pointer active:scale-90 inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] ${color}`}
              />
            </button>
          )}
        </div>
      </div>

      <div className="text-center  flex flex-col gap-2 p-0 mt-4">
        <span className="text-lg !p-0 leading-4.5 font-semibold capitalize m-0">
          {title}
        </span>
        <p className="text-sm text-gray-500 capitalize">{category}</p>
      </div>
    </div>
  );
};

export default Index;
