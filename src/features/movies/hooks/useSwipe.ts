import { apiClient } from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";

interface SwipeData {
  movieId: number;
  liked: boolean;
}

interface SwipeResponse {
  id: number;
  profileId: number;
  movieId: number;
  liked: boolean;
}

export function useSwipe() {
  return useMutation({
    mutationFn: (data: SwipeData) =>
      apiClient<SwipeResponse, SwipeData>("swipes", { method: "POST", body: data }),
    onError: (error) => {
      console.error("Error swiping movie:", error);
    },
  });
}
