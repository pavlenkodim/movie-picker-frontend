import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import NavbarModule from "@/features/navbar/NavbarModule";

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
    <>
      {children}
      <NavbarModule />
    </>
  );
}
