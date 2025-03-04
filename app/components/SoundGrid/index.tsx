"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SoundCard from "./list";

export default function SoundList() {
  const sounds = useQuery(api.sound.listSounds);

  if (!sounds) return <p>Loading sounds...</p>;
  if (sounds.length === 0) return <p>No sounds uploaded yet.</p>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Sound Library</h2>
      <div className="grid gap-4">
        {sounds.map((sound) => (
          <SoundCard
            key={sound._id}
            title={sound.title}
            category={sound.category}
            fileId={sound.fileId}
          />
        ))}
      </div>
    </div>
  );
}
