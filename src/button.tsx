import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { type Confirmation, useAnnounceConfirmation } from "./confirmation";
import { ScrollingText } from "./scrolling-text";
import { Tooltip, useTooltipAnnouncer } from "./tooltip";

export type { Confirmation } from "./confirmation";

// The pixel values repeat what the mosaic-button-* utilities set; ScrollingText
// needs them as numbers.
const sizeConfig = {
  sm: {
    classes: "mosaic-button-sm",
    iconSize: 12,
    chevronSize: 10,
    dropdownPadding: "pr-1.5",
    paddingPx: 8,
    gapPx: 6,
    bleed: { start: "-ml-2", end: "-mr-2" },
  },
  md: {
    classes: "mosaic-button-md",
    iconSize: 16,
    chevronSize: 12,
    dropdownPadding: "pr-2.25",
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
  title: titleProp,
  tooltipOpen: tooltipOpenProp,
  confirmation,
  ...props
}: {
  icon?: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  dropdown?: boolean;
  loading?: boolean;
  bleed?: "start" | "end";
  /** Holds the `title` tooltip open while true. */
  tooltipOpen?: boolean;
  /** While set, holds a tooltip with `title` open, announces it, and swaps
   * `icon` in for the button's own icon (never adds one). */
  confirmation?: Confirmation;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { classes, iconSize, chevronSize, dropdownPadding, paddingPx, gapPx } =
    sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const hasTooltipProvider = useTooltipAnnouncer() !== null;
  useAnnounceConfirmation(confirmation?.title);
  const title = confirmation?.title ?? titleProp;
  const tooltipOpen = confirmation ? true : tooltipOpenProp;
  const ConfirmedIcon = Icon && confirmation?.icon;
  const LeadingIcon = loading ? Loader2 : (ConfirmedIcon ?? Icon);
  const isDisabled = disabled || loading;
  const hasDisabledTooltip = Boolean(titleProp) && isDisabled;
  const bleedClass = bleed && sizeConfig[size].bleed[bleed];

  const button = (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "group/scrolling-text mosaic-button",
        classes,
        dropdown && dropdownPadding,
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
        <ChevronDown size={chevronSize} className={cn("shrink-0", icon)} />
      )}
    </button>
  );

  // With a provider the wrapper is always there, so a tooltip appearing later
  // never remounts the button and drops focus.
  if (!title && !hasTooltipProvider) return button;
  // Disabled buttons fire no pointer events, so the tooltip needs a wrapper
  // to hover; tabIndex lets keyboard users reach the explanation too.
  return (
    <Tooltip content={title} open={title ? tooltipOpen || undefined : false}>
      {hasDisabledTooltip ? (
        <span
          tabIndex={0}
          className={cn(
            "inline-flex w-fit cursor-not-allowed focus-visible:control-focus-ring",
            size === "sm" ? "rounded-h6" : "rounded-md",
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
