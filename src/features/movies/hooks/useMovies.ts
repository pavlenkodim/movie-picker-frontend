"use client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../types";
import { apiClient } from "@/shared/api/api";

interface RecommendationResponse {
  movie: Movie;
  score: number;
}

export const useMovies = () => {
  return useQuery<RecommendationResponse[]>({
    queryKey: ["recommendations", "active"],
    queryFn: () => apiClient<RecommendationResponse[]>("recommendations"),
    // select: (data) => data.map((r) => r.movie),
    staleTime: 0,
  });
};

export default useMovies;
