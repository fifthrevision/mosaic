import { Box, CircleCheck, CircleDashed, GitPullRequest } from "lucide-react";
import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { Entity } from "./entity";
import { Menu, MenuRadioItem } from "./menu";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "Entity",
  group: "Buttons",
  order: 6,
  description:
    "A clickable object (a commit, an issue, a status, a person): its identity, not an action. A link with href, a button otherwise, and a menu trigger for picking a value.",
};

const Hash = ({ children }: { children: string }) => (
  <span className="font-mono text-label-secondary">{children}</span>
);

export const Variants = () => (
  <div className="flex w-80 flex-col gap-6">
    <Example label="icon">
      <Entity leading={<Box size={16} className="text-shape-primary" />}>
        Axle
      </Entity>
    </Example>
    <Example label="mono ID">
      <Entity leading={<Hash>1234abc</Hash>}>Commit to update</Entity>
    </Example>
    <Example label="secondary">
      <Entity
        leading={<GitPullRequest size={16} className="text-shape-theme" />}
        secondary="#56"
      >
        johncch/axl
      </Entity>
    </Example>
    <Example label="link (href)">
      <Entity
        href="#"
        leading={<CircleCheck size={16} className="text-shape-theme" />}
      >
        Reconcile redacted semantics
      </Entity>
    </Example>
    <Example label="sm">
      <Entity size="sm" leading={<Hash>1234abc</Hash>}>
        Commit to update
      </Entity>
    </Example>
    <Example label="long title (fades, scrolls on hover)">
      <Entity leading={<Hash>1234abc</Hash>}>
        Normalize thinking summaries across every provider adapter
      </Entity>
    </Example>
  </div>
);

const STATUSES = [
  { value: "todo", label: "Todo", icon: CircleDashed },
  { value: "done", label: "Done", icon: CircleCheck },
] as const;

function StatusPicker() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>(STATUSES[1]);
  const StatusIcon = status.icon;
  return (
    <Menu
      align="start"
      trigger={
        <Entity leading={<StatusIcon size={16} className="text-shape-theme" />}>
          {status.label}
        </Entity>
      }
    >
      {STATUSES.map((option) => (
        <MenuRadioItem
          key={option.value}
          active={option.value === status.value}
          onSelect={() => setStatus(option)}
        >
          {option.label}
        </MenuRadioItem>
      ))}
    </Menu>
  );
}

export const InContext = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="flex flex-col">
      <SectionHeader title="Diffs" />
      <Entity
        href="#"
        className="-mx-3"
        leading={<GitPullRequest size={16} className="text-shape-theme" />}
        secondary="56 normalize thinking summaries"
      >
        johncch/axl
      </Entity>
    </div>
    <div className="flex flex-col">
      <SectionHeader title="Properties (menu triggers)" />
      <div className="-mx-3 flex flex-col items-start">
        <StatusPicker />
      </div>
    </div>
    <div className="flex flex-col">
      <SectionHeader title="Commits" />
      <div className="-mx-3 flex flex-col items-start">
        <Entity leading={<Hash>1234abc</Hash>}>Commit to update</Entity>
        <Entity leading={<Hash>9f0e2d1</Hash>}>
          Add relative time updating
        </Entity>
      </div>
    </div>
  </div>
);
