import * as Popover from "@radix-ui/react-popover";
import { Command, defaultFilter } from "cmdk";
import { createContext, useContext, useState } from "react";
import { cn } from "./cn";

const CloseSearchMenuContext = createContext<() => void>(() => {});

export function SearchMenu({
  trigger,
  open,
  onOpenChange,
  placeholder = "Search…",
  onHighlightChange,
  align = "start",
  className,
  children,
}: {
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  onHighlightChange?: (value: string) => void;
  align?: "start" | "center" | "end";
  className?: string;
  children: (search: string) => React.ReactNode;
}) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={4}
          collisionPadding={8}
          className={cn(
            "z-50 min-w-50 rounded-md border border-separator-secondary floating-surface p-1 overlay-shadow origin-(--radix-popover-content-transform-origin) data-[state=open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]",
            className,
          )}
        >
          <CloseSearchMenuContext.Provider value={() => onOpenChange(false)}>
            <SearchMenuCommand
              placeholder={placeholder}
              onHighlightChange={onHighlightChange}
            >
              {children}
            </SearchMenuCommand>
          </CloseSearchMenuContext.Provider>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// Mounted only while the menu is open, so the search and highlight start
// fresh each time it opens.
function SearchMenuCommand({
  placeholder,
  onHighlightChange,
  children,
}: {
  placeholder: string;
  onHighlightChange?: (value: string) => void;
  children: (search: string) => React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  // cmdk only reports highlight changes when `value` is controlled. It also
  // highlights the first row on open and on every search change, and reports
  // those too.
  const [highlighted, setHighlighted] = useState("");

  return (
    <Command
      label={placeholder}
      shouldFilter={false}
      value={highlighted}
      onValueChange={(value) => {
        setHighlighted(value);
        onHighlightChange?.(value);
      }}
      className="flex flex-col gap-1"
    >
      <Command.Input
        value={search}
        onValueChange={setSearch}
        placeholder={placeholder}
        className="h-8 w-full rounded-sm border border-separator-secondary bg-surface-input px-2 text-body font-medium text-label placeholder:text-label-tertiary placeholder:font-regular outline-none focus:border-separator-input-focus"
      />
      <Command.List className="max-h-80 overflow-y-auto">
        {children(search)}
      </Command.List>
    </Command>
  );
}

export function SearchMenuItem({
  value,
  onSelect,
  disabled,
  children,
}: {
  value: string;
  onSelect: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const close = useContext(CloseSearchMenuContext);
  return (
    <Command.Item
      value={value}
      disabled={disabled}
      onSelect={() => {
        onSelect();
        close();
      }}
      className="flex h-8 items-center gap-2 rounded-sm px-2 text-body text-label outline-none select-none cursor-default data-[selected=true]:bg-state-hover data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
    >
      {children}
    </Command.Item>
  );
}

export function SearchMenuMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-3 text-center text-body text-label-secondary">
      {children}
    </div>
  );
}

export function rankBySearch<T>(
  items: readonly T[],
  search: string,
  text: (item: T) => string,
): T[] {
  const needle = search.trim();
  if (needle === "") return [...items];
  return items
    .map((item) => ({ item, score: defaultFilter(text(item), needle) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
