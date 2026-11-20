import { useState } from "react";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "").toUpperCase();
}

const hueClasses = [
  "bg-ruby-150 text-ruby-700 dark:bg-ruby-700 dark:text-ruby-150",
  "bg-mandarin-150 text-mandarin-700 dark:bg-mandarin-700 dark:text-mandarin-150",
  "bg-yellow-150 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-150",
  "bg-lime-150 text-lime-700 dark:bg-lime-700 dark:text-lime-150",
  "bg-emerald-150 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-150",
  "bg-blue-150 text-blue-700 dark:bg-blue-700 dark:text-blue-150",
  "bg-teal-150 text-teal-700 dark:bg-teal-700 dark:text-teal-150",
  "bg-indigo-150 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-150",
  "bg-purple-150 text-purple-700 dark:bg-purple-700 dark:text-purple-150",
  "bg-magenta-150 text-magenta-700 dark:bg-magenta-700 dark:text-magenta-150",
] as const;

function hueClassesForName(name: string): string {
  let hash = 0;
  for (const character of name.trim().toLowerCase()) {
    hash = (hash * 31 + character.codePointAt(0)!) >>> 0;
  }
  return hueClasses[hash % hueClasses.length];
}

const sizeClasses = {
  sm: "h-6 w-6 text-caption",
  md: "h-8 w-8 text-caption",
  lg: "h-16 w-16 text-large-title",
} as const;

const squareRadiusClasses = {
  sm: "rounded-h6",
  md: "rounded-md",
  lg: "rounded-xl",
} as const;

export function Avatar({
  src,
  name,
  size = "md",
  shape = "circle",
}: {
  src?: string | null;
  name?: string | null;
  size?: keyof typeof sizeClasses;
  shape?: "circle" | "square";
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const radius =
    shape === "circle" ? "rounded-full" : squareRadiusClasses[size];
  const base = `${sizeClasses[size]} ${radius} shrink-0 border border-separator-secondary-translucent shadow-[0px_1px_1px_var(--color-shadow-3)]`;

  if (src && src !== failedSrc) {
    return (
      <img
        src={src}
        alt={name ?? "Avatar"}
        onError={() => setFailedSrc(src)}
        className={`${base} object-cover`}
      />
    );
  }

  const initials = name ? getInitials(name) : "";
  const fill = name
    ? hueClassesForName(name)
    : "bg-surface-card-subdued text-label-secondary";

  return (
    <span
      className={`${base} ${fill} flex items-center justify-center font-medium`}
    >
      {initials}
    </span>
  );
}
