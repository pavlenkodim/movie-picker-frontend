import { apiClient } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export function useSwipe(data: SwipeData) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient<SwipeResponse, SwipeData>("swipes", { method: "POST", body: data }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}
