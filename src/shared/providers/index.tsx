"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { ReactNode, useState } from "react";
import { AuthError } from "@/shared/api/api";

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (_, error) => !(error instanceof AuthError),
          },
          mutations: {
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof AuthError) {
              signOut({ callbackUrl: "/auth?tab=login" });
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof AuthError) {
              signOut({ callbackUrl: "/auth?tab=login" });
            }
          },
        }),
      }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
