import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { type Confirmation, useAnnounceConfirmation } from "./confirmation";
import { Tooltip, useTooltipAnnouncer } from "./tooltip";

const sizeConfig = {
  sm: {
    size: "size-6",
    radius: "rounded-h6",
    dropdownSize: "h-6 w-8 gap-0.5 pl-0.75 pr-0.25",
    iconSize: 14,
    chevronSize: 10,
    bleed: { start: "-ml-1.25", end: "-mr-1.25" },
  },
  md: {
    size: "size-8",
    radius: "rounded-md",
    dropdownSize: "h-8 w-10 gap-0.5 pl-1.25 pr-0.75",
    iconSize: 16,
    chevronSize: 12,
    bleed: { start: "-ml-2", end: "-mr-2" },
  },
} as const;

const variantConfig = {
  default: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active active:not-disabled:translate-y-px data-[state=open]:control-shadow-active data-[state=open]:translate-y-px data-[state=open]:bg-state-button-hover",
    icon: "text-shape-primary",
  },
  primary: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active active:not-disabled:translate-y-px data-[state=open]:control-shadow-active data-[state=open]:translate-y-px data-[state=open]:bg-state-button-hover",
    icon: "text-shape-theme",
  },
  subtle: {
    container:
      "hover:not-disabled:bg-state-hover data-[state=open]:bg-state-hover",
    icon: "text-shape-primary",
  },
  destructive: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active active:not-disabled:translate-y-px data-[state=open]:control-shadow-active data-[state=open]:translate-y-px data-[state=open]:bg-state-button-hover",
    icon: "text-shape-destructive",
  },
} as const;

const toneIconClass = {
  warning: "text-shape-warning",
} as const;

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  className,
  title: titleProp,
  tone,
  dropdown = false,
  loading = false,
  bleed,
  disabled,
  tooltipOpen: tooltipOpenProp,
  confirmation,
  ...props
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  /** Colors the icon to signal a state, e.g. a clickable "needs a look" mark. */
  tone?: keyof typeof toneIconClass;
  dropdown?: boolean;
  /** Swaps the icon for a spinner and disables, like Button's. */
  loading?: boolean;
  /** Pulls a subtle button out by its inset so the icon lines up with the text at that edge. */
  bleed?: "start" | "end";
  /** Holds the `title` tooltip open while true, like Button's. */
  tooltipOpen?: boolean;
  /** While set, holds a tooltip with `title` open, announces it, and swaps
   * `icon` in for the button's own icon (never adds one). */
  confirmation?: Confirmation;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    size: squareSize,
    radius,
    dropdownSize,
    iconSize,
    chevronSize,
  } = sizeConfig[size];
  const bleedClass = bleed && sizeConfig[size].bleed[bleed];
  const { container, icon } = variantConfig[variant];
  const hasTooltipProvider = useTooltipAnnouncer() !== null;
  useAnnounceConfirmation(confirmation?.title);
  const title = confirmation?.title ?? titleProp;
  const tooltipOpen = confirmation ? true : tooltipOpenProp;
  const ShownIcon = loading ? Loader2 : (confirmation?.icon ?? Icon);
  const isDisabled = disabled || loading;
  const hasDisabledTooltip = Boolean(titleProp) && isDisabled;

  const button = (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "flex shrink-0 items-center justify-center select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        radius,
        dropdown ? dropdownSize : squareSize,
        container,
        hasDisabledTooltip ? "pointer-events-none" : bleedClass,
        className,
      )}
    >
      <ShownIcon
        size={iconSize}
        className={cn(
          tone ? toneIconClass[tone] : icon,
          loading && "animate-spin",
        )}
      />
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
            "inline-flex cursor-not-allowed focus-visible:control-focus-ring",
            radius,
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
