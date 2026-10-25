import {
  Clock,
  Copy,
  FlaskConical,
  Pencil,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { ColumnLabel } from "../studio/DesignHelpers";
import { Button } from "./button";
import { MenuItem, MenuSeparator } from "./menu";
import { SplitButton, SplitIconButton } from "./split-button";

export const meta = {
  title: "Split Button",
  description:
    "A button with a menu of related actions on an attached chevron. The main half runs the common action; the chevron offers alternatives to it.",
};

const VARIANTS = ["default", "primary", "destructive"] as const;
const SIZES = ["md", "sm"] as const;

const RUN_MENU = (
  <>
    <MenuItem icon={Clock} onSelect={() => {}}>
      Schedule…
    </MenuItem>
    <MenuItem icon={FlaskConical} onSelect={() => {}}>
      Dry run
    </MenuItem>
  </>
);

const NEW_MENU = (
  <>
    <MenuItem icon={Copy} onSelect={() => {}}>
      Duplicate current
    </MenuItem>
    <MenuItem icon={Pencil} onSelect={() => {}}>
      From template…
    </MenuItem>
  </>
);

export const Variants = () => (
  <div className="grid grid-cols-[6rem_repeat(5,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    <ColumnLabel>md</ColumnLabel>
    <ColumnLabel>sm</ColumnLabel>
    <ColumnLabel>icon md</ColumnLabel>
    <ColumnLabel>icon sm</ColumnLabel>
    <ColumnLabel>loading</ColumnLabel>
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        {SIZES.map((size) => (
          <SplitButton
            key={size}
            variant={variant}
            size={size}
            icon={variant === "destructive" ? Trash2 : Play}
            menu={RUN_MENU}
          >
            {variant === "destructive" ? "Delete" : "Run"}
          </SplitButton>
        ))}
        {SIZES.map((size) => (
          <SplitIconButton
            key={size}
            variant={variant}
            size={size}
            icon={variant === "destructive" ? Trash2 : Plus}
            aria-label="New"
            menu={NEW_MENU}
          />
        ))}
        <SplitButton variant={variant} icon={Play} loading menu={RUN_MENU}>
          Running
        </SplitButton>
      </div>
    ))}
  </div>
);

export const States = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <ColumnLabel>disabled</ColumnLabel>
      <div className="flex items-center gap-3">
        <SplitButton icon={Play} disabled menu={RUN_MENU}>
          Run
        </SplitButton>
        <SplitIconButton
          icon={Plus}
          aria-label="New"
          disabled
          menu={NEW_MENU}
        />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <ColumnLabel>long label (max-w-80)</ColumnLabel>
      <SplitButton icon={Play} menu={RUN_MENU}>
        Run every agent in this workspace against the latest commit
      </SplitButton>
    </div>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-2">
    <ColumnLabel>card header: split primary next to a plain button</ColumnLabel>
    <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
      <span className="text-title text-label">PR Summarizer</span>
      <div className="flex items-center gap-2">
        <Button>Edit</Button>
        <SplitButton
          variant="primary"
          icon={Play}
          menu={
            <>
              {RUN_MENU}
              <MenuSeparator />
              <MenuItem icon={Trash2} variant="destructive" onSelect={() => {}}>
                Cancel all runs
              </MenuItem>
            </>
          }
        >
          Run
        </SplitButton>
      </div>
    </div>
  </div>
);
