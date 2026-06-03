import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import NavbarModule from "@/features/navbar/NavbarModule";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <div className="flex h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full max-w-3xl flex-col items-center py-8 pt-18 md:py-32 px-4 md:px-16 sm:items-start">
        {children}
        {session && <NavbarModule />}
      </main>
    </div>
  );
}
