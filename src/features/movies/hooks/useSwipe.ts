import { apiClient } from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";
import { SwipeData, SwipeResponse } from "../types";

export function useSwipe() {
  return useMutation({
    mutationFn: (data: SwipeData) =>
      apiClient<SwipeResponse, SwipeData>("swipes", { method: "POST", body: data }),
    onError: (error) => {
      console.error("Error swiping movie:", error);
    },
  });
}
