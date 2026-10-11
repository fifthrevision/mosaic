import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { Tooltip } from "./tooltip";

export const meta = {
  title: "Tooltip",
  description:
    "Hover hint shown via the native `title` prop on Button and IconButton, or by wrapping any element in <Tooltip>.",
};

export const ButtonWithTitle = () => (
  <Button icon={Plus} title="Add a new item">
    Add
  </Button>
);

export const IconButtonWithTitle = () => (
  <IconButton icon={Trash2} variant="subtle" title="Delete" />
);

export const Wrapped = () => (
  <Tooltip content="Wrapped tooltip content">
    <span className="rounded border border-separator-secondary bg-surface-card px-2 py-1 text-base text-label">
      Hover me
    </span>
  </Tooltip>
);

export const Sides = () => (
  <div className="flex gap-3">
    <Tooltip content="Top" side="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Bottom" side="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Left" side="left">
      <Button>Left</Button>
    </Tooltip>
    <Tooltip content="Right" side="right">
      <Button>Right</Button>
    </Tooltip>
  </div>
);
