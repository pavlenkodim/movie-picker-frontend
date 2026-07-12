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

  // сброс индекса при получении новой пачки, sessionStats и totalCount трогать не нужно —
  // totalCount обновится сам от новых данных, а sessionStats можно чистить отдельно, если нужно
  resetIndex: () => set({ currentIndex: 0 }),
}));

export default useSwipeSessionStore;
