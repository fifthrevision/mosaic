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
        "size-4 shrink-0 appearance-none rounded-full border border-separator-primary bg-surface-control-deep shadow-[inset_0px_0px_4px_var(--color-shadow-1)] outline-none",
        "checked:border-separator-control-selected checked:bg-[radial-gradient(circle,var(--color-shape-primary)_3px,transparent_3.5px)]",
        "not-checked:hover:not-disabled:border-separator-control-hover focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
