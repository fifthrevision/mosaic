import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: {
    height: "h-6",
    iconSize: 12,
    textSize: "text-subhead",
    padding: "px-2",
    paddingPx: 8,
    gap: "gap-1.5",
    gapPx: 6,
  },
  md: {
    height: "h-8",
    iconSize: 16,
    textSize: "text-body",
    padding: "px-3",
    paddingPx: 12,
    gap: "gap-1.75",
    gapPx: 7,
  },
} as const;

const variantConfig = {
  default: {
    container:
      "border border-separator-secondary bg-surface-button text-label control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-primary",
  },
  primary: {
    container:
      "border border-separator-secondary bg-surface-button text-label-theme control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-theme",
  },
  subtle: {
    container:
      "text-label hover:not-disabled:bg-state-hover data-[state=open]:bg-state-hover",
    icon: "text-shape-primary",
  },
  destructive: {
    container:
      "border border-separator-secondary bg-surface-button text-label-destructive control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-destructive",
  },
} as const;

export function Button({
  icon: Icon,
  size = "md",
  variant = "default",
  dropdown = false,
  loading = false,
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
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { height, iconSize, textSize, padding, paddingPx, gap, gapPx } =
    sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const LeadingIcon = loading ? Loader2 : Icon;
  const isDisabled = disabled || loading;
  const hasDisabledTooltip = Boolean(title) && isDisabled;

  const button = (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        "group/scrolling-text inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-md font-medium focus-visible:control-focus-ring max-w-80 disabled:opacity-50 disabled:cursor-not-allowed select-none",
        height,
        textSize,
        padding,
        gap,
        container,
        hasDisabledTooltip && "pointer-events-none",
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
          className="inline-flex w-fit cursor-not-allowed rounded-md focus-visible:control-focus-ring"
        >
          {button}
        </span>
      ) : (
        button
      )}
    </Tooltip>
  );
}
