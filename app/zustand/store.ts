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
  playAudio: (id: string, url: string) => void;
  stopAudio: () => void;
  toggleRepeat: (id: string, url: string) => void;
  addToSoundboard: (sound: Sound) => void;
  removeFromSoundboard: (_id: string) => void;
  isInSoundboard: (_id: string) => boolean;
  setSheetOpen: (open: boolean) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  audio: null,
  soundboard: [],
  currentAudioId: null,
  progress: 0,
  isLooping: false,
  sheetOpen: false,

  playAudio: (id: string, url: string) => {
    get().stopAudio(); // Stop any currently playing audio

    const newAudio = new Audio(url);
    newAudio.preload = "auto";
    newAudio.crossOrigin = "anonymous";
    newAudio.muted = false;
    newAudio.loop = get().isLooping; // ✅ Apply loop setting

    newAudio.addEventListener("timeupdate", () => {
      if (newAudio.duration > 0) {
        set({ progress: (newAudio.currentTime / newAudio.duration) * 100 });
      }
    });

    newAudio.addEventListener("ended", () => {
      if (get().isLooping) {
        newAudio.currentTime = 0;
        newAudio.play(); // ✅ Manually restart if looping
      } else {
        set({ currentAudioId: null, progress: 100 });
      }
    });

    newAudio.addEventListener("error", () => {
      // console.error("Audio playback error, resetting...");
      get().stopAudio();
    });

    newAudio
      .play()
      .then(() => {
        set({ audio: newAudio, currentAudioId: id, progress: 0 });
      })
      .catch((error) => {
        // console.error("Audio play error:", error);
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

  toggleRepeat: (id: string, url: string) => {
    set((state) => {
      const newLoopState = !state.isLooping;

      // If no audio is playing, start playback with looping
      if (!state.currentAudioId) {
        get().playAudio(id, url);
      }

      // Apply loop setting to existing audio
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
}));

// Stop audio when tab is hidden
// if (typeof document !== "undefined") {
//   document.addEventListener("visibilitychange", () => {
//     if (document.hidden) {
//       useAudioStore.getState().stopAudio();
//     }
//   });
// }
