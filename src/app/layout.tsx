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
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000"),
  title: "Filmder",
  description: "Swipe through movies and find what you really want to watch.",
  openGraph: {
    title: "Filmder - find your movie",
    description: "Swipe through movies and find what you really want to watch.",
    url: "/",
    images: [{ url: "/og-banner.png", width: 1200, height: 630 }],
    siteName: "Filmder",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmder - find your movie",
    description: "Swipe through movies and find what you really want to watch.",
    images: ["/og-banner.png"],
  },
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
