import { useRef } from "react";
import { cn } from "./cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
  "aria-label": ariaLabel,
  className,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}) {
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // role="radiogroup" promises roving tabindex plus arrow keys; without both
  // the role lies to screen readers about how the widget is operated.
  function moveSelection(from: number, delta: number) {
    const next = (from + delta + options.length) % options.length;
    segmentRefs.current[next]?.focus();
    onChange(options[next].value);
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-8 items-center gap-0.5 rounded-md border border-separator-secondary bg-surface-input p-0.75 input-shadow",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-separator-input-hover focus-within:border-separator-input-focus",
        className,
      )}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              segmentRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                moveSelection(index, 1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                moveSelection(index, -1);
              }
            }}
            className={cn(
              "h-full rounded-sm px-2.5 text-body font-medium select-none focus-visible:control-focus-ring disabled:cursor-not-allowed",
              selected
                ? "bg-state-selected text-label control-shadow"
                : "text-label-secondary hover:not-disabled:bg-state-hover",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
