import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import NavbarModule from "@/features/navbar/NavbarModule";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <>
      {children}
      {session && <NavbarModule />}
    </>
  );
}
