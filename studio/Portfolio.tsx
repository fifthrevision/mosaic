import type { ComponentType } from "react";
import { DesignRenderer } from "./DesignRenderer";

type DesignMeta = {
  title?: string;
  group?: string;
  description?: string;
};

function labelFromExportName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function Portfolio({
  module,
  name,
}: {
  module: Record<string, unknown>;
  name: string;
}) {
  const meta = (module.meta as DesignMeta) ?? {};
  const variants = Object.entries(module).filter(
    ([key, val]) => key !== "meta" && typeof val === "function",
  ) as [string, ComponentType][];

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-1 text-large-title font-bold text-label">
        {meta.title ?? name}
      </h1>
      {meta.description && (
        <p className="mb-6 text-body text-label-secondary">
          {meta.description}
        </p>
      )}
      <div className="space-y-6">
        {variants.map(([exportName, Component]) => (
          <div
            key={exportName}
            className="rounded-xl border border-separator-primary"
          >
            <div className="border-b border-separator-primary bg-surface-card-subdued px-4 py-2">
              <span className="font-mono text-caption text-label-secondary">
                {labelFromExportName(exportName)}
              </span>
            </div>
            <div className="p-6">
              <DesignRenderer Component={Component} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
