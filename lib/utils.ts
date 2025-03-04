import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateAudioUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return contentType?.startsWith("audio/") || false;
  } catch {
    return false;
  }
};

export const validateAudioFile = async (file: File): Promise<void> => {
  const validTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];

  if (!validTypes.includes(file.type)) {
    throw new Error(
      "Invalid audio format. Please upload MP3, WAV, or OGG files."
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    // 10MB limit
    throw new Error("File size too large. Maximum size is 10MB.");
  }

  return Promise.resolve();
};

export const uploadAudioFile = async (file: File): Promise<string> => {
  // Mock implementation - replace with actual file upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      resolve(mockUrl);
    }, 1500);
  });
};
