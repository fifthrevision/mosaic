import { cn } from "./cn";

const toneConfig = {
  neutral: "border-separator-secondary text-label-secondary",
  theme: "border-shape-theme/40 text-label-theme",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: {
  tone?: keyof typeof toneConfig;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex h-4.5 w-fit shrink-0 items-center rounded-sm border px-1.5 text-caption font-medium whitespace-nowrap",
        toneConfig[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
