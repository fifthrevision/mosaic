import { cn } from "./cn";

export function Progress({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** 0 to 1; clamped. */
  value: number;
}) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-surface-track",
        className,
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-shape-primary"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}
