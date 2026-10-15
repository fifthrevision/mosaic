import { Layers2, LayoutGrid, MessagesSquare } from "lucide-react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Badge } from "./badge";
import { cn } from "./cn";

export const meta = {
  title: "Badge",
  description:
    "A product annotation beside a name: Beta, New, Deprecated. For the state of a thing, use Status.",
};

const TONES = ["neutral", "theme"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(2,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    <ColumnLabel>alone</ColumnLabel>
    <ColumnLabel>beside a title</ColumnLabel>
    {TONES.map((tone) => (
      <div key={tone} className="contents">
        <ColumnLabel>{tone}</ColumnLabel>
        <Badge tone={tone}>{tone === "theme" ? "Beta" : "Deprecated"}</Badge>
        <span className="flex items-center gap-2">
          <span className="text-title text-label">Assistant</span>
          <Badge tone={tone}>{tone === "theme" ? "Beta" : "Deprecated"}</Badge>
        </span>
      </div>
    ))}
  </div>
);

const NAV_ITEMS = [
  { icon: MessagesSquare, label: "Assistant", badge: "Beta", active: true },
  { icon: LayoutGrid, label: "All Agents" },
  { icon: Layers2, label: "Capabilities" },
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="sidebar nav">
      <div className="flex w-60 flex-col gap-1 rounded-md bg-surface-shell p-2">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex h-8 items-center gap-3 rounded-sm px-2 text-body font-medium",
              item.active
                ? "bg-state-selected text-label control-shadow"
                : "text-label-secondary hover:bg-state-hover",
            )}
          >
            <item.icon size={16} className="shrink-0 text-shape-secondary" />
            {item.label}
            {item.badge ? <Badge tone="theme">{item.badge}</Badge> : null}
          </div>
        ))}
      </div>
    </Example>
    <Example label="page title">
      <div className="flex items-center gap-2">
        <h1 className="text-large-title text-label">Assistant</h1>
        <Badge tone="theme">Beta</Badge>
      </div>
    </Example>
  </div>
);
