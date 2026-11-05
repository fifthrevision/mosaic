import { Example } from "../studio/DesignHelpers";
import { Shortcut } from "./shortcut";

export const meta = {
  title: "Shortcut",
  description:
    "The keys of a keyboard shortcut, one keycap each. The app passes the glyphs, so it decides how keys are named on each platform.",
};

export const Keys = () => (
  <div className="flex flex-col gap-4">
    <Example label="single key">
      <Shortcut keys={["Esc"]} />
    </Example>
    <Example label="modifier and key">
      <Shortcut keys={["⌘", "K"]} />
    </Example>
    <Example label="several modifiers">
      <Shortcut keys={["⇧", "⌘", "P"]} />
    </Example>
    <Example label="in text">
      <span className="flex items-center gap-2 text-body text-label-secondary">
        Press <Shortcut keys={["⌘", "T"]} /> to go to a symbol
      </span>
    </Example>
  </div>
);
