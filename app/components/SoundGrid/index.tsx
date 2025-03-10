"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SoundCard from "./list";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SoundList({
  sheetOpen,
  setSheetOpen,
  soundboardSounds,
  setSoundboardSounds,
}) {
  const [searchInput, setSearchInput] = useState(""); // Stores user input
  const [searchTerm, setSearchTerm] = useState(""); // Stores final query when Enter is pressed
  const searchedSounds = useQuery(api.sound.searchSounds, { searchTerm });
  // Check if data is still loading
  const isLoading = searchedSounds === undefined;

  // Handle Enter Key Press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput); // Set search query on Enter
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sound Library</h2>

      {/* Search Bar (Triggers Search on Enter) */}
      <div className="mb-6 max-w-md mx-auto flex justify-center relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for sounds..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for Enter Key
          className="w-full max-w-md pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Show Spinner while loading */}
      {isLoading ? (
        <div className="flex py-48 justify-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Grid Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchedSounds.length > 0 ? (
            searchedSounds.map((sound) => (
              <SoundCard
                key={sound._id}
                id={sound._id}
                title={sound.title}
                category={sound.category}
                fileId={sound.fileId}
                setSheetOpen={setSheetOpen}
                setSoundboardSounds={setSoundboardSounds}
                sound={sound}
                soundboardSounds={soundboardSounds}
              />
            ))
          ) : (
            <p className="col-span-full text-center py-48 text-gray-500">
              No sounds found for "{searchTerm}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
