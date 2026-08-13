"use client";

import Input from "@/shared/ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProfileFormValues, profileSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { apiClient } from "@/shared/api/api";
import { Profile } from "../types";
import ProfileThumbnail from "./ProfileThumbnail";
import { ArrowLeft, Camera, Save } from "lucide-react";
import Button from "@/shared/ui/Button";
import { useRef, useState } from "react";

const ProfileEditForm = () => {
  const session = useSession();
  const userId = session.data?.user.id;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient<Profile>(`profiles/me`),
    initialData: () => queryClient.getQueryData<Profile>(["profile"]),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: profile?.nickname,
    },
  });

  const { ref: registerRef, onChange, ...rest } = register("thumbnail");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      setLocalPreview(URL.createObjectURL(file));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const formData = new FormData();
      formData.append("userId", String(userId));
      formData.append("nickname", data.nickname);
      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      const result = await apiClient<Profile>("profiles", {
        method: "POST",
        body: formData,
      });

      return result;
    },
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const preview = localPreview ?? profile?.thumbnail ?? null;

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex flex-col justify-between gap-2 h-full"
      >
        <div className="flex flex-col gap-2 mb-4">
          <div className="my-5 flex flex-col items-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              ref={(e) => {
                registerRef(e);
                fileInputRef.current = e;
              }}
              onChange={handleFileChange}
              {...rest}
            />
            <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <ProfileThumbnail url={preview ?? undefined} bgColor="bg-gray-500">
                {<Camera size={36} />}
              </ProfileThumbnail>
            </div>
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
            )}
          </div>
          <Input
            id="nickname"
            type="text"
            label="Nicname"
            hSize="large"
            error={{ isError: !!errors.nickname, message: errors.nickname?.message }}
            {...register("nickname")}
          />

          {errors.root && <p className="text-red-500 text-sm mt-5">{errors.root.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="large"
            className="w-full"
            disabled={isPending}
            onClick={() => router.back()}
          >
            <ArrowLeft /> Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            loading={isPending}
          >
            <Save /> Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileEditForm;
