import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import { cn } from "./cn";
import { Menu } from "./menu";
import { ScrollingText } from "./scrolling-text";

// The pixel values repeat the classes below; ScrollingText needs them as
// numbers.
const sizeConfig = {
  sm: {
    height: "h-6",
    label: "gap-1.5 px-2 text-subhead",
    square: "w-6",
    iconSize: 12,
    iconOnlySize: 14,
    paddingPx: 8,
    gapPx: 6,
  },
  md: {
    height: "h-8",
    label: "gap-1.75 px-3 text-body",
    square: "w-8",
    iconSize: 16,
    iconOnlySize: 16,
    paddingPx: 12,
    gapPx: 7,
  },
} as const;

const variantConfig = {
  default: {
    container: "mosaic-split-half-default",
    icon: "text-shape-primary",
  },
  primary: { container: "mosaic-split-half-primary", icon: "text-shape-theme" },
  destructive: {
    container: "mosaic-split-half-destructive",
    icon: "text-shape-destructive",
  },
} as const;

type Size = keyof typeof sizeConfig;
type Variant = keyof typeof variantConfig;

// One raised shell holds both halves, so a single shadow runs under the whole
// shape. With both disabled the shell fades rather than each half, so the
// divider fades too. With one disabled, that half fades by itself.
function Frame({
  size,
  disabled,
  main,
  menu,
}: {
  size: Size;
  disabled: boolean;
  main: React.ReactNode;
  menu: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mosaic-split-frame inline-flex w-fit max-w-80 shrink-0",
        sizeConfig[size].height,
        disabled && "opacity-50",
      )}
    >
      {main}
      <span aria-hidden className="-my-px w-px shrink-0 bg-separator-primary" />
      {menu}
    </div>
  );
}

// The halves reach over the shell's border on their outer sides, so a darker
// hover or pressed fill covers it instead of leaving a pale ring around one half.
const halfClassName =
  "-my-px inline-flex min-w-0 self-stretch items-center justify-center font-medium select-none focus-visible:control-focus-ring disabled:cursor-not-allowed";

// Opacity makes the faded half a stacking context, which paints over the other
// half's focus ring where it reaches past the divider, so that half lifts.
function oneHalfDisabledClassName(disabled: boolean, otherDisabled: boolean) {
  if (disabled === otherDisabled) return undefined;
  return disabled ? "opacity-50" : "focus-visible:relative focus-visible:z-10";
}

function MenuHalf({
  size,
  variant,
  disabled,
  mainDisabled,
  menu,
  align,
  menuLabel,
}: {
  size: Size;
  variant: Variant;
  disabled: boolean;
  mainDisabled: boolean;
  menu: React.ReactNode;
  align: "start" | "center" | "end";
  menuLabel: string;
}) {
  const { square, iconSize } = sizeConfig[size];
  return (
    <Menu
      align={align}
      disabled={disabled}
      trigger={
        <button
          type="button"
          disabled={disabled}
          aria-label={menuLabel}
          className={cn(
            halfClassName,
            "-mr-px shrink-0 rounded-r-md",
            square,
            variantConfig[variant].container,
            oneHalfDisabledClassName(disabled, mainDisabled),
          )}
        >
          <ChevronDown
            size={iconSize}
            className={variantConfig[variant].icon}
          />
        </button>
      }
    >
      {menu}
    </Menu>
  );
}

type SplitProps = {
  icon?: LucideIcon;
  size?: Size;
  variant?: Variant;
  loading?: boolean;
  /** Disables the chevron half. Follows `disabled` unless set; `loading` disables it regardless. */
  menuDisabled?: boolean;
  /** The menu's items: MenuItem, MenuSeparator, MenuLabel. */
  menu: React.ReactNode;
  align?: "start" | "center" | "end";
  /** Accessible name for the chevron half. */
  menuLabel?: string;
};

export function SplitButton({
  icon: Icon,
  size = "md",
  variant = "default",
  loading = false,
  menuDisabled,
  menu,
  align = "end",
  menuLabel = "More options",
  disabled,
  children,
  className,
  ...props
}: SplitProps & {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { label, iconSize, paddingPx, gapPx } = sizeConfig[size];
  const { container, icon } = variantConfig[variant];
  const LeadingIcon = loading ? Loader2 : Icon;
  const isDisabled = Boolean(disabled) || loading;
  const isMenuDisabled = Boolean(menuDisabled ?? disabled) || loading;

  return (
    <Frame
      size={size}
      disabled={isDisabled && isMenuDisabled}
      main={
        <button
          {...props}
          disabled={isDisabled}
          className={cn(
            "group/scrolling-text",
            halfClassName,
            "-ml-px rounded-l-md",
            label,
            container,
            oneHalfDisabledClassName(isDisabled, isMenuDisabled),
            className,
          )}
        >
          {LeadingIcon && (
            <LeadingIcon
              size={iconSize}
              className={cn("shrink-0", icon, loading && "animate-spin")}
            />
          )}
          <ScrollingText
            leadingGapPx={LeadingIcon ? gapPx : paddingPx}
            trailingGapPx={paddingPx}
          >
            {children}
          </ScrollingText>
        </button>
      }
      menu={
        <MenuHalf
          size={size}
          variant={variant}
          disabled={isMenuDisabled}
          mainDisabled={isDisabled}
          menu={menu}
          align={align}
          menuLabel={menuLabel}
        />
      }
    />
  );
}

export function SplitIconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  loading = false,
  menuDisabled,
  menu,
  align = "end",
  menuLabel = "More options",
  disabled,
  className,
  ...props
}: SplitProps & {
  icon: LucideIcon;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { square, iconOnlySize } = sizeConfig[size];
  const ShownIcon = loading ? Loader2 : Icon;
  const isDisabled = Boolean(disabled) || loading;
  const isMenuDisabled = Boolean(menuDisabled ?? disabled) || loading;

  return (
    <Frame
      size={size}
      disabled={isDisabled && isMenuDisabled}
      main={
        <button
          {...props}
          disabled={isDisabled}
          className={cn(
            halfClassName,
            "-ml-px shrink-0 rounded-l-md",
            square,
            variantConfig[variant].container,
            oneHalfDisabledClassName(isDisabled, isMenuDisabled),
            className,
          )}
        >
          <ShownIcon
            size={iconOnlySize}
            className={cn(
              variantConfig[variant].icon,
              loading && "animate-spin",
            )}
          />
        </button>
      }
      menu={
        <MenuHalf
          size={size}
          variant={variant}
          disabled={isMenuDisabled}
          mainDisabled={isDisabled}
          menu={menu}
          align={align}
          menuLabel={menuLabel}
        />
      }
    />
  );
}
