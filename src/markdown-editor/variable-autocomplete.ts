import type {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete";

export interface MagicVariable {
  name: string;
  label: string;
}

export function createVariableCompletionSource(
  variables: string[],
  magicVariables: readonly MagicVariable[] = [],
) {
  return function variableSource(
    context: CompletionContext,
  ): CompletionResult | null {
    const before = context.matchBefore(/\{\{[\w\s]*/);
    if (!before) return null;
    if (!before.text.startsWith("{{")) return null;

    const seen = new Set<string>();
    const options: Completion[] = [];
    for (const name of variables) {
      if (seen.has(name)) continue;
      seen.add(name);
      options.push({ label: name, apply: `${name}}}`, type: "variable" });
    }
    for (const v of magicVariables) {
      if (seen.has(v.name)) continue;
      seen.add(v.name);
      options.push({
        label: v.name,
        detail: v.label,
        apply: `${v.name}}}`,
        type: "variable",
      });
    }
    if (options.length === 0) return null;

    // Offset past the `{{` so the fuzzy matcher only sees the word portion.
    const wordStart = before.from + 2;

    return {
      from: wordStart,
      options,
      validFor: /^[\w\s]*$/,
    };
  };
}
