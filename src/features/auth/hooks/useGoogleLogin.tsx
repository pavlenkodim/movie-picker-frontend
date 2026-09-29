import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../utils";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async (callbackUrl?: string) => {
      return await signInWithGoogle(callbackUrl);
    },
    onError: (error: Error) => {
      console.error("Google login failed:", error);
    },
  });
};
