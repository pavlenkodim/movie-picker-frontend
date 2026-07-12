import { create } from "zustand";
import { SessionStat } from "../types";

interface SwipeSessionStore {
  currentIndex: number;
  totalCount: number;
  sessionStats: SessionStat[];
  swipe: (movieId: number, action: "like" | "dislike") => void;
  setTotalCount: (count: number) => void;
  resetIndex: () => void;
}

const useSwipeSessionStore = create<SwipeSessionStore>((set) => ({
  currentIndex: 0,
  totalCount: 0,
  sessionStats: [],

  swipe: (movieId, action) =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
      sessionStats: [...state.sessionStats, { movieId, action, timestamp: Date.now() }],
    })),

  setTotalCount: (count) => set({ totalCount: count }),

  // Reset the current index to 0 and clear session stats
  resetIndex: () => set({ currentIndex: 0 }),
}));

export default useSwipeSessionStore;
