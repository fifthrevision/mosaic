import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={cn(
          "h-8 w-full appearance-none rounded-md border border-separator-secondary bg-surface-control-sunken py-1.5 pl-3 pr-8 text-body font-medium text-label shadow-[inset_0px_0px_4px_var(--color-shadow-1)] outline-none placeholder:text-label-tertiary hover:not-disabled:border-separator-control-hover focus:border-separator-control-active disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-shape-secondary"
      />
    </div>
  );
}
