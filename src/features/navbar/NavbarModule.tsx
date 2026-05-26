"use client";

import GlassArea from "@/shared/ui/GlassArea";
import { Clapperboard, Compass, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/movies", icon: Clapperboard },
  { href: "/", icon: Compass },
  { href: "/favorites", icon: Heart },
  { href: "/profile", icon: User },
];

const NavbarModule = () => {
  const pathname = usePathname();

  return (
    <GlassArea className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[448px] h-16 rounded-full flex items-center justify-around px-4 z-50 shadow-2xl">
      {links.map(({ href, icon: Icon }) => {
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
