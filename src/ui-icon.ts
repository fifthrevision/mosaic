import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/*
 * Any icon-shaped component the app supports. Lucide icons satisfy this
 * directly. Brand icons built on SVGIcon satisfy the second arm. Add new
 * icon-library shapes by appending to the union.
 */
export type UIIcon =
  LucideIcon | ComponentType<{ size?: number; className?: string }>;
