"use client";

import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Movie } from "../types";
import Picture from "@/shared/ui/Picture";
import { Heart, Star, X } from "lucide-react";
import GlassArea from "@/shared/ui/GlassArea";
import Button from "@/shared/ui/Button";
import { useState } from "react";
import Link from "next/link";
import MovieInfo from "./MovieInfo";

interface MovieCardProps {
  movie: Movie;
  onSwipe: (movieId: number, direction: "like" | "dislike" | "skip") => void;
  onOpenInfo?: () => void;
  onCloseInfo?: () => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 100;

export const MovieCard = ({ movie, onSwipe, isTop }: MovieCardProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  // const { isInfoOpen } = useMovieStore();
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const dislikeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const flyOut = async (direction: "like" | "dislike" | "skip") => {
    const targets = {
      like: { x: 600, y: 0, rotate: 30, opacity: 0 },
      dislike: { x: -600, y: 0, rotate: -30, opacity: 0 },
      skip: { x: 0, y: 600, rotate: 0, opacity: 0 },
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
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate }}
      animate={controls}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col justify-end">
        <Picture
          src={movie?.posterUrl ?? "/data/image.png"}
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

        <div className="w-full p-3 flex justify-between z-10">
          <Button
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3"
            variant="secondary"
            onClick={async () => await flyOut("dislike")}
          >
            <X size={32} />
          </Button>

          <Button
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3"
            variant="secondary"
            onClick={async () => await flyOut("like")}
          >
            <Heart size={32} />
          </Button>
        </div>
        <MovieInfo movie={movie} isOpen={isInfoOpen} onToggle={() => setIsInfoOpen(!isInfoOpen)} />
      </div>
    </motion.div>
  );
};
