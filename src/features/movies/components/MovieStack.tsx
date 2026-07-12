"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMovies } from "../hooks/useMovies";
import { MovieCard } from "./MovieCard";
import useSwipeSessionStore from "../store/swipeSessionStore ";
import { useEffect } from "react";
import { useSwipe } from "../hooks/useSwipe";
import MovieCardSkeleton from "./Skeleton";

const STACK_SIZE = 3;

export const MovieStack = () => {
  const { data, refetch, isFetching, isLoading } = useMovies();
  const movies = data ?? [];

  const { currentIndex, totalCount, swipe, setTotalCount, resetIndex } = useSwipeSessionStore();
  const { mutate: sendSwipe } = useSwipe();

  useEffect(() => {
    setTotalCount(movies.length);
  }, [movies.length, setTotalCount]);

  useEffect(() => {
    if (totalCount > 0 && currentIndex >= totalCount && !isFetching) {
      refetch().then(() => resetIndex());
    }
  }, [currentIndex, totalCount, isFetching, refetch, resetIndex]);

  const handleSwipe = (movieId: number, action: "like" | "dislike") => {
    sendSwipe({ movieId, liked: action === "like" });
    swipe(movieId, action);
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + STACK_SIZE);

  if (isLoading || (isFetching && visibleMovies.length === 0)) {
    return <MovieCardSkeleton />;
  }

  if (visibleMovies?.length === 0 && !isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white/50 text-lg">The movies are over</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full px-4 md:px-0">
      <AnimatePresence>
        {visibleMovies?.map((movie, index) => {
          const isTop = index === 0;

          const scale = 1 - index * 0.05;
          const translateY = index * 12;

          return (
            <motion.div
              key={movie?.id}
              className="absolute inset-0"
              style={{ zIndex: STACK_SIZE - index }}
              animate={{
                scale,
                y: translateY,
              }}
              transition={{ duration: 0.2 }}
              exit={{
                x: 0,
                opacity: 0,
                transition: { duration: 0.2 },
              }}
            >
              <MovieCard movie={movie} onSwipe={handleSwipe} isTop={isTop} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
