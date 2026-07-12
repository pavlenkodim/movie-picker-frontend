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

const ProfileInitalGenresForm = () => {
  const router = useRouter();
  const { data: allGenres, isLoading, isError } = useGenres();

  const { register, handleSubmit } = useForm<InitialGenresFormValues>({});

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InitialGenresFormValues) => {
      return await apiClient<GenreWeight[], InitialGenresFormValues>("genre-weights", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: (data) => {
      console.log("Successfully submitted genres:", data);
      router.push("/movies");
    },
    onError: (error) => {
      console.error("Error submitting genres:", error);
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
        </div>
        <Button type="submit" variant="primary" size="large" className="w-full" loading={isPending}>
          Try Filmder
        </Button>
      </form>
    </>
  );
};

export default ProfileInitalGenresForm;
