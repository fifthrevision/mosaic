import { cn } from "./cn";

export function Radio({
  className,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <input
      {...props}
      type="radio"
      className={cn(
        "size-4 shrink-0 appearance-none rounded-full border border-separator-secondary bg-surface-control-sunken shadow-[inset_0px_0px_4px_var(--color-shadow-1)] outline-none transition-[border-width,border-color] duration-150 ease-out",
        "checked:border-5 checked:border-shape-primary checked:bg-surface-card checked:shadow-none",
        "not-checked:hover:not-disabled:border-separator-control-hover focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
