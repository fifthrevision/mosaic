import { Settings2 } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export const meta = {
  title: "Popover",
  description: "Anchored floating panel with outside-click and Escape dismiss",
};

export const Placements = () => {
  return (
    <div className="flex gap-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button icon={Settings2}>Open below</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <p className="text-body text-label-secondary">
            Default placement, dismissed by clicking outside or Escape.
          </p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button icon={Settings2}>Open left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" sideOffset={8} className="w-64 p-3">
          <p className="text-body text-label-secondary">
            Side placement for row-anchored settings panels.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
