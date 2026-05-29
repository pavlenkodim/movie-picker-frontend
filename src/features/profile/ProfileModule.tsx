"use client";

import Button from "@/shared/ui/Button";
import ProfileThumbnail from "./components/ProfileThumbnail";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { apiClient } from "@/shared/api/api";

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

  const { data } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => apiClient<Profile>(`profiles/${userId}`),
    enabled: !!userId,
  });

  return (
    <div className="flex w-full flex-col gap-6 items-center p-4">
      <ProfileThumbnail
        url={
          data?.thumbnail ??
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBsGW-Vm2Ea1VUGOb7gvDhrWzT65F1eVzNuXNZN0kUT7PfjJTTXBgsEgKpVxxjYna_xLTzYmtdhFJz33XsxEOJpPZGmZbhzLWfl0RZZz7Sr6zRqg3Oxgn20rPwMaGrB4gZbmAXkwQK05-_3TojIY47GV47TMZyHyQWWjGU8JThkW5sfQgFuA47tXCzPPwqu3dnPgw8BcI1awcN0AJCs3CrrLOEYDARqdNPuSZOblTGXZo4mnd67SVazGxn5TkrxCmT5J4asp8uvB21W"
        }
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold leading-tight tracking-tight text-center">
          {data?.nickname}
        </p>
        <Button variant="secondary" size="large">
          Edit profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileModule;
