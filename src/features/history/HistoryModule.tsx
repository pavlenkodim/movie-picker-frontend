"use client";

import { apiClient } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Movie, SwipeResponse } from "../movies/types";
import HistoryMovieCard from "./components/HistoryMovieCard";
import HistorySkeleton from "./components/Skeleton";

interface HistoryResponce extends SwipeResponse {
  movie: Movie;
}

const HistoryModule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: () => apiClient<HistoryResponce[]>("swipes"),
  });

  if (isLoading) {
    return <HistorySkeleton />;
  }

  return (
    <div className="grid grid-cols-3 gap-2 justify-center pb-20">
      {data?.map((swipe) => (
        <HistoryMovieCard key={swipe.id} movie={swipe.movie} liked={swipe.liked} />
      ))}
    </div>
  );
};

export default HistoryModule;
