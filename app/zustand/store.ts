import { create } from "zustand";

interface Sound {
  _id: string;
  audioUrl: string;
  category: string;
  createdAt: number;
  tags: string[];
  title: string;
  uploadingURL: string;
  _creationTime: number;
}

interface AudioStore {
  audio: HTMLAudioElement | null;
  soundboard: Sound[];
  currentAudioId: string | null;
  progress: number;
  sheetOpen: boolean; // ✅ Added back sheet state
  playAudio: (id: string, url: string) => void;
  stopAudio: () => void;
  addToSoundboard: (sound: Sound) => void;
  removeFromSoundboard: (_id: string) => void;
  isInSoundboard: (_id: string) => boolean;
  setSheetOpen: (open: boolean) => void; // ✅ Added function to control sheet
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audio: null,
  soundboard: [],
  currentAudioId: null,
  progress: 0,
  sheetOpen: false, // Default state is closed

  playAudio: (id: string, url: string) => {
    get().stopAudio(); // Stop any currently playing audio

    const newAudio = new Audio(url);
    newAudio.preload = "auto";
    newAudio.crossOrigin = "anonymous";
    newAudio.muted = false;

    newAudio.addEventListener("timeupdate", () => {
      if (newAudio.duration > 0) {
        set({ progress: (newAudio.currentTime / newAudio.duration) * 100 });
      }
    });

    newAudio.addEventListener("ended", () => {
      set({ currentAudioId: null, progress: 100 });
    });

    newAudio.addEventListener("error", () => {
      console.error("Audio playback error, resetting...");
      get().stopAudio();
    });

    newAudio
      .play()
      .then(() => {
        set({ audio: newAudio, currentAudioId: id, progress: 0 });
      })
      .catch((error) => {
        console.error("Audio play error:", error);
      });
  },

  stopAudio: () => {
    const currentAudio = get().audio;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = ""; // Unmount old audio
      set({ audio: null, currentAudioId: null, progress: 0 });
    }
  },

  addToSoundboard: (sound: Sound) => {
    if (!get().isInSoundboard(sound._id)) {
      set((state) => ({
        soundboard: [...state.soundboard, sound],
      }));
    }
  },

  removeFromSoundboard: (_id: string) => {
    set((state) => ({
      soundboard: state.soundboard.filter((sound) => sound._id !== _id),
    }));
    if (get().currentAudioId === _id) {
      get().stopAudio();
    }
  },

  isInSoundboard: (_id: string) => {
    return get().soundboard.some((sound) => sound._id === _id);
  },

  setSheetOpen: (open: boolean) => {
    set({ sheetOpen: open });
  },
}));

// Stop audio when tab is hidden
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      useAudioStore.getState().stopAudio();
    }
  });
}
