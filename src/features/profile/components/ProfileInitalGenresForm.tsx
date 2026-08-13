"use client";

import { apiClient } from "@/shared/api/api";
import useGenres from "@/shared/hooks/useGenres";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { GenreWeight } from "../types";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import Checkbox from "@/shared/ui/Checkbox";

type InitialGenresFormValues = {
  genreIds: number[];
};

const Skeleton = () => {
  return (
    <div className="flex w-full h-full flex-col justify-between gap-6 items-center animate-pulse">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-28 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileInitalGenresForm = () => {
  const router = useRouter();
  const { data: allGenres, isLoading } = useGenres();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InitialGenresFormValues>({});

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InitialGenresFormValues) => {
      return await apiClient<GenreWeight[], InitialGenresFormValues>("genre-weights", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      router.push("/movies");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="flex flex-col justify-between gap-2 h-full"
      >
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Favorite Genres</h2>
          {isLoading && <Skeleton />}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {allGenres?.map((genre) => (
              <Checkbox
                key={genre.id}
                id={genre.id.toString()}
                label={genre.name}
                {...register("genreIds")}
                value={genre.id}
              />
            ))}
          </div>
          {errors.root && (
            <div className="text-red-500 text-sm mt-5 mb-5 text-center">{errors.root.message}</div>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          disabled={isLoading}
          loading={isPending}
        >
          Try Filmder
        </Button>
      </form>
    </>
  );
};

export default ProfileInitalGenresForm;
