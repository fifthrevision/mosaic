import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";
import { ScrollingText } from "./scrolling-text";

// The pixel values repeat what the mosaic-button-* utilities set; ScrollingText
// needs them as numbers.
const sizeConfig = {
  sm: { classes: "mosaic-button-sm", paddingPx: 8, gapPx: 6 },
  md: { classes: "mosaic-button-md", paddingPx: 12, gapPx: 7 },
} as const;

type Element =
  | ({ href: string } & ComponentProps<"a">)
  | ({ href?: undefined } & ComponentProps<"button">);

export function Entity({
  leading,
  secondary,
  size = "md",
  className,
  children,
  ...props
}: Element & {
  leading?: ReactNode;
  secondary?: ReactNode;
  size?: keyof typeof sizeConfig;
  children: ReactNode;
}) {
  const { classes, paddingPx, gapPx } = sizeConfig[size];
  const entityClassName = cn(
    "group/scrolling-text mosaic-button mosaic-button-subtle justify-start",
    classes,
    className,
  );
  const content = (
    <>
      {leading && <span className="flex shrink-0 items-center">{leading}</span>}
      <ScrollingText
        leadingGapPx={leading ? gapPx : paddingPx}
        trailingGapPx={paddingPx}
      >
        {children}
        {secondary && (
          <span className="ms-1.5 font-normal text-label-secondary">
            {secondary}
          </span>
        )}
      </ScrollingText>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a {...props} className={entityClassName}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" {...props} className={entityClassName}>
      {content}
    </button>
  );
}
