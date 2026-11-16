import { type LucideIcon, X } from "lucide-react";
import { type ComponentProps, useId } from "react";
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

// The pixel values repeat pl-2/pr-2, gap-1.5 and pr-0.5; ScrollingText needs
// them as numbers.
const PADDING_PX = 8;
const GAP_PX = 6;
const BEFORE_REMOVE_PX = 2;

type Body =
  | ({ href: string } & ComponentProps<"a">)
  | ({ href?: undefined } & ComponentProps<"button">);

export function Chip({
  tone = "neutral",
  icon: Icon,
  onRemove,
  className,
  children,
  ...props
}: Body & {
  tone?: keyof typeof toneConfig;
  icon?: LucideIcon;
  /** Puts a × at the trailing edge. */
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  const { container, icon } = toneConfig[tone];
  const labelId = useId();
  const removeId = useId();

  // Menu and Popover triggers (Radix asChild) pass aria-haspopup but no
  // onClick: they open from their own pointer and key handlers.
  const interactive =
    props.href !== undefined ||
    props.onClick !== undefined ||
    props["aria-haspopup"] !== undefined;

  const content = (
    <>
      {Icon && <Icon size={14} className={cn("shrink-0", icon)} />}
      <ScrollingText
        leadingGapPx={Icon ? GAP_PX : PADDING_PX}
        trailingGapPx={onRemove ? BEFORE_REMOVE_PX : PADDING_PX}
      >
        <span id={labelId}>{children}</span>
      </ScrollingText>
    </>
  );

  const bodyClassName = cn(
    "flex h-full min-w-0 items-center gap-1.5 rounded-l-[5px] pl-2 text-left",
    onRemove ? "pr-0.5" : "rounded-r-[5px] pr-2",
    interactive &&
      "outline-none hover:bg-state-hover focus-visible:control-focus-ring",
  );

  let body = <span className={bodyClassName}>{content}</span>;
  if (interactive && props.href !== undefined) {
    body = (
      <a {...props} className={bodyClassName}>
        {content}
      </a>
    );
  } else if (interactive) {
    const buttonProps = props as ComponentProps<"button">;
    body = (
      <button type="button" {...buttonProps} className={bodyClassName}>
        {content}
      </button>
    );
  }

  return (
    <span
      {...(interactive ? {} : (props as ComponentProps<"span">))}
      className={cn(
        "group/scrolling-text inline-flex h-6 w-fit max-w-80 shrink-0 items-center rounded-h6 border bg-surface-floating-translucent text-subhead font-regular control-shadow-subtle",
        container,
        className,
      )}
    >
      {body}
      {onRemove && (
        // Labelled by itself then the chip's label: "Remove <label>".
        <button
          type="button"
          id={removeId}
          aria-label="Remove"
          aria-labelledby={`${removeId} ${labelId}`}
          onClick={onRemove}
          className="flex h-full w-5 shrink-0 items-center justify-center rounded-r-[5px] text-shape-secondary hover:bg-state-hover hover:text-shape-primary focus-visible:control-focus-ring"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
