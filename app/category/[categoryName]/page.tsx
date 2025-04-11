"use client";

import SoundCard from "@/app/components/SoundGrid/list";
import { api } from "@/convex/_generated/api";
import { useMutation, usePaginatedQuery } from "convex/react";
import { Scroll, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Faq from "./faq";

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

export default function SoundsByCategoryPage() {
  const logMissedSearch = useMutation(api.missedSearch.logMissedSearch);

  const params = useParams();
  const category = params?.categoryName ?? ""; // Replace with dynamic category if needed
  const [searchInput, setSearchInput] = useState(""); // Stores user input
  const [searchTerm, setSearchTerm] = useState(""); // Stores final query on Enter key

  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(getRandomGradient()); // Set gradient only on the client side
  }, []);

  // ✅ Fetch sounds based on category & searchTerm with pagination
  const { results, status, loadMore } = usePaginatedQuery(
    api.sound.getSoundsByCategory,
    { category: category as string, searchTerm }, // ✅ Uses searchTerm inside category
    { initialNumItems: 10 } // ✅ Supports infinite scrolling
  );

  // ✅ Trigger search when user presses Enter
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput); // ✅ Update search query
      await logMissedSearch({ query: searchInput.trim() });
    }
  };

  const h2Test = () => {
    switch (category) {
      case "nepali":
        return "Trending Nepali Meme Sounds for TikTok, Reels, and Memes";
      case "memes":
        return "Search and Discover the best meme sounds at InstantSoundboard. Download best meme sound effects buttons for you meme soundboard, Find best meme sounds at InstantSoundboard. Enjoy our large collection of funny sound effects. Play, Download and share with your friends and spread the laughter";
      case "anime":
        return "Our Anime Soundboard contains all the funniest anime sounds and audio clips. Have any anime sounds or funny anime audio clips you like, you will find an anime sound button right here. Search and Discover the best anime sounds buttons at InstantSoundboard Download the best anime sound buttons for your anime soundboard. Find best anime sounds at InstantSoundboard.";
      case "movies":
        return "Our Movies Soundboard contains all the funniest movie sounds and audio clips. Have any movie sounds or funny movie audio clips you like, you will find a meme sound button right here. Search and Discover the best movie sounds buttons at InstantSoundboard. Download best movie sound buttons.";
      case "music":
        return "Search and Discover the best music sounds buttons at InstantSoundboard. Download the best music sound buttons for your music soundboard, Find best music sounds at InstantSoundboard. Enjoy our large collection of music sound buttons. Play, Download and share with your friends and spread laughter.";
      case "sound-effects":
        return "Search and Discover the best sound effect buttons at InstantSoundboard. Download best sound effect sound buttons for your soundboard, Find best sound effects right here at InstantSoundboard. Enjoy our large collection of funny sound effects. Play, Download and share with your friends and spread laughter.";
      case "discord":
        return "Search and Discover the best Discord sound buttons at InstantSoundboard. Download funny Discord sound buttons for your server. Find the best troll and meme sounds to use in voice chats. Enjoy our large collection of hilarious Discord sound effects. Play, Download and share with your friends and make your chats more fun.";
      case "viral":
        return "Search and Discover the best viral sound buttons at InstantSoundboard. Download trending sound effects, viral TikTok audios, and meme sounds that broke the internet. Enjoy our top-rated viral soundboard and share the laughs with friends!";

      case "tiktok":
        return "Search and Discover the best TikTok sound buttons at InstantSoundboard. Download trending TikTok meme sounds, viral audios, and popular sound clips used by creators. Enjoy our huge TikTok soundboard collection. Play, Download and share your favorite TikTok sounds with friends!";

      case "indian":
        return "Search and Discover the best Indian sound buttons at InstantSoundboard. Download popular Indian meme sounds, dialogues and viral audio clips. Enjoy our collection of Bollywood, South Indian, and desi sound effects. Play, Download and share with your friends for maximum fun!";

      default:
        return `Explore authentic ${category} sound clips for your projects, videos, and creative content`;
    }
  };

  const h1Title = () => {
    switch (category) {
      case "nepali":
        return "Trending Nepali Meme Sounds for TikTok, Reels, and Memes";
      case "memes":
        return " soundboard: Meme soundboard sounds button";
      case "anime":
        return " Soundboard - Anime Soundboard Sound buttons";
      case "movies":
        return " Soundboard - Movies Soundboard Sound buttons";
      case "music":
        return " Soundboard - Music Soundboard Sound Buttons";
      case "sound-effects":
        return "Soundboard - Sound effects Soundboard Sound Buttons";
      case "discord":
        return "Soundboard - Discord Soundboard Sound Buttons";

      case "viral":
        return "Soundboard - Viral Soundboard Sound Buttons";

      case "tiktok":
        return "Soundboard - TikTok Soundboard Sound Buttons";

      case "indian":
        return "Soundboard - Indian Soundboard Sound Buttons";

      default:
        return `Explore authentic ${category} sound clips for your projects, videos, and creative content`;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mt-12 mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          <span className="relative">
            <span
              className={`capitalize bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative z-10`}
            >
              {category}
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-red-200 dark:bg-red-900/40 rounded-full -z-0 transform -rotate-1"></span>
          </span>{" "}
          {h1Title()}
        </h1>
        <h2 className="text-slate-600 px-4 dark:text-slate-400 max-w-2xl mx-auto">
          {h2Test()}
        </h2>
      </div>

      {/* 🔎 Search Bar */}
      <div className="mb-6 px-4 max-w-md mx-auto  flex justify-center relative">
        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for sounds..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress} // ✅ Updates search on Enter key
          className="w-full max-w-md pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ⏳ Loading Indicator */}
      {status === "LoadingFirstPage" ? (
        <div className="flex py-48 justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // 📌 Grid Layout
        <div className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map((sound) => (
              <SoundCard
                key={sound._id}
                id={sound._id}
                title={sound.title}
                category={sound.category}
                soundUrl={sound.uploadthingURL}
                sound={sound}
              />
            ))
          ) : (
            <p className="col-span-full text-center py-48 text-gray-500">
              No sounds found for "{searchTerm}"
            </p>
          )}
        </div>
      )}

      {/* 🔄 Load More Button for Infinite Scroll */}
      {status === "CanLoadMore" && (
        <div className="flex items-center justify-center py-6 mt-20">
          <button
            className="w-fit cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => loadMore(10)}
          >
            <Scroll />
            Load More
          </button>
        </div>
      )}

      {status === "LoadingMore" && <div>Loading more sounds...</div>}

      <Faq category={category} />
    </div>
  );
}
