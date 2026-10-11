import { cn } from "./cn";

export function EmptyState({
  children,
  className,
  variant = "card",
}: {
  children: React.ReactNode;
  className?: string;
  /** "card" stands alone with its own border; "plain" sits inside an already-carded container. */
  variant?: "card" | "plain";
}) {
  return (
    <div
      className={cn(
        variant === "card"
          ? "flex min-h-50 items-center justify-center rounded-md border border-separator-secondary bg-surface-card"
          : "flex h-24 items-center justify-center px-4",
        className,
      )}
    >
      <p className="text-base text-label-tertiary">{children}</p>
    </div>
  );
}
