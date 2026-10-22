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
        className={cn("mosaic-select", className)}
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
