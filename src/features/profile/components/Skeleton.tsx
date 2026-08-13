const ProfileSkeleton = () => {
  return (
    <div className="flex w-full h-full flex-col justify-between gap-6 items-center p-4 animate-pulse">
      <div className="w-full flex flex-col items-center">
        <div className="h-32 w-32 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
        <div className="mt-4 h-7 w-36 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
        <div className="mt-3 h-12 w-40 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
        <div className="mt-6 h-6 w-44 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 rounded-full bg-zinc-200/70 dark:bg-zinc-800/80"
            />
          ))}
        </div>
      </div>
      <div className="h-12 w-full max-w-md rounded-full bg-zinc-200/70 dark:bg-zinc-800/80" />
    </div>
  );
};

export default ProfileSkeleton;
