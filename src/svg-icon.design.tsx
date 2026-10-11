import { SVGIcon } from "./svg-icon";

export const meta = {
  title: "SVGIcon",
  description: "Renders a raw SVG string sized and colored by its container",
};

const STAR_SVG = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

export const Sizes = () => {
  return (
    <div className="flex items-end gap-6">
      <SVGIcon svg={STAR_SVG} size={16} className="text-shape-secondary" />
      <SVGIcon svg={STAR_SVG} size={24} className="text-shape-primary" />
      <SVGIcon svg={STAR_SVG} size={40} className="text-theme-primary" />
    </div>
  );
};
