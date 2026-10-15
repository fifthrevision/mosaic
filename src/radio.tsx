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
        "size-4 shrink-0 appearance-none rounded-full border border-separator-primary bg-surface-toggle input-shadow outline-none",
        "checked:border-separator-toggle-selected checked:bg-[radial-gradient(circle,var(--color-shape-primary)_3px,transparent_3.5px)]",
        "not-checked:hover:not-disabled:border-separator-toggle-hover focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
