import { Archive, RotateCcw, Trash2, Unplug } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import {
  useAlert,
  useConfirm,
  type AlertOptions,
  type ConfirmOptions,
} from "./confirm-dialog";
import { IconButton } from "./icon-button";

export const meta = {
  title: "Confirm Dialog",
  description:
    "Imperative dialogs from one provider: useConfirm() asks and returns a Promise<boolean>, useAlert() states and returns a Promise<void>",
};

const UPLOAD_ERRORS = [
  "brand-deck.zip — SKILL.md must start with a YAML frontmatter block delimited by ---.",
  "notes.zip — This archive contains 2 SKILL.md files; a skill bundle must contain exactly one.",
  "dump.csv — File exceeds max size for text (5242880 bytes)",
].join("\n\n");

const CONFIRM_COLUMNS = {
  default: {
    title: "Save changes?",
    description: "Your edits apply to the next run.",
  },
  "custom labels": {
    title: "Restore version 3?",
    description: "The current instructions are kept as version 5.",
    confirm: { label: "Restore", icon: RotateCcw },
    cancel: { label: "Keep current" },
  },
  "no description": {
    title: "Archive PR Summarizer?",
    confirm: { label: "Archive", icon: Archive },
  },
} satisfies Record<string, ConfirmOptions>;

const DESTRUCTIVE_COLUMNS = {
  default: {
    title: "Delete PR Summarizer?",
    description: "Its runs and files are deleted too. This cannot be undone.",
    confirm: { label: "Delete", icon: Trash2 },
    destructive: true,
  },
  "custom labels": {
    title: "Disconnect GitHub?",
    description:
      "Agents that read repositories stop working until you reconnect.",
    confirm: { label: "Disconnect", icon: Unplug },
    cancel: { label: "Stay connected" },
    destructive: true,
  },
  "no description": {
    title: "Delete this run?",
    confirm: { label: "Delete" },
    destructive: true,
  },
} satisfies Record<string, ConfirmOptions>;

const ALERT_COLUMNS = {
  default: {
    title: "Couldn't upload brand-deck.zip",
    description:
      "SKILL.md must start with a YAML frontmatter block delimited by ---.",
  },
  "custom labels": {
    title: "Run limit reached",
    description: "This workspace has used its 500 runs for the month.",
    dismiss: { label: "Got it" },
  },
  "list description": {
    title: "3 uploads failed",
    description: UPLOAD_ERRORS,
  },
} satisfies Record<string, AlertOptions>;

const COLUMNS = ["default", "custom labels", "no description / list"];

function ConfirmTrigger({ options }: { options: ConfirmOptions }) {
  const confirm = useConfirm();
  const [result, setResult] = useState<string>("—");
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={options.destructive ? "destructive" : "default"}
        onClick={async () => setResult(String(await confirm(options)))}
      >
        Open
      </Button>
      <ColumnLabel>{result}</ColumnLabel>
    </div>
  );
}

function AlertTrigger({ options }: { options: AlertOptions }) {
  const alert = useAlert();
  return (
    <Button size="sm" onClick={() => alert(options)}>
      Open
    </Button>
  );
}

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,10rem)] items-center gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <ColumnLabel>confirm</ColumnLabel>
    {Object.values(CONFIRM_COLUMNS).map((options) => (
      <ConfirmTrigger key={options.title} options={options} />
    ))}
    <ColumnLabel>destructive</ColumnLabel>
    {Object.values(DESTRUCTIVE_COLUMNS).map((options) => (
      <ConfirmTrigger key={options.title} options={options} />
    ))}
    <ColumnLabel>alert</ColumnLabel>
    {Object.values(ALERT_COLUMNS).map((options) => (
      <AlertTrigger key={options.title} options={options} />
    ))}
  </div>
);

const INITIAL_AGENTS = ["PR Summarizer", "Triage Bot", "Release Notes Writer"];

function AgentList() {
  const confirm = useConfirm();
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  return (
    <div className="w-96 rounded-md border border-separator-secondary bg-surface-card card-shadow">
      {agents.map((agent) => (
        <div
          key={agent}
          className="flex items-center justify-between border-b border-separator-secondary py-2 pr-2 pl-4 last:border-b-0"
        >
          <span className="text-body text-label">{agent}</span>
          <IconButton
            icon={Trash2}
            variant="subtle"
            size="sm"
            title="Delete"
            aria-label={`Delete ${agent}`}
            onClick={async () => {
              const ok = await confirm({
                title: `Delete ${agent}?`,
                description: "Its runs and files are deleted too.",
                confirm: { label: "Delete", icon: Trash2 },
                destructive: true,
              });
              if (ok)
                setAgents((current) => current.filter((a) => a !== agent));
            }}
          />
        </div>
      ))}
      {agents.length === 0 && (
        <div className="flex items-center justify-between py-2 pr-2 pl-4">
          <span className="text-body text-label-tertiary">No agents</span>
          <Button
            size="sm"
            variant="subtle"
            onClick={() => setAgents(INITIAL_AGENTS)}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

function UploadSkills() {
  const alert = useAlert();
  return (
    <div>
      <Button
        onClick={() =>
          alert({ title: "3 uploads failed", description: UPLOAD_ERRORS })
        }
      >
        Upload skills
      </Button>
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="delete from a list (row is removed only when confirmed)">
      <AgentList />
    </Example>
    <Example label="batch upload failure (alert)">
      <UploadSkills />
    </Example>
  </div>
);
