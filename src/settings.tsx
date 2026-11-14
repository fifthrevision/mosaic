import { cloneElement, isValidElement, useId } from "react";
import { Card } from "./card";
import { cn } from "./cn";
import { Label } from "./label";
import { SectionHeader } from "./section-header";

export function SettingsSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex max-w-180 flex-col gap-1", className)}>
      <SectionHeader title={title} />
      <div className="flex flex-col gap-3">
        {description !== undefined && (
          <p className="text-subhead text-label-secondary">{description}</p>
        )}
        <Card className="divide-y divide-separator-secondary">{children}</Card>
      </div>
    </section>
  );
}

// Inline rows size their fields so every field in a card shares one left
// edge; these descendant selectors outrank a width className on the field.
const inlineFieldWidths =
  "[&_input:not([type=checkbox],[type=radio],[type=number])]:w-60 [&_input[type=number]]:w-24 [&_select]:w-60";

type ControlProps = { id?: string; "aria-describedby"?: string };

export function SettingsRow({
  label,
  description,
  htmlFor,
  layout = "inline",
  children,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  /**
   * The control's id. When the child is that control, the row also points its
   * aria-describedby at the description. Leave it out when the control labels
   * itself (aria-label) or the row shows a read-only value.
   */
  htmlFor?: string;
  /** inline: control on the right. stacked: control below at full width (textareas, lists). */
  layout?: "inline" | "stacked";
  children: React.ReactNode;
}) {
  const descriptionId = useId();
  const labelClassName = "text-body font-medium text-label";

  const describesControl =
    description !== undefined &&
    htmlFor !== undefined &&
    isValidElement<ControlProps>(children) &&
    children.props.id === htmlFor;
  const control = describesControl
    ? cloneElement(children, {
        "aria-describedby": [children.props["aria-describedby"], descriptionId]
          .filter(Boolean)
          .join(" "),
      })
    : children;

  return (
    <div
      className={cn(
        "flex px-4 py-3",
        layout === "inline"
          ? "min-h-14 items-center justify-between gap-6"
          : "flex-col gap-2",
      )}
    >
      <div className="flex min-w-0 flex-col">
        {htmlFor === undefined ? (
          <span className={labelClassName}>{label}</span>
        ) : (
          <Label variant="inline" htmlFor={htmlFor} className={labelClassName}>
            {label}
          </Label>
        )}
        {description !== undefined && (
          <p id={descriptionId} className="text-subhead text-label-secondary">
            {description}
          </p>
        )}
      </div>
      <div
        className={cn(
          "text-body text-label-secondary",
          layout === "inline" &&
            cn("flex shrink-0 items-center justify-end", inlineFieldWidths),
        )}
      >
        {control}
      </div>
    </div>
  );
}
