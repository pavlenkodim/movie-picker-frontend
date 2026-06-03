import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import NavbarModule from "@/features/navbar/NavbarModule";

export const metadata: Metadata = {
  title: "Filmder",
  description: "Like Tinder, but for movies.",
};

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  if (!session) redirect("/auth?tab=login");

  return (
    <div className="max-w-3xl mx-auto h-full">
      <main className="h-full">
        {children}
        <NavbarModule />
      </main>
    </div>
  );
}
