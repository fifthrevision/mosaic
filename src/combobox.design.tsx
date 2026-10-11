import { useState } from "react";
import { Combobox, type ComboboxOption } from "./combobox";

export const meta = {
  title: "Combobox",
  description:
    "Filterable single-select dropdown. Use for lists where a plain Select gets unwieldy (more than ~15 options, or any list users might want to search).",
};

const SHORT_OPTIONS: ComboboxOption[] = [
  { value: "main", label: "main", description: "default" },
  { value: "staging", label: "staging" },
  { value: "production", label: "production" },
];

const LONG_OPTIONS: ComboboxOption[] = Array.from({ length: 50 }, (_, i) => ({
  value: `branch-${i}`,
  label: `branch-${i}`,
}));

const WITH_DISABLED: ComboboxOption[] = [
  { value: "a", label: "Anthropic" },
  { value: "o", label: "OpenAI" },
  { value: "g", label: "Google", disabled: true },
  { value: "x", label: "xAI", disabled: true },
];

export const Default = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={SHORT_OPTIONS}
        placeholder="Pick a branch…"
      />
    </div>
  );
};

export const Long = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={LONG_OPTIONS}
        placeholder="Pick a branch…"
        searchPlaceholder="Filter…"
      />
    </div>
  );
};

export const WithDescription = () => {
  const [value, setValue] = useState("main");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={SHORT_OPTIONS}
        placeholder="Pick a branch…"
      />
    </div>
  );
};

export const WithDisabled = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={WITH_DISABLED}
        placeholder="Pick a provider…"
      />
    </div>
  );
};

export const Empty = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={[]}
        placeholder="Pick a branch…"
        emptyMessage="No branches available — connect a repo first"
      />
    </div>
  );
};

export const Loading = () => {
  const [value, setValue] = useState("");
  return (
    <div className="w-80">
      <Combobox
        value={value}
        onValueChange={setValue}
        options={[]}
        placeholder="Pick a branch…"
        loading
      />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="w-80">
      <Combobox
        value=""
        onValueChange={() => {}}
        options={SHORT_OPTIONS}
        placeholder="Pick a branch…"
        disabled
      />
    </div>
  );
};
