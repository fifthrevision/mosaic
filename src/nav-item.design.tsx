import { Bot, KeyRound, Settings } from "lucide-react";
import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { NavItem } from "./nav-item";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "NavItem",
  description:
    "Sidebar row with an optional icon and an active state: a link, or asChild around a router link or a button",
};

export const Variants = () => (
  <div className="flex w-56 flex-col gap-6">
    <Example label="link (default)">
      <NavItem href="#">Agents</NavItem>
    </Example>
    <Example label="asChild (a router link, or a button for an action)">
      <NavItem asChild>
        <button type="button">Agents</button>
      </NavItem>
    </Example>
    <Example label="icon">
      <NavItem href="#" icon={Bot}>
        Agents
      </NavItem>
    </Example>
    <Example label="active">
      <NavItem href="#" icon={Bot} active>
        Agents
      </NavItem>
    </Example>
    <Example label="active, tinted">
      <NavItem href="#" icon={Bot} active variant="tinted">
        Agents
      </NavItem>
    </Example>
    <Example label="long label (fades, scrolls on hover)">
      <NavItem href="#" icon={Bot}>
        CFO Financial Intelligence Briefing Bot
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
    <nav className="flex w-56 flex-col gap-0.5 rounded-md bg-surface-shell px-4 py-2">
      <SectionHeader title="Workspace" />
      {ITEMS.map((item) => (
        <NavItem
          key={item.key}
          href="#"
          icon={item.icon}
          variant={variant}
          active={current === item.key}
          onClick={(event) => {
            event.preventDefault();
            setCurrent(item.key);
          }}
        >
          {item.label}
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
