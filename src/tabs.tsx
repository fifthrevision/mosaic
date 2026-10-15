import * as TabsPrimitive from "@radix-ui/react-tabs";
import { X, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { IconButton } from "./icon-button";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      {...props}
      // The padding/negative margin pair keeps overflow-x from clipping
      // control-shadow and focus rings on the triggers.
      className={cn(
        "-m-1 flex items-center gap-2 overflow-x-auto p-1 [scrollbar-width:none] *:shrink-0",
        className,
      )}
    />
  );
}

const tabShapeClassName =
  "group inline-flex h-8 w-fit items-center gap-1.75 rounded-md px-3 text-body font-medium select-none focus-visible:control-focus-ring";

export function tabClassName(active: boolean): string {
  return cn(
    tabShapeClassName,
    active
      ? "bg-state-selected text-label control-shadow"
      : "text-label-secondary hover:bg-state-hover",
  );
}

export function tabIconClassName(active: boolean): string {
  return cn("shrink-0", active ? "text-shape-theme" : "text-shape-secondary");
}

const sizeConfig = {
  sm: {
    trigger: "h-7 px-2.5",
    closableTrigger: "pr-7",
    closeButton: "top-0.5 right-0.5",
  },
  md: {
    trigger: "h-8 px-3",
    closableTrigger: "pr-8",
    closeButton: "top-1 right-1",
  },
} as const;

export function TabsTrigger({
  icon: Icon,
  size = "md",
  children,
  className,
  onClose,
  ...props
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
  size?: keyof typeof sizeConfig;
  onClose?: () => void;
} & React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const {
    trigger: triggerSize,
    closableTrigger,
    closeButton,
  } = sizeConfig[size];

  const trigger = (
    <TabsPrimitive.Trigger
      {...props}
      className={cn(
        tabShapeClassName,
        triggerSize,
        "text-label-secondary hover:not-data-[state=active]:bg-state-hover",
        "data-[state=active]:bg-state-selected data-[state=active]:text-label data-[state=active]:control-shadow",
        onClose &&
          cn(
            closableTrigger,
            "group-hover/closable:not-data-[state=active]:bg-state-hover",
          ),
        className,
      )}
    >
      {Icon && (
        <Icon
          size={16}
          className="shrink-0 text-shape-secondary group-data-[state=active]:text-shape-theme"
        />
      )}
      <span className="truncate">{children}</span>
    </TabsPrimitive.Trigger>
  );

  if (!onClose) {
    return trigger;
  }

  // A button cannot nest inside the trigger's <button>, so the close button
  // is a sibling laid over the trigger's right padding.
  return (
    <div className="group/closable relative inline-flex">
      {trigger}
      <IconButton
        icon={X}
        size="sm"
        variant="subtle"
        aria-label={
          typeof children === "string" ? `Close ${children}` : "Close tab"
        }
        onClick={onClose}
        className={cn("absolute", closeButton)}
      />
    </div>
  );
}

export const TabsPanel = TabsPrimitive.Content;
