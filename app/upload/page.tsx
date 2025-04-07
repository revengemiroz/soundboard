"use client";

import React, { useEffect, useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UploadButton } from "@/lib/uploadthing";
import { useAudioStore } from "../zustand/store";

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadSoundV1 = useMutation(api.sound.uploadSoundV1);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioURL || !title || !category) {
      setError("Please fill all fields and select a file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await uploadSoundV1({
        title,
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        uploadthingURL: audioURL,
      });

      router.push("/");
    } catch (err) {
      setError("Failed to upload sound.");
    } finally {
      setIsUploading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Upload className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Upload a Sound
          </h2>
          <p className="mt-1 text-gray-600">
            Share your favorite sounds with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Button */}
          <UploadButton
            appearance={{ button: "bg-indigo-700 px-4" }}
            className="rounded-md py-6 bg-muted-foreground/20 !text-indigo-600"
            endpoint="audioUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setAudioURL(res[0]?.ufsUrl);
                const fileName = res[0]?.name.replace(/\.[^/.]+$/, "");
                setTitle(fileName); // Set extracted name as title
              }
            }}
            onUploadError={(error: Error) =>
              alert(`Upload Error: ${error.message}`)
            }
          />

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Input */}
          <FormInput
            label="Title"
            type="text"
            value={title}
            placeholder="Enter a title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Category Selection */}
          <FormSelect
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              "Anime",
              "Memes",
              "Movies",
              "Music",
              "Viral",
              "Sound-Effects",
              "Discord",
              "Tiktok",
              "Nepali",
              "Indian",
            ]}
            required
          />

          {/* Tags Input */}
          <FormInput
            label="Tags (comma-separated)"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="funny, effect, meme"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!audioURL || isUploading}
            className="w-full cursor-pointer py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Sound"}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Form Input Component */
function FormInput({
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        required={required}
      />
    </div>
  );
}

/** Form Select Component */
function FormSelect({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a category</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
