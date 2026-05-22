import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Profile Filmder",
  description: "Like Tinder, but for movies.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  if (!session) redirect("/auth?tab=login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-8 md:py-32 px-4 md:px-16 bg-white dark:bg-black sm:items-start">
        {children}
      </main>
    </div>
  );
}
