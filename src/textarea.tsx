import { cn } from "./cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn("mosaic-textarea", className)}
    />
  );
}
