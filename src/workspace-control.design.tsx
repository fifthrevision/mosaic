import { LogOut, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import {
  Menu,
  MenuItem,
  MenuLabel,
  MenuRadioItem,
  MenuSeparator,
} from "./menu";
import { WorkspaceControl } from "./workspace-control";

export const meta = {
  title: "Workspace Control",
  description:
    "Sidebar workspace switcher: initials badge, workspace name, and chevron. Use it as a Menu trigger.",
};

const NAMES = [
  { label: "two words", name: "Sunny Day" },
  { label: "one word", name: "Acme" },
] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    <ColumnLabel>default</ColumnLabel>
    <ColumnLabel>menu open</ColumnLabel>
    <ColumnLabel>disabled</ColumnLabel>
    {NAMES.map(({ label, name }) => (
      <div key={label} className="contents">
        <ColumnLabel>{label}</ColumnLabel>
        <WorkspaceControl name={name} />
        <WorkspaceControl name={name} data-state="open" />
        <WorkspaceControl name={name} disabled />
      </div>
    ))}
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label='long name, className="max-w-48" (fades)'>
      <WorkspaceControl
        name="Globex Heavy Industries International"
        className="max-w-48"
      />
    </Example>
    <Example label="long name, unconstrained">
      <WorkspaceControl name="Globex Heavy Industries International" />
    </Example>
    <Example label="one letter">
      <WorkspaceControl name="X" />
    </Example>
  </div>
);

const WORKSPACES = ["Sunny Day", "Acme Research", "Personal"];

function Switcher() {
  const [current, setCurrent] = useState(WORKSPACES[0]);
  return (
    <Menu align="start" trigger={<WorkspaceControl name={current} />}>
      <MenuLabel>Workspaces</MenuLabel>
      {WORKSPACES.map((workspace) => (
        <MenuRadioItem
          key={workspace}
          active={workspace === current}
          onSelect={() => setCurrent(workspace)}
        >
          {workspace}
        </MenuRadioItem>
      ))}
      <MenuItem icon={Plus} onSelect={() => {}}>
        New workspace
      </MenuItem>
      <MenuSeparator />
      <MenuItem icon={Settings} onSelect={() => {}}>
        Workspace settings
      </MenuItem>
      <MenuItem icon={LogOut} onSelect={() => {}}>
        Sign out
      </MenuItem>
    </Menu>
  );
}

export const InContext = () => (
  <Example label="sidebar header (click to switch)">
    <nav className="flex h-80 w-60 flex-col gap-4 rounded-md bg-surface-shell p-2">
      <Switcher />
      <div className="flex flex-col">
        {["Agents", "Runs", "Files", "Settings"].map((item, index) => (
          <a
            key={item}
            href="#"
            className={
              index === 0
                ? "flex items-center gap-2 rounded-md bg-state-selected px-2 py-1.5 text-body text-label control-shadow focus-visible:control-focus-ring"
                : "flex items-center gap-2 rounded-md px-2 py-1.5 text-body text-label-secondary hover:bg-state-hover focus-visible:control-focus-ring"
            }
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  </Example>
);
