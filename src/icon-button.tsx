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
    icon: "text-shape-secondary",
  },
  primary: {
    container:
      "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active data-[state=open]:bg-state-button-hover",
    icon: "text-shape-primary",
  },
  subtle: {
    container:
      "hover:not-disabled:bg-state-hover data-[state=open]:bg-state-hover",
    icon: "text-shape-secondary",
  },
} as const;

const pressedContainerClass = {
  default:
    "border-separator-toggle-selected bg-state-button-hover control-shadow-active",
  primary:
    "border-separator-toggle-selected bg-state-button-hover control-shadow-active",
  subtle: "border border-separator-toggle-selected bg-state-hover",
} as const;

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  className,
  title,
  pressed,
  ...props
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
  /** Makes it a toggle button; omit for a plain button. */
  pressed?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { size: sizeClass, iconSize } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const hasDisabledTooltip = Boolean(title) && Boolean(props.disabled);

  const button = (
    <button
      {...props}
      aria-pressed={pressed}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        container,
        pressed && pressedContainerClass[variant],
        hasDisabledTooltip && "pointer-events-none",
        className,
      )}
    >
      <Icon size={iconSize} className={pressed ? "text-shape-primary" : icon} />
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
