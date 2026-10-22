import { Slot, Slottable } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { cloneElement, type ReactElement, type ReactNode } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

// The pixel values repeat what mosaic-nav-item sets; ScrollingText needs them
// as numbers.
const PADDING_PX = 8;
const GAP_PX = 12;

// Renders no element of its own: the child (a router link, an anchor, a
// button) receives the classes and aria-current, so it has to spread unknown
// props and forward its ref, or the row silently loses its look.
const activeClass = {
  default: "mosaic-nav-item-active",
  tinted: "mosaic-nav-item-active-tinted",
} as const;

export function NavItem({
  active = false,
  variant = "default",
  icon: Icon,
  className,
  children,
}: {
  active?: boolean;
  variant?: keyof typeof activeClass;
  icon?: LucideIcon;
  className?: string;
  children: ReactElement<{ children?: ReactNode }>;
}) {
  const label = (
    <ScrollingText
      leadingGapPx={Icon ? GAP_PX : PADDING_PX}
      trailingGapPx={PADDING_PX}
    >
      {children.props.children}
    </ScrollingText>
  );
  return (
    <Slot
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/scrolling-text mosaic-nav-item",
        active && activeClass[variant],
        className,
      )}
    >
      {Icon && (
        <Icon
          size={16}
          className={cn(
            "shrink-0",
            active ? "text-theme-primary" : "text-shape-secondary",
          )}
        />
      )}
      <Slottable>{cloneElement(children, undefined, label)}</Slottable>
    </Slot>
  );
}
