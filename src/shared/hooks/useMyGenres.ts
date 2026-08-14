import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";
import { GenreWeight } from "@/features/profile/types";

export default function useMyGenres() {
  return useQuery({
    queryKey: ["myGenres"],
    queryFn: () => apiClient<GenreWeight[]>("genre-weights"),
  });
}
