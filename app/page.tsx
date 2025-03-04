import { ConvexReactClient } from "convex/react";
import React from "react";
// import { SEO } from "./components/SEO";
// import { SearchBar } from "./components/SearchBar";
import SoundList from "./components/SoundGrid";

export default function HomePage() {
  return (
    <>
      {/* <SEO /> */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex-grow">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            InstantSoundboard - 400+ Sounds!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover funny sound buttons, memes, sound effects, soundboards.
            Create your own sound buttons straight from the smartphone, desktop
            or tablet
          </p>
          {/* <SearchBar /> */}
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span>⭐</span> Trending Sounds
            </h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm sm:text-base">
              See All →
            </button>
          </div>
          <SoundList />
        </div>
      </main>
    </>
  );
}
