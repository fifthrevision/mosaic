import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";

const toneConfig = {
  neutral: { dot: "bg-shape-tertiary", icon: "text-shape-secondary" },
  theme: { dot: "bg-shape-theme", icon: "text-shape-theme" },
  constructive: {
    dot: "bg-shape-constructive",
    icon: "text-shape-constructive",
  },
  warning: { dot: "bg-shape-warning", icon: "text-shape-warning" },
  destructive: { dot: "bg-shape-destructive", icon: "text-shape-destructive" },
} as const;

const sizeConfig = {
  sm: {
    text: "text-subhead text-label-secondary",
    iconSize: 12,
    dotBox: "size-3",
    dot: "size-1.5",
    padded: "h-6 px-2",
  },
  md: {
    text: "text-body font-medium text-label",
    iconSize: 14,
    dotBox: "size-3.5",
    dot: "size-2",
    padded: "h-8 px-3",
  },
} as const;

export function Status({
  tone = "neutral",
  indicator = "dot",
  size = "md",
  padded = false,
  className,
  children,
  ...props
}: {
  tone?: keyof typeof toneConfig;
  indicator?: "dot" | "spinner" | LucideIcon;
  size?: keyof typeof sizeConfig;
  padded?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const {
    text,
    iconSize,
    dotBox,
    dot: dotSize,
    padded: paddedClass,
  } = sizeConfig[size];
  const { dot, icon } = toneConfig[tone];

  let mark: React.ReactNode;
  if (indicator === "dot") {
    mark = (
      <span
        aria-hidden="true"
        className={cn("flex shrink-0 items-center justify-center", dotBox)}
      >
        <span className={cn("rounded-full", dotSize, dot)} />
      </span>
    );
  } else if (indicator === "spinner") {
    mark = (
      <Loader2 size={iconSize} className={cn("shrink-0 animate-spin", icon)} />
    );
  } else {
    const Icon = indicator;
    mark = <Icon size={iconSize} className={cn("shrink-0", icon)} />;
  }

  return (
    <span
      {...props}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap",
        text,
        padded && paddedClass,
        className,
      )}
    >
      {mark}
      {children}
    </span>
  );
}
