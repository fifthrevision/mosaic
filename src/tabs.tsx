import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      {...props}
      className={cn("flex items-center gap-2", className)}
    />
  );
}

export const tabClassName =
  "group inline-flex h-8 w-fit items-center gap-1.75 rounded-md px-3 text-base font-medium select-none focus-visible:control-focus-ring";

export function TabsTrigger({
  icon: Icon,
  children,
  className,
  ...props
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
} & React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      {...props}
      className={cn(
        tabClassName,
        "text-label-secondary hover:not-data-[state=active]:bg-state-hover",
        "data-[state=active]:bg-state-selected data-[state=active]:text-label data-[state=active]:control-shadow",
        className,
      )}
    >
      {Icon && (
        <Icon
          size={16}
          className="shrink-0 text-shape-secondary group-data-[state=active]:text-theme-primary"
        />
      )}
      <span className="truncate">{children}</span>
    </TabsPrimitive.Trigger>
  );
}

export const TabsPanel = TabsPrimitive.Content;
