import { ChevronRight } from "lucide-react";
import { Children, Fragment, isValidElement } from "react";
import { Link } from "react-router";
import { cn } from "../cn";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageTitleProps) {
  const items = Children.toArray(children);
  const hasSegments = items.some(
    (c) => isValidElement(c) && c.type === Segment,
  );

  if (!hasSegments) {
    return (
      <h1 className={cn("page-title text-label", className)}>{children}</h1>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <ChevronRight className="text-label-secondary size-4 shrink-0" />
          )}
          {item}
        </Fragment>
      ))}
    </div>
  );
}

interface SegmentProps {
  to?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  "aria-label"?: string;
  title?: string;
}

export function Segment({
  to,
  icon,
  children,
  "aria-label": ariaLabel,
  title,
}: SegmentProps) {
  if (to) {
    return (
      <Link
        to={to}
        className="flex items-center gap-1.5 page-title text-label hover:text-shape-primary"
        aria-label={ariaLabel}
        title={title}
      >
        {icon}
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <h1
      aria-current="page"
      className="flex items-center gap-1.5 page-title text-label"
    >
      {icon}
      <span>{children}</span>
    </h1>
  );
}
