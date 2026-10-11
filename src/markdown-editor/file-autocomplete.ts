import type {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete";
import type { CompletionWithIcons } from "./completion-icons";

export type FileForCompletion = {
  /** Sandbox basename, e.g. "rubric.md". */
  name: string;
  /** Absolute sandbox path the completion inserts. */
  path: string;
};

// lucide "file", inlined — completions render raw SVG strings.
const fileIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>`;

export function createFileCompletionSource(files: FileForCompletion[]) {
  return function fileSource(
    context: CompletionContext,
  ): CompletionResult | null {
    const before = context.matchBefore(/@[\w./\-]*/);
    if (!before) return null;
    if (files.length === 0) return null;
    if (!before.text.startsWith("@")) return null;

    const options: CompletionWithIcons[] = files.map((f) => ({
      label: `@${f.name}`,
      apply: f.path,
      sourceIconSvg: fileIconSvg,
      sourceIconClassName: "cm-completion-icon-file",
    }));

    return {
      from: before.from,
      options: options as Completion[],
      validFor: /^@[\w./\-]*$/,
    };
  };
}
