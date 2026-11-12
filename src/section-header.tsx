import { cn } from "./cn";

type Collapsing =
  | { open?: undefined; onOpenChange?: undefined }
  | { open: boolean; onOpenChange: (open: boolean) => void };

export function SectionHeader({
  title,
  action,
  open,
  onOpenChange,
}: {
  title: string;
  action?: React.ReactNode;
} & Collapsing) {
  return (
    <div className="flex h-8 items-center justify-between gap-2">
      {onOpenChange === undefined ? (
        <h3 className="min-w-0 flex-1 truncate-fade text-subhead font-medium text-label-secondary">
          {title}
        </h3>
      ) : (
        <h3 className="flex min-w-0 flex-1 text-subhead font-medium text-label-secondary">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => onOpenChange(!open)}
            className="flex min-w-0 items-center gap-1 rounded-xs text-left hover:text-label focus-visible:control-focus-ring"
          >
            <span className="truncate">{title}</span>
            <svg
              viewBox="0 0 8 8"
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 translate-y-px text-shape-secondary",
                open && "rotate-90",
              )}
            >
              <path
                d="M2.5 1.5 6.5 4 2.5 6.5Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </h3>
      )}
      {action}
    </div>
  );
}
