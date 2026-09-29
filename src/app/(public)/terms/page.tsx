import type { Metadata } from "next";
import Link from "next/link";
import { House } from "lucide-react";
import Header from "@/shared/ui/Header";
import TermsModule from "@/features/legal/TermsModule";

export const metadata: Metadata = {
  title: "Terms of Use — Filmder",
  description: "The rules for using Filmder.",
};

const TermsPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Header
        right={
          <Link
            href="/"
            aria-label="Home"
            className="hover:text-gray-600 dark:hover:text-gray-400 transition"
          >
            <House />
          </Link>
        }
      />
      <TermsModule />
    </div>
  );
};

export default TermsPage;
