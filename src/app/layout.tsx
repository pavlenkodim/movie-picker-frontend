import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/shared/providers";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import NavbarModule from "@/features/navbar/NavbarModule";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Filmder",
  description: "Like Tinder, but for movies.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
          <div className="flex min-h-screen items-center justify-center font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-8 pt-18 md:py-32 px-4 md:px-16 sm:items-start">
              {children}
              {session && <NavbarModule />}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
