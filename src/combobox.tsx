import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

export type ComboboxOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  /** Goes on the trigger, so a `Label htmlFor` can point at it. */
  id?: string;
  className?: string;
}

export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results",
  disabled = false,
  loading = false,
  id,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);
  const triggerLabel = loading ? "Loading…" : (selected?.label ?? placeholder);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled || loading}
          className={cn(
            "group/scrolling-text flex h-8 w-full items-center appearance-none rounded-md border border-separator-secondary bg-surface-input py-1.5 pl-3 pr-8 text-left text-body font-medium text-label input-shadow outline-none hover:not-disabled:border-separator-input-hover focus:border-separator-input-focus disabled:cursor-not-allowed disabled:opacity-50 relative",
            !selected && !loading && "text-label-tertiary font-regular",
            className,
          )}
        >
          {/* pr-8 holds the absolute chevron; only its last 8px is open space. */}
          <ScrollingText leadingGapPx={12} trailingGapPx={8}>
            {triggerLabel}
          </ScrollingText>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-shape-secondary"
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border border-separator-secondary floating-surface p-1 overlay-shadow data-[state=open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]"
        >
          <Command className="flex flex-col gap-1">
            <Command.Input
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded-sm border border-separator-secondary bg-surface-input px-2 text-body font-medium text-label placeholder:text-label-tertiary placeholder:font-regular outline-none focus:border-separator-input-focus"
            />
            <Command.List className="max-h-60 overflow-y-auto">
              <Command.Empty className="py-3 text-center text-body text-label-secondary">
                {emptyMessage}
              </Command.Empty>
              {options.map((option) => (
                <Command.Item
                  key={option.value}
                  value={`${option.label} ${option.value}`}
                  disabled={option.disabled}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className="flex h-8 items-center gap-2 rounded-sm px-2 text-body text-label outline-none select-none cursor-default data-[selected=true]:bg-state-hover data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
                >
                  <Check
                    size={16}
                    className={cn(
                      "shrink-0 text-shape-secondary",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="flex-1 truncate">{option.label}</span>
                  {option.description ? (
                    <span className="text-label-secondary text-subhead">
                      {option.description}
                    </span>
                  ) : null}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
