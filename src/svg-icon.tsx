import { cn } from "./cn";

/*
 * Renders a raw SVG string inside a sized span. The inner SVG should declare
 * width="100%" height="100%" and use fill/stroke="currentColor" so the span's
 * dimensions and text color drive presentation.
 */
export function SVGIcon({
  svg,
  size = 24,
  className,
}: {
  svg: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
