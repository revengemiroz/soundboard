"use client";

import React, { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UploadButton } from "@/lib/uploadthing";
// import { uploadSoundV1 } from "@/convex/sound";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Convex Mutations
  const generateUploadUrl = useMutation(api.sound.generateUploadUrl);
  const uploadSound = useMutation(api.sound.uploadSound);
  const uploadSoundV1 = useMutation(api.sound.uploadSoundV1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioURL || !title || !category) {
      setError("Please fill all fields and select a file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Step 1: Get a temporary upload URL from Convex
      // const uploadUrl = await generateUploadUrl();

      // Step 2: Upload file to Convex Storage
      // const formData = new FormData();
      // formData.append("file", file);

      // const response = await fetch(uploadUrl, {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to upload file");
      // }

      // Step 3: Get Convex Storage ID
      // const { storageId } = await response.json();

      // Step 4: Save Metadata in Convex Database
      await uploadSoundV1({
        title,
        category,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        // fileId: storageId, // Store file ID instead of URL
        uploadthingURL: audioURL as string,
      });

      router.push("/");
    } catch (err) {
      setError("Failed to upload sound");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const audioFile = acceptedFiles[0];
      setFile(audioFile);
      setTitle(audioFile.name.replace(/\.[^/.]+$/, ""));
    },
    accept: {
      "audio/*": [".mp3", ".wav", ".ogg"],
    },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Upload className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Upload a Sound
          </h2>
          <p className="mt-2 text-gray-600">
            Share your favorite sound effects with the community
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-6"
        >
          <UploadButton
            endpoint="audioUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              if (res) {
                setAudioURL(res[0]?.ufsUrl);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          {/* <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {file
                ? file.name
                : "Drag & drop an audio file, or click to select"}
            </p>
          </div> */}

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="anime">Anime</option>
              <option value="memes">Memes</option>
              <option value="movies">Movies</option>
              <option value="music">Music</option>
              <option value="viral">Viral</option>
              <option value="sound-effects">Sound Effects</option>
              <option value="discord">Discord</option>
              <option value="tiktok">Tiktok</option>
              <option value="nepali">Nepali</option>
            </select>
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="funny, effect, meme"
            />
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={!audioURL || isUploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Sound"}
          </button>
        </form>
      </div>
    </div>
  );
}
