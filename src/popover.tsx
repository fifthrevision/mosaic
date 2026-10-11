import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "./cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export function PopoverContent({
  className,
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        className={cn(
          "z-50 max-h-[var(--radix-popover-content-available-height)] overflow-y-auto rounded-lg border border-separator-secondary bg-surface-card shadow-[0px_4px_8px_var(--color-shadow-1)]",
          className,
        )}
      />
    </PopoverPrimitive.Portal>
  );
}
