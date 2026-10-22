import { Bot, KeyRound, Settings } from "lucide-react";
import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { NavItem } from "./nav-item";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "NavItem",
  description:
    "Sidebar row that styles the link or button it is given, with an optional icon and an active state",
};

export const Variants = () => (
  <div className="flex w-56 flex-col gap-6">
    <Example label="anchor">
      <NavItem>
        <a href="#">Agents</a>
      </NavItem>
    </Example>
    <Example label="button">
      <NavItem>
        <button type="button">Agents</button>
      </NavItem>
    </Example>
    <Example label="icon">
      <NavItem icon={Bot}>
        <a href="#">Agents</a>
      </NavItem>
    </Example>
    <Example label="active">
      <NavItem icon={Bot} active>
        <a href="#">Agents</a>
      </NavItem>
    </Example>
    <Example label="active, tinted">
      <NavItem icon={Bot} active variant="tinted">
        <a href="#">Agents</a>
      </NavItem>
    </Example>
    <Example label="long label (fades, scrolls on hover)">
      <NavItem icon={Bot}>
        <a href="#">CFO Financial Intelligence Briefing Bot</a>
      </NavItem>
    </Example>
  </div>
);

const ITEMS = [
  { key: "agents", label: "Agents", icon: Bot },
  { key: "api-keys", label: "API Keys", icon: KeyRound },
  { key: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ variant }: { variant: "default" | "tinted" }) {
  const [current, setCurrent] = useState("agents");
  return (
    <nav className="flex w-56 flex-col gap-0.5 rounded-md bg-surface-shell p-2">
      <SectionHeader title="Workspace" />
      {ITEMS.map((item) => (
        <NavItem
          key={item.key}
          icon={item.icon}
          variant={variant}
          active={current === item.key}
        >
          <button type="button" onClick={() => setCurrent(item.key)}>
            {item.label}
          </button>
        </NavItem>
      ))}
    </nav>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="on the shell surface (default lifts)">
      <Sidebar variant="default" />
    </Example>
    <Example label="on the canvas (tinted)">
      <div className="w-56 rounded-md bg-surface-canvas p-2">
        <Sidebar variant="tinted" />
      </div>
    </Example>
  </div>
);
