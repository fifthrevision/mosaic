import { cn } from "./cn";

export function TextStack({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // The heading rule outranks the sibling rule on specificity (:is()
        // adds a type selector), so it wins regardless of stylesheet order.
        "flex flex-col [&>*+*]:mt-2 [&>:is(h1,h2,h3,h4,h5,h6)+*]:mt-1",
        className,
      )}
      {...props}
    />
  );
}
