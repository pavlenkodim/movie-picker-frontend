"use client";

import Picture from "@/shared/ui/Picture";
import useHistoryDetails from "../hooks/useHistoryDetails";
import MovieInfo from "@/features/movies/components/MovieInfo";
import { BASE_IMAGE_URL } from "@/shared/constants";
import MovieCardSkeleton from "@/features/movies/components/Skeleton";
import { cn } from "@/shared/libs/utils";
import { useEffect, useState } from "react";

const HistoryMovieCardDetails = ({
  swipeId,
  className,
}: {
  swipeId: number;
  className?: string;
}) => {
  const { data: swipe, isLoading } = useHistoryDetails(Number(swipeId));
  const { movie } = swipe || {};
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpenInfo(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) return <MovieCardSkeleton className="p-0 md:p-0" />;

  if (!swipe || !movie) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Swipe not found</div>;
  }

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-full rounded-3xl overflow-hidden flex flex-col justify-end",
        className,
      )}
    >
      <Picture
        src={movie?.posterPath ? BASE_IMAGE_URL + movie?.posterPath : "/data/image.png"}
        alt={movie?.title}
        className="w-full h-full object-cover absolute"
        width={500}
        height={500}
        draggable={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/20 dark:from-black/80 dark:via-black/20 to-transparent" />
      <MovieInfo
        movie={movie}
        isOpen={isOpenInfo}
        onToggle={() => {
          setIsOpenInfo(!isOpenInfo);
        }}
        isHistory={true}
        isLiked={swipe.liked}
      />
    </div>
  );
};

export default HistoryMovieCardDetails;
