import type { Metadata } from "next";
import Link from "next/link";
import { House } from "lucide-react";
import Header from "@/shared/ui/Header";
import PrivacyModule from "@/features/legal/PrivacyModule";

export const metadata: Metadata = {
  title: "Privacy Policy — Filmder",
  description: "How Filmder collects, uses and protects your personal data.",
};

const PrivacyPage = () => {
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
      <PrivacyModule />
    </div>
  );
};

export default PrivacyPage;
