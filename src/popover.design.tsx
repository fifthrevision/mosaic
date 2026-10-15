import { Clock, Filter, Settings2 } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select } from "./select";
import { Switch } from "./switch";

export const meta = {
  title: "Popover",
  description:
    "Small anchored window for controls, dismissed by outside click or Escape. Content brings its own width and padding.",
};

const SIDES = ["top", "right", "bottom", "left"] as const;
const ALIGNS = ["start", "center", "end"] as const;

export const Placements = () => (
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
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm">Open</Button>
              </PopoverTrigger>
              <PopoverContent side={side} align={align} className="w-56 p-3">
                <p className="text-body text-label-secondary">
                  side {side}, align {align}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("20");
  const [draft, setDraft] = useState(limit);
  return (
    <div className="flex items-center gap-3">
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) setDraft(limit);
        }}
      >
        <PopoverTrigger asChild>
          <Button icon={Settings2} dropdown>
            Max steps: {limit}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex w-64 flex-col gap-3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="popover-max-steps">Max steps per run</Label>
            <Input
              id="popover-max-steps"
              type="number"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            className="self-end"
            onClick={() => {
              setLimit(draft);
              setOpen(false);
            }}
          >
            Apply
          </Button>
        </PopoverContent>
      </Popover>
      <ColumnLabel>open: {String(open)}</ColumnLabel>
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="tall content (scrolls within the available height)">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm">Run log</Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-72 flex-col gap-2 p-3"
          >
            {Array.from({ length: 40 }, (_, index) => (
              <p key={index} className="text-subhead text-label-secondary">
                Step {index + 1}: fetched pull request #{900 + index}
              </p>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </Example>
    <Example label="no className (no width or padding of its own)">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm">Bare</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p className="text-body text-label-secondary">Unpadded content</p>
          </PopoverContent>
        </Popover>
      </div>
    </Example>
    <Example label="long unbroken text in a fixed width">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm">Webhook</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 p-3">
            <p className="text-body break-all text-label">
              https://hooks.sunnyday.dev/agents/pr-summarizer/runs/7f3a9c2e41b84d0f9a1e
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </Example>
  </div>
);

function ScheduleRow() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
      <div className="flex flex-col">
        <span className="text-body font-medium text-label">Schedule</span>
        <span className="text-subhead text-label-secondary">
          {enabled ? "Weekdays at 9:00" : "Off"}
        </span>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton
            icon={Clock}
            variant="subtle"
            title="Edit schedule"
            aria-label="Edit schedule"
          />
        </PopoverTrigger>
        <PopoverContent side="left" align="start" className="w-64 p-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule-enabled">Run on a schedule</Label>
              <Switch
                id="schedule-enabled"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="schedule-frequency">Frequency</Label>
              <Select
                id="schedule-frequency"
                defaultValue="weekdays"
                disabled={!enabled}
              >
                <option value="daily">Every day</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekly">Every Monday</option>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const STATUSES = ["Succeeded", "Failed", "Running"] as const;

function RunFilter() {
  const [selected, setSelected] = useState<string[]>(["Failed"]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" icon={Filter} dropdown>
          Status{selected.length > 0 ? ` (${selected.length})` : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-52 flex-col gap-2 p-3">
        {STATUSES.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <Checkbox
              id={`status-${status}`}
              checked={selected.includes(status)}
              onCheckedChange={(checked) =>
                setSelected((current) =>
                  checked
                    ? [...current, status]
                    : current.filter((s) => s !== status),
                )
              }
            />
            <Label htmlFor={`status-${status}`}>{status}</Label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="row settings (side left, from an icon button)">
      <ScheduleRow />
    </Example>
    <Example label="run list filter (checkboxes)">
      <div>
        <RunFilter />
      </div>
    </Example>
  </div>
);
