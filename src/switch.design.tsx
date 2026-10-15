import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Label } from "./label";
import { Switch } from "./switch";

export const meta = {
  title: "Switch",
  description:
    "Binary on/off control for settings that take effect immediately",
};

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(2,7rem)] items-center gap-y-4">
    <span />
    <ColumnLabel>off</ColumnLabel>
    <ColumnLabel>on</ColumnLabel>
    {[false, true].map((disabled) => (
      <div key={String(disabled)} className="contents">
        <ColumnLabel>{disabled ? "disabled" : "enabled"}</ColumnLabel>
        <Switch disabled={disabled} aria-label="Off" />
        <Switch disabled={disabled} defaultChecked aria-label="On" />
      </div>
    ))}
  </div>
);

function ControlledSwitch() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        aria-label="Stream responses"
      />
      <ColumnLabel>checked: {String(checked)}</ColumnLabel>
    </div>
  );
}

export const Toggle = () => <ControlledSwitch />;

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="label wraps, switch stays top-aligned">
      <div className="flex w-80 items-start justify-between gap-4">
        <Label htmlFor="switch-long" className="text-body text-label">
          Retry failed tool calls automatically before reporting the run as
          failed
        </Label>
        <Switch id="switch-long" className="mt-0.5" defaultChecked />
      </div>
    </Example>
    <Example label="leading switch, label after">
      <Label className="inline-flex items-center gap-2 text-body font-regular text-label">
        <Switch />
        Show archived agents
      </Label>
    </Example>
  </div>
);

const SETTINGS = [
  {
    id: "switch-stream",
    label: "Stream responses",
    description: "Show output as the agent writes it.",
    defaultChecked: true,
  },
  {
    id: "switch-memory",
    label: "Remember past runs",
    description: "Include summaries of the last five runs as context.",
    defaultChecked: false,
  },
  {
    id: "switch-approve",
    label: "Require approval for file writes",
    description: "Pause the run until someone approves each change.",
    defaultChecked: true,
  },
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="settings card rows">
      <div className="flex w-120 flex-col rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {SETTINGS.map((setting) => (
          <div
            key={setting.id}
            className="flex items-start justify-between gap-4 border-b border-separator-secondary px-4 py-3 last:border-b-0"
          >
            <div className="flex flex-col">
              <Label htmlFor={setting.id} className="text-body text-label">
                {setting.label}
              </Label>
              <p className="text-body text-label-secondary">
                {setting.description}
              </p>
            </div>
            <Switch
              id={setting.id}
              className="mt-0.5"
              defaultChecked={setting.defaultChecked}
            />
          </div>
        ))}
      </div>
    </Example>
    <Example label="agent list row (disabled while the agent is running)">
      <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <div className="flex flex-col">
          <span className="text-body text-label">Nightly Dependency Audit</span>
          <span className="text-subhead text-label-secondary">
            Running now · started 2 minutes ago
          </span>
        </div>
        <Switch disabled defaultChecked aria-label="Enabled" />
      </div>
    </Example>
  </div>
);
