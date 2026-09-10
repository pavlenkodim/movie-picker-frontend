"use client";

import { apiClient } from "@/shared/api/api";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Movie, SwipeResponse } from "../movies/types";
import HistoryMovieCard from "./components/HistoryMovieCard";
import HistorySkeleton from "./components/Skeleton";
import { LoaderCircle } from "lucide-react";

interface HistoryData extends SwipeResponse {
  movie: Movie;
}
interface HistoryResponce {
  data: HistoryData[];
  meta: { nextCursor: number | null; hasMore: boolean };
}

const PAGE_SIZE = 21;

const HistoryModule = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["history"],
    queryFn: ({ pageParam }) =>
      apiClient<HistoryResponce>(
        `swipes?limit=${PAGE_SIZE}${pageParam ? `&cursor=${pageParam}` : ""}`,
      ),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => (lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined),
  });

  const sentinelRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    rootMargin: "400px",
  });

  if (isLoading) {
    return <HistorySkeleton />;
  }

  const swipes = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="pb-20">
      <div className="grid grid-cols-3 gap-2 justify-center">
        {swipes.map((swipe) => (
          <HistoryMovieCard key={swipe.id} movie={swipe.movie} liked={swipe.liked} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && (
        <div className="flex justify-center py-6 text-sm text-zinc-400 dark:text-zinc-500">
          <LoaderCircle size={32} className="animate-spin anim text-foreground" />
        </div>
      )}
    </div>
  );
};

export default HistoryModule;
