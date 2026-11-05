import { cn } from "./cn";

export function Shortcut({
  keys,
  className,
}: {
  keys: readonly string[];
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center gap-0.5", className)}
    >
      {keys.map((key, index) => (
        <kbd
          key={index}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded-xs bg-state-hover px-1 font-sans text-caption text-label-secondary"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
