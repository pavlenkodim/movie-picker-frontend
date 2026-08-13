"use client";

import GlassArea from "@/shared/ui/GlassArea";
import { Clapperboard, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/movies", icon: Clapperboard },
  { href: "/history", icon: Heart },
  { href: "/profile", icon: User },
];

const EXCLUDE_LIST = ["/profile/create", "/profile/initial-genres"];

const NavbarModule = () => {
  const pathname = usePathname();

  console.log(pathname);

  if (EXCLUDE_LIST.includes(pathname)) {
    return null;
  }

  return (
    <GlassArea className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 rounded-full flex items-center justify-around px-4 z-50 shadow-2xl">
      {LINKS.map(({ href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-black transition-colors ${
              isActive ? "text-black dark:text-white" : ""
            }`}
          >
            <Icon />
          </Link>
        );
      })}
    </GlassArea>
  );
};

export default NavbarModule;
