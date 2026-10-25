import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";
import { Tooltip } from "./tooltip";

// The pixel values repeat what the mosaic-button-* utilities set; ScrollingText
// needs them as numbers.
const sizeConfig = {
  sm: {
    classes: "mosaic-button-sm",
    iconSize: 12,
    paddingPx: 8,
    gapPx: 6,
    bleed: { start: "-ml-2", end: "-mr-2" },
  },
  md: {
    classes: "mosaic-button-md",
    iconSize: 16,
    paddingPx: 12,
    gapPx: 7,
    bleed: { start: "-ml-3", end: "-mr-3" },
  },
} as const;

const variantConfig = {
  default: { container: "mosaic-button-default", icon: "text-shape-primary" },
  primary: { container: "mosaic-button-primary", icon: "text-shape-theme" },
  subtle: { container: "mosaic-button-subtle", icon: "text-shape-primary" },
  destructive: {
    container: "mosaic-button-destructive",
    icon: "text-shape-destructive",
  },
} as const;

export function Button({
  icon: Icon,
  size = "md",
  variant = "default",
  dropdown = false,
  loading = false,
  bleed,
  disabled,
  children,
  className,
  title,
  ...props
}: {
  icon?: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  dropdown?: boolean;
  loading?: boolean;
  bleed?: "start" | "end";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { classes, iconSize, paddingPx, gapPx } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const LeadingIcon = loading ? Loader2 : Icon;
  const isDisabled = disabled || loading;
  const hasDisabledTooltip = Boolean(title) && isDisabled;
  const bleedClass = bleed && sizeConfig[size].bleed[bleed];

  const button = (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "group/scrolling-text mosaic-button",
        classes,
        container,
        hasDisabledTooltip ? "pointer-events-none" : bleedClass,
        className,
      )}
    >
      {LeadingIcon && (
        <LeadingIcon
          size={iconSize}
          className={cn("shrink-0", icon, loading && "animate-spin")}
        />
      )}
      <ScrollingText
        leadingGapPx={LeadingIcon ? gapPx : paddingPx}
        trailingGapPx={dropdown ? gapPx : paddingPx}
      >
        {children}
      </ScrollingText>
      {dropdown && (
        <ChevronDown size={iconSize} className={cn("shrink-0", icon)} />
      )}
    </button>
  );

  if (!title) return button;
  // Disabled buttons fire no pointer events, so the tooltip needs a wrapper
  // to hover; tabIndex lets keyboard users reach the explanation too.
  return (
    <Tooltip content={title}>
      {hasDisabledTooltip ? (
        <span
          tabIndex={0}
          className={cn(
            "inline-flex w-fit cursor-not-allowed rounded-md focus-visible:control-focus-ring",
            bleedClass,
          )}
        >
          {button}
        </span>
      ) : (
        button
      )}
    </Tooltip>
  );
}
