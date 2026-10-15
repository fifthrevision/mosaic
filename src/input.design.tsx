import { Search } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

export const meta = {
  title: "Input & Textarea",
  description:
    "Single-line Input (with an optional leading icon) and multi-line Textarea, both sunken input wells",
};

const COLUMNS = ["placeholder", "filled", "disabled"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,14rem)] items-start gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}

    <ColumnLabel>input</ColumnLabel>
    <Input aria-label="Agent name" placeholder="Agent name" />
    <Input aria-label="Agent name" defaultValue="PR Summarizer" />
    <Input aria-label="Agent name" defaultValue="PR Summarizer" disabled />

    <ColumnLabel>icon</ColumnLabel>
    <Input icon={Search} aria-label="Search agents" placeholder="Search" />
    <Input icon={Search} aria-label="Search agents" defaultValue="digest" />
    <Input
      icon={Search}
      aria-label="Search agents"
      defaultValue="digest"
      disabled
    />

    <ColumnLabel>textarea</ColumnLabel>
    <Textarea
      aria-label="Instructions"
      rows={3}
      placeholder="Describe what the agent should do…"
    />
    <Textarea
      aria-label="Instructions"
      rows={3}
      defaultValue="Summarize every merged pull request and post the digest to #eng."
    />
    <Textarea
      aria-label="Instructions"
      rows={3}
      defaultValue="Summarize every merged pull request and post the digest to #eng."
      disabled
    />
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-80 flex-col gap-6">
    <Example label="long value (scrolls horizontally)">
      <Input
        aria-label="Webhook URL"
        defaultValue="https://hooks.sunnyday.dev/agents/pr-summarizer/runs/trigger?token=abc123def456"
      />
    </Example>
    <Example label="narrow, with icon (wrapper w-40)">
      <div className="w-40">
        <Input icon={Search} aria-label="Search runs" placeholder="Search…" />
      </div>
    </Example>
    <Example label="textarea overflow (rows=3, scrolls)">
      <Textarea
        aria-label="Instructions"
        rows={3}
        defaultValue={
          "You are a release assistant.\n\n1. Read every merged pull request since the last tag.\n2. Group them by area.\n3. Write a short summary for each group.\n4. Flag anything that touches billing or auth.\n5. Post the digest to #eng."
        }
      />
    </Example>
    <Example label="textarea rows=1">
      <Textarea aria-label="Note" rows={1} placeholder="Add a note…" />
    </Example>
  </div>
);

const AGENTS = [
  "PR Summarizer",
  "Daily Digest",
  "Issue Triage",
  "Release Notes",
  "Standup Bot",
];

function AgentSearch() {
  const [query, setQuery] = useState("");
  const matches = AGENTS.filter((agent) =>
    agent.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="flex w-80 flex-col gap-2">
      <Input
        icon={Search}
        aria-label="Search agents"
        placeholder="Search agents"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul className="rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {matches.length === 0 ? (
          <li className="px-3 py-2 text-body text-label-tertiary">
            No agents match “{query}”
          </li>
        ) : (
          matches.map((agent) => (
            <li
              key={agent}
              className="border-b border-separator-secondary px-3 py-2 text-body text-label last:border-b-0"
            >
              {agent}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent settings form">
      <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="input-context-name">Name</Label>
          <Input id="input-context-name" defaultValue="PR Summarizer" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="input-context-instructions">Instructions</Label>
          <Textarea
            id="input-context-instructions"
            rows={4}
            placeholder="Describe what the agent should do…"
          />
        </div>
        <div className="flex justify-end">
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </Example>
    <Example label="filter a list (type to search)">
      <AgentSearch />
    </Example>
    <Example label="run inputs">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="grid grid-cols-[8rem_1fr] items-center gap-x-3 gap-y-3">
          <Label htmlFor="input-context-repo">repo</Label>
          <Input id="input-context-repo" defaultValue="sunnyday/agents" />
          <Label htmlFor="input-context-since">since</Label>
          <Input id="input-context-since" placeholder="v1.4.0" />
        </div>
      </div>
    </Example>
  </div>
);
