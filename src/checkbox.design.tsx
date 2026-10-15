import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Checkbox, type CheckedState } from "./checkbox";
import { Label } from "./label";

export const meta = {
  title: "Checkbox",
  description:
    "Selection control with checked, indeterminate, and disabled states",
};

const STATES: { column: string; checked: CheckedState }[] = [
  { column: "unchecked", checked: false },
  { column: "checked", checked: true },
  { column: "indeterminate", checked: "indeterminate" },
];

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,7rem)] items-center gap-y-4">
    <span />
    {STATES.map(({ column }) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {[false, true].map((disabled) => (
      <div key={String(disabled)} className="contents">
        <ColumnLabel>{disabled ? "disabled" : "enabled"}</ColumnLabel>
        {STATES.map(({ column, checked }) => (
          <Checkbox
            key={column}
            defaultChecked={checked}
            disabled={disabled}
            aria-label={column}
          />
        ))}
      </div>
    ))}
  </div>
);

const TOOLS = ["Web search", "Code execution", "File access"];

function ToolSelection() {
  const [enabled, setEnabled] = useState<string[]>(["Web search"]);
  const allState: CheckedState =
    enabled.length === TOOLS.length
      ? true
      : enabled.length === 0
        ? false
        : "indeterminate";
  return (
    <div className="flex flex-col gap-2">
      <Label className="inline-flex items-center gap-2 text-body text-label">
        <Checkbox
          checked={allState}
          onCheckedChange={(checked) => setEnabled(checked ? TOOLS : [])}
        />
        All tools
      </Label>
      <div className="flex flex-col gap-2 pl-6">
        {TOOLS.map((tool) => (
          <Label
            key={tool}
            className="inline-flex items-center gap-2 text-body font-regular text-label"
          >
            <Checkbox
              checked={enabled.includes(tool)}
              onCheckedChange={(checked) =>
                setEnabled(
                  checked
                    ? [...enabled, tool]
                    : enabled.filter((item) => item !== tool),
                )
              }
            />
            {tool}
          </Label>
        ))}
      </div>
    </div>
  );
}

export const SelectAll = () => (
  <Example label="parent goes indeterminate on a partial selection">
    <ToolSelection />
  </Example>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long label wraps (items-start)">
      <Label className="flex w-80 items-start gap-2 text-body font-regular text-label">
        <Checkbox className="mt-0.5" />
        Allow this agent to read and write files in every connected repository,
        including private ones
      </Label>
    </Example>
    <Example label="label with description">
      <div className="flex w-80 items-start gap-2">
        <Checkbox id="checkbox-notify" className="mt-0.5" defaultChecked />
        <div className="flex flex-col">
          <Label htmlFor="checkbox-notify" className="text-body text-label">
            Notify on failure
          </Label>
          <p className="text-body text-label-secondary">
            Email the owner when a run ends in an error.
          </p>
        </div>
      </div>
    </Example>
    <Example label="no visible label (aria-label)">
      <Checkbox aria-label="Select run" />
    </Example>
  </div>
);

const RUNS = [
  { id: "run-1042", agent: "PR Summarizer", status: "Passed" },
  { id: "run-1041", agent: "Issue Triage", status: "Failed" },
  { id: "run-1040", agent: "PR Summarizer", status: "Passed" },
];

function RunList() {
  const [selected, setSelected] = useState<string[]>([]);
  const headerState: CheckedState =
    selected.length === RUNS.length
      ? true
      : selected.length === 0
        ? false
        : "indeterminate";
  return (
    <div className="w-120 rounded-md border border-separator-secondary bg-surface-card card-shadow">
      <div className="flex h-11 items-center gap-3 border-b border-separator-secondary px-4">
        <Checkbox
          aria-label="Select all runs"
          checked={headerState}
          onCheckedChange={(checked) =>
            setSelected(checked ? RUNS.map((run) => run.id) : [])
          }
        />
        <span className="flex-1 text-subhead font-medium text-label-secondary">
          {selected.length > 0 ? `${selected.length} selected` : "Runs"}
        </span>
        <Button
          variant="destructive"
          size="sm"
          icon={Trash2}
          disabled={selected.length === 0}
        >
          Delete
        </Button>
      </div>
      {RUNS.map((run) => (
        <div
          key={run.id}
          className="flex h-10 items-center gap-3 border-b border-separator-secondary px-4 last:border-b-0"
        >
          <Checkbox
            aria-label={`Select ${run.id}`}
            checked={selected.includes(run.id)}
            onCheckedChange={(checked) =>
              setSelected(
                checked
                  ? [...selected, run.id]
                  : selected.filter((id) => id !== run.id),
              )
            }
          />
          <span className="flex-1 text-body text-label">{run.agent}</span>
          <span className="font-mono text-subhead text-label-tertiary">
            {run.id}
          </span>
          <span className="w-14 text-subhead text-label-secondary">
            {run.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="bulk selection in a run list">
      <RunList />
    </Example>
    <Example label="agent settings">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <h2 className="text-title text-label">Permissions</h2>
        <Label className="inline-flex items-center gap-2 text-body font-regular text-label">
          <Checkbox defaultChecked />
          Can open pull requests
        </Label>
        <Label className="inline-flex items-center gap-2 text-body font-regular text-label">
          <Checkbox />
          Can push to the default branch
        </Label>
        <Label className="inline-flex items-center gap-2 text-body font-regular text-label">
          <Checkbox disabled defaultChecked />
          Can read repository contents (required)
        </Label>
      </div>
    </Example>
  </div>
);
