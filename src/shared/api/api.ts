import { useAuthStore } from "@/shared/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type RequestOptions<T> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
};

export class AuthError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export const apiClient = async <TResponse, TBody = undefined>(
  endpoint: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> => {
  try {
    const { token, logout } = useAuthStore.getState();
    const { method = "GET", body, headers = {} } = options;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      logout();
      throw new AuthError("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API Error");
    }

    return response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
};
