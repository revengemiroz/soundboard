import React, { useEffect, useState } from "react";
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
import { useAudioStore } from "@/app/zustand/store";

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

function Index() {
  const {
    soundboard,
    removeFromSoundboard,
    playAudio,
    stopAudio,
    currentAudioId,
  } = useAudioStore();

  // State to store assigned icons & colors for each sound
  const [soundStyles, setSoundStyles] = useState<
    Record<string, { Icon: any; color: string }>
  >(() => {
    const initialStyles: Record<string, { Icon: any; color: string }> = {};
    soundboard.forEach((sound) => {
      initialStyles[sound._id] = {
        Icon: getRandomElement(Object.values(iconComponents)),
        color: getRandomElement(colors),
      };
    });
    return initialStyles;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
      {soundboard.map((sound) => {
        const { Icon, color } = soundStyles[sound._id] || {
          Icon: Music,
          color: "bg-gray-500",
        };

        return (
          <Card
            key={sound._id}
            sound={sound}
            Icon={Icon}
            color={color}
            removeSounds={removeFromSoundboard}
            playAudio={playAudio}
            stopAudio={stopAudio}
            isPlaying={currentAudioId === sound._id} // Check if this card's audio is playing
          />
        );
      })}
    </div>
  );
}

const Card = ({
  sound,
  Icon,
  color,
  removeSounds,
  playAudio,
  stopAudio,
  isPlaying,
}) => {
  const { progress } = useAudioStore();

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all">
      <div className="w-15 h-15 relative ">
        {/* Remove button */}
        <div
          onClick={() => {
            removeSounds(sound._id);
            stopAudio();
          }}
          className="absolute cursor-pointer hover:scale-105 active:scale-90 transition-all top-[-12px] md:top-[-8px] bg-gray-300 rounded-full p-1 right-[-25px] md:right-[-40px]"
        >
          <X className="w-3 h-3" />
        </div>

        {/* Progress bar */}
        <CircularProgressbar
          value={isPlaying ? progress : 0} // Reset progress if not playing
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />

        {/* Play/Pause Button */}
        {Icon && (
          <button
            onClick={() =>
              isPlaying
                ? stopAudio()
                : playAudio(sound._id, sound.uploadthingURL)
            }
          >
            <Icon
              className={`absolute transition-all hover:scale-105 cursor-pointer active:scale-90 inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] ${color}`}
            />
          </button>
        )}
      </div>

      {/* Title & Category */}
      <div className="text-center flex flex-col gap-2 p-0 mt-4">
        <span className="text-sm md:text-lg !p-0 leading-4 font-semibold capitalize m-0">
          {sound.title}
        </span>
        <p className="text-sm text-gray-500 capitalize">{sound.category}</p>
      </div>
    </div>
  );
};

export default Index;
