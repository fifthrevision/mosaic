import { cn } from "./cn";

const variantClass = {
  field: "text-subhead font-medium text-label-secondary",
  inline: "text-body text-label",
  hidden: "sr-only",
} as const;

export function Label({
  variant = "field",
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * field: above an input. inline: wraps a control and its text (a checkbox
   * row). hidden: screen readers only.
   */
  variant?: keyof typeof variantClass;
}) {
  return (
    // eslint-disable-next-line mosaic/form-label -- the one sanctioned <label>
    <label className={cn(variantClass[variant], className)} {...props} />
  );
}
