import { cn } from "@/shared/libs/utils";

const GlassArea = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassArea;
