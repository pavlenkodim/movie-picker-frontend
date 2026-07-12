import { Genre } from "@/shared/types";

export type SwipeAction = "like" | "dislike";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  releaseDate: string;
  genres: Genre[];
}

export interface CastMember {
  id: number;
  name: string;
  photoUrl?: string;
}

export interface Actor {
  id: number;
  name: string;
  photoUrl?: string;
}

export interface SessionStat {
  movieId: number;
  action: SwipeAction;
  timestamp: number;
}

export interface MovieStore {
  activeMovies: Movie[];
  pendingMovies: Movie[];
  currentIndex: number;

  isInfoOpen: boolean;

  sessionStats: SessionStat[];

  swipe: (movieId: number, action: SwipeAction) => void;
  openInfo: () => void;
  closeInfo: () => void;
  promotePending: () => void;
  setPendingMovies: (movies: Movie[]) => void;
  setActiveMovies: (movies: Movie[]) => void;
}
