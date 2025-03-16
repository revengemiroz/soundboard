"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useAudioStore } from "@/app/zustand/store";

const EditSound = () => {
  const router = useRouter();
  const { id } = useParams();
  const sound = useQuery(api.sound.getSoundById, { id: id });
  const updateSound = useMutation(api.sound.updateSound);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const isAdmin = useAudioStore((state) => state.isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Not admin
      </div>
    ); // Prevent rendering before

  useEffect(() => {
    if (sound) {
      setTitle(sound.title);
      setCategory(sound.category);
      setTags(sound.tags.join(", "));
    }
  }, [sound]);

  const handleUpdate = async () => {
    await updateSound({
      id,
      title,
      category,
      tags: tags.split(",").map((t) => t.trim()),
    });

    router.push("/"); // Redirect after update
  };

  if (!sound) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Edit Sound</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 mb-2"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default EditSound;
