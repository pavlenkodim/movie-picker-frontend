const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
};

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getAccessToken(): Promise<string | undefined> {
  if (typeof window !== "undefined") {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    return session?.token;
  } else {
    const { getServerSession } = await import("next-auth");
    const { options } = await import("@/app/api/auth/[...nextauth]/options");
    const session = await getServerSession(options);
    return session?.token;
  }
}

export const apiClient = async <TResponse, TBody = undefined>(
  endpoint: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> => {
  const { method = "GET", body, headers = {} } = options;

  const accessToken = await getAccessToken();

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (accessToken) {
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  }

  console.log("backend url", process.env.BACKEND_URL);

  const url = `${API_URL}/api/${endpoint.replace(/^\//, "")}`;

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    throw new AuthError();
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message ?? "API Error");
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json();
};
