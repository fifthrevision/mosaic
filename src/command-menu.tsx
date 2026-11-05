import * as RadixDialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { createContext, useContext, useState } from "react";
import {
  RowRegistryProvider,
  useCommandHighlight,
  useRegisteredRow,
} from "./command-highlight";
import { cn } from "./cn";
import { Shortcut } from "./shortcut";
import type { UIIcon } from "./ui-icon";

const CloseCommandMenuContext = createContext<() => void>(() => {});

export function CommandMenu({
  open,
  onOpenChange,
  label,
  placeholder = "Search…",
  onHighlightChange,
  className,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  placeholder?: string;
  onHighlightChange?: (value: string) => void;
  className?: string;
  children: (search: string) => React.ReactNode;
}) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed top-20 left-1/2 z-50 w-dialog-medium max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-hidden rounded-xl border border-separator-primary-translucent glass-surface command-shadow origin-top focus:outline-none data-[state=open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]",
            className,
          )}
        >
          <RadixDialog.Title className="sr-only">{label}</RadixDialog.Title>
          <CloseCommandMenuContext.Provider value={() => onOpenChange(false)}>
            <CommandMenuCommand
              label={label}
              placeholder={placeholder}
              onHighlightChange={onHighlightChange}
            >
              {children}
            </CommandMenuCommand>
          </CloseCommandMenuContext.Provider>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

// Mounted only while the menu is open, so the search and highlight start
// fresh each time it opens.
function CommandMenuCommand({
  label,
  placeholder,
  onHighlightChange,
  children,
}: {
  label: string;
  placeholder: string;
  onHighlightChange?: (value: string) => void;
  children: (search: string) => React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const { highlighted, highlight, registerRow } =
    useCommandHighlight(onHighlightChange);

  return (
    <Command
      label={label}
      shouldFilter={false}
      value={highlighted}
      onValueChange={highlight}
      className="flex flex-col"
    >
      <Command.Input
        value={search}
        onValueChange={setSearch}
        placeholder={placeholder}
        className="h-13 w-full bg-transparent px-4 text-title font-regular text-label placeholder:text-label-tertiary outline-none"
      />
      <Command.List className="max-h-96 overflow-y-auto px-2 pb-2 empty:hidden">
        <RowRegistryProvider value={registerRow}>
          {children(search)}
        </RowRegistryProvider>
      </Command.List>
    </Command>
  );
}

export function CommandMenuItem({
  value,
  onSelect,
  disabled,
  icon: Icon,
  title,
  subtitle,
  detail,
  shortcut,
}: {
  value: string;
  onSelect: () => void;
  disabled?: boolean;
  icon?: UIIcon;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  detail?: React.ReactNode;
  shortcut?: readonly string[];
}) {
  const close = useContext(CloseCommandMenuContext);
  const rowRef = useRegisteredRow(value, disabled ?? false);
  return (
    <Command.Item
      ref={rowRef}
      value={value}
      disabled={disabled}
      onSelect={() => {
        onSelect();
        close();
      }}
      className="flex min-h-9 items-center gap-3 rounded-md px-2 py-1.5 outline-none select-none cursor-default data-[selected=true]:bg-state-hover data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
    >
      {Icon && <Icon size={16} className="shrink-0 text-shape-secondary" />}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-body text-label">{title}</span>
        {subtitle !== undefined && (
          <span className="truncate text-subhead text-label-secondary">
            {subtitle}
          </span>
        )}
      </span>
      {detail !== undefined && (
        <span className="min-w-0 max-w-1/2 shrink truncate text-subhead text-label-secondary">
          {detail}
        </span>
      )}
      {shortcut !== undefined && <Shortcut keys={shortcut} />}
    </Command.Item>
  );
}

export function CommandMenuMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-4 text-center text-body text-label-secondary">
      {children}
    </div>
  );
}
