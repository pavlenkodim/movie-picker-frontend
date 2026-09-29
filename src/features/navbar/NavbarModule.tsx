"use client";

import { apiClient, ApiError } from "@/shared/api/api";
import { useNotification } from "@/shared/hooks/useNotification";
import GlassArea from "@/shared/ui/GlassArea";
import { useQuery } from "@tanstack/react-query";
import { Clapperboard, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { GenreWeight, Profile } from "../profile/types";

const LINKS = [
  { href: "/movies", icon: Clapperboard },
  { href: "/history", icon: Heart },
  { href: "/profile", icon: User },
];

const EXCLUDE_LIST = ["/profile/create", "/profile/initial-genres"];

const NavbarModule = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { notify } = useNotification();

  const { data: profile, error: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient<Profile>("profiles/me"),
    retry: 0,
  });

  const { data: myGenres, error: myGenresError } = useQuery({
    queryKey: ["myGenres"],
    queryFn: () => apiClient<GenreWeight[]>("genre-weights"),
    enabled: !!profile,
  });

  // Onboarding guard: react only to settled "missing" states, never to loading ones
  const isProfileMissing = profileError instanceof ApiError && profileError.status === 404;
  const isGenresMissing =
    myGenres?.length === 0 || (myGenresError instanceof ApiError && myGenresError.status === 404);
  const isOnboardingPage = EXCLUDE_LIST.includes(pathname);

  useEffect(() => {
    if (isOnboardingPage) return;
    if (isProfileMissing) {
      notify("info", "Please create your profile first.");
      router.replace("/profile/create");
    } else if (isGenresMissing) {
      notify("info", "Please select the genres you like.");
      router.replace("/profile/initial-genres");
    }
  }, [isOnboardingPage, isProfileMissing, isGenresMissing, notify, router]);

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
