import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";

export function Input({
  icon: Icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: LucideIcon }) {
  const inputClasses = cn(
    "w-full h-8 rounded-md border border-separator-secondary bg-surface-input py-1.5 text-body font-medium text-label input-shadow placeholder:text-label-tertiary outline-none hover:not-disabled:border-separator-input-hover focus:not-disabled:border-separator-input-focus disabled:cursor-not-allowed disabled:opacity-50",
    Icon ? "pl-9 pr-3" : "px-3",
    className,
  );

  if (Icon) {
    return (
      <div className="relative w-full">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-shape-secondary"
        />
        <input {...props} className={inputClasses} />
      </div>
    );
  }

  return <input {...props} className={inputClasses} />;
}
