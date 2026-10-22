import { Slot, Slottable } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

// The pixel values repeat what mosaic-nav-item sets; ScrollingText needs them
// as numbers.
const PADDING_PX = 8;
const GAP_PX = 12;

const activeClass = {
  default: "mosaic-nav-item-active",
  tinted: "mosaic-nav-item-active-tinted",
} as const;

type Element =
  | ({ asChild?: false; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | { asChild: true; href?: undefined };

// With asChild the row is the child element (a router link, a button), which
// receives the classes and aria-current, so it has to spread unknown props and
// forward its ref, or the row silently loses its look.
export function NavItem({
  active = false,
  variant = "default",
  icon: Icon,
  asChild = false,
  className,
  children,
  ...props
}: Element & {
  active?: boolean;
  variant?: keyof typeof activeClass;
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}) {
  const Row = asChild ? Slot : "a";
  const label =
    typeof children === "string" ? (
      <ScrollingText
        leadingGapPx={Icon ? GAP_PX : PADDING_PX}
        trailingGapPx={PADDING_PX}
      >
        {children}
      </ScrollingText>
    ) : (
      children
    );
  return (
    <Row
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/scrolling-text mosaic-nav-item",
        active && activeClass[variant],
        className,
      )}
      {...props}
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
      <Slottable>{label}</Slottable>
    </Row>
  );
}
