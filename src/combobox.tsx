import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";
import {
  rankBySearch,
  SearchMenu,
  SearchMenuItem,
  SearchMenuMessage,
} from "./search-menu";

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
    <SearchMenu
      open={open}
      onOpenChange={setOpen}
      placeholder={searchPlaceholder}
      className="w-(--radix-popover-trigger-width)"
      trigger={
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
      }
    >
      {(search) => {
        const visible = rankBySearch(
          options,
          search,
          (option) => `${option.label} ${option.value}`,
        );
        if (visible.length === 0)
          return <SearchMenuMessage>{emptyMessage}</SearchMenuMessage>;
        return visible.map((option) => (
          <SearchMenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            onSelect={() => onValueChange(option.value)}
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
          </SearchMenuItem>
        ));
      }}
    </SearchMenu>
  );
}
