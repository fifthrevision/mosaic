import { ListOrdered, Pilcrow, WrapText } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { IconToggle } from "./icon-toggle";

export const meta = {
  title: "Icon Toggle",
  description:
    "Icon-only on/off button (aria-pressed) for view state, like wrap lines or line numbers. Panels and actions use IconButton.",
};

const VARIANTS = ["default", "subtle"] as const;

const COLUMNS = ["off", "on", "sm off", "sm on", "disabled"] as const;

const noop = () => {};

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(5,5rem)] items-center gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <IconToggle
          icon={WrapText}
          variant={variant}
          pressed={false}
          onPressedChange={noop}
          aria-label="Wrap lines"
        />
        <IconToggle
          icon={WrapText}
          variant={variant}
          pressed
          onPressedChange={noop}
          aria-label="Wrap lines"
        />
        <IconToggle
          icon={WrapText}
          variant={variant}
          size="sm"
          pressed={false}
          onPressedChange={noop}
          aria-label="Wrap lines"
        />
        <IconToggle
          icon={WrapText}
          variant={variant}
          size="sm"
          pressed
          onPressedChange={noop}
          aria-label="Wrap lines"
        />
        <IconToggle
          icon={WrapText}
          variant={variant}
          pressed
          onPressedChange={noop}
          disabled
          title="Wrapping is fixed for diffs"
          aria-label="Wrap lines"
        />
      </div>
    ))}
  </div>
);

function InteractiveRow({ variant }: { variant: (typeof VARIANTS)[number] }) {
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wrap, setWrap] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="w-24">
        <ColumnLabel>{variant}</ColumnLabel>
      </span>
      <IconToggle
        icon={ListOrdered}
        variant={variant}
        pressed={lineNumbers}
        onPressedChange={setLineNumbers}
        title="Line numbers"
        aria-label="Line numbers"
      />
      <IconToggle
        icon={WrapText}
        variant={variant}
        pressed={wrap}
        onPressedChange={setWrap}
        title="Wrap lines"
        aria-label="Wrap lines"
      />
    </div>
  );
}

export const Interactive = () => (
  <div className="flex flex-col gap-4">
    {VARIANTS.map((variant) => (
      <InteractiveRow key={variant} variant={variant} />
    ))}
  </div>
);

function DiffViewOptions() {
  const [wrap, setWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [whitespace, setWhitespace] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-md border border-separator-secondary bg-surface-card p-1">
      <IconToggle
        icon={WrapText}
        variant="subtle"
        size="sm"
        pressed={wrap}
        onPressedChange={setWrap}
        title="Wrap lines"
        aria-label="Wrap lines"
      />
      <IconToggle
        icon={ListOrdered}
        variant="subtle"
        size="sm"
        pressed={lineNumbers}
        onPressedChange={setLineNumbers}
        title="Line numbers"
        aria-label="Line numbers"
      />
      <IconToggle
        icon={Pilcrow}
        variant="subtle"
        size="sm"
        pressed={whitespace}
        onPressedChange={setWhitespace}
        title="Show whitespace"
        aria-label="Show whitespace"
      />
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="diff view options (subtle, sm)">
      <DiffViewOptions />
    </Example>
  </div>
);
