import { cn } from "@/shared/libs/utils";

const GlassArea = ({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-black/10 dark:border-white/10 transition-colors",
        className,
      )}
      style={{
        transform: "translateZ(0)",
        willChange: "backdrop-filter",
        isolation: "isolate",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassArea;
