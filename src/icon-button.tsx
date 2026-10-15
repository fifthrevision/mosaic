import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: { size: "size-6", iconSize: 12 },
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

export function IconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  className,
  title,
  ...props
}: {
  icon: LucideIcon;
  size?: keyof typeof sizeConfig;
  variant?: keyof typeof variantConfig;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { size: sizeClass, iconSize } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];

  const button = (
    <button
      {...props}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md select-none focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        sizeClass,
        container,
        className,
      )}
    >
      <Icon size={iconSize} className={icon} />
    </button>
  );

  return title ? <Tooltip content={title}>{button}</Tooltip> : button;
}
