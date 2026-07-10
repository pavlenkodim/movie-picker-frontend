import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../schemas";
import { signInWithCredentials } from "../utils";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await signInWithCredentials(data.email, data.password, false);
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
  });
};
