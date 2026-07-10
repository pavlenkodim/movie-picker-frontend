import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../schemas";
import { apiClient } from "@/shared/api/api";
import { AuthResponce } from "@/shared/types";
import { signInWithCredentials } from "../utils";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const result = await apiClient<AuthResponce, LoginFormValues>("auth/registration", {
        method: "POST",
        body: { ...data },
      });
      await signInWithCredentials(data.email, data.password, false);
      return result;
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error);
    },
  });
};
