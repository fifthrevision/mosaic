import { TextStack } from "@fifthrevision/mosaic/text-stack";
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
  const order = (module.__namedExportsOrder as string[] | undefined) ?? [];
  const position = (name: string) => {
    const index = order.indexOf(name);
    return index === -1 ? order.length : index;
  };
  const variants = (
    Object.entries(module).filter(
      ([key, val]) => key !== "meta" && typeof val === "function",
    ) as [string, ComponentType][]
  ).sort(([a], [b]) => position(a) - position(b));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-8">
      <TextStack>
        <h1 className="text-large-title text-label">{meta.title ?? name}</h1>
        {meta.description && (
          <p className="text-body text-label-secondary">{meta.description}</p>
        )}
      </TextStack>
      {variants.map(([exportName, Component]) => (
        <div
          key={exportName}
          className="rounded-md border border-separator-secondary bg-surface-card card-shadow"
        >
          <div className="rounded-t-md border-b border-separator-secondary bg-surface-card-subdued px-4 py-2">
            <span className="font-mono text-caption text-label-secondary">
              {labelFromExportName(exportName)}
            </span>
          </div>
          <div className="overflow-x-auto p-6">
            <DesignRenderer Component={Component} />
          </div>
        </div>
      ))}
    </div>
  );
}
