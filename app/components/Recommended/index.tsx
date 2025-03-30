"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SoundCard from "../SoundGrid/list";
import { Sparkles } from "lucide-react";

type Props = {
  soundId: any;
};

export default function RecommendedSounds({ soundId }: Props) {
  const recommended = useQuery(api.sound.getRecommendedSounds, { soundId });

  if (recommended === undefined) return <p>Loading...</p>;
  if (recommended.length === 0) return <p>No recommendations found.</p>;

  return (
    <div className="w-full py-8 mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-600" size={20} />
          <h2 className="text-2xl font-bold">Recommended Sounds</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((sound, index) => (
          <SoundCard
            key={index}
            id={sound._id}
            title={sound.title}
            category={sound.category}
            soundUrl={sound.uploadthingURL}
            sound={sound}
          />
        ))}
      </div>
    </div>
  );
}
