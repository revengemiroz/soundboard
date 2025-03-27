import { create } from "zustand";

interface Sound {
  _id: string;
  category: string;
  createdAt: number;
  tags: string[];
  title: string;
  uploadthingURL: string;
  _creationTime: number;
}

interface AudioStore {
  audio: HTMLAudioElement | null;
  soundboard: Sound[];
  currentAudioId: string | null;
  progress: number;
  sheetOpen: boolean;
  isLooping: boolean;
  isAdmin: boolean;
  searchTerm: string;
  playAudio: (id: string, url: string) => void;
  stopAudio: () => void;
  toggleRepeat: (id: string, url: string) => void;
  addToSoundboard: (sound: Sound) => void;
  removeFromSoundboard: (_id: string) => void;
  isInSoundboard: (_id: string) => boolean;
  setSheetOpen: (open: boolean) => void;
  setIsAdmin: (value: boolean) => void;
  // homepage search
  setSearchTerm: (value: string) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => {
  // Retrieve isAdmin from localStorage (default to false if not found)
  const storedIsAdmin =
    typeof window !== "undefined" ? localStorage.getItem("isAdmin") : "false";

  return {
    audio: null,
    soundboard: [],
    currentAudioId: null,
    progress: 0,
    isLooping: false,
    sheetOpen: false,
    isAdmin: storedIsAdmin === "true", // Convert to boolean
    searchTerm: "",

    playAudio: (id: string, url: string) => {
      get().stopAudio(); // Stop any currently playing audio

      const newAudio = new Audio(url);
      newAudio.preload = "auto";
      newAudio.crossOrigin = "anonymous";
      newAudio.muted = false;
      newAudio.loop = get().isLooping;

      newAudio.addEventListener("timeupdate", () => {
        if (newAudio.duration > 0) {
          set({ progress: (newAudio.currentTime / newAudio.duration) * 100 });
        }
      });

      newAudio.addEventListener("ended", () => {
        if (get().isLooping) {
          newAudio.currentTime = 0;
          newAudio.play();
        } else {
          set({ currentAudioId: null, progress: 100 });
        }
      });

      newAudio.addEventListener("error", () => {
        get().stopAudio();
      });

      newAudio
        .play()
        .then(() => {
          set({ audio: newAudio, currentAudioId: id, progress: 0 });
        })
        .catch(() => {});
    },

    stopAudio: () => {
      const currentAudio = get().audio;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = "";
        set({ audio: null, currentAudioId: null, progress: 0 });
      }
    },

    toggleRepeat: (id: string, url: string) => {
      set((state) => {
        const newLoopState = !state.isLooping;

        if (!state.currentAudioId) {
          get().playAudio(id, url);
        }

        if (state.audio) {
          state.audio.loop = newLoopState;
        }

        return { isLooping: newLoopState };
      });
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

    setIsAdmin: (value: boolean) => {
      localStorage.setItem("isAdmin", String(value)); // Store as string in localStorage
      set({ isAdmin: value });
    },
    // home page search
    setSearchTerm: (value: string) => {
      set({ searchTerm: value });
    },
  };
});
