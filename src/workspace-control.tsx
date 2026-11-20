import { ChevronDown } from "lucide-react";
import { Avatar } from "./avatar";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

export function WorkspaceControl({
  name,
  className,
  ...props
}: {
  name: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "group/scrolling-text inline-flex h-8 w-fit items-center gap-2.5 rounded-md px-2 text-body font-medium text-label select-none hover:bg-state-hover active:bg-state-active data-[state=open]:bg-state-active",
        className,
      )}
    >
      <Avatar name={name} size="sm" shape="square" />
      <span className="flex min-w-0 items-center gap-2">
        {/* The button's gap-2.5 after the avatar; this span's gap-2. */}
        <ScrollingText leadingGapPx={10} trailingGapPx={8}>
          {name}
        </ScrollingText>
        <ChevronDown size={16} className="shrink-0 text-shape-secondary" />
      </span>
    </button>
  );
}
