import Picture from "@/shared/ui/Picture";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import { HistoryData } from "../HistoryModule";
import { BASE_IMAGE_URL } from "@/shared/constants";

const HistoryMovieCard = ({ swipe }: { swipe: HistoryData }) => {
  const { movie, liked } = swipe;
  return (
    <Link href={`/history/${swipe.id}`} className="rounded-lg overflow-hidden relative ">
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
    </Link>
  );
};

export default HistoryMovieCard;
