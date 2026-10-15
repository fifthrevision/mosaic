import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { CopyButton } from "./copy-button";
import { Input } from "./input";
import { Label } from "./label";

export const meta = {
  title: "CopyButton",
  description:
    "Copies a string to the clipboard and shows a confirmation label for 2 seconds",
};

const VARIANTS = ["default", "primary", "subtle", "destructive"] as const;

const COLUMNS = ["md", "sm", "copied label", "disabled"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,max-content)] items-center gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <CopyButton value="run_8f2c41" variant={variant}>
          Copy
        </CopyButton>
        <CopyButton value="run_8f2c41" variant={variant} size="sm">
          Copy
        </CopyButton>
        <CopyButton
          value="run_8f2c41"
          variant={variant}
          copiedLabel="Copied run ID"
        >
          Copy run ID
        </CopyButton>
        <CopyButton value="run_8f2c41" variant={variant} disabled>
          Copy
        </CopyButton>
      </div>
    ))}
  </div>
);

export const OnCopy = () => {
  const [copies, setCopies] = useState(0);
  const [rowClicks, setRowClicks] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <Example label={`onCopy fired ${copies} times`}>
        <div>
          <CopyButton
            value="https://sunnyday.app/agents/support-triage"
            onCopy={() => setCopies(copies + 1)}
          >
            Copy link
          </CopyButton>
        </div>
      </Example>
      <Example
        label={`inside a clickable row: row clicked ${rowClicks} times (copy doesn't bubble)`}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setRowClicks(rowClicks + 1)}
          onKeyDown={(event) => {
            if (event.key === "Enter") setRowClicks(rowClicks + 1);
          }}
          className="flex w-96 cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-state-hover focus-visible:control-focus-ring"
        >
          <span className="font-mono text-subhead text-label">run_8f2c41</span>
          <CopyButton value="run_8f2c41" variant="subtle" size="sm">
            Copy
          </CopyButton>
        </div>
      </Example>
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long label (truncates like Button)">
      <CopyButton value="sk-live-4f9a">
        Copy the production API key for the Support Triage agent workspace
      </CopyButton>
    </Example>
    <Example label="fixed width keeps size when the label flips">
      <CopyButton value="sk-live-4f9a" className="w-40">
        Copy API key
      </CopyButton>
    </Example>
    <Example label="tooltip (title)">
      <CopyButton
        value="sk-live-4f9a"
        title="Copies the full key, not the mask"
      >
        Copy
      </CopyButton>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="webhook URL field">
      <div className="flex w-120 flex-col gap-2">
        <Label htmlFor="copy-button-webhook">Trigger URL</Label>
        <div className="flex gap-2">
          <Input
            id="copy-button-webhook"
            readOnly
            value="https://hooks.sunnyday.app/t/support-triage/8f2c41"
          />
          <CopyButton value="https://hooks.sunnyday.app/t/support-triage/8f2c41">
            Copy
          </CopyButton>
        </div>
      </div>
    </Example>
    <Example label="run output card header">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex items-center justify-between">
          <h3 className="text-title text-label">Summary</h3>
          <CopyButton
            value="Three tickets need a human: two refunds over $500 and one legal threat."
            variant="subtle"
            size="sm"
          >
            Copy
          </CopyButton>
        </div>
        <p className="text-body text-label-secondary">
          Three tickets need a human: two refunds over $500 and one legal
          threat.
        </p>
      </div>
    </Example>
    <Example label="run metadata">
      <div className="grid w-120 grid-cols-[8rem_1fr_max-content] items-center gap-x-3 gap-y-2 text-body">
        <span className="text-label-secondary">Run ID</span>
        <span className="font-mono text-label">run_8f2c41</span>
        <CopyButton value="run_8f2c41" variant="subtle" size="sm">
          Copy
        </CopyButton>
        <span className="text-label-secondary">Agent ID</span>
        <span className="font-mono text-label">agt_support_triage</span>
        <CopyButton value="agt_support_triage" variant="subtle" size="sm">
          Copy
        </CopyButton>
      </div>
    </Example>
  </div>
);
