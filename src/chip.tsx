import { type LucideIcon, X } from "lucide-react";
import { useId } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

const toneConfig = {
  neutral: {
    container: "border-separator-secondary text-label",
    icon: "text-shape-secondary",
  },
  warning: {
    container: "border-separator-warning text-label",
    icon: "text-shape-warning",
  },
  destructive: {
    container: "border-separator-destructive text-label-destructive",
    icon: "text-shape-destructive",
  },
} as const;

// The pixel values repeat px-2 and gap-1.5; ScrollingText needs them as numbers.
const PADDING_PX = 8;
const GAP_PX = 6;

export function Chip({
  tone = "neutral",
  icon: Icon,
  onRemove,
  className,
  children,
  ...props
}: {
  tone?: keyof typeof toneConfig;
  icon?: LucideIcon;
  /** Puts a × at the trailing edge, the chip's only interactive part. */
  onRemove?: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const { container, icon } = toneConfig[tone];
  const labelId = useId();
  const removeId = useId();

  return (
    <span
      {...props}
      className={cn(
        "group/scrolling-text inline-flex h-6 w-fit max-w-80 shrink-0 items-center gap-1.5 rounded-h6 border bg-surface-floating-translucent px-2 text-subhead font-regular control-shadow-subtle",
        container,
        onRemove && "pr-1",
        className,
      )}
    >
      {Icon && <Icon size={14} className={cn("shrink-0", icon)} />}
      <ScrollingText
        leadingGapPx={Icon ? GAP_PX : PADDING_PX}
        trailingGapPx={onRemove ? GAP_PX : PADDING_PX}
      >
        <span id={labelId}>{children}</span>
      </ScrollingText>
      {onRemove && (
        // Labelled by itself then the chip's label: "Remove <label>".
        <button
          type="button"
          id={removeId}
          aria-label="Remove"
          aria-labelledby={`${removeId} ${labelId}`}
          onClick={onRemove}
          className="flex size-4 shrink-0 items-center justify-center rounded-xs text-shape-secondary hover:bg-state-hover hover:text-shape-primary focus-visible:control-focus-ring"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
