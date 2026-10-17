import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Combobox, type ComboboxOption } from "./combobox";
import { Label } from "./label";

export const meta = {
  title: "Combobox",
  description:
    "Filterable single-select dropdown. Use for lists where a plain Select gets unwieldy (more than ~15 options, or any list users might want to search).",
};

const BRANCHES: ComboboxOption[] = [
  { value: "main", label: "main", description: "default" },
  { value: "staging", label: "staging" },
  { value: "production", label: "production" },
];

const MANY_BRANCHES: ComboboxOption[] = Array.from({ length: 50 }, (_, i) => ({
  value: `branch-${i}`,
  label: `feature/agent-run-${i}`,
}));

const PROVIDERS: ComboboxOption[] = [
  { value: "anthropic", label: "Anthropic" },
  { value: "openai", label: "OpenAI", disabled: true },
  { value: "google", label: "Google", disabled: true },
];

const noop = () => {};

const COLUMNS = ["placeholder", "selected", "loading", "disabled"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,12rem)] items-center gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <ColumnLabel>combobox</ColumnLabel>
    <Combobox
      value=""
      onValueChange={noop}
      options={BRANCHES}
      placeholder="Pick a branch…"
    />
    <Combobox value="main" onValueChange={noop} options={BRANCHES} />
    <Combobox value="" onValueChange={noop} options={[]} loading />
    <Combobox value="main" onValueChange={noop} options={BRANCHES} disabled />
  </div>
);

function ControlledCombobox({
  options,
  initial = "",
  placeholder,
  emptyMessage,
  searchPlaceholder,
}: {
  options: ComboboxOption[];
  initial?: string;
  placeholder?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <Combobox
      value={value}
      onValueChange={setValue}
      options={options}
      placeholder={placeholder}
      emptyMessage={emptyMessage}
      searchPlaceholder={searchPlaceholder}
    />
  );
}

export const Options = () => (
  <div className="flex w-80 flex-col gap-6">
    <Example label="with description (open to see “default”)">
      <ControlledCombobox options={BRANCHES} initial="main" />
    </Example>
    <Example label="50 options, filterable">
      <ControlledCombobox
        options={MANY_BRANCHES}
        placeholder="Pick a branch…"
        searchPlaceholder="Filter branches…"
      />
    </Example>
    <Example label="disabled options">
      <ControlledCombobox options={PROVIDERS} placeholder="Pick a provider…" />
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="empty (emptyMessage)">
      <div className="w-80">
        <ControlledCombobox
          options={[]}
          placeholder="Pick a branch…"
          emptyMessage="No branches. Connect a repo first."
        />
      </div>
    </Example>
    <Example label="long selected label (w-48, scrolls on hover)">
      <div className="w-48">
        <ControlledCombobox
          options={[
            {
              value: "long",
              label: "feature/retry-failed-agent-runs-with-backoff",
            },
          ]}
          initial="long"
        />
      </div>
    </Example>
  </div>
);

export const InContext = () => {
  const [branch, setBranch] = useState("main");
  const [agent, setAgent] = useState("");
  return (
    <div className="flex flex-col gap-6">
      <Example label="trigger settings">
        <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
          <div className="flex flex-col gap-1.5">
            <Label>Branch</Label>
            <Combobox
              value={branch}
              onValueChange={setBranch}
              options={BRANCHES}
            />
          </div>
          <p className="text-body text-label-secondary">
            Runs PR Summarizer on every push to{" "}
            <span className="font-medium text-label">{branch}</span>.
          </p>
        </div>
      </Example>
      <Example label="hand off to another agent">
        <div className="flex w-120 items-center gap-3">
          <span className="shrink-0 text-body text-label-secondary">
            When done, run
          </span>
          <Combobox
            value={agent}
            onValueChange={setAgent}
            options={[
              { value: "digest", label: "Daily Digest" },
              { value: "triage", label: "Issue Triage" },
              { value: "notes", label: "Release Notes" },
            ]}
            placeholder="Choose an agent…"
          />
        </div>
      </Example>
    </div>
  );
};
