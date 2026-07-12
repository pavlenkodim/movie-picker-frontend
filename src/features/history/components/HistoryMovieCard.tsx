import { Movie } from "@/features/movies/types";
import Picture from "@/shared/ui/Picture";
import { Heart, X } from "lucide-react";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const HistoryMovieCard = ({ movie, liked }: { movie: Movie; liked: boolean }) => {
  return (
    <div className="rounded-lg overflow-hidden relative ">
      <Picture
        src={BASE_IMAGE_URL + movie.posterPath}
        alt={movie.title}
        width={300}
        height={500}
        className="w-full h-full object-cover object-center z-0"
      />
      <div className="absolute bottom-3 left-[50%] transform-[translateX(-50%)] rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3">
        {liked ? <Heart /> : <X />}
      </div>
    </div>
  );
};

export default HistoryMovieCard;
