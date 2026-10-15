import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { ColumnLabel, Example } from "../studio/DesignHelpers";

export const meta = {
  title: "Label",
  group: "Typography",
  order: 3,
  description:
    "Form label. variant: field (above an input, default), inline (beside a toggle), hidden (screen readers only).",
};

export const States = () => (
  <div className="grid grid-cols-[8rem_20rem] items-start gap-x-4 gap-y-6">
    <ColumnLabel>field (default)</ColumnLabel>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-states-name">Name</Label>
      <Input id="label-states-name" placeholder="PR Summarizer" />
    </div>

    <ColumnLabel>hidden</ColumnLabel>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-states-search" variant="hidden">
        Search agents
      </Label>
      <Input id="label-states-search" placeholder="Search agents" />
    </div>

    <ColumnLabel>with help text</ColumnLabel>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-states-schedule">Schedule</Label>
      <Input id="label-states-schedule" defaultValue="0 9 * * 1-5" />
      <p className="text-body text-label-secondary">
        Cron expression, in your workspace’s time zone.
      </p>
    </div>

    <ColumnLabel>inline</ColumnLabel>
    <div className="flex items-center gap-2">
      <Checkbox id="label-states-notify" defaultChecked />
      <Label htmlFor="label-states-notify" variant="inline">
        Notify me when a run fails
      </Label>
    </div>
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-64 flex-col gap-6">
    <Example label="long label wraps (w-64)">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="label-edge-long">
          Maximum number of files the agent may read in a single run
        </Label>
        <Input id="label-edge-long" defaultValue="200" />
      </div>
    </Example>
    <Example label="long inline label beside a switch">
      <div className="flex items-start justify-between gap-3">
        <Label htmlFor="label-edge-switch" variant="inline">
          Pause this agent when three runs in a row fail
        </Label>
        <Switch id="label-edge-switch" defaultChecked />
      </div>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-context-name">Agent name</Label>
      <Input id="label-context-name" defaultValue="Daily Digest" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-context-model">Model</Label>
      <Select id="label-context-model" defaultValue="sonnet">
        <option value="opus">Claude Opus</option>
        <option value="sonnet">Claude Sonnet</option>
        <option value="haiku">Claude Haiku</option>
      </Select>
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-context-instructions">Instructions</Label>
      <Textarea
        id="label-context-instructions"
        rows={3}
        defaultValue="Collect yesterday’s runs and summarize any failures."
      />
    </div>
    <div className="flex items-center justify-between">
      <Label htmlFor="label-context-enabled" variant="inline">
        Run on schedule
      </Label>
      <Switch id="label-context-enabled" defaultChecked />
    </div>
  </div>
);
