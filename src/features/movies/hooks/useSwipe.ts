import { apiClient } from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";
import { SwipeData, SwipeResponse } from "../types";
import { useNotification } from "@/shared/hooks/useNotification";

export function useSwipe() {
  const { notify } = useNotification();
  return useMutation({
    mutationFn: (data: SwipeData) =>
      apiClient<SwipeResponse, SwipeData>("swipes", { method: "POST", body: data }),
    onError: (error) => {
      notify("error", error.message);
      console.error("Error swiping movie:", error);
    },
  });
}
