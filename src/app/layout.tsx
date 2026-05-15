import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/shared/providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/auth";

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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers session={session}>
          <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-8 md:py-32 px-4 md:px-16 bg-white dark:bg-black sm:items-start">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
