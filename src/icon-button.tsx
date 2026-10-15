import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: { size: "size-6", iconSize: 14 },
  md: { size: "size-8", iconSize: 16 },
} as const;

const variantConfig = {
  default: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-primary",
  },
  primary: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-theme",
  },
  subtle: {
    container:
      "hover:not-disabled:bg-state-hover data-[state=open]:bg-state-hover",
    icon: "text-shape-primary",
  },
  destructive: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
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
  ...props
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  /** Colors the icon to signal a state, e.g. a clickable "needs a look" mark. */
  tone?: keyof typeof toneIconClass;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { size: sizeClass, iconSize } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const hasDisabledTooltip = Boolean(title) && Boolean(props.disabled);

  const button = (
    <button
      {...props}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        container,
        hasDisabledTooltip && "pointer-events-none",
        className,
      )}
    >
      <Icon size={iconSize} className={tone ? toneIconClass[tone] : icon} />
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
          className="inline-flex cursor-not-allowed rounded-md focus-visible:control-focus-ring"
        >
          {button}
        </span>
      ) : (
        button
      )}
    </Tooltip>
  );
}
