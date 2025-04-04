"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SoundCard from "./list";
import { Search, Loader2, ArrowDown } from "lucide-react";
import { useAudioStore } from "@/app/zustand/store";
import { useRouter } from "next/navigation";

export default function SoundList() {
  const logMissedSearch = useMutation(api.missedSearch.logMissedSearch);

  const [searchInput, setSearchInput] = useState<string>(""); // Input state
  // const [searchTerm, setSearchTerm] = useState<string>(""); // Query state
  const lastElementRef = useRef<HTMLDivElement | null>(null); // Ref for last element
  const { searchTerm, setSearchTerm } = useAudioStore();
  // Fetch paginated sounds from Convex
  const { results, status, loadMore } = usePaginatedQuery(
    api.sound.searchSounds,
    { searchTerm },
    { initialNumItems: 20 }
  );

  const isLoading = status === "LoadingFirstPage";
  const isFetchingMore = status === "LoadingMore";

  // Handle Enter Key Press for Search
  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmedInput = searchInput.trim();
        setSearchTerm(trimmedInput);
        await logMissedSearch({ query: trimmedInput });
      }
    },
    [searchInput, logMissedSearch]
  );

  useEffect(() => {
    setSearchInput(searchTerm.trim());
  }, [searchTerm]);

  // Smooth Scroll After Loading More
  useEffect(() => {
    if (isFetchingMore) return; // Prevent scrolling while still fetching

    if (lastElementRef.current) {
      setTimeout(() => {
        lastElementRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // Delay to let new items load
    }
  }, [results]); // Run when new results are added

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-center">Sound Library</h2>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md mx-auto flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for sounds..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={handleSearch}
          className="w-full pl-10 bg-white pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Loading Spinner (Initial Load) */}
      {isLoading && (
        <div className="flex justify-center py-48">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
      )}

      {/* Sound Grid */}
      {!isLoading && results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((sound, index) => (
            <SoundCard
              key={index}
              id={sound._id}
              title={sound.title}
              category={sound.category}
              soundUrl={sound.uploadthingURL}
              sound={sound}
              ref={index === results.length - 1 ? lastElementRef : null} // Attach ref to last element
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="col-span-full text-center py-48 text-gray-500">
            No sounds found for "{searchTerm}"
          </p>
        )
      )}

      {/* Load More Button */}
      {status === "CanLoadMore" && results.length >= 20 && (
        <div className="flex justify-center py-6 mt-20">
          <button
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => loadMore(10)}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Loading...
              </>
            ) : (
              <>
                <ArrowDown className="w-5 h-5" />
                Load More
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
