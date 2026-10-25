import { Card } from "./card";
import { cn } from "./cn";

export function EmptyState({
  children,
  className,
  variant = "card",
}: {
  children: React.ReactNode;
  className?: string;
  /** "card" stands alone as a Card; "plain" sits inside an already-carded container. */
  variant?: "card" | "plain";
}) {
  const text = <p className="text-body text-label-tertiary">{children}</p>;
  if (variant === "plain") {
    return (
      <div
        className={cn("flex h-24 items-center justify-center px-4", className)}
      >
        {text}
      </div>
    );
  }
  return (
    <Card
      className={cn("flex min-h-50 items-center justify-center", className)}
    >
      {text}
    </Card>
  );
}
