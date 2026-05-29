import { create } from "zustand";
import { MovieStore, SessionStat } from "../types";

const useMovieStore = create<MovieStore>((set, get) => ({
  activeMovies: [],
  pendingMovies: [],
  currentIndex: 0,
  isInfoOpen: false,
  sessionStats: [],

  swipe: (movieId, action) => {
    const { currentIndex, activeMovies, sessionStats } = get();

    const newStats: SessionStat[] = [...sessionStats, { movieId, action, timestamp: Date.now() }];

    const nextIndex = currentIndex + 1;

    set({
      sessionStats: newStats,
      currentIndex: nextIndex,
    });

    if (nextIndex >= activeMovies.length) {
      get().promotePending();
    }
  },

  openInfo: () => set({ isInfoOpen: true }),
  closeInfo: () => set({ isInfoOpen: false }),

  setActiveMovies: (movies) => set({ activeMovies: movies }),
  setPendingMovies: (movies) => set({ pendingMovies: movies }),

  promotePending: () => {
    const { pendingMovies, sessionStats } = get();

    console.log("Sending stats:", sessionStats);

    set({
      activeMovies: pendingMovies,
      pendingMovies: [],
      currentIndex: 0,
      sessionStats: [],
    });
  },
}));

export default useMovieStore;
