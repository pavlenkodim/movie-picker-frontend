"use client";

import Input from "@/shared/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProfileFormValues, profileSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { apiClient } from "@/shared/api/api";
import { Profile } from "../types";
import ProfileThumbnail from "./ProfileThumbnail";
import { ArrowRight, Camera } from "lucide-react";
import Button from "@/shared/ui/Button";
import { useRef, useState } from "react";
import { useNotification } from "@/shared/hooks/useNotification";

const ProfileCreateForm = () => {
  const { update } = useSession();
  const { notify } = useNotification();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const { ref: registerRef, onChange, ...rest } = register("thumbnail");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const formData = new FormData();
      formData.append("nickname", data.nickname);
      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      const result = await apiClient<{ token: string; profile: Profile }>("profiles", {
        method: "POST",
        body: formData,
      });

      return result;
    },
    onSuccess: async (result) => {
      await update({ token: result.token, profileId: result.profile.id });
      notify("success", "You have successfully create your profile.");
      notify("info", "Please select the genres you like.");
      router.push("/profile/initial-genres");
    },
    onError: (error) => {
      notify("error", error.message);
    },
  });

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
                {!preview && <Camera size={36} />}
              </ProfileThumbnail>
            </div>
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
            )}
          </div>
          <Input
            id="nickname"
            type="text"
            label="Nickname"
            hSize="large"
            error={{ isError: !!errors.nickname, message: errors.nickname?.message }}
            {...register("nickname")}
          />

          {errors.root && (
            <p className="text-red-500 text-sm mt-5 text-center">{errors.root.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary" size="large" className="w-full" loading={isPending}>
          Next step <ArrowRight />
        </Button>
      </form>
    </>
  );
};

export default ProfileCreateForm;
