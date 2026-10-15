"use client";

import { apiClient } from "@/shared/api/api";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Movie, SwipeResponse } from "../movies/types";
import HistoryMovieCard from "./components/HistoryMovieCard";
import HistorySkeleton from "./components/Skeleton";
import { Grip, Heart, LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import RadioSwitcher from "@/shared/ui/RadioSwitcher";

export interface HistoryData extends SwipeResponse {
  movie: Movie;
}
export interface HistoryResponce {
  data: HistoryData[];
  meta: { nextCursor: number | null; hasMore: boolean };
}

const PAGE_SIZE = 21;

const HistoryModule = () => {
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["history", { liked }],
    queryFn: ({ pageParam }) =>
      apiClient<HistoryResponce>(
        `swipes?limit=${PAGE_SIZE}${pageParam ? `&cursor=${pageParam}` : ""}${liked !== undefined ? `&liked=${liked}` : ""}`,
      ),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => (lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined),
  });

  const sentinelRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    rootMargin: "400px",
  });

  const handleLikedChange = (value: string) => {
    console.log("handleLikedChange", value);
    setLiked(value === "liked" ? true : value === "disliked" ? false : undefined);
  };

  const swipes = data?.pages.flatMap((page) => page.data) ?? [];

  // TODO: Choose a better way to show the filter
  return (
    <div className="pb-20">
      <div
        // className="flex items-center justify-center fixed bottom-18 right-4 z-50 py-2"
        // className="flex items-center justify-center fixed top-2 right-4 z-50 py-2"
        className="flex items-center justify-center fixed top-12 left-0 right-0 z-10 py-2"
      >
        <RadioSwitcher
          name="likedFilter"
          options={[
            { label: <X />, value: "disliked" },
            { label: <Grip />, value: "all" },
            { label: <Heart />, value: "liked" },
          ]}
          selectedValue={liked === true ? "liked" : liked === false ? "disliked" : "all"}
          onValueChange={handleLikedChange}
          // direction="vertical"
        />
      </div>

      {isLoading ? (
        <HistorySkeleton />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 justify-center">
            {swipes.map((swipe) => (
              <HistoryMovieCard key={swipe.id} swipe={swipe} />
            ))}
          </div>

          <div ref={sentinelRef} className="h-px" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-6 text-sm text-zinc-400 dark:text-zinc-500">
              <LoaderCircle size={32} className="animate-spin anim text-foreground" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryModule;
