import { Copy, Pencil, Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ColumnLabel } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Card } from "./card";
import { Menu, MenuItem, MenuSeparator } from "./menu";

export const meta = {
  title: "Button",
  description: "Action button with size and variant options",
};

const VARIANTS = ["default", "primary", "subtle", "destructive"] as const;

const COLUMNS = [
  "md",
  "icon",
  "dropdown",
  "disabled",
  "loading",
  "menu open",
] as const;

function labelFor(variant: (typeof VARIANTS)[number]) {
  return variant.charAt(0).toUpperCase() + variant.slice(1);
}

export const Medium = () => (
  <div className="grid grid-cols-[6rem_repeat(6,max-content)] items-center gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <Button variant={variant}>{labelFor(variant)}</Button>
        <Button variant={variant} icon={Plus}>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} dropdown>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} disabled>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} loading>
          Saving…
        </Button>
        <Button variant={variant} dropdown data-state="open">
          {labelFor(variant)}
        </Button>
      </div>
    ))}
  </div>
);

export const Small = () => (
  <div className="grid grid-cols-[6rem_repeat(5,max-content)] items-center gap-x-4 gap-y-3">
    <span />
    {(["sm", "icon", "dropdown", "disabled", "loading"] as const).map(
      (column) => (
        <ColumnLabel key={column}>{column}</ColumnLabel>
      ),
    )}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <Button variant={variant} size="sm">
          {labelFor(variant)}
        </Button>
        <Button variant={variant} size="sm" icon={Plus}>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} size="sm" dropdown>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} size="sm" disabled>
          {labelFor(variant)}
        </Button>
        <Button variant={variant} size="sm" loading>
          Saving…
        </Button>
      </div>
    ))}
  </div>
);

export const Sizing = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <ColumnLabel>long label (truncates at max-w-80)</ColumnLabel>
      <Button icon={Plus}>
        This is an extremely long button label that might cause layout issues
      </Button>
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>fixed width (className=&quot;w-50&quot;)</ColumnLabel>
      <Button icon={Plus} className="w-50">
        Fixed width
      </Button>
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>tooltip (title)</ColumnLabel>
      <Button icon={Copy} title="Copies the agent with its settings">
        Duplicate
      </Button>
    </div>
  </div>
);

function SaveButton() {
  const [saving, setSaving] = useState(false);
  return (
    <Button
      variant="primary"
      loading={saving}
      onClick={() => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
      }}
    >
      {saving ? "Saving…" : "Save"}
    </Button>
  );
}

function BleedColumn({ bleed }: { bleed?: "start" }) {
  return (
    <div className="flex w-120 flex-col gap-2 px-4">
      <p className="text-body text-label-secondary">
        Members can run agents and review their output.
      </p>
      <Card>
        <div className="px-4 py-2 text-body text-label">Ada Lovelace</div>
      </Card>
      <div>
        <Button variant="subtle" size="sm" icon={Plus} bleed={bleed}>
          Add member
        </Button>
      </div>
    </div>
  );
}

export const Bleed = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <ColumnLabel>bleed="start": icon on the text edge</ColumnLabel>
      <BleedColumn bleed="start" />
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>no bleed: icon 8px in</ColumnLabel>
      <BleedColumn />
    </div>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <ColumnLabel>dialog actions (click Save)</ColumnLabel>
      <div className="flex w-120 flex-row-reverse gap-3 rounded-md border border-separator-secondary bg-surface-canvas p-4">
        <SaveButton />
        <div className="mr-auto">
          <Button variant="destructive" icon={Trash2}>
            Delete
          </Button>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>card header actions</ColumnLabel>
      <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <span className="text-title text-label">PR Summarizer</span>
        <div className="flex items-center gap-2">
          <Button variant="primary" icon={Play}>
            Run
          </Button>
          <Menu trigger={<Button dropdown>More</Button>}>
            <MenuItem icon={Pencil} onSelect={() => {}}>
              Rename
            </MenuItem>
            <MenuItem icon={Copy} onSelect={() => {}}>
              Duplicate
            </MenuItem>
            <MenuSeparator />
            <MenuItem icon={Trash2} variant="destructive" onSelect={() => {}}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>section action (subtle, sm)</ColumnLabel>
      <div className="flex w-120 items-center justify-between">
        <span className="text-subhead font-medium text-label-secondary">
          Inputs
        </span>
        <Button variant="subtle" size="sm" icon={Plus}>
          Add
        </Button>
      </div>
    </div>
  </div>
);
