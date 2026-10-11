import type {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete";
import type { CompletionIcon, CompletionWithIcons } from "./completion-icons";

export type RepoForCompletion = {
  fullName: string;
};

export function createRepoCompletionSource(
  repos: RepoForCompletion[],
  icon?: CompletionIcon,
) {
  return function repoSource(
    context: CompletionContext,
  ): CompletionResult | null {
    const before = context.matchBefore(/@[\w./\-]*/);
    if (!before) return null;
    if (repos.length === 0) return null;
    if (!before.text.startsWith("@")) return null;

    const options: CompletionWithIcons[] = repos.map((r) => ({
      label: `@${r.fullName}`,
      apply: `[${r.fullName}](https://github.com/${r.fullName})`,
      sourceIconSvg: icon?.svg,
      sourceIconClassName: icon?.className,
    }));

    return {
      from: before.from,
      options: options as Completion[],
      validFor: /^@[\w./\-]*$/,
    };
  };
}
