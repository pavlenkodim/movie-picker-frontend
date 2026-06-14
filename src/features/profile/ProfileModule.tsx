"use client";

import Button from "@/shared/ui/Button";
import ProfileThumbnail from "./components/ProfileThumbnail";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { apiClient } from "@/shared/api/api";
import SignOutButton from "../auth/components/SignOutButton";
import { useEffect } from "react";
import { ApiError } from "@/shared/api/api";
import { useRouter } from "next/navigation";

interface Profile {
  id: number;
  userId: number;
  nickname: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

const ProfileModule = () => {
  const session = useSession();
  const userId = session.data?.user.id;
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => apiClient<Profile>(`profiles/${userId}`),
    retry: 2,
    enabled: !!userId,
  });

  useEffect(() => {
    if (error instanceof ApiError && error.status === 404) {
      router.push("profile/create");
    }
  }, [error, router]);

  console.log("profile", data);
  console.log("error", error?.message);

  return (
    <div className="flex w-full h-full flex-col justify-between gap-6 items-center p-4">
      <div>
        <ProfileThumbnail url={data?.thumbnail} profileName={data?.nickname} />
        <div className="flex flex-col items-center justify-center gap-4 mt-2">
          <p className="text-2xl font-bold leading-tight tracking-tight text-center">
            {data?.nickname}
          </p>
          <Button variant="secondary" size="large">
            Edit profile
          </Button>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
};

export default ProfileModule;
