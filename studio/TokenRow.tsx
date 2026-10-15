import { useEffect, useState } from "react";

function useResolvedValue(cssVar: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const read = () =>
      setValue(
        getComputedStyle(document.documentElement)
          .getPropertyValue(cssVar)
          .trim(),
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [cssVar]);

  return value;
}

export function TokenRow({
  name,
  preview,
  varName,
}: {
  name: string;
  preview: React.ReactNode;
  varName: string;
}) {
  const value = useResolvedValue(varName);
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-separator-secondary">
        {preview}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-body font-medium text-label">{name}</span>
        <span className="font-mono text-caption text-label-secondary">
          {varName}
        </span>
      </div>
      <span className="font-mono text-caption text-label-secondary">
        {value}
      </span>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-title text-label">{title}</h3>
      <div className="rounded-xl border border-separator-secondary bg-surface-card px-4 py-2">
        {children}
      </div>
    </section>
  );
}
