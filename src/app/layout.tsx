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
  description: "Find movies you'll love. Swipe, save and discover movies that match your taste.",
  openGraph: {
    siteName: "Filmder",
    title: "Filmder — Find movies you'll love",
    description:
      "Swipe, save and discover movies that match your taste. Filmder learns your genre preferences with every swipe and builds a personalized queue for your next movie night.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmder — Find movies you'll love",
    description:
      "Swipe, save and discover movies that match your taste. Filmder learns your genre preferences with every swipe and builds a personalized queue for your next movie night.",
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
