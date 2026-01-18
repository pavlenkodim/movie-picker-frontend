import { apiClient } from "@/shared/api/api";
import { useAuthStore } from "@/shared/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient<AuthResponse, LoginRequest>("/auth/login", {
        method: "POST",
        body: data,
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push("/");
    },
  });
};

export const useRegister = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: Omit<RegisterRequest, "confirmPassword">) =>
      apiClient<Omit<AuthResponse, "confirmPassword">, RegisterRequest>("/auth/register", {
        method: "POST",
        body: data,
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push("/");
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return () => {
    logout();
    router.push("/login");
  };
};
