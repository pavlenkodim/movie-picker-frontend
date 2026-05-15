import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { LoginFormValues } from "../schemas/loginShema";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok || result?.error) {
        throw new Error(result?.error || "Invalid credentials");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
