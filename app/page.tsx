"use client";
import React, { useState } from "react";
// import { SEO } from "./components/SEO";
// import { SearchBar } from "./components/SearchBar";
import SoundList from "./components/SoundGrid";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import SheetComponent from "./components/SheetComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useAudioStore } from "./zustand/store";

export default function HomePage() {
  // const [soundboardSounds, setSoundboardSounds] = useState([]);

  const { setSheetOpen, sheetOpen, soundboard } = useAudioStore();

  return (
    <>
      {/* <SEO /> */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex-grow">
        <div className="text-center mb-8 mt-12 sm:mt-24 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            InstantSoundboard - 400+ Sounds!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            InstantSoundboard is your ultimate destination for the best sound
            buttons, featuring meme soundboards, funny sound effects, gaming
            sounds, and more. Browse and download from a massive collection of
            free sound buttons.
          </p>
          {/* <SearchBar /> */}
        </div>
        <div className="mb-8">
          {/* <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span>⭐</span> Trending Sounds
            </h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm sm:text-base">
              See All →
            </button>
          </div> */}
          <SoundList />
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="flex">
            <SheetHeader>
              <SheetTitle>My Soundboard</SheetTitle>
              <SheetDescription>
                This is a list of your custom soundboard list.
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1 mx-4 rounded-md max-h-[85dvh] bg-muted-foreground/20 p-2">
              {soundboard.length == 0 && (
                <h3 className=" text-center text-muted-foreground/90">
                  You havent added an audio here yet.
                </h3>
              )}
              <SheetComponent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </main>
    </>
  );
}
