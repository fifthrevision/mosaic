import { cn } from "./cn";

// -mx-2 widens the card only while its width is auto; a width class such as
// w-full turns the negative margin into an 8px shift.
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "-mx-2 overflow-hidden rounded-lg border border-separator-secondary bg-surface-card card-shadow",
        className,
      )}
      {...props}
    />
  );
}
