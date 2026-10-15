import { CheckCircle2, XCircle } from "lucide-react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Time, type TimeFormat } from "./time";

export const meta = {
  title: "Time",
  description:
    "Hydration-safe timestamp in relative, local, or UTC format, with a fallback for missing values",
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function ago(milliseconds: number) {
  return new Date(Date.now() - milliseconds);
}

const FORMATS: TimeFormat[] = ["relative", "local", "utc"];

const COLUMNS = [
  { label: "20s ago", value: ago(20 * SECOND) },
  { label: "3h ago", value: ago(3 * HOUR) },
  { label: "4d ago", value: ago(4 * DAY) },
  { label: "in 2h", value: ago(-2 * HOUR) },
  { label: "ISO string", value: ago(45 * DAY).toISOString() },
  { label: "null", value: null },
];

export const Formats = () => (
  <div className="grid grid-cols-[6rem_repeat(6,max-content)] items-center gap-x-6 gap-y-4 text-body text-label">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column.label}>{column.label}</ColumnLabel>
    ))}
    {FORMATS.map((format) => (
      <div key={format} className="contents">
        <ColumnLabel>{format}</ColumnLabel>
        {COLUMNS.map((column) => (
          <span key={column.label}>
            <Time value={column.value} format={format} />
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6 text-body text-label">
    <Example label="null (default fallback)">
      <Time value={null} />
    </Example>
    <Example label='undefined with fallback="Never"'>
      <span className="text-label-tertiary">
        <Time value={undefined} fallback="Never" />
      </span>
    </Example>
    <Example label="date-only ISO string (parsed as UTC midnight)">
      <Time value="2026-01-15" format="local" />
    </Example>
    <Example label="relative, far past">
      <Time value={ago(800 * DAY)} />
    </Example>
  </div>
);

const RUNS = [
  { id: "482", agent: "Support Triage", passed: true, at: ago(2 * MINUTE) },
  { id: "481", agent: "PR Summarizer", passed: true, at: ago(48 * MINUTE) },
  { id: "480", agent: "Support Triage", passed: false, at: ago(5 * HOUR) },
  { id: "479", agent: "Weekly Digest", passed: true, at: ago(3 * DAY) },
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="run list (relative)">
      <ul className="flex w-120 flex-col rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {RUNS.map((run) => (
          <li
            key={run.id}
            className="flex items-center gap-3 border-b border-separator-secondary px-4 py-2 last:border-b-0"
          >
            {run.passed ? (
              <CheckCircle2 size={16} className="text-shape-constructive" />
            ) : (
              <XCircle size={16} className="text-shape-destructive" />
            )}
            <span className="flex-1 text-body text-label">
              Run #{run.id} · {run.agent}
            </span>
            <span className="text-subhead text-label-tertiary">
              <Time value={run.at} />
            </span>
          </li>
        ))}
      </ul>
    </Example>
    <Example label="run details (local and utc)">
      <div className="grid w-120 grid-cols-[8rem_1fr] gap-x-3 gap-y-2 rounded-md border border-separator-secondary bg-surface-card p-4 text-body card-shadow">
        <span className="text-label-secondary">Started</span>
        <span className="text-label">
          <Time value={ago(5 * MINUTE)} format="local" />
        </span>
        <span className="text-label-secondary">Finished</span>
        <span className="text-label">
          <Time value={ago(2 * MINUTE)} format="utc" />
        </span>
        <span className="text-label-secondary">Next run</span>
        <span className="text-label">
          <Time value={ago(-22 * HOUR)} />
        </span>
      </div>
    </Example>
    <Example label="agent card footer">
      <p className="w-120 text-body text-label-secondary">
        Last edited{" "}
        <span className="text-label">
          <Time value={ago(3 * DAY)} />
        </span>{" "}
        · Last run{" "}
        <span className="text-label">
          <Time value={null} fallback="never" />
        </span>
      </p>
    </Example>
  </div>
);
