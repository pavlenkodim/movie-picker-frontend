import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../schemas";
import { apiClient } from "@/shared/api/api";
import { useLogin } from "./useLogin";
import { AuthResponce } from "@/shared/types";

export const useRegister = () => {
  const { mutate: login } = useLogin();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const result = await apiClient<AuthResponce, LoginFormValues>("auth/registration", {
        method: "POST",
        body: { ...data },
      });

      return { ...result, password: data.password };
    },
    onSuccess: (data) => {
      login({ email: data.user.email, password: data.password });
    },
    onError: (error: Error) => {
      console.error("Login failed:", error);
    },
  });
};
