import { cn } from "./cn";

const toneConfig = {
  neutral: "border-separator-secondary text-label-secondary",
  theme: "border-shape-theme/40 text-label-theme",
  ruby: "border-ruby-600/40 text-ruby-700 dark:border-ruby-400/40 dark:text-ruby-150",
  mandarin:
    "border-mandarin-600/40 text-mandarin-700 dark:border-mandarin-400/40 dark:text-mandarin-150",
  yellow:
    "border-yellow-600/40 text-yellow-700 dark:border-yellow-400/40 dark:text-yellow-150",
  lime: "border-lime-600/40 text-lime-700 dark:border-lime-400/40 dark:text-lime-150",
  emerald:
    "border-emerald-600/40 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-150",
  teal: "border-teal-600/40 text-teal-700 dark:border-teal-400/40 dark:text-teal-150",
  purple:
    "border-purple-600/40 text-purple-700 dark:border-purple-400/40 dark:text-purple-150",
  magenta:
    "border-magenta-600/40 text-magenta-700 dark:border-magenta-400/40 dark:text-magenta-150",
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
