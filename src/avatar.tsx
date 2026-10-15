import { useState } from "react";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "").toUpperCase();
}

const sizeClasses = {
  sm: "h-6 w-6 text-caption",
  md: "h-8 w-8 text-caption",
  lg: "h-16 w-16 text-large-title",
} as const;

export function Avatar({
  src,
  name,
  size = "md",
}: {
  src?: string | null;
  name?: string | null;
  size?: keyof typeof sizeClasses;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const base = `${sizeClasses[size]} rounded-full border border-separator-secondary-translucent shadow-[0px_1px_1px_var(--color-shadow-3)]`;

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

  return (
    <div
      className={`${base} flex items-center justify-center bg-surface-card-subdued font-medium text-label-secondary`}
    >
      {initials}
    </div>
  );
}
