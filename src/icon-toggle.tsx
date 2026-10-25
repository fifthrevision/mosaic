import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: { size: "size-6", iconSize: 14 },
  md: { size: "size-8", iconSize: 16 },
} as const;

const variantConfig = {
  default: {
    off: "border border-separator-secondary bg-surface-button control-shadow hover:not-disabled:bg-state-button-hover active:not-disabled:control-shadow-active active:not-disabled:translate-y-px",
    on: "border border-separator-toggle-selected bg-state-button-hover control-shadow-active",
  },
  subtle: {
    off: "border border-transparent hover:not-disabled:bg-state-hover",
    on: "border border-transparent bg-state-hover",
  },
} as const;

export function IconToggle({
  icon: Icon,
  pressed,
  onPressedChange,
  size = "md",
  variant = "default",
  title,
  className,
  onClick,
  ...props
}: {
  icon: LucideIcon;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  const { size: sizeClass, iconSize } = sizeConfig[size];
  const hasDisabledTooltip = Boolean(title) && Boolean(props.disabled);

  const button = (
    <button
      {...props}
      type="button"
      aria-pressed={pressed}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onPressedChange(!pressed);
      }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        pressed ? variantConfig[variant].on : variantConfig[variant].off,
        hasDisabledTooltip && "pointer-events-none",
        className,
      )}
    >
      <Icon
        size={iconSize}
        className={pressed ? "text-shape-theme" : "text-shape-primary"}
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
