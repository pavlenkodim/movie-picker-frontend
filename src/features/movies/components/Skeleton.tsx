const MovieCardSkeleton = () => {
  return (
    <div className="relative w-full h-full px-4 md:px-32">
      <div className="relative w-full h-full rounded-4xl overflow-hidden bg-zinc-200/70 dark:bg-zinc-800/80 animate-pulse">
        <div className="absolute inset-0 bg-linear-to-t from-black/25 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
          <div className="h-6 w-3/4 rounded-full bg-white/40 dark:bg-white/20" />
          <div className="h-4 w-1/2 rounded-full bg-white/30 dark:bg-white/15" />

          <div className="mt-2 flex flex-wrap gap-2">
            <div className="h-7 w-20 rounded-full bg-white/30 dark:bg-white/15" />
            <div className="h-7 w-16 rounded-full bg-white/30 dark:bg-white/15" />
            <div className="h-7 w-24 rounded-full bg-white/30 dark:bg-white/15" />
          </div>

          <div className="mt-4 h-4 w-full rounded-full bg-white/25 dark:bg-white/10" />
          <div className="h-4 w-5/6 rounded-full bg-white/25 dark:bg-white/10" />
          <div className="h-4 w-4/6 rounded-full bg-white/25 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
