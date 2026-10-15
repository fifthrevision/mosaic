import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "./cn";
import { IconButton } from "./icon-button";

const VARIANTS = {
  success: {
    Icon: CircleCheck,
    iconClass: "text-shape-primary",
    role: "status" as const,
  },
  error: {
    Icon: CircleAlert,
    iconClass: "text-shape-destructive",
    role: "alert" as const,
  },
  info: {
    Icon: Info,
    iconClass: "text-shape-secondary",
    role: "status" as const,
  },
};

export function Alert({
  variant = "info",
  onDismiss,
  className,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  onDismiss?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const { Icon, iconClass, role } = VARIANTS[variant];
  return (
    <div
      role={role}
      className={cn(
        "flex items-start gap-3 rounded-md border border-separator-secondary bg-surface-card px-4 py-3",
        className,
      )}
    >
      <Icon size={18} className={cn("mt-0.5 shrink-0", iconClass)} />
      <div className="flex-1 text-body text-label">{children}</div>
      {onDismiss && (
        <IconButton
          icon={X}
          variant="subtle"
          size="sm"
          aria-label="Dismiss"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}
