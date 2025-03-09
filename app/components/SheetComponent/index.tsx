import React, { ReactNode, useEffect, useState } from "react";
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
  return (
    <div className="grid grid-cols-3 gap-2 bg-muted-foreground/20 p-2">
      {[1, 2, 3, 4, 5].map((a) => {
        // Generate unique random values for each Card
        const RandomIcon = getRandomElement(Object.values(iconComponents));
        const randomColor = getRandomElement(colors);

        return (
          <Card
            key={a}
            category={"Category " + a}
            title={"Title " + a}
            Icon={RandomIcon}
            color={randomColor}
          />
        );
      })}
    </div>
  );
}

const Card = ({ title, category, Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 py-4 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all">
      <div className="w-15 h-15 relative">
        <div className="absolute cursor-pointer hover:scale-105 active:scale-90 transition-all top-[-12px] bg-gray-300 rounded-full p-1 right-[-15px]">
          <X className="w-3 h-3" />
        </div>
        <CircularProgressbar
          value={50}
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />
        {Icon && (
          <Icon
            className={`absolute inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] ${color}`}
          />
        )}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>
        <p className="text-sm text-gray-500 capitalize">{category}</p>
      </div>
    </div>
  );
};

export default Index;
