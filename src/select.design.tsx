import { Play } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Label } from "./label";
import { Select } from "./select";

export const meta = {
  title: "Select",
  description:
    "Styled native <select>. Matches Input styling with a chevron on the right; uses the system dropdown when opened.",
};

const MODEL_OPTIONS = (
  <>
    <option value="opus">Claude Opus</option>
    <option value="sonnet">Claude Sonnet</option>
    <option value="haiku">Claude Haiku</option>
  </>
);

const COLUMNS = ["value", "placeholder", "disabled"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,12rem)] items-center gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <ColumnLabel>select</ColumnLabel>
    <Select aria-label="Model" defaultValue="sonnet">
      {MODEL_OPTIONS}
    </Select>
    <Select aria-label="Model" defaultValue="">
      <option value="" disabled>
        Choose a model…
      </option>
      {MODEL_OPTIONS}
    </Select>
    <Select aria-label="Model" defaultValue="sonnet" disabled>
      {MODEL_OPTIONS}
    </Select>
  </div>
);

export const Controlled = () => {
  const [model, setModel] = useState("sonnet");
  return (
    <div className="flex w-64 flex-col gap-2">
      <Select
        aria-label="Model"
        value={model}
        onChange={(event) => setModel(event.target.value)}
      >
        {MODEL_OPTIONS}
      </Select>
      <ColumnLabel>value: {model}</ColumnLabel>
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long option in a narrow select (w-40)">
      <div className="w-40">
        <Select aria-label="Repository" defaultValue="long">
          <option value="long">sunnyday/agent-runtime-experiments</option>
          <option value="short">sunnyday/web</option>
        </Select>
      </div>
    </Example>
    <Example label="grouped options (optgroup)">
      <div className="w-64">
        <Select aria-label="Trigger" defaultValue="cron">
          <optgroup label="Schedule">
            <option value="cron">Cron</option>
            <option value="interval">Interval</option>
          </optgroup>
          <optgroup label="Event">
            <option value="push">On push</option>
            <option value="pr">On pull request</option>
          </optgroup>
        </Select>
      </div>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent settings">
      <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="select-context-model">Model</Label>
          <Select id="select-context-model" defaultValue="sonnet">
            {MODEL_OPTIONS}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="select-context-retention">Keep run logs for</Label>
          <Select id="select-context-retention" defaultValue="30">
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
          </Select>
        </div>
      </div>
    </Example>
    <Example label="inline in a toolbar">
      <div className="flex w-120 items-center gap-2 rounded-md border border-separator-secondary bg-surface-card p-2 card-shadow">
        <div className="w-48">
          <Select aria-label="Environment" defaultValue="staging">
            <option value="production">production</option>
            <option value="staging">staging</option>
          </Select>
        </div>
        <div className="ml-auto">
          <Button variant="primary" icon={Play}>
            Run
          </Button>
        </div>
      </div>
    </Example>
  </div>
);
