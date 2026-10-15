import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

function workspaceInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function WorkspaceControl({
  name,
  className,
  ...props
}: {
  name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-8 items-center gap-2.5 rounded-md px-2 text-body font-medium text-label select-none hover:bg-state-hover active:bg-state-active data-[state=open]:bg-state-active",
        className,
      )}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-separator-secondary-translucent bg-surface-card-subdued text-caption font-medium text-label-secondary shadow-[0px_1px_1px_var(--color-shadow-3)]">
        {workspaceInitials(name)}
      </span>
      <span className="relative flex min-w-0 items-center">
        {/* Content-sized control, so pr-6 pushes the element's right edge past
            the text -- otherwise the fade would eat a short name's last
            characters. It doubles as the chevron's slot. */}
        <span className="truncate-fade pr-6">{name}</span>
        <ChevronDown
          size={16}
          className="absolute right-0 text-label-secondary"
        />
      </span>
    </button>
  );
}
