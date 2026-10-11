import { ArrowUp, Plus, Square } from "lucide-react";
import { useId, useLayoutEffect, useRef } from "react";
import { FileChip } from "./file-chip";
import { IconButton } from "./icon-button";
import { cn } from "./cn";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
  /**
   * Whether a message may be sent while a turn is streaming. Surfaces that
   * queue mid-turn sends invisibly should leave this off so the message
   * stays in the composer instead of disappearing until its turn.
   */
  steerable?: boolean;
  onStop?: () => void;
  placeholder?: string;
  className?: string;
  leading?: React.ReactNode;
  /** Send stays disabled until every attachment is `ready`. */
  attachments?: {
    items: readonly {
      id: string;
      filename: string;
      state: "ready" | "loading" | "error";
    }[];
    onAdd: (files: File[]) => void;
    onRemove: (id: string) => void;
  };
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isStreaming = false,
  steerable = false,
  onStop,
  placeholder = "Send a message",
  className,
  leading,
  attachments,
}: ChatInputProps) {
  const textareaId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    // scrollHeight never shrinks below the current height, so collapse first.
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);
  const attached = attachments?.items ?? [];
  const canSubmit =
    (value.trim().length > 0 || attached.length > 0) &&
    attached.every((item) => item.state === "ready") &&
    !disabled &&
    (steerable || !isStreaming);
  const showStop = isStreaming && !disabled && typeof onStop === "function";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-md border border-separator-secondary bg-surface-control-sunken shadow-[inset_0px_0px_4px_var(--color-shadow-1)]",
        !disabled &&
          "hover:border-separator-control-hover focus-within:border-separator-control-active",
        className,
      )}
    >
      {attachments && attached.length > 0 && (
        <ul className="flex flex-wrap gap-1 px-2 pt-2">
          {attached.map((item) => (
            <li key={item.id} className="flex min-w-0">
              <FileChip
                className="max-w-full"
                filename={item.filename}
                state={item.state}
                onRemove={() => attachments.onRemove(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
      <label htmlFor={textareaId} className="sr-only">
        Message
      </label>
      <textarea
        ref={textareaRef}
        id={textareaId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (canSubmit) {
              onSubmit();
            }
          }
        }}
        disabled={disabled}
        placeholder={placeholder}
        rows={2}
        className="block max-h-60 w-full resize-none bg-transparent px-3 pt-2 pb-1 text-base font-medium text-label outline-none placeholder:text-label-tertiary disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="flex items-center gap-1.5 px-2 pb-2">
        {attachments && (
          <>
            <IconButton
              variant="subtle"
              icon={Plus}
              aria-label="Attach files"
              title="Attach files"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            />
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              tabIndex={-1}
              onChange={(event) => {
                const picked = Array.from(event.target.files ?? []);
                if (picked.length > 0) attachments.onAdd(picked);
                event.target.value = "";
              }}
            />
          </>
        )}
        {leading}
        <div className="ml-auto flex items-center gap-1.5">
          {showStop && (
            <IconButton
              variant="default"
              icon={Square}
              aria-label="Stop"
              title="Stop"
              onClick={onStop}
            />
          )}
          <IconButton
            variant="primary"
            icon={ArrowUp}
            aria-label="Send"
            title="Send"
            onClick={onSubmit}
            disabled={!canSubmit}
          />
        </div>
      </div>
    </div>
  );
}
