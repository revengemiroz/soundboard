"use client";

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Upload, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
// import { useSoundStore } from '../../lib/utils';
import { validateAudioFile } from "../../lib/utils";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  //   const { uploadSound } = useSoundStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const audioFile = acceptedFiles[0];
      try {
        await validateAudioFile(audioFile);
        setFile(audioFile);
        setTitle(audioFile.name.replace(/\.[^/.]+$/, ""));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid audio file");
      }
    },
    accept: {
      "audio/*": [".mp3", ".wav", ".ogg"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      //   await uploadSound(file, {
      //     title,
      //     category,
      //     tags: tags
      //       .split(",")
      //       .map((tag) => tag.trim())
      //       .filter(Boolean),
      //     status: "pending",
      //   });
      router.push("/");
    } catch (err) {
      setError("Failed to upload sound");
    } finally {
      setIsUploading(false);
    }
  };

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
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <div
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
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

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
              <option value="meme">Meme</option>
              <option value="effect">Sound Effect</option>
              <option value="music">Music</option>
              <option value="voice">Voice</option>
            </select>
          </div>

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

          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Sound"}
          </button>
        </form>
      </div>
    </div>
  );
}
