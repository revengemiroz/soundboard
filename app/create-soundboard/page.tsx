"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Plus,
  Keyboard,
  PlusCircle,
  Trash2,
  Volume2,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";

export default function SoundboardPage() {
  const [soundboard, setSoundboard] = useState([]);
  const [keyMappings, setKeyMappings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const sounds = useQuery(api.sound.searchSounds, { searchTerm });
  console.log({ sounds });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundUrl, setSoundUrl] = useState("#");

  const togglePlay = (e: React.MouseEvent) => {
    // e.stopPropagation();
    console.log("clicked", audioRef);

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const addToSoundboard = (fileId, title) => {
    if (soundboard.length >= 6) {
      alert("You can only add up to 6 sounds to the soundboard.");
      return;
    }
    const fileUrl = getSoundUrl(fileId);
    if (!fileUrl) return;
    const id = soundboard.length + 1;
    setSoundboard([...soundboard, { id, title, fileUrl, key: "" }]);
  };

  const assignKey = (id, key) => {
    if (keyMappings[key]) {
      alert(`The key '${key}' is already mapped to another sound.`);
      return;
    }
    setSoundboard(
      soundboard.map((sound) => (sound.id === id ? { ...sound, key } : sound))
    );
    setKeyMappings((prev) => ({ ...prev, [key]: id }));
  };

  useEffect(() => {
    const playAudio = (fileUrl) => {
      if (!fileUrl) return;
      const audio = new Audio(fileUrl);
      audio.play();
    };

    const handleKeyPress = (event) => {
      const sound = soundboard.find((s) => s.key === event.key);
      if (sound) {
        playAudio(sound.fileUrl);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [soundboard]);

  const getSoundUrl = async (
    fileId: Id<"_storage">
  ): Promise<string | null> => {
    try {
      const data = await useQuery(api.sound.getSoundUrl, { fileId });
      console.log({ data });
      return data || null;
    } catch (error) {
      console.error("Error fetching sound URL:", error);
      return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Soundboard</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add to Soundboard
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] overflow-hidden min-h-[40vh] border-green ">
          <DialogHeader>
            <DialogTitle>Search and Add Sounds</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Search sounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
          <Tabs
            defaultValue="all"
            className="w-full border-green px-0"
            onValueChange={setActiveCategory}
          >
            <TabsList className="w-full flex items-center justify-start flex-wrap h-auto space-y-1">
              <TabsTrigger value="all" className="cursor-pointer">
                All
              </TabsTrigger>
              <TabsTrigger value="anime" className="cursor-pointer">
                Anime
              </TabsTrigger>
              <TabsTrigger value="memes" className="cursor-pointer">
                Memes
              </TabsTrigger>
              <TabsTrigger value="movies" className="cursor-pointer">
                Movies
              </TabsTrigger>
              <TabsTrigger value="music" className="cursor-pointer">
                Music
              </TabsTrigger>
              <TabsTrigger value="viral" className="cursor-pointer">
                Viral
              </TabsTrigger>
              <TabsTrigger value="discord" className="cursor-pointer">
                Discord
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="cursor-pointer">
                TikTok
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[400px] px-4 py-4 mb-4 bg-muted/90 border rounded-md">
            <div className="space-y-2">
              {soundUrl && (
                <audio
                  ref={audioRef}
                  src={soundUrl}
                  onEnded={() => {
                    setIsPlaying(false);
                    // setProgress(100);
                  }}
                />
              )}
              {sounds?.map((sound) => (
                <Card
                  key={sound._id}
                  className="py-0 border rounded-md shadow-sm overflow-hidden "
                >
                  <CardContent className="p-0 m-0">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={(e) => {
                            togglePlay(e);
                            setSoundUrl(sound.audioUrl as string);
                          }}
                          className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full"
                        >
                          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        </button>

                        <div className="flex flex-col">
                          <span className="font-medium capitalize text-sm">
                            {sound.title}
                          </span>
                          <Badge
                            variant="outline"
                            className="w-fit bg-muted-foreground/10 text-xs mt-1 "
                          >
                            {sound.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() =>
                          addToSoundboard(sound.fileId, sound.title)
                        }
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {sounds?.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">
                  No sounds found. Try a different search term.
                </p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <h2 className="text-xl font-semibold mt-8">Your Soundboard</h2>
      <div className="grid min-h-40 p-4 bg-muted-foreground/10 w-full border-dotted border-3 rounded-md grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {/* <div className="min-h-12 bg-foreground/10 w-full">a</div> */}
        {[1, 2, 3].map((sound) => (
          <SoundboardCard
            key={sound._id}
            sound={sound}
            onAssignKey={assignKey}
          />
        ))}
      </div>
    </div>
  );
}

const SoundboardCard = ({ sound, onAssignKey }) => {
  const [key, setKey] = useState(sound.key || "");
  const handleKeyChange = (e) => {
    const newKey = e.target.value.toLowerCase();
    if (newKey.length === 1) {
      setKey(newKey);
      onAssignKey(sound.id, newKey);
    }
  };
  return (
    <div
      key={sound.id}
      className="relative group border-2 border-gray-200 bg-white rounded-md p-4 hover:border-gray-300 transition-colors"
    >
      <button
        // onClick={() => playSound(sound.id)}
        className={`w-full h-full flex flex-col items-center justify-center gap-3 ${
          true ? "text-blue-500" : ""
        }`}
      >
        <Volume2 className="h-6 w-6" />
        <span className="text-sm">{sound.name ?? "title"}</span>
        {sound.shortcut && (
          <span className="text-xs px-2 py-1 bg-gray-100 rounded text-muted-foreground uppercase">
            {sound.shortcut}
          </span>
        )}
      </button>
      <button
        // onClick={() => removeSound(sound.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100"
      >
        <Trash2 className="h-3 w-3 text-gray-400" />
      </button>
    </div>
  );
};
