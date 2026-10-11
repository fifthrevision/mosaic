import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "../cn";
import { tabClassName } from "../tabs";

export interface NavTab {
  to: string;
  label: string;
  icon: LucideIcon;
}

/** Route-driven sibling of Tabs: same visual language, NavLink state. */
export function NavTabs({ tabs }: { tabs: NavTab[] }) {
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              cn(
                tabClassName,
                isActive
                  ? "bg-state-selected text-label control-shadow"
                  : "text-label-secondary hover:bg-state-hover",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={16}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-theme-primary" : "text-shape-secondary",
                  )}
                />
                <span className="truncate">{tab.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}
