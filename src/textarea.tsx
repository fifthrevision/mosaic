import { cn } from "./cn";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "block w-full rounded-md border border-separator-secondary bg-surface-control-sunken px-3 py-2 text-base font-medium text-label shadow-[inset_0px_0px_4px_var(--color-shadow-1)] placeholder:text-label-tertiary outline-none hover:not-disabled:border-separator-control-hover focus:not-disabled:border-separator-control-active resize-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}
