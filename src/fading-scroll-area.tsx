import { useEffect, useRef, useState } from "react";
import { cn } from "./cn";

export interface FadingScrollAreaProps {
  className?: string;
  children: React.ReactNode;
  /**
   * Optional sticky footer rendered at the bottom of the scroll viewport.
   * The footer sits inline at the natural end of `children` when content is
   * short, and sticks to the bottom of the viewport when content overflows.
   * The bottom fade is anchored to its top edge.
   */
  footer?: React.ReactNode;
  /**
   * Tailwind `bg-*` color the fade gradients are painted in. Defaults to
   * `bg-surface-card`; set this to match the background you place the
   * scroll area on so the fade is seamless.
   */
  fadeClassName?: string;
  /**
   * When true, keep the viewport pinned to the bottom as content grows — but
   * only if the user is already scrolled to the bottom. If they've scrolled
   * up, their position is left untouched.
   */
  pinToBottom?: boolean;
}

/**
 * A scrollable region with fade-out gradients at the top and bottom edges that
 * appear only while the content can be scrolled in that direction. Optionally
 * holds a sticky footer at the bottom; the bottom fade sits just above the
 * footer (or at the viewport bottom if there is no footer).
 *
 * Padding inside the scroll viewport is the consumer's responsibility — wrap
 * `children` and `footer` with whatever padding/background you need. The
 * fades are solid `fadeClassName` (default `bg-surface-card`); it must match
 * the background behind the area, or the fade shows as a band.
 */

// Opacity ramps slowly across most of the band, then steeply over the last
// 8px: the row stays legible and only its edge disappears. A linear ramp over
// the full 32px reads as uniform dimming instead of a fade. Masking rather
// than gradient-filling keeps this curve independent of the consumer's color.
const FADE_MASK_UP =
  "[mask-image:linear-gradient(to_top,#000_0%,#000000b3_25%,transparent_100%)]";
const FADE_MASK_DOWN =
  "[mask-image:linear-gradient(to_bottom,#000_0%,#000000b3_25%,transparent_100%)]";

export function FadingScrollArea({
  className,
  children,
  footer,
  fadeClassName = "bg-surface-card",
  pinToBottom = false,
}: FadingScrollAreaProps) {
  const { ref, canScrollUp, canScrollDown } = useScrollEdges(pinToBottom);

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-8 transition-opacity",
          FADE_MASK_DOWN,
          fadeClassName,
          canScrollUp ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={ref}
        className="h-full max-h-[inherit] min-h-0 flex-auto overflow-auto overscroll-none"
      >
        <div className="flex flex-col">
          {children}
          <div className="sticky bottom-0">
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-full h-8 transition-opacity",
                FADE_MASK_UP,
                fadeClassName,
                canScrollDown ? "opacity-100" : "opacity-0",
              )}
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

function useScrollEdges(pinToBottom: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateEdges = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
    };

    const onScroll = () => {
      atBottomRef.current =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      updateEdges();
    };

    const onResize = () => {
      if (pinToBottom && atBottomRef.current) {
        el.scrollTop = el.scrollHeight;
      }
      updateEdges();
    };

    updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onResize);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pinToBottom]);

  return { ref, canScrollUp, canScrollDown };
}
