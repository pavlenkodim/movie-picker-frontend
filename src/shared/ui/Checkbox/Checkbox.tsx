import { cn } from "@/shared/libs/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-solid transition-colors cursor-pointer relative",
        "h-12 px-5 text-base",
        "border-foreground/20 hover:bg-foreground/10",
        "has-checked:bg-foreground has-checked:text-background has-checked:hover:bg-foreground/90",
        className,
      )}
    >
      <input type="checkbox" id={props.id} {...props} className="invisible absolute" />
      <label htmlFor={props.id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
