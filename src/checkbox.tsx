import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "./cn";

export type CheckedState = boolean | "indeterminate";

const ariaChecked = {
  true: true,
  false: false,
  indeterminate: "mixed",
} as const;

const dataState = {
  true: "checked",
  false: "unchecked",
  indeterminate: "indeterminate",
} as const;

export function Checkbox({
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
  checked?: CheckedState;
  defaultChecked?: CheckedState;
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
  const checkedState = isControlled ? checked : uncontrolledChecked;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    const nextChecked = checkedState !== true;

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
        role="checkbox"
        aria-checked={ariaChecked[`${checkedState}`]}
        data-state={dataState[`${checkedState}`]}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-separator-primary bg-surface-toggle text-shape-primary input-shadow select-none",
          "hover:not-disabled:border-separator-toggle-hover focus-visible:control-focus-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {checkedState === true ? (
          <Check aria-hidden="true" size={12} strokeWidth={3} />
        ) : null}
        {checkedState === "indeterminate" ? (
          <Minus aria-hidden="true" size={12} strokeWidth={3} />
        ) : null}
      </button>
      {name && checkedState === true && !disabled ? (
        <input type="hidden" name={name} value={value} />
      ) : null}
    </>
  );
}
