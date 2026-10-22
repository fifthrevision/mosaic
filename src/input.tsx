import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";

export function Input({
  icon: Icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: LucideIcon }) {
  const inputClasses = cn("mosaic-input", Icon && "pl-9", className);

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
