import { cn } from "./cn";

export function Label({
  visuallyHidden,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  visuallyHidden?: boolean;
}) {
  return (
    // eslint-disable-next-line mosaic/form-label -- the one sanctioned <label>
    <label
      className={cn(
        visuallyHidden
          ? "sr-only"
          : "text-subhead font-medium text-label-secondary",
        className,
      )}
      {...props}
    />
  );
}
