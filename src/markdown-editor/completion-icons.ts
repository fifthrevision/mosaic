import type { Completion } from "@codemirror/autocomplete";

export type CompletionIcon = {
  svg: string;
  className?: string;
};

export type CompletionWithIcons = Completion & {
  sourceIconSvg?: string;
  sourceIconClassName?: string;
};

export function renderCompletionIcons(completion: Completion): HTMLElement {
  const { sourceIconSvg, sourceIconClassName } =
    completion as CompletionWithIcons;
  const wrapper = document.createElement("span");
  wrapper.className = "cm-completion-icons";
  if (sourceIconSvg) {
    const slot = document.createElement("span");
    slot.className = ["cm-completion-icon-source", sourceIconClassName]
      .filter(Boolean)
      .join(" ");
    slot.setAttribute("aria-hidden", "true");
    slot.innerHTML = sourceIconSvg;
    wrapper.appendChild(slot);
  }
  return wrapper;
}
