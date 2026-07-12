"use client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../types";
import { apiClient } from "@/shared/api/api";

interface ScoredMovie {
  movie: Movie;
  score: number;
}

interface RecommendationResponse {
  data: ScoredMovie[];
  hasMore: boolean;
}

export const useMovies = () => {
  return useQuery<RecommendationResponse, Error, Movie[]>({
    queryKey: ["recommendations", "active"],
    queryFn: () => apiClient<RecommendationResponse>("recommendations"),
    select: (response) => response.data.map((r) => r.movie),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useMovies;
