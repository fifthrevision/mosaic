import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";

export function Input({
  icon: Icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: LucideIcon }) {
  const inputClasses = cn(
    "w-full h-8 rounded-md border border-separator-secondary bg-surface-control-sunken py-1.5 text-base font-medium text-label shadow-[inset_0px_0px_4px_var(--color-shadow-1)] placeholder:text-label-tertiary outline-none hover:not-disabled:border-separator-control-hover focus:not-disabled:border-separator-control-active disabled:cursor-not-allowed disabled:opacity-50",
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
