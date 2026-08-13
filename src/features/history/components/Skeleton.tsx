const HistorySkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 justify-center pb-20">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="aspect-2/3 rounded-lg overflow-hidden relative bg-zinc-200/70 dark:bg-zinc-800/80 animate-pulse"
        >
          {/* <div className="w-12 h-12 absolute bottom-3 left-[50%] transform-[translateX(-50%)] rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm dark:text-black dark:hover:bg-white/80 p-3" /> */}
        </div>
      ))}
    </div>
  );
};

export default HistorySkeleton;
