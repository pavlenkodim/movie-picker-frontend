import { ReactNode } from "react";
import GlassArea from "../GlassArea";
import { cn } from "@/shared/libs/utils";

interface RadioSwitcherProps {
  name: string;
  options: { label: ReactNode; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  direction?: "horizontal" | "vertical";
}

const RadioSwitcher = ({
  name,
  options,
  selectedValue,
  onValueChange,
  direction = "horizontal",
}: RadioSwitcherProps) => {
  return (
    <GlassArea className="p-1 rounded-full">
      <fieldset
        className={cn(
          "flex items-center justify-center gap-2",
          direction === "vertical" && "flex-col",
        )}
      >
        {options.map((option) => (
          <div
            className="relative p-2 rounded-full transition-all has-checked:backdrop-blur-sm has-checked:bg-foreground/10"
            key={option.value}
          >
            <input
              className="sr-only"
              name={name}
              id={option.value}
              value={option.value}
              type="radio"
              checked={selectedValue === option.value}
              onChange={() => onValueChange(option.value)}
            />
            <label
              className={cn(
                "cursor-pointer text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-black transition-colors",
                selectedValue === option.value && "text-black dark:text-white",
              )}
              htmlFor={option.value}
            >
              {option.label}
            </label>
          </div>
        ))}
      </fieldset>
    </GlassArea>
  );
};

export default RadioSwitcher;
