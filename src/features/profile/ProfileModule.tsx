"use client";

import Button from "@/shared/ui/Button";
import ProfileThumbnail from "./components/ProfileThumbnail";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/api";
import SignOutButton from "../auth/components/SignOutButton";
import { useEffect } from "react";
import { ApiError } from "@/shared/api/api";
import { useRouter } from "next/navigation";
import { GenreWeight } from "./types";
import useGenres from "@/shared/hooks/useGenres";
import ProfileSkeleton from "./components/Skeleton";

interface Profile {
  id: number;
  userId: number;
  nickname: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

const ProfileModule = () => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient<Profile>("profiles/me"),
    retry: 0,
  });

  const { data: allGenres, isLoading: isAllGenresLoading } = useGenres();

  const { data: myGenres, isLoading: isGenresLoading } = useQuery({
    queryKey: ["myGenres"],
    queryFn: () => apiClient<GenreWeight[]>("genre-weights"),
  });

  useEffect(() => {
    if (error instanceof ApiError && error.status === 404) {
      router.push("profile/create");
    }
  }, [error, router]);

  if (isLoading || isGenresLoading || isAllGenresLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="flex w-full h-[calc(100vh-72px)] flex-col justify-between gap-6 items-center p-4">
      <div>
        <ProfileThumbnail url={data?.thumbnail} profileName={data?.nickname} />
        <div className="flex flex-col items-center justify-center gap-4 mt-2">
          <p className="text-2xl font-bold leading-tight tracking-tight text-center">
            {data?.nickname}
          </p>
          <Button variant="secondary" size="large" onClick={() => router.push("profile/edit")}>
            Edit profile
          </Button>
        </div>
        <h3 className="mb-3 mt-5 text-xl text-center font-bold">You favourite genres</h3>
        <div className="flex justify-center flex-wrap gap-3">
          {myGenres?.map((genre) => (
            <Button
              key={genre.id.toString() + genre.genreId}
              variant="secondary"
              size="medium"
              className="relative overflow-hidden"
            >
              <span
                className={`absolute left-0 z-0 h-full bg-foreground/20 rounded-r-xl`}
                style={{ width: genre.weight * 100 + "%" }}
              ></span>
              {allGenres?.find((g) => g.id === genre.genreId)?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full pb-16 flex justify-center">
        <SignOutButton className="min-h-14" />
      </div>
    </div>
  );
};

export default ProfileModule;
