import { useEffect, useState } from "react";
import { cn } from "./cn";
import { Tooltip } from "./tooltip";

const SCROLL_PIXELS_PER_SECOND = 50;
const TRAILING_FADE_PX = 16;

// The trailing fade is truncate-fade's shape at a fixed 16px, ending at the
// box's edge. That edge reaches into the trailing gap, so the gap only offsets
// the fade: a wide gap holds most of it, a narrow one (a close button) lets it
// reach back over the text. It goes fully transparent a quarter of the way
// before the edge, so a glyph never meets the clip while still visible.
const overflowMaskClassName =
  "[mask-image:linear-gradient(to_right,transparent_0,black_var(--scrolling-text-leading),black_calc(100%-1rem),calc(100%-0.8125rem),transparent_calc(100%-0.25rem))]";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// Single-line text that fades at its edges when it overflows, and scrolls to
// its end while the `group/scrolling-text` ancestor is hovered or holds
// keyboard focus. Without that ancestor it only fades.
//
// The box reaches over the empty space on each side (leadingGapPx and
// trailingGapPx; the negative margins and padding cancel out). The leading
// fade lives only in its gap, so it never covers the first letters at rest. Pass the
// parent's actual spacing: the gap after an icon, the padding before an edge.
// Overflow is measured against the box minus that padding, since browsers
// disagree on whether trailing padding counts toward scrollWidth.
// Wrapping in a Tooltip remounts the spans, so the refs are state: the
// effect has to re-attach to the new nodes.
// The transition in the hovered state is the one used on the way in: slow,
// linear, delayed. The base transition is the quick return.
export function ScrollingText({
  children,
  leadingGapPx = 0,
  trailingGapPx = 0,
  className,
}: {
  children: React.ReactNode;
  leadingGapPx?: number;
  trailingGapPx?: number;
  className?: string;
}) {
  const [box, setBox] = useState<HTMLSpanElement | null>(null);
  const [text, setText] = useState<HTMLSpanElement | null>(null);
  const [overflowPx, setOverflowPx] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!box || !text) return;
    const measure = () =>
      setOverflowPx(
        Math.max(
          0,
          text.offsetWidth - (box.clientWidth - leadingGapPx - trailingGapPx),
        ),
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    observer.observe(text);
    return () => observer.disconnect();
  }, [box, text, leadingGapPx, trailingGapPx, children]);

  const overflowing = overflowPx > 0;
  const shiftPx = overflowPx + Math.max(0, TRAILING_FADE_PX - trailingGapPx);

  const span = (
    <span
      ref={setBox}
      style={
        {
          "--scrolling-text-leading": `${leadingGapPx}px`,
          "--scrolling-text-trailing": `${trailingGapPx}px`,
        } as React.CSSProperties
      }
      className={cn(
        "-mr-(--scrolling-text-trailing) -ml-(--scrolling-text-leading) min-w-0 overflow-hidden pr-(--scrolling-text-trailing) pl-(--scrolling-text-leading) whitespace-nowrap",
        overflowing && overflowMaskClassName,
        className,
      )}
    >
      <span
        ref={setText}
        className={cn(
          "inline-block transition-[translate] duration-200 ease-out",
          overflowing &&
            !reducedMotion &&
            "group-hover/scrolling-text:-translate-x-(--scrolling-text-shift) group-hover/scrolling-text:delay-400 group-hover/scrolling-text:duration-(--scrolling-text-duration) group-hover/scrolling-text:ease-linear group-focus-visible/scrolling-text:-translate-x-(--scrolling-text-shift) group-focus-visible/scrolling-text:delay-400 group-focus-visible/scrolling-text:duration-(--scrolling-text-duration) group-focus-visible/scrolling-text:ease-linear group-has-focus-visible/scrolling-text:-translate-x-(--scrolling-text-shift) group-has-focus-visible/scrolling-text:delay-400 group-has-focus-visible/scrolling-text:duration-(--scrolling-text-duration) group-has-focus-visible/scrolling-text:ease-linear",
        )}
        style={
          overflowing
            ? ({
                "--scrolling-text-shift": `${shiftPx}px`,
                "--scrolling-text-duration": `${(shiftPx / SCROLL_PIXELS_PER_SECOND) * 1000}ms`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </span>
    </span>
  );

  if (!overflowing || !reducedMotion) return span;
  return <Tooltip content={children}>{span}</Tooltip>;
}
