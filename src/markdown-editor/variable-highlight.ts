import { Decoration, MatchDecorator, ViewPlugin } from "@codemirror/view";
import type { DecorationSet, EditorView, ViewUpdate } from "@codemirror/view";

export function createVariableHighlight(reservedNames: string[]) {
  const reserved = new Set(reservedNames);
  const variableMark = Decoration.mark({ class: "cm-variable-pill" });
  const reservedMark = Decoration.mark({
    class: "cm-variable-pill cm-variable-pill-error",
    attributes: { title: "Reserved keyword" },
  });

  const matcher = new MatchDecorator({
    regexp: /\{\{\s*(\w+)\s*\}\}/g,
    decoration: (match) =>
      reserved.has(match[1]) ? reservedMark : variableMark,
  });

  return ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = matcher.createDeco(view);
      }

      update(update: ViewUpdate) {
        this.decorations = matcher.updateDeco(update, this.decorations);
      }
    },
    { decorations: (v) => v.decorations },
  );
}
