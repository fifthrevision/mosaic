import type { LucideIcon } from "lucide-react";
import { AlertCircle, FileIcon, Loader2, X } from "lucide-react";
import { cn } from "./cn";

export function FileChip({
  filename,
  sizeText,
  icon: Icon = FileIcon,
  state = "ready",
  href,
  onRemove,
  className,
}: {
  filename: string;
  sizeText?: string;
  icon?: LucideIcon;
  state?: "ready" | "loading" | "error";
  href?: string;
  onRemove?: () => void;
  className?: string;
}) {
  const StateIcon =
    state === "loading" ? Loader2 : state === "error" ? AlertCircle : Icon;
  const stateIconClass =
    state === "loading"
      ? "animate-spin text-shape-secondary"
      : state === "error"
        ? "text-shape-destructive"
        : "text-shape-secondary";

  return (
    <span
      className={cn(
        "group relative inline-flex h-6 max-w-59 items-center gap-1.5 rounded-md border border-separator-secondary bg-surface-card px-2 transition-colors",
        href && "hover:bg-state-hover",
        className,
      )}
    >
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${filename}`}
          className="group/remove relative z-10 flex size-4 shrink-0 items-center justify-center rounded-xs focus-visible:control-focus-ring"
        >
          <StateIcon
            size={16}
            className={cn(
              "transition-opacity group-hover:opacity-0 group-focus-visible/remove:opacity-0",
              stateIconClass,
            )}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible/remove:opacity-100"
          >
            <span className="flex size-3.5 items-center justify-center rounded-full bg-shape-tertiary transition-colors group-hover/remove:bg-shape-secondary">
              <X size={9} className="text-surface-card" />
            </span>
          </span>
        </button>
      ) : (
        <StateIcon size={16} className={cn("shrink-0", stateIconClass)} />
      )}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="min-w-0 flex-1 truncate text-subhead text-label after:absolute after:inset-0 focus-visible:control-focus-ring"
        >
          {filename}
        </a>
      ) : (
        <span className="min-w-0 flex-1 truncate text-subhead text-label">
          {filename}
        </span>
      )}
      {state === "ready" && sizeText ? (
        <span className="shrink-0 text-subhead text-label-secondary">
          {sizeText}
        </span>
      ) : null}
    </span>
  );
}
