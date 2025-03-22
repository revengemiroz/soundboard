"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Music,
  Headphones,
  Film,
  Mic,
  Zap,
  Volume2,
  Heart,
  Radio,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Function to get a random gradient for category icons
function getRandomGradient() {
  const gradients = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-teal-500",
    "from-green-500 to-lime-500",
    "from-purple-500 to-pink-500",
    "from-indigo-500 to-cyan-500",
    "from-yellow-500 to-amber-500",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export default function CategoriesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(getRandomGradient()); // Set gradient only on the client side
  }, []);

  // ✅ Updated category names to match dropdown options
  const categories = [
    { id: "memes", name: "Memes", icon: Heart },
    { id: "anime", name: "Anime", icon: Music },
    { id: "movies", name: "Movies", icon: Film },
    { id: "music", name: "Music", icon: Headphones },
    { id: "sound-effects", name: "Sound Effects", icon: Volume2 },
    { id: "discord", name: "Discord Soundboard", icon: Radio },
    { id: "viral", name: "Viral Soundboard", icon: Zap },
    { id: "tiktok", name: "TikTok Soundboard", icon: Radio },
    { id: "nepali", name: "Nepali Meme Sounds", icon: Mic },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Page Header with Gradient */}
      <div className="text-center mt-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="relative">
            <span
              className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative z-10`}
            >
              Sound
            </span>{" "}
            Categories
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-red-200 dark:bg-red-900/40 rounded-full -z-0 transform -rotate-1"></span>
          </span>
        </h1>
        <p className="text-slate-600 px-4 dark:text-slate-400 max-w-2xl mx-auto">
          Browse our extensive collection of sound categories
        </p>
      </div>

      {/* 🎵 Category Grid */}
      <div className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredCategories.map(({ id, name, icon: Icon }) => {
          const iconGradient = getRandomGradient(); // Apply random gradient to each icon
          return (
            <div
              key={id}
              onClick={() => router.push(`/category/${id}`)} // ✅ Navigate when clicked
              className="cursor-pointer bg-white rounded-xl shadow-lg p-6 py-8 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* Category Icon */}
              <div className="w-26 h-20 relative">
                <div
                  className={`absolute inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] bg-gradient-to-r ${iconGradient}`}
                >
                  <Icon size={32} />
                </div>
              </div>

              {/* Category Title */}
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold capitalize">{name}</h3>
                <p className="text-sm text-gray-500">Sounds</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
