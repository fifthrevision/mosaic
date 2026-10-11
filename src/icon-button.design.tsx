import { ArrowUp } from "lucide-react";
import { IconButton } from "./icon-button";

export const meta = {
  title: "Icon Button",
  description: "Square icon-only button with size and variant options",
};

export const Default = () => <IconButton icon={ArrowUp} />;

export const Primary = () => <IconButton icon={ArrowUp} variant="primary" />;

export const Subtle = () => <IconButton icon={ArrowUp} variant="subtle" />;

export const DefaultSmall = () => <IconButton icon={ArrowUp} size="sm" />;

export const PrimarySmall = () => (
  <IconButton icon={ArrowUp} size="sm" variant="primary" />
);

export const SubtleSmall = () => (
  <IconButton icon={ArrowUp} size="sm" variant="subtle" />
);
