"use client";

import GlassArea from "@/shared/ui/GlassArea";
import { Movie } from "../types";
import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Picture from "@/shared/ui/Picture";

interface MovieInfoProps {
  movie: Movie;
  isOpen: boolean;
  onToggle: () => void;
}

const DRAG_THRESHOLD = 80;
const CLOSED_Y = 0;
const OPEN_Y = 0;

const MovieInfo = ({ movie, isOpen, onToggle }: MovieInfoProps) => {
  const y = useMotionValue(0);

  const handleDragEnd = (_: never, info: PanInfo) => {
    const { offset, velocity } = info;

    if (!isOpen && (offset.y < -DRAG_THRESHOLD || velocity.y < -500)) {
      // Потянули вверх — открываем
      onToggle();
    } else if (isOpen && (offset.y > DRAG_THRESHOLD || velocity.y > 500)) {
      // Потянули вниз — закрываем
      onToggle();
    }

    y.set(0);
  };

  return (
    <motion.div
      className="w-full z-20"
      animate={{ y: isOpen ? OPEN_Y : CLOSED_Y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: isOpen ? 0.1 : 0.4, bottom: isOpen ? 0.4 : 0.1 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
      >
        <GlassArea
          className={`w-full overflow-y-auto p-6 border-b-0 rounded-3xl z-20 ${isOpen ? "" : "bg-transparent backdrop-blur-none"}`}
        >
          <div className="flex justify-center -mt-4">
            <motion.div
              className="w-8 px-8 py-1 mb-3 dark:bg-white/20 bg-black/20 backdrop-blur-md rounded-full cursor-grab active:cursor-grabbing"
              onClick={onToggle}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>

          <div className="flex items-end justify-between">
            <div>
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

          {isOpen && (
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
                          <p className="text-sm font-light text-center leading-none">
                            {actor.name}
                          </p>
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
          )}
        </GlassArea>
      </motion.div>
    </motion.div>
  );
};

export default MovieInfo;
