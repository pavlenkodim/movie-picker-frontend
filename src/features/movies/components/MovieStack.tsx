"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMovies } from "../hooks/useMovies";
import useMovieStore from "../store/movieStore";
import { MovieCard } from "./MovieCard";

const STACK_SIZE = 3;

export const MovieStack = () => {
  const { isLoading } = useMovies();
  const { activeMovies, currentIndex, swipe, openInfo, closeInfo } = useMovieStore();

  const visibleMovies = activeMovies.slice(currentIndex, currentIndex + STACK_SIZE);

  if (visibleMovies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white/50 text-lg">The movies are over</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full px-4 md:px-0">
      <AnimatePresence>
        {visibleMovies.map((movie, index) => {
          const isTop = index === 0;

          const scale = 1 - index * 0.05;
          const translateY = index * 12;

          return (
            <motion.div
              key={movie.id}
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
              <MovieCard
                movie={movie}
                onSwipe={swipe}
                onOpenInfo={openInfo}
                onCloseInfo={closeInfo}
                isTop={isTop}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
