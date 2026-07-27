import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/shared/providers";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

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
  description: "Swipe through movies and find what you really want to watch.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-[95vh]`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
