import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Progress } from "./progress";

export const meta = {
  title: "Progress",
  description: "A fill on a track, for completion or a proportion",
};

const VALUES = [
  { label: "0", value: 0 },
  { label: "0.25", value: 0.25 },
  { label: "0.65", value: 0.65 },
  { label: "1", value: 1 },
  { label: "-0.2 (clamps)", value: -0.2 },
  { label: "1.4 (clamps)", value: 1.4 },
];

export const States = () => (
  <div className="grid grid-cols-[6rem_15rem_4rem] items-center gap-x-6 gap-y-4">
    <span />
    <ColumnLabel>w-60</ColumnLabel>
    <ColumnLabel>w-15</ColumnLabel>
    {VALUES.map(({ label, value }) => (
      <div key={label} className="contents">
        <ColumnLabel>{label}</ColumnLabel>
        <Progress value={value} aria-label={`Progress ${label}`} />
        <Progress
          value={value}
          aria-label={`Progress ${label}`}
          className="w-15"
        />
      </div>
    ))}
  </div>
);

function SimulatedUpload() {
  const [percent, setPercent] = useState<number | null>(null);

  useEffect(() => {
    if (percent === null || percent >= 100) return;
    const timer = setTimeout(() => setPercent(percent + 10), 200);
    return () => clearTimeout(timer);
  }, [percent]);

  const uploading = percent !== null && percent < 100;
  return (
    <div className="flex w-80 flex-col gap-3">
      <Button
        icon={Upload}
        loading={uploading}
        onClick={() => setPercent(0)}
        className="self-start"
      >
        {uploading ? "Uploading…" : "Upload dataset.csv"}
      </Button>
      <Progress value={(percent ?? 0) / 100} aria-label="Upload progress" />
      <ColumnLabel>value: {(percent ?? 0) / 100}</ColumnLabel>
    </div>
  );
}

export const Animated = () => <SimulatedUpload />;

const STEPS = [
  { name: "Clone repository", value: 1, duration: "4.2s" },
  { name: "Install dependencies", value: 0.65, duration: "12.8s" },
  { name: "Run test suite", value: 0, duration: "—" },
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="run steps (inline, aria-hidden beside text)">
      <div className="flex w-120 flex-col rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {STEPS.map((step) => (
          <div
            key={step.name}
            className="flex h-10 items-center gap-3 border-b border-separator-secondary px-4 last:border-b-0"
          >
            <span className="min-w-0 flex-1 truncate text-body text-label">
              {step.name}
            </span>
            <Progress value={step.value} aria-hidden className="w-15" />
            <span className="w-12 text-right text-subhead text-label-tertiary">
              {step.duration}
            </span>
          </div>
        ))}
      </div>
    </Example>
    <Example label="usage quota">
      <div className="flex w-120 flex-col gap-2 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex items-baseline justify-between">
          <h2 className="text-title text-label">Runs this month</h2>
          <span className="text-body text-label-secondary">742 of 1,000</span>
        </div>
        <Progress value={0.742} aria-hidden />
        <p className="text-body text-label-secondary">Resets on November 1.</p>
      </div>
    </Example>
  </div>
);
