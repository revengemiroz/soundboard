"use client";

import { Share2, Download } from "lucide-react";
import clsx from "clsx";

export default function SoundCard({ title, color, icon: Icon }) {
  return (
    <div className="flex cursor-pointer flex-col items-center gap-2 p-4">
      {/* Sound Icon */}
      <div
        className={clsx(
          "w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 shadow-md hover:scale-110",
          color
        )}
      >
        <Icon className="text-white w-4 h-4" />
      </div>

      {/* Sound Title */}
      <p className="text-sm font-semibold capitalize text-gray-800">{title}</p>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="p-2 cursor-pointer text-gray-500 hover:text-indigo-500 hover:scale-110 active:scale-90 transition-all">
          <Share2 size={20} />
        </button>

        <button className="p-2 cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
