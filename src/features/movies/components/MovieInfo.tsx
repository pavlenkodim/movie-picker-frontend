"use client";

import GlassArea from "@/shared/ui/GlassArea";
import { Movie } from "../types";
import { ExternalLink, Heart, Star, X } from "lucide-react";
import Link from "next/link";
import Picture from "@/shared/ui/Picture";
import { cn } from "@/shared/libs/utils";
import { motion, PanInfo, useMotionValue } from "framer-motion";
import Button from "@/shared/ui/Button";

interface MovieInfoProps {
  movie: Movie;
  isOpen: boolean;
  onToggle: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const DRAG_THRESHOLD = 50;

const MovieInfo = ({ movie, isOpen, onToggle, onLike, onDislike }: MovieInfoProps) => {
  const y = useMotionValue(0);

  const handleDragEnd = (_: never, info: PanInfo) => {
    const { offset, velocity } = info;

    const shouldOpen = !isOpen && (offset.y < -DRAG_THRESHOLD || velocity.y < -300);
    const shouldClose = isOpen && (offset.y > DRAG_THRESHOLD || velocity.y > 300);

    if (shouldOpen || shouldClose) {
      onToggle();
    }

    // Всегда возвращаем на место — позиционирование через animate родителя
    y.set(0);
  };

  return (
    <motion.div
      className="w-full"
      animate={{ y: isOpen ? 0 : 415 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{
          top: isOpen ? 0.05 : 0.4, // открыто — вверх почти не тянется
          bottom: isOpen ? 0.4 : 0.05, // закрыто — вниз почти не тянется
        }}
        style={{ y }}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full p-3 flex justify-between z-10">
          <Button
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3"
            variant="secondary"
            onClick={onDislike}
          >
            <X size={32} />
          </Button>

          <Button
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3"
            variant="secondary"
            onClick={onLike}
          >
            <Heart size={32} />
          </Button>
        </div>
        <GlassArea
          className={cn(
            "w-full overflow-y-auto p-6 pb-8 border-b-0 rounded-3xl z-20 transition-all duration-300",
            !isOpen && "bg-transparent backdrop-blur-none",
          )}
        >
          <div className="flex justify-center -mt-4">
            <div
              className={cn(
                "w-8 px-8 py-1 mb-1 dark:bg-white/20 bg-black/20 backdrop-blur-md rounded-full cursor-pointer",
                isOpen && "bg-white/30",
              )}
              onClick={onToggle}
            ></div>
          </div>

          <div className="flex items-end justify-between z-20">
            <div className="flex flex-col gap-1 z-20">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-sm mt-1">
                {movie.year} · {movie.genres[0]} · {Math.floor(movie.duration / 60)}h{" "}
                {movie.duration % 60}m
              </p>
            </div>
            <div className="bg-black/20 dark:bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-yellow-400 text-sm">
                <Star size={16} />
              </span>
              <span className="text-white text-sm font-medium">{movie.rating}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 mt-4">
            <div className="flex flex-col gap-4">
              {movie.genres && (
                <div className="flex items-center gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-sm text-white/80 bg-foreground/10 rounded-full px-3 py-1"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm ">{movie.synopsis}</p>

              {movie.director && (
                <p className="text-sm">
                  <span className="font-semibold">Director:</span> {movie.director}
                </p>
              )}

              {movie.studio && (
                <p className="text-sm">
                  <span className="font-semibold">Studio:</span> {movie.studio}
                </p>
              )}

              {}

              {movie.actors && (
                <div>
                  <h3 className="text-sm font-semibold">Actors:</h3>
                  <div className="flex items-start flex-nowrap gap-4 overflow-x-auto py-2">
                    {movie.actors.map((actor) => (
                      <div
                        className="flex flex-col w-20 justify-center items-center gap-2"
                        key={actor.id}
                      >
                        <div className="overflow-hidden rounded-full w-14 h-14">
                          <Picture
                            src={actor?.photoUrl}
                            alt={actor.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="text-sm font-light text-center leading-none">{actor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {movie?.trailerUrl && (
              <Link
                className="flex items-center gap-2 justify-center rounded-full h-14 px-5 text-lg font-bold text-background bg-foreground hover:bg-foreground/90"
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch trailer <ExternalLink size={18} />
              </Link>
            )}
          </div>
        </GlassArea>
      </motion.div>
    </motion.div>
  );
};

export default MovieInfo;
