import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const sizeConfig = {
  sm: {
    height: "h-6",
    iconSize: 12,
    textSize: "text-md",
    padding: "px-2",
    gap: "gap-1.5",
  },
  md: {
    height: "h-8",
    iconSize: 16,
    textSize: "text-base",
    padding: "px-3",
    gap: "gap-1.75",
  },
} as const;

const variantConfig = {
  default: {
    container:
      "border border-separator-secondary bg-surface-control text-label control-shadow hover:not-disabled:bg-state-control-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active",
    icon: "text-shape-secondary",
  },
  primary: {
    container:
      "border border-separator-secondary bg-surface-control text-label-intent-primary control-shadow hover:not-disabled:bg-state-control-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active",
    icon: "text-shape-primary",
  },
  subtle: {
    container: "text-label hover:not-disabled:bg-state-hover",
    icon: "text-shape-secondary",
  },
  destructive: {
    container:
      "border border-separator-secondary bg-surface-control text-label-intent-destructive control-shadow hover:not-disabled:bg-state-control-hover active:not-disabled:control-shadow-active data-[state=open]:control-shadow-active",
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
  const { height, iconSize, textSize, padding, gap } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const LeadingIcon = loading ? Loader2 : Icon;

  const button = (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-md font-medium focus-visible:control-focus-ring max-w-80 disabled:opacity-50 disabled:cursor-not-allowed select-none data-[state=open]:bg-state-control-hover",
        height,
        textSize,
        padding,
        gap,
        container,
        className,
      )}
    >
      {LeadingIcon && (
        <LeadingIcon
          size={iconSize}
          className={cn("shrink-0", icon, loading && "animate-spin")}
        />
      )}
      <span className="min-w-0 truncate">{children}</span>
      {dropdown && (
        <ChevronDown size={iconSize} className={cn("shrink-0", icon)} />
      )}
    </button>
  );

  return title ? <Tooltip content={title}>{button}</Tooltip> : button;
}
