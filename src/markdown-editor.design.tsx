import { useState } from "react";
import { cn } from "./cn";
import { MarkdownEditor } from "./markdown-editor";
import { SVGIcon } from "./svg-icon";
import type { UIIcon } from "./ui-icon";

export const meta = {
  title: "Markdown Editor",
  description:
    "CodeMirror-based markdown editor with autocomplete for variables ({{) and GitHub repos (@)",
};

const SAMPLE_REPOS = [
  { fullName: "anthropics/claude-code" },
  { fullName: "vercel/next.js" },
  { fullName: "facebook/react" },
  { fullName: "remix-run/react-router" },
];

const SAMPLE_VARIABLES = ["task", "context", "input", "branch", "owner"];

const SAMPLE_MAGIC_VARIABLES = [
  { name: "run_date", label: "Run date" },
  { name: "run_datetime", label: "Run date & time" },
];

// Stand-in for a consumer-supplied brand icon; mosaic itself ships none.
const GITHUB_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.262.793-.577 0-.286-.01-1.04-.016-2.04-3.337.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.744.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.304.76-1.604-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.123-.304-.535-1.527.118-3.183 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.404 1.02.006 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.656.243 2.879.12 3.183.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .318.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.63-5.373-12-12-12z"/></svg>';

const GITHUB_ICON = {
  svg: GITHUB_SVG,
  className: "text-[#181717] dark:text-white",
};

function GithubIcon({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <SVGIcon
      svg={GITHUB_SVG}
      size={size}
      className={cn(GITHUB_ICON.className, className)}
    />
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-50 w-150 rounded-md border border-separator-secondary bg-surface-card p-3">
      {children}
    </div>
  );
}

export const Default = () => {
  const [value, setValue] = useState(
    "Type `@` to insert a repo or `{{` to insert a variable.",
  );
  return (
    <Frame>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        variables={SAMPLE_VARIABLES}
        magicVariables={SAMPLE_MAGIC_VARIABLES}
        repos={SAMPLE_REPOS}
        repoIcon={GITHUB_ICON}
        placeholder="Write something…"
      />
    </Frame>
  );
};

export const VariableCompletion = () => {
  const [value, setValue] = useState("Pass the {{");
  return (
    <Frame>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        variables={SAMPLE_VARIABLES}
        magicVariables={SAMPLE_MAGIC_VARIABLES}
        placeholder="Type {{ to see variables"
      />
    </Frame>
  );
};

export const RepoCompletion = () => {
  const [value, setValue] = useState("Check the @");
  return (
    <Frame>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        repos={SAMPLE_REPOS}
        repoIcon={GITHUB_ICON}
        placeholder="Type @ to see repos"
      />
    </Frame>
  );
};

export const Empty = () => {
  const [value, setValue] = useState("");
  return (
    <Frame>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        variables={SAMPLE_VARIABLES}
        magicVariables={SAMPLE_MAGIC_VARIABLES}
        repos={SAMPLE_REPOS}
        repoIcon={GITHUB_ICON}
        placeholder="Write something…"
      />
    </Frame>
  );
};

/*
 * Static specimen of the autocomplete dropdown. The actual control is
 * rendered by CodeMirror into document.body — we can't extract it as a
 * real React component without rewriting CM's TooltipView plugin. This
 * mirror exists so the dropdown's styling is reviewable in studio
 * without having to type into a live editor.
 */
export const DropdownSpec = () => (
  <div className="flex items-start gap-8 p-8">
    <AutocompleteSpecimen
      items={[
        { sourceIcon: GithubIcon, label: "@anthropics/claude-code" },
        { sourceIcon: GithubIcon, label: "@facebook/react", selected: true },
        { sourceIcon: GithubIcon, label: "@remix-run/react-router" },
        { sourceIcon: GithubIcon, label: "@vercel/next.js" },
      ]}
    />
  </div>
);

type SpecimenItem = {
  sourceIcon?: UIIcon;
  label: string;
  selected?: boolean;
};

function AutocompleteSpecimen({ items }: { items: SpecimenItem[] }) {
  return (
    <div
      className="rounded-md border border-separator-secondary bg-surface-card p-1 shadow-[0px_4px_12px_var(--color-shadow-1)]"
      style={{ minWidth: "20rem" }}
    >
      <ul className="m-0 flex list-none flex-col gap-px p-0">
        {items.map((item) => (
          <li
            key={item.label}
            aria-selected={item.selected || undefined}
            className={cn(
              "flex h-8 items-center gap-2.5 rounded-sm px-2 text-body text-label",
              item.selected && "bg-state-hover",
            )}
          >
            {item.sourceIcon && <item.sourceIcon size={14} />}
            <span className="flex-1 truncate">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
