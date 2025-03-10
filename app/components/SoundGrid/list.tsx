"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Play, Pause, Download, PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Howl, Howler } from "howler";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Music,
  Mic2,
  Headphones,
  Radio,
  Volume2,
  Disc,
  Heart,
  Star,
  Zap,
} from "lucide-react";

import "react-circular-progressbar/dist/styles.css";

const iconComponents = {
  Music,
  Mic2,
  Headphones,
  Radio,
  Volume2,
  Disc,
  Heart,
  Star,
  Zap,
};
const colors = [
  "bg-indigo-600",
  "bg-pink-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-orange-500",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

interface SoundCardProps {
  title: string;
  id: Id<"sounds">;
  category: string;
  setSheetOpen: (boolean) => void;
  fileId: Id<"_storage">;
}

export default function SoundCard({
  id,
  title,
  category,
  fileId,
  setSheetOpen,
}: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [Icon, setIcon] = useState<ReactNode>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [progress, setProgress] = useState(0);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const soundRef = useRef<Howl | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const soundUrl = useQuery(api.sound.getSoundUrl, { fileId });
  const router = useRouter();

  // Check if device is iOS
  const isIOS =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  // On component mount
  useEffect(() => {
    const randomIconKey = getRandomElement(Object.keys(iconComponents));
    setIcon(iconComponents[randomIconKey]);
    setColor(getRandomElement(colors));

    // For iOS, unlock the audio context on first user interaction
    if (isIOS) {
      const unlockAudio = () => {
        // Create a temporary audio context for iOS unlock
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContext.resume().then(() => {
          console.log("AudioContext unlocked on iOS");
        });

        // Play a silent audio to unlock
        const audio = new Audio();
        audio
          .play()
          .then(() => {
            console.log("Silent audio played successfully");
          })
          .catch((e) => {
            console.warn("Failed to play silent audio:", e);
          });

        document.removeEventListener("touchstart", unlockAudio);
      };

      document.addEventListener("touchstart", unlockAudio, false);

      return () => {
        document.removeEventListener("touchstart", unlockAudio);
      };
    }
  }, []);

  const testUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  // When sound URL is available
  useEffect(() => {
    if (!soundUrl) return;

    // For iOS, try using native HTML5 Audio element as fallback
    if (isIOS) {
      try {
        // If we already have an audio element, clean it up
        if (audioElementRef.current) {
          audioElementRef.current.pause();
          audioElementRef.current.src = "";
        }

        // Create new audio element
        const audioElement = new Audio(testUrl);
        audioElement.preload = "auto";

        audioElement.oncanplaythrough = () => {
          console.log("Audio can play through");
          setAudioReady(true);
        };

        audioElement.onended = () => {
          console.log("Audio ended");
          setIsPlaying(false);
          setProgress(0);
          audioElement.currentTime = 0;
          stopProgressTracking();
        };

        audioElement.onerror = (e) => {
          console.error("Audio error:", e);
          setAudioError("Failed to load audio");
        };

        // Store reference
        audioElementRef.current = audioElement;

        // Try to load the audio
        audioElement.load();

        console.log("Using native HTML5 Audio for iOS");
      } catch (error) {
        console.error("Error setting up HTML5 Audio:", error);
        setAudioError("Failed to initialize audio");
      }
    }
    // For non-iOS devices, use Howler
    else {
      try {
        // Clean up previous instance
        if (soundRef.current) {
          soundRef.current.unload();
        }

        // Force HTML5 Audio mode for all devices
        Howler.html5PoolSize = 10;

        // Initialize new Howl
        soundRef.current = new Howl({
          src: [testUrl],
          html5: true,
          preload: true,
          format: ["mp3"],
          onplay: () => {
            console.log("Howl onplay fired");
            setIsPlaying(true);
            startProgressTracking();
          },
          onpause: () => {
            console.log("Howl onpause fired");
            setIsPlaying(false);
            stopProgressTracking();
          },
          onend: () => {
            console.log("Howl onend fired");
            setIsPlaying(false);
            setProgress(0);
            if (soundRef.current) {
              soundRef.current.seek(0);
            }
            stopProgressTracking();
          },
          onload: () => {
            console.log("Howl onload fired");
            setAudioReady(true);
            setAudioError(null);
          },
          onloaderror: (id, error) => {
            console.error("Howl load error:", error);
            setAudioError("Failed to load audio");
          },
          onplayerror: (id, error) => {
            console.error("Howl play error:", error);
            setAudioError("Failed to play audio");
          },
        });

        console.log("Using Howler for non-iOS device");
      } catch (error) {
        console.error("Error setting up Howler:", error);
        setAudioError("Failed to initialize audio");
      }
    }

    return () => {
      stopProgressTracking();

      // Clean up resources
      if (soundRef.current) {
        soundRef.current.unload();
      }

      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = "";
      }
    };
  }, [soundUrl, isIOS]);

  // Progress tracking function for both Howler and HTML5 Audio
  const startProgressTracking = () => {
    const updateProgress = () => {
      try {
        if (isIOS && audioElementRef.current) {
          // HTML5 Audio progress tracking
          const currentTime = audioElementRef.current.currentTime || 0;
          const totalDuration = audioElementRef.current.duration || 1;
          const newProgress = (currentTime / totalDuration) * 100;
          setProgress(newProgress);
        } else if (soundRef.current && soundRef.current.playing()) {
          // Howler progress tracking
          const currentTime = soundRef.current.seek() || 0;
          const totalDuration = soundRef.current.duration() || 1;
          const newProgress = (currentTime / totalDuration) * 100;
          setProgress(newProgress);
        }

        // Continue the loop
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } catch (error) {
        console.error("Error in progress tracking:", error);
      }
    };

    // Start the loop
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const stopProgressTracking = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Play/pause function that works for both Howler and HTML5 Audio
  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("Toggle play clicked, isIOS:", isIOS);

    try {
      if (isIOS && audioElementRef.current) {
        // For iOS using HTML5 Audio
        console.log("Using HTML5 Audio toggle, isPlaying:", isPlaying);

        if (isPlaying) {
          audioElementRef.current.pause();
          setIsPlaying(false);
          stopProgressTracking();
        } else {
          // On iOS, we need to call load() before play() for some cases
          audioElementRef.current.load();

          // Use play() with promise handling for better iOS support
          const playPromise = audioElementRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Audio play succeeded");
                setIsPlaying(true);
                startProgressTracking();
              })
              .catch((error) => {
                console.error("Audio play failed:", error);
                // Try playing with user gesture in the error case
                const userPlayAttempt = () => {
                  audioElementRef.current
                    ?.play()
                    .then(() => {
                      console.log("User gesture play succeeded");
                      setIsPlaying(true);
                      startProgressTracking();
                    })
                    .catch((err) => {
                      console.error(
                        "Even with user gesture, play failed:",
                        err
                      );
                      setAudioError("Cannot play audio. Try again.");
                    });

                  document.removeEventListener("touchend", userPlayAttempt);
                };

                document.addEventListener("touchend", userPlayAttempt, {
                  once: true,
                });
              });
          }
        }
      } else if (soundRef.current) {
        // For non-iOS using Howler
        console.log("Using Howler toggle, isPlaying:", isPlaying);

        if (isPlaying) {
          soundRef.current.pause();
        } else {
          soundRef.current.play();
        }
      }
    } catch (error) {
      console.error("Error in togglePlay:", error);
      setAudioError("Play/pause operation failed");
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!soundUrl) return;

    try {
      const response = await fetch(soundUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = title + ".mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  const addToSoundBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSheetOpen(true);
  };

  return (
    <div
      onClick={() => {
        router.push(`/sounds/${id}`);
      }}
      className="bg-white rounded-xl cursor-pointer shadow-lg p-4 py-8 flex flex-col items-center justify-between border border-gray-200 hover:shadow-xl transition-all"
    >
      {/* Circular Progress Bar for Audio Playback */}
      <div className="w-20 h-20 relative">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            textSize: "24px",
            pathColor: "#4F46E5",
            trailColor: "#E5E7EB",
          })}
        />
        {Icon && (
          <Icon
            className={`absolute inset-0 border rounded-full flex items-center justify-center w-[75%] h-auto text-white m-auto p-[12px] ${color && color}`}
          />
        )}
      </div>

      {/* Error message if any */}
      {audioError && (
        <div className="text-red-500 text-xs mt-2">{audioError}</div>
      )}

      {/* Title & Category */}
      <TooltipProvider>
        <div className="text-center">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>
          <p className="text-sm text-gray-500 capitalize">{category}</p>
        </div>

        {/* Play & Download Buttons */}
        <div className="flex items-center gap-4 mt-3">
          {soundUrl && (
            <button
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white p-3 rounded-full flex"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          )}

          {soundUrl && (
            <span onClick={handleDownload}>
              <Tooltip>
                <TooltipTrigger className="bg-gray-200 flex items-center justify-center cursor-pointer p-3 rounded-full hover:bg-gray-300">
                  <Download size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </span>
          )}

          {soundUrl && (
            <span onClick={addToSoundBoard}>
              <Tooltip>
                <TooltipTrigger className="bg-gray-200 flex items-center justify-center cursor-pointer p-3 rounded-full hover:bg-gray-300">
                  <PlusCircle size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Soundboard</p>
                </TooltipContent>
              </Tooltip>
            </span>
          )}
        </div>
      </TooltipProvider>

      {/* Hidden loader for iOS */}
      {isIOS && (
        <audio
          style={{ display: "none" }}
          preload="auto"
          playsInline
          src={soundUrl || ""}
        />
      )}
    </div>
  );
}
