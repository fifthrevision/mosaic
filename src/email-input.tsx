import { useRef, useState } from "react";
import { Chip } from "./chip";
import { cn } from "./cn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email);
}

function splitInput(raw: string) {
  return raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function EmailInput({
  value,
  onChange,
  placeholder = "Add email…",
  disabled,
  className,
  id,
}: {
  value: string[];
  onChange: (emails: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = (raw: string) => {
    const parts = splitInput(raw);
    if (parts.length === 0) return;
    const next = [...value];
    for (const part of parts) {
      if (!next.includes(part)) next.push(part);
    }
    onChange(next);
    setDraft("");
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" ||
      e.key === "," ||
      e.key === ";" ||
      e.key === "Tab"
    ) {
      if (draft.trim()) {
        e.preventDefault();
        commit(draft);
      }
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeAt(value.length - 1);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-md border border-separator-secondary bg-surface-input px-2 py-1 input-shadow outline-none",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-separator-input-hover focus-within:border-separator-input-focus",
        className,
      )}
    >
      {value.map((email, i) => {
        const invalid = !isValidEmail(email);
        return (
          <Chip
            key={`${email}-${i}`}
            tone={invalid ? "destructive" : "neutral"}
            title={invalid ? "Invalid email address" : undefined}
            onRemove={disabled ? undefined : () => removeAt(i)}
            className="max-w-full"
          >
            {email}
          </Chip>
        );
      })}
      <input
        ref={inputRef}
        id={id}
        type="email"
        multiple
        disabled={disabled}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => draft.trim() && commit(draft)}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text");
          if (/[\s,;]/.test(text)) {
            e.preventDefault();
            commit(draft + text);
          }
        }}
        placeholder={value.length === 0 ? placeholder : ""}
        className="h-6 min-w-24 flex-1 bg-transparent text-body font-medium text-label placeholder:text-label-tertiary outline-none disabled:cursor-not-allowed"
      />
    </div>
  );
}
