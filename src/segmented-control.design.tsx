import { useState } from "react";
import { Select } from "./select";
import { SegmentedControl, type SegmentedOption } from "./segmented-control";

export const meta = {
  title: "Segmented Control",
  description:
    "Mutually exclusive choice across a handful of short options, all visible at once. Use where a Switch can't say enough — three states, or two whose labels aren't obviously on/off. Reach for a Select past ~4 options.",
};

const REASONING: SegmentedOption<"off" | "default" | "on">[] = [
  { value: "off", label: "Off" },
  { value: "default", label: "Default" },
  { value: "on", label: "On" },
];

const TWO: SegmentedOption<"list" | "grid">[] = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

export const Default = () => {
  const [value, setValue] = useState<"off" | "default" | "on">("default");
  return (
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value={value}
      onChange={setValue}
    />
  );
};

export const TwoOptions = () => {
  const [value, setValue] = useState<"list" | "grid">("list");
  return (
    <SegmentedControl
      aria-label="Layout"
      options={TWO}
      value={value}
      onChange={setValue}
    />
  );
};

export const FirstSelected = () => {
  const [value, setValue] = useState<"off" | "default" | "on">("off");
  return (
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value={value}
      onChange={setValue}
    />
  );
};

export const LastSelected = () => {
  const [value, setValue] = useState<"off" | "default" | "on">("on");
  return (
    <SegmentedControl
      aria-label="Extended thinking"
      options={REASONING}
      value={value}
      onChange={setValue}
    />
  );
};

export const Disabled = () => (
  <SegmentedControl
    aria-label="Extended thinking"
    options={REASONING}
    value="default"
    onChange={() => {}}
    disabled
  />
);

/** Next to a Select, the pairing it ships in on the admin and agent screens. */
export const AlongsideSelect = () => {
  const [value, setValue] = useState<"off" | "default" | "on">("on");
  return (
    <div className="flex items-center gap-2">
      <div className="w-64">
        <Select defaultValue="haiku">
          <option value="haiku">Claude Haiku 4.5</option>
          <option value="sonnet">Claude Sonnet 5</option>
        </Select>
      </div>
      <SegmentedControl
        aria-label="Extended thinking"
        options={REASONING}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
