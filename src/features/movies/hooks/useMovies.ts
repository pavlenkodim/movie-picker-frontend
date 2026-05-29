import { useQuery } from "@tanstack/react-query";
import useMovieStore from "../store/movieStore";
import { Movie } from "../types";
import { useEffect } from "react";

const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch("/data/movies.json");
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

export const useMovies = () => {
  const { setActiveMovies, setPendingMovies, currentIndex, activeMovies } = useMovieStore();

  const activeQuery = useQuery<Movie[]>({
    queryKey: ["movies", "active"],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (activeQuery.data) {
      setActiveMovies(activeQuery.data);
    }
  }, [activeQuery.data, setActiveMovies]);

  const pendingQuery = useQuery<Movie[]>({
    queryKey: ["movies", "pending"],
    queryFn: fetchMovies,
    enabled: currentIndex >= activeMovies.length - 3 && activeMovies.length > 0,
  });

  useEffect(() => {
    if (pendingQuery.data) {
      setPendingMovies(pendingQuery.data);
    }
  }, [pendingQuery.data, setPendingMovies]);

  return {
    isLoading: activeQuery.isLoading,
    isError: activeQuery.isError,
  };
};

export default useMovies;
