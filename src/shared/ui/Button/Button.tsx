import { cn } from "@/shared/libs/utils";
import { LoaderCircle } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "link";
}

const Button = ({
  children,
  onClick,
  className,
  loading,
  size,
  icon,
  variant,
  disabled,
  ...props
}: ButtonProps) => {
  const sizeClasses = {
    small: "h-8 min-h-8 px-3 text-sm",
    medium: "h-12 min-h-12 px-5 text-base",
    large: "h-14 min-h-14 px-5 text-lg font-bold",
  };

  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary: "border border-solid border-foreground/20 hover:bg-foreground/10",
    danger: "bg-red-600 text-white hover:bg-red-600/90",
    link: "",
  };

  const stateClasses = {
    loading: "cursor-wait opacity-75",
  };

  const sizeClass = size && sizeClasses[size];
  const variantClass = variant && variantClasses[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full cursor-pointer backdrop-blur-sm transition-colors leading-none disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        variantClass,
        loading && stateClasses.loading,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default Button;
