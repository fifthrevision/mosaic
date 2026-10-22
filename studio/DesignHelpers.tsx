import type { ReactNode } from "react";

export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-caption text-label-secondary">
      {children}
    </span>
  );
}

export function Example({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <ColumnLabel>{label}</ColumnLabel>
      {children}
    </div>
  );
}
