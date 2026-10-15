import {
  TriangleAlert,
  Copy,
  Ellipsis,
  PanelLeft,
  PanelLeftDashed,
  PanelRight,
  PanelRightDashed,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  WrapText,
} from "lucide-react";
import { useState } from "react";
import { ColumnLabel } from "../studio/DesignHelpers";
import { IconButton } from "./icon-button";
import { IconToggle } from "./icon-toggle";
import { Menu, MenuItem, MenuSeparator } from "./menu";

export const meta = {
  title: "Icon Button",
  description:
    "Square icon-only button for actions. For on/off, use IconToggle.",
};

const VARIANTS = ["default", "primary", "subtle", "destructive"] as const;

const COLUMNS = ["md", "sm", "disabled", "menu open", "warning tone"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(5,5rem)] items-center gap-y-4">
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
          icon={TriangleAlert}
          variant={variant}
          tone="warning"
          aria-label="Needs a look"
        />
      </div>
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
      <IconToggle
        icon={WrapText}
        variant="subtle"
        size="sm"
        pressed={wrap}
        onPressedChange={setWrap}
        title="Wrap lines"
        aria-label="Wrap lines"
      />
      <IconButton
        icon={panel ? PanelRight : PanelRightDashed}
        variant="subtle"
        size="sm"
        aria-pressed={panel}
        onClick={() => setPanel(!panel)}
        title="Panel"
        aria-label="Panel"
      />
    </div>
  );
}

function WindowBar() {
  const [sidebar, setSidebar] = useState(true);
  const [inspector, setInspector] = useState(false);
  return (
    <div className="flex w-120 items-center justify-between rounded-md bg-surface-shell px-2 py-1">
      <IconButton
        icon={sidebar ? PanelLeft : PanelLeftDashed}
        variant="subtle"
        aria-pressed={sidebar}
        onClick={() => setSidebar(!sidebar)}
        title="Sidebar (⌘B)"
        aria-label="Sidebar"
      />
      <span className="text-body text-label-secondary">review.md</span>
      <IconButton
        icon={inspector ? PanelRight : PanelRightDashed}
        variant="subtle"
        aria-pressed={inspector}
        onClick={() => setInspector(!inspector)}
        title="Relationships (⌥⌘0)"
        aria-label="Relationships"
      />
    </div>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <ColumnLabel>
        panel buttons in a window bar (solid open, dashed closed)
      </ColumnLabel>
      <WindowBar />
    </div>
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
