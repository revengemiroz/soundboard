import { create } from "zustand";

// Zustand Store
interface AudioStore {
  audio: HTMLAudioElement | null;
  playAudio: (url: string) => void;
  stopAudio: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audio: null,

  // Function to play a new audio file
  playAudio: (url: string) => {
    // Stop the existing audio if any
    get().stopAudio();

    // Create a new audio instance
    const newAudio = new Audio(url);
    newAudio.play();

    // Update the state with the new audio instance
    set({ audio: newAudio });
  },

  // Function to stop the currently playing audio
  stopAudio: () => {
    const currentAudio = get().audio;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = ""; // Unmount old audio
      set({ audio: null });
    }
  },
}));

// Listen for tab visibility change to stop audio
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      useAudioStore.getState().stopAudio();
    }
  });
}
