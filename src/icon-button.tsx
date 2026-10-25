import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: {
    size: "size-6",
    iconSize: 14,
    bleed: { start: "-ml-1.25", end: "-mr-1.25" },
  },
  md: { size: "size-8", iconSize: 16, bleed: { start: "-ml-2", end: "-mr-2" } },
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
  title,
  tone,
  loading = false,
  bleed,
  disabled,
  ...props
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  /** Colors the icon to signal a state, e.g. a clickable "needs a look" mark. */
  tone?: keyof typeof toneIconClass;
  /** Swaps the icon for a spinner and disables, like Button's. */
  loading?: boolean;
  /** Pulls a subtle button out by its inset so the icon lines up with the text at that edge. */
  bleed?: "start" | "end";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { size: sizeClass, iconSize } = sizeConfig[size];
  const bleedClass = bleed && sizeConfig[size].bleed[bleed];
  const { container, icon } = variantConfig[variant];
  const ShownIcon = loading ? Loader2 : Icon;
  const isDisabled = disabled || loading;
  const hasDisabledTooltip = Boolean(title) && isDisabled;

  const button = (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
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
            "inline-flex cursor-not-allowed rounded-md focus-visible:control-focus-ring",
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
