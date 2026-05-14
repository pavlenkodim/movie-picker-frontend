interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  hSize?: "small" | "medium" | "large";
}

const Input = ({ label, before, after, hSize = "medium", className, ...props }: InputProps) => {
  const sizeClasses = {
    input: {
      small: `text-sm py-1 px-3 ${before && "pl-7"} ${after && "pr-7"}`,
      medium: `text-base py-2 px-4 ${before && "pl-9"} ${after && "pr-9"}`,
      large: `text-lg py-3 px-5 ${before && "pl-10"} ${after && "pr-10"}`,
    },
    label: {
      small: "text-sm ml-3 mb-1 font-medium",
      medium: "text-base ml-4 mb-1 font-medium",
      large: "text-lg ml-5 mb-1 font-medium",
    },
    icons: {
      before: {
        small: "left-2",
        medium: "left-4",
        large: "left-5",
      },
      after: {
        small: "right-2",
        medium: "right-4",
        large: "right-5",
      },
    },
  };

  return (
    <div className="flex flex-col mb-2">
      {label && <label className={sizeClasses.label[hSize]}>{label}</label>}
      <div className="relative">
        {before && (
          <span
            className={`absolute ${sizeClasses.icons.before[hSize]} top-1/2 transform -translate-y-1/2`}
          >
            {before}
          </span>
        )}
        <input
          className={`w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-white ${sizeClasses.input[hSize]} ${className}`}
          {...props}
        />
        {after && (
          <span
            className={`absolute ${sizeClasses.icons.after[hSize]} top-1/2 transform -translate-y-1/2`}
          >
            {after}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
