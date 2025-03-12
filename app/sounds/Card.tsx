"use client";

import { Share2, Download, Repeat } from "lucide-react";
import clsx from "clsx";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SoundCard({
  title,
  color,
  icon: Icon,
  progress,
  handlePlayPause,
  handleDownload,
  handlePlayRepeat,
  isLooping,
  handleShare,
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      {/* Sound Icon */}
      <div onClick={handlePlayPause} className="w-20 h-20  relative">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            textSize: "214px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />

        <div
          className={clsx(
            "w-[70%] h-[70%] m-auto flex absolute inset-0 cursor-pointer items-center active:scale-90  justify-center rounded-full transition-all duration-300 shadow-md hover:scale-110",
            color
          )}
        >
          <Icon className="text-white w-6 h-6 " />
        </div>
      </div>

      {/* Sound Title */}
      <p className="text-base font-semibold capitalize text-gray-800">
        {title}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleShare}
          className="p-2 cursor-pointer text-gray-500 hover:text-indigo-500 hover:scale-110 active:scale-90 transition-all"
        >
          <Share2 size={15} />
        </button>

        <button
          onClick={handleDownload}
          className="p-2 cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all"
        >
          <Download size={15} />
        </button>

        <button
          onClick={handlePlayRepeat}
          className={`p-2 cursor-pointer  ${isLooping ? "text-blue-500 hover:text-blue-600" : "text-gray-500 hover:text-blue-500"} hover:scale-110 active:scale-90 transition-all`}
        >
          <Repeat size={15} />
        </button>
      </div>
    </div>
  );
}
