import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Label } from "./label";
import { SegmentedControl, type SegmentedOption } from "./segmented-control";
import { Select } from "./select";

export const meta = {
  title: "Segmented Control",
  description:
    "Mutually exclusive choice across a handful of short options, all visible at once. Use where a Switch can't say enough — three states, or two whose labels aren't obviously on/off. Reach for a Select past ~4 options.",
};

type Reasoning = "off" | "default" | "on";

const REASONING: SegmentedOption<Reasoning>[] = [
  { value: "off", label: "Off" },
  { value: "default", label: "Default" },
  { value: "on", label: "On" },
];

const LAYOUT: SegmentedOption<"list" | "grid">[] = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

const noop = () => {};

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    {["first", "middle", "last", "disabled"].map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <ColumnLabel>3 options</ColumnLabel>
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value="off"
      onChange={noop}
    />
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value="default"
      onChange={noop}
    />
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value="on"
      onChange={noop}
    />
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value="default"
      onChange={noop}
      disabled
    />
    <ColumnLabel>2 options</ColumnLabel>
    <SegmentedControl
      aria-label="Layout"
      options={LAYOUT}
      value="list"
      onChange={noop}
    />
    <span />
    <SegmentedControl
      aria-label="Layout"
      options={LAYOUT}
      value="grid"
      onChange={noop}
    />
    <SegmentedControl
      aria-label="Layout"
      options={LAYOUT}
      value="list"
      onChange={noop}
      disabled
    />
  </div>
);

function ControlledReasoning() {
  const [value, setValue] = useState<Reasoning>("default");
  return (
    <div className="flex items-center gap-3">
      <SegmentedControl
        aria-label="Extended thinking"
        options={REASONING}
        value={value}
        onChange={setValue}
      />
      <ColumnLabel>value: {value}</ColumnLabel>
    </div>
  );
}

export const Controlled = () => (
  <Example label="click or use arrow keys">
    <ControlledReasoning />
  </Example>
);

const LONG: SegmentedOption<"agent" | "workspace" | "org">[] = [
  { value: "agent", label: "This agent only" },
  { value: "workspace", label: "Everyone in the workspace" },
  { value: "org", label: "Whole organization" },
];

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long labels (control grows, no truncation)">
      <SegmentedControl
        aria-label="Visibility"
        options={LONG}
        value="workspace"
        onChange={noop}
      />
    </Example>
    <Example label='fixed width (className="w-80"): segments keep their size'>
      <SegmentedControl
        aria-label="Layout"
        options={LAYOUT}
        value="list"
        onChange={noop}
        className="w-80"
      />
    </Example>
  </div>
);

function ModelSettings() {
  const [reasoning, setReasoning] = useState<Reasoning>("on");
  return (
    <div className="flex w-120 flex-col gap-2 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
      <Label htmlFor="segmented-model">Model</Label>
      <div className="flex items-center gap-2">
        <Select id="segmented-model" defaultValue="sonnet">
          <option value="haiku">Claude Haiku 4.5</option>
          <option value="sonnet">Claude Sonnet 5</option>
        </Select>
        <SegmentedControl
          aria-label="Extended thinking"
          options={REASONING}
          value={reasoning}
          onChange={setReasoning}
        />
      </div>
    </div>
  );
}

function RunsHeader() {
  const [layout, setLayout] = useState<"list" | "grid">("list");
  return (
    <div className="flex w-120 items-center justify-between">
      <h2 className="text-title text-label">Runs</h2>
      <SegmentedControl
        aria-label="Layout"
        options={LAYOUT}
        value={layout}
        onChange={setLayout}
      />
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="beside a Select (model + extended thinking)">
      <ModelSettings />
    </Example>
    <Example label="view switch in a page header">
      <RunsHeader />
    </Example>
  </div>
);
