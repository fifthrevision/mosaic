import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "./cn";
import type { UIIcon } from "./ui-icon";

export function Menu({
  trigger,
  align = "end",
  children,
}: {
  trigger: React.ReactNode;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={4}
          className="z-50 min-w-50 rounded-md border border-separator-secondary bg-surface-card p-1 shadow-[0px_4px_12px_var(--color-shadow-1)] origin-top-right data-[state=open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function MenuItem({
  icon: Icon,
  children,
  onSelect,
  disabled,
  variant = "default",
}: {
  icon: UIIcon;
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
}) {
  const isDestructive = variant === "destructive";
  return (
    <DropdownMenu.Item
      disabled={disabled}
      className={
        isDestructive
          ? "flex h-8 items-center gap-3 rounded px-2 py-2.5 text-body text-label-destructive outline-none select-none cursor-default data-highlighted:bg-state-hover data-disabled:opacity-50 data-disabled:pointer-events-none"
          : "flex h-8 items-center gap-3 rounded px-2 py-2.5 text-body text-label outline-none select-none cursor-default data-highlighted:bg-state-hover data-disabled:opacity-50 data-disabled:pointer-events-none"
      }
      onSelect={onSelect}
    >
      <Icon
        size={16}
        className={
          isDestructive ? "text-shape-destructive" : "text-shape-secondary"
        }
      />
      {children}
    </DropdownMenu.Item>
  );
}

export function MenuSeparator() {
  return (
    <DropdownMenu.Separator className="my-1 h-px bg-separator-secondary" />
  );
}

export function MenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Label className="px-2 pt-1.5 pb-1 text-caption font-medium text-label-secondary select-none">
      {children}
    </DropdownMenu.Label>
  );
}

export function SubMenu({
  icon: Icon,
  label,
  children,
}: {
  icon: UIIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="flex h-8 items-center gap-3 rounded px-2 py-2.5 text-body text-label outline-none select-none cursor-default data-highlighted:bg-state-hover data-[state=open]:bg-state-hover">
        <Icon size={16} className="text-shape-secondary" />
        <span className="flex-1">{label}</span>
        <ChevronRight size={16} className="text-shape-secondary" />
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          sideOffset={4}
          alignOffset={-4}
          className="z-50 min-w-46 max-w-72 rounded-md border border-separator-secondary bg-surface-card p-1 shadow-[0px_4px_12px_var(--color-shadow-1)] data-[state=open]:animate-[menu-in_150ms_ease-out] data-[state=closed]:animate-[menu-out_100ms_ease-in]"
        >
          {children}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
}

export function MenuRadioItem({
  active,
  children,
  onSelect,
}: {
  active: boolean;
  children: React.ReactNode;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenu.Item
      className="flex h-8 items-center gap-3 rounded px-2 py-2.5 text-body text-label outline-none select-none cursor-default data-highlighted:bg-state-hover"
      onSelect={onSelect}
    >
      <Check
        size={16}
        className={cn(
          "shrink-0",
          active ? "text-shape-secondary" : "opacity-0",
        )}
      />
      <span className="min-w-0 truncate">{children}</span>
    </DropdownMenu.Item>
  );
}
