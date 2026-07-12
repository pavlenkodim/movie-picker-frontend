import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/api";
import { Genre } from "../types";

export default function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient<Genre[]>("genres"),
    staleTime: Infinity,
  });
}
