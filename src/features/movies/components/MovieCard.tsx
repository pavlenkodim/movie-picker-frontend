"use client";

import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Movie } from "../types";
import Picture from "@/shared/ui/Picture";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import MovieInfo from "./MovieInfo";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
  onSwipe: (movieId: number, direction: "like" | "dislike") => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;

export const MovieCard = ({ movie, onSwipe, isTop }: MovieCardProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const dislikeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const flyOut = async (direction: "like" | "dislike") => {
    const targets = {
      like: { x: 600, y: 0, rotate: 30, opacity: 0 },
      dislike: { x: -600, y: 0, rotate: -30, opacity: 0 },
    };

    await controls.start({
      ...targets[direction],
      transition: { duration: 0.35, ease: "easeOut" },
    });

    onSwipe(movie.id, direction);
  };

  const handleDragEnd = async (_: never, info: PanInfo) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      await flyOut("like");
      return;
    }

    if (offset.x < -SWIPE_THRESHOLD) {
      await flyOut("dislike");
      return;
    }

    // if (offset.y < -SWIPE_THRESHOLD) {
    //   controls.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.3 } });
    //   onOpenInfo();
    //   return;
    // }

    // if (offset.y > SWIPE_THRESHOLD) {
    //   await flyOut("skip");
    //   return;
    // }

    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    });
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing px-4 md:px-32"
      style={{ x, y, rotate }}
      animate={controls}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      // whileTap={{ scale: 1.02 }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-end">
        <Picture
          src={movie?.posterPath ? BASE_IMAGE_URL + movie?.posterPath : "/data/image.png"}
          alt={movie?.title}
          className="w-full h-full object-cover absolute"
          width={500}
          height={500}
          draggable={false}
        />

        <div className="absolute inset-0 bg-linear-to-t from-white/80 via-white/20 dark:from-black/80 dark:via-black/20 to-transparent" />

        <motion.div
          className="absolute top-1/3 right-1/3 p-4 rounded-full bg-white dark:text-black"
          style={{ opacity: likeOpacity }}
        >
          <Heart size={81} strokeWidth={2} />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/3 p-4 rounded-full bg-white dark:text-black"
          style={{ opacity: dislikeOpacity }}
        >
          <X size={81} strokeWidth={2} />
        </motion.div>
        <MovieInfo
          movie={movie}
          isOpen={isInfoOpen}
          onToggle={() => setIsInfoOpen(!isInfoOpen)}
          onDislike={async () => await flyOut("dislike")}
          onLike={async () => await flyOut("like")}
        />
      </div>
    </motion.div>
  );
};
