import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Without this, tailwind-merge misfiles custom token names: role sizes as
// colors (`text-body text-label` → `text-label`) and `font-regular` as a font
// family, so it never resolves against `font-medium`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["caption", "subhead", "body", "title", "large-title"],
      "font-weight": ["regular"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
