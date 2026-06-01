export type SwipeAction = "like" | "dislike" | "skip";

export interface Movie {
  id: number;
  title: string;
  year: number;
  duration: number;
  rating: number;
  genres: string[];
  synopsis: string;
  posterUrl: string;
  backdropUrl?: string;
  // cast?: CastMember[];
  actors?: Actor[];
  director: string;
  studio: string;
  trailerUrl?: string;
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
