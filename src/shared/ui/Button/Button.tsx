import { LoaderCircle } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
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
    small: "h-8 px-5 text-sm",
    medium: "h-12 px-5 text-base",
    large: "h-14 px-5 text-lg font-bold",
  };

  const variantClasses = {
    primary:
      "bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]",
    secondary:
      "border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const stateClasses = {
    disabled: "cursor-not-allowed opacity-50",
    loading: "cursor-wait opacity-75",
  };

  const sizeClass = size ? sizeClasses[size] : sizeClasses.medium;
  const variantClass = variant ? variantClasses[variant] : variantClasses.secondary;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 rounded-full cursor-pointer 
        ${sizeClass} 
        ${variantClass} 
        ${loading ? stateClasses.loading : ""}
        ${disabled ? stateClasses.disabled : ""}
        ${className}
        `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default Button;
