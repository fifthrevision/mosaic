import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { createContext, useContext } from "react";

type CollisionPadding =
  | number
  | Partial<Record<"top" | "right" | "bottom" | "left", number>>;

const CollisionPaddingContext = createContext<CollisionPadding>(8);

export function TooltipProvider({
  children,
  delayDuration = 300,
  collisionPadding = 8,
}: {
  children: React.ReactNode;
  delayDuration?: number;
  collisionPadding?: CollisionPadding;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <CollisionPaddingContext.Provider value={collisionPadding}>
        {children}
      </CollisionPaddingContext.Provider>
    </TooltipPrimitive.Provider>
  );
}

export function Tooltip({
  content,
  side = "top",
  align = "center",
  children,
}: {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}) {
  const collisionPadding = useContext(CollisionPaddingContext);
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={6}
          collisionPadding={collisionPadding}
          className="z-50 max-w-64 rounded-sm border border-separator-secondary bg-surface-floating px-2 py-1 text-sm text-label select-none shadow-[0px_4px_12px_var(--color-shadow-1)] data-[state=delayed-open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]"
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
