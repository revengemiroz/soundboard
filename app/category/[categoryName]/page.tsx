"use client";

import SoundCard from "@/app/components/SoundGrid/list";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { Scroll, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SoundsByCategoryPage() {
  const params = useParams();
  const category = params?.categoryName ?? ""; // Replace with dynamic category if needed
  const [searchInput, setSearchInput] = useState(""); // Stores user input
  const [searchTerm, setSearchTerm] = useState(""); // Stores final query on Enter key

  // ✅ Fetch sounds based on category & searchTerm with pagination
  const { results, status, loadMore } = usePaginatedQuery(
    api.sound.getSoundsByCategory,
    { category: category as string, searchTerm }, // ✅ Uses searchTerm inside category
    { initialNumItems: 10 } // ✅ Supports infinite scrolling
  );

  // ✅ Trigger search when user presses Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput); // ✅ Update search query
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl capitalize font-bold mb-6 text-center">
        {category} Sounds
      </h2>

      {/* 🔎 Search Bar */}
      <div className="mb-6 max-w-md mx-auto flex justify-center relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.length > 0 ? (
            results.map((sound) => (
              <SoundCard
                key={sound._id}
                id={sound._id}
                title={sound.title}
                category={sound.category}
                fileId={sound.fileId}
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
    </div>
  );
}
