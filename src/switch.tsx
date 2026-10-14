import { useState } from "react";
import { cn } from "./cn";

export function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  name,
  onCheckedChange,
  onClick,
  value = "on",
  className,
  ...props
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  value?: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "checked" | "defaultChecked" | "onChange"
>) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  return (
    <>
      <button
        {...props}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-5 w-10.5 shrink-0 rounded-2xl border transition-colors duration-150 ease-out select-none",
          "focus-visible:control-focus-ring disabled:cursor-not-allowed",
          isChecked ? "bg-shape-primary" : "bg-surface-control-deep",
          disabled
            ? "border-separator-secondary opacity-50"
            : "border-separator-primary hover:border-separator-control-hover",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-0.5 left-0.5 h-3.5 w-4.5 rounded-full bg-surface-card control-shadow transition-transform duration-150 ease-out",
            isChecked && "translate-x-4.5",
          )}
        />
      </button>
      {name && isChecked && !disabled ? (
        <input type="hidden" name={name} value={value} />
      ) : null}
    </>
  );
}
