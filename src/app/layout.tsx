import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/shared/providers";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import NotificationContainer from "@/shared/ui/NotificationContainer";

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
  openGraph: {
    siteName: "Filmder",
    title: "Filmder — Movie Recommendations You'll Actually Want to Watch",
    description:
      "Swipe through movies like Tinder. Filmder learns your genre preferences in real time and builds a personalized queue — perfect for solo nights or deciding together with a partner.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmder — Movie Recommendations You'll Actually Want to Watch",
    description:
      "Swipe through movies like Tinder. Filmder learns your genre preferences in real time and builds a personalized queue — perfect for solo nights or deciding together with a partner.",
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
        <NotificationContainer />
      </body>
    </html>
  );
}
