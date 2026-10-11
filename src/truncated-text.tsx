import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./cn";

interface TruncatedTextProps {
  children: ReactNode;
  maxHeight: number;
  fadeClassName?: string;
  className?: string;
}

export function TruncatedText({
  children,
  maxHeight,
  fadeClassName,
  className,
}: TruncatedTextProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setIsTruncated(el.scrollHeight > maxHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxHeight, children]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ maxHeight }}
    >
      <div ref={contentRef}>{children}</div>
      {isTruncated && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t to-transparent",
            fadeClassName,
          )}
        />
      )}
    </div>
  );
}
