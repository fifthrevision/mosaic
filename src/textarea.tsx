import { cn } from "./cn";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "block w-full rounded-md border border-separator-secondary bg-surface-input px-3 py-2 text-body font-medium text-label input-shadow placeholder:text-label-tertiary outline-none hover:not-disabled:border-separator-input-hover focus:not-disabled:border-separator-input-focus resize-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
