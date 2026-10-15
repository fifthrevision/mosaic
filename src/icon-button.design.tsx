import {
  Copy,
  Ellipsis,
  PanelRight,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  WrapText,
} from "lucide-react";
import { useState } from "react";
import { ColumnLabel } from "../studio/DesignHelpers";
import { IconButton } from "./icon-button";
import { Menu, MenuItem, MenuSeparator } from "./menu";

export const meta = {
  title: "Icon Button",
  description: "Square icon-only button with size, variant, and toggle options",
};

const VARIANTS = ["default", "primary", "subtle"] as const;

const COLUMNS = [
  "md",
  "sm",
  "disabled",
  "menu open",
  "toggle off",
  "toggle on",
] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(6,5rem)] items-center gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <IconButton icon={Pencil} variant={variant} aria-label="Edit" />
        <IconButton
          icon={Pencil}
          variant={variant}
          size="sm"
          aria-label="Edit"
        />
        <IconButton
          icon={Pencil}
          variant={variant}
          disabled
          aria-label="Edit"
        />
        <IconButton
          icon={Ellipsis}
          variant={variant}
          data-state="open"
          aria-label="More"
        />
        <IconButton
          icon={WrapText}
          variant={variant}
          pressed={false}
          aria-label="Wrap lines"
        />
        <IconButton
          icon={WrapText}
          variant={variant}
          pressed
          aria-label="Wrap lines"
        />
      </div>
    ))}
  </div>
);

function ToggleRow({ variant }: { variant: (typeof VARIANTS)[number] }) {
  const [panel, setPanel] = useState(true);
  const [wrap, setWrap] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="w-24">
        <ColumnLabel>{variant}</ColumnLabel>
      </span>
      <IconButton
        icon={PanelRight}
        variant={variant}
        pressed={panel}
        onClick={() => setPanel(!panel)}
        title="Show panel"
        aria-label="Show panel"
      />
      <IconButton
        icon={WrapText}
        variant={variant}
        pressed={wrap}
        onClick={() => setWrap(!wrap)}
        title="Wrap lines"
        aria-label="Wrap lines"
      />
      <IconButton
        icon={PanelRight}
        variant={variant}
        size="sm"
        pressed={panel}
        onClick={() => setPanel(!panel)}
        aria-label="Show panel"
      />
      <IconButton
        icon={WrapText}
        variant={variant}
        size="sm"
        pressed={wrap}
        onClick={() => setWrap(!wrap)}
        aria-label="Wrap lines"
      />
    </div>
  );
}

export const Toggle = () => (
  <div className="flex flex-col gap-4">
    {VARIANTS.map((variant) => (
      <ToggleRow key={variant} variant={variant} />
    ))}
  </div>
);

function Toolbar() {
  const [wrap, setWrap] = useState(true);
  const [panel, setPanel] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-md border border-separator-secondary bg-surface-card p-1">
      <IconButton
        icon={Copy}
        variant="subtle"
        size="sm"
        title="Copy"
        aria-label="Copy"
      />
      <IconButton
        icon={RefreshCw}
        variant="subtle"
        size="sm"
        title="Refresh"
        aria-label="Refresh"
      />
      <div className="mx-1 h-4 w-px bg-separator-secondary" />
      <IconButton
        icon={WrapText}
        variant="subtle"
        size="sm"
        pressed={wrap}
        onClick={() => setWrap(!wrap)}
        title="Wrap lines"
        aria-label="Wrap lines"
      />
      <IconButton
        icon={PanelRight}
        variant="subtle"
        size="sm"
        pressed={panel}
        onClick={() => setPanel(!panel)}
        title="Show panel"
        aria-label="Show panel"
      />
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <ColumnLabel>toolbar (subtle, sm, with toggles)</ColumnLabel>
      <Toolbar />
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>card header actions</ColumnLabel>
      <div className="flex w-96 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <span className="text-title text-label">Instructions</span>
        <div className="flex items-center gap-1">
          <IconButton
            icon={Plus}
            variant="subtle"
            title="Add"
            aria-label="Add"
          />
          <Menu
            trigger={
              <IconButton icon={Ellipsis} variant="subtle" aria-label="More" />
            }
          >
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
      <ColumnLabel>raised, next to a button row</ColumnLabel>
      <div className="flex items-center gap-2">
        <IconButton icon={RefreshCw} title="Refresh" aria-label="Refresh" />
        <IconButton
          icon={Plus}
          variant="primary"
          title="New agent"
          aria-label="New agent"
        />
      </div>
    </div>
  </div>
);
