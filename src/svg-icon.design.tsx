import { Pencil, Trash2 } from "lucide-react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Menu, MenuItem, MenuSeparator } from "./menu";
import { SVGIcon } from "./svg-icon";

export const meta = {
  title: "SVGIcon",
  description:
    "Renders a raw SVG string at a fixed size, colored by its text color",
};

const STAR_SVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const SPARK_SVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"/></svg>`;

const FIXED_SIZE_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"/></svg>`;

const HARDCODED_FILL_SVG = `<svg width="100%" height="100%" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="black"/></svg>`;

const COLORS = [
  "text-shape-secondary",
  "text-shape-tertiary",
  "text-shape-theme",
  "text-shape-destructive",
  "text-shape-constructive",
] as const;

const SIZES = [12, 16, 20, 24, 40] as const;

export const Sizes = () => (
  <div className="grid grid-cols-[12rem_repeat(5,3rem)] items-center gap-y-4">
    <span />
    {SIZES.map((size) => (
      <ColumnLabel key={size}>{size}</ColumnLabel>
    ))}
    {COLORS.map((color) => (
      <div key={color} className="contents">
        <ColumnLabel>{color}</ColumnLabel>
        {SIZES.map((size) => (
          <SVGIcon key={size} svg={STAR_SVG} size={size} className={color} />
        ))}
      </div>
    ))}
    <ColumnLabel>filled (fill=currentColor)</ColumnLabel>
    {SIZES.map((size) => (
      <SVGIcon
        key={size}
        svg={SPARK_SVG}
        size={size}
        className="text-shape-theme"
      />
    ))}
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="no className: inherits the parent's text color">
      <span className="flex items-center gap-2 text-body text-label-link">
        <SVGIcon svg={SPARK_SVG} size={16} />
        Theme-colored parent
      </span>
    </Example>
    <Example label='svg with fixed width="12" ignores size={40}'>
      <SVGIcon
        svg={FIXED_SIZE_SVG}
        size={40}
        className="border border-separator-secondary text-shape-secondary"
      />
    </Example>
    <Example label="hardcoded fill ignores the text color">
      <SVGIcon
        svg={HARDCODED_FILL_SVG}
        size={24}
        className="text-shape-theme"
      />
    </Example>
  </div>
);

function SparkIcon({ size, className }: { size?: number; className?: string }) {
  return <SVGIcon svg={SPARK_SVG} size={size} className={className} />;
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="as a Menu icon (UIIcon)">
      <div>
        <Menu align="start" trigger={<Button dropdown>Support Triage</Button>}>
          <MenuItem icon={SparkIcon} onSelect={() => {}}>
            Improve instructions
          </MenuItem>
          <MenuItem icon={Pencil} onSelect={() => {}}>
            Rename
          </MenuItem>
          <MenuSeparator />
          <MenuItem icon={Trash2} variant="destructive" onSelect={() => {}}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </Example>
    <Example label="model badge in an agent row">
      <div className="flex w-120 items-center gap-3 rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <SVGIcon svg={SPARK_SVG} size={20} className="text-shape-theme" />
        <div className="flex flex-1 flex-col">
          <span className="text-body font-medium text-label">
            Support Triage
          </span>
          <span className="text-subhead text-label-secondary">
            Runs on every new ticket
          </span>
        </div>
        <SVGIcon svg={STAR_SVG} size={16} className="text-shape-tertiary" />
      </div>
    </Example>
  </div>
);
