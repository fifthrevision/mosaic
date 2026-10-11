import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "../cn";

export function NavItem({
  icon: Icon,
  to,
  end,
  children,
}: {
  icon?: LucideIcon;
  to: string;
  end?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex h-8 items-center gap-3 rounded px-2 py-2.5 text-base font-medium",
          isActive
            ? "bg-state-selected control-shadow text-label"
            : "text-label-secondary hover:bg-state-hover",
        )
      }
    >
      {({ isActive }) => (
        <>
          {Icon && (
            <Icon
              size={16}
              className={cn(
                "shrink-0 text-shape-secondary",
                isActive && "text-theme-primary",
              )}
            />
          )}
          {children}
        </>
      )}
    </NavLink>
  );
}
