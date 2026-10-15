import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Label } from "./label";
import { Radio } from "./radio";

export const meta = {
  title: "Radio",
  description: "Single-choice control with selected and disabled states",
};

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(2,7rem)] items-center gap-y-4">
    <span />
    <ColumnLabel>unselected</ColumnLabel>
    <ColumnLabel>selected</ColumnLabel>
    {[false, true].map((disabled) => (
      <div key={String(disabled)} className="contents">
        <ColumnLabel>{disabled ? "disabled" : "enabled"}</ColumnLabel>
        <Radio
          name={`radio-states-${disabled}-a`}
          disabled={disabled}
          aria-label="Unselected"
        />
        <Radio
          name={`radio-states-${disabled}-b`}
          disabled={disabled}
          defaultChecked
          aria-label="Selected"
        />
      </div>
    ))}
  </div>
);

const PLANS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
] as const;

function PlanGroup() {
  const [plan, setPlan] = useState<string>("free");
  return (
    <div className="flex flex-col gap-3">
      <div role="radiogroup" aria-label="Plan" className="flex flex-col gap-2">
        {PLANS.map((option) => (
          <Label
            key={option.value}
            className="inline-flex items-center gap-2 text-body font-regular text-label"
          >
            <Radio
              name="radio-plan"
              value={option.value}
              checked={plan === option.value}
              onChange={(event) => setPlan(event.target.value)}
            />
            {option.label}
          </Label>
        ))}
      </div>
      <ColumnLabel>value: {plan}</ColumnLabel>
    </div>
  );
}

export const Group = () => <PlanGroup />;

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long label wraps (items-start)">
      <Label className="flex w-80 items-start gap-2 text-body font-regular text-label">
        <Radio name="radio-long" className="mt-0.5" defaultChecked />
        Run on every push to any branch, including forks and draft pull requests
      </Label>
    </Example>
    <Example label="disabled option in a group">
      <div
        role="radiogroup"
        aria-label="Region"
        className="flex flex-col gap-2"
      >
        <Label className="inline-flex items-center gap-2 text-body font-regular text-label">
          <Radio name="radio-region" defaultChecked />
          US East
        </Label>
        <Label className="inline-flex items-center gap-2 text-body font-regular text-label-tertiary">
          <Radio name="radio-region" disabled />
          EU West (coming soon)
        </Label>
      </div>
    </Example>
  </div>
);

const TRIGGERS = [
  {
    value: "manual",
    label: "Manual",
    description: "Run only when someone clicks Run.",
  },
  {
    value: "schedule",
    label: "On a schedule",
    description: "Run daily at 9:00 in the workspace time zone.",
  },
  {
    value: "webhook",
    label: "On webhook",
    description: "Run whenever a POST arrives at the agent's URL.",
  },
] as const;

function TriggerSettings() {
  const [trigger, setTrigger] = useState<string>("schedule");
  return (
    <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
      <h2 className="text-title text-label">Trigger</h2>
      <div
        role="radiogroup"
        aria-label="Trigger"
        className="flex flex-col gap-3"
      >
        {TRIGGERS.map((option) => (
          <div key={option.value} className="flex items-start gap-2">
            <Radio
              id={`radio-trigger-${option.value}`}
              name="radio-trigger"
              value={option.value}
              className="mt-0.5"
              checked={trigger === option.value}
              onChange={(event) => setTrigger(event.target.value)}
            />
            <div className="flex flex-col">
              <Label
                htmlFor={`radio-trigger-${option.value}`}
                className="text-body text-label"
              >
                {option.label}
              </Label>
              <p className="text-body text-label-secondary">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent trigger, options with descriptions">
      <TriggerSettings />
    </Example>
    <Example label="inline, beside a form label">
      <div className="flex w-120 flex-col gap-2">
        <Label>Output format</Label>
        <div
          role="radiogroup"
          aria-label="Output format"
          className="flex items-center gap-4"
        >
          {["Markdown", "JSON", "Plain text"].map((format, index) => (
            <Label
              key={format}
              className="inline-flex items-center gap-2 text-body font-regular text-label"
            >
              <Radio name="radio-format" defaultChecked={index === 0} />
              {format}
            </Label>
          ))}
        </div>
      </div>
    </Example>
  </div>
);
