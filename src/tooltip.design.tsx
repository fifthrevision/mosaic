import {
  CircleCheck,
  CircleX,
  Copy,
  Info,
  Pencil,
  Play,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { Tooltip } from "./tooltip";

export const meta = {
  title: "Tooltip",
  description:
    "Hover hint. On Button and IconButton pass `title`; wrap anything else in <Tooltip>, which takes one trigger element.",
};

const SIDES = ["top", "right", "bottom", "left"] as const;
const ALIGNS = ["start", "center", "end"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,8rem)] items-center gap-y-4">
    <span />
    {SIDES.map((side) => (
      <ColumnLabel key={side}>side {side}</ColumnLabel>
    ))}
    {ALIGNS.map((align) => (
      <div key={align} className="contents">
        <ColumnLabel>align {align}</ColumnLabel>
        {SIDES.map((side) => (
          <div key={side}>
            <Tooltip content={`${side}, ${align}`} side={side} align={align}>
              <Button size="sm">Hover</Button>
            </Tooltip>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Triggers = () => (
  <div className="grid grid-cols-[repeat(4,max-content)] items-center gap-x-8 gap-y-2">
    <ColumnLabel>Button title</ColumnLabel>
    <ColumnLabel>IconButton title</ColumnLabel>
    <ColumnLabel>wrapped text</ColumnLabel>
    <ColumnLabel>wrapped icon</ColumnLabel>
    <Button icon={Copy} title="Copies the agent with its settings">
      Duplicate
    </Button>
    <IconButton icon={Pencil} title="Rename" aria-label="Rename" />
    <Tooltip content="Last edited by Chong">
      <span className="text-body text-label-secondary">Edited 2h ago</span>
    </Tooltip>
    <Tooltip content="Inputs are filled in when a run starts">
      <Info
        size={16}
        tabIndex={0}
        aria-label="About inputs"
        className="text-shape-secondary focus-visible:control-focus-ring"
      />
    </Tooltip>
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long content (wraps at max-w-64)">
      <div>
        <Tooltip content="The agent runs with these inputs every weekday at 9:00 in the workspace's time zone, and posts a summary to the review channel when it finishes.">
          <Button size="sm">Hover</Button>
        </Tooltip>
      </div>
    </Example>
    <Example label="rich content">
      <div>
        <Tooltip
          content={
            <span className="flex flex-col">
              <span className="font-medium">Run #1240</span>
              <span className="text-label-secondary">12 steps · 48s</span>
            </span>
          }
        >
          <Button size="sm">Hover</Button>
        </Tooltip>
      </div>
    </Example>
    <Example label="disabled button (wrap in a span; disabled buttons get no hover)">
      <div>
        <Tooltip content="Add an input before running">
          <span
            tabIndex={0}
            className="inline-flex focus-visible:control-focus-ring"
          >
            <Button size="sm" icon={Play} disabled>
              Run
            </Button>
          </span>
        </Tooltip>
      </div>
    </Example>
  </div>
);

const FILES = [
  "instructions.md",
  "quarterly-planning-notes-final-v3-reviewed-by-legal.md",
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="editor toolbar (icon buttons with title)">
      <div className="flex w-fit items-center gap-1 rounded-md border border-separator-secondary bg-surface-card p-1">
        <IconButton
          icon={Play}
          variant="subtle"
          size="sm"
          title="Run"
          aria-label="Run"
        />
        <IconButton
          icon={RefreshCw}
          variant="subtle"
          size="sm"
          title="Reload inputs"
          aria-label="Reload inputs"
        />
        <IconButton
          icon={Copy}
          variant="subtle"
          size="sm"
          title="Copy output"
          aria-label="Copy output"
        />
        <IconButton
          icon={Trash2}
          variant="subtle"
          size="sm"
          title="Delete run"
          aria-label="Delete run"
        />
      </div>
    </Example>
    <Example label="truncated file names (full name on hover)">
      <div className="flex w-64 flex-col rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {FILES.map((file) => (
          <Tooltip key={file} content={file} side="right">
            <span
              tabIndex={0}
              className="truncate border-b border-separator-secondary px-3 py-2 text-body text-label last:border-b-0 focus-visible:control-focus-ring"
            >
              {file}
            </span>
          </Tooltip>
        ))}
      </div>
    </Example>
    <Example label="run status icons">
      <div className="flex items-center gap-3">
        <Tooltip content="Run #1240 succeeded">
          <CircleCheck
            size={16}
            tabIndex={0}
            aria-label="Succeeded"
            className="text-shape-constructive focus-visible:control-focus-ring"
          />
        </Tooltip>
        <Tooltip content="Run #1239 failed: rate limited by GitHub">
          <CircleX
            size={16}
            tabIndex={0}
            aria-label="Failed"
            className="text-shape-destructive focus-visible:control-focus-ring"
          />
        </Tooltip>
      </div>
    </Example>
  </div>
);
