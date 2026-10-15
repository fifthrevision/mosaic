import { useRef, useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { cn } from "./cn";
import { Label } from "./label";
import { MarkdownEditor, type MarkdownEditorHandle } from "./markdown-editor";
import { SVGIcon } from "./svg-icon";
import type { UIIcon } from "./ui-icon";

export const meta = {
  title: "Markdown Editor",
  description:
    "CodeMirror markdown editor with autocomplete for variables ({{) and repos or files (@)",
};

const SAMPLE_REPOS = [
  { fullName: "sunnyday/agents" },
  { fullName: "sunnyday/runner" },
  { fullName: "sunnyday/docs" },
  { fullName: "vercel/next.js" },
];

const SAMPLE_FILES = [
  { name: "rubric.md", path: "/workspace/inputs/rubric.md" },
  { name: "refund-policy.md", path: "/workspace/inputs/refund-policy.md" },
];

const SAMPLE_VARIABLES = ["ticket", "customer", "priority", "branch"];

const SAMPLE_MAGIC_VARIABLES = [
  { name: "run_date", label: "Run date" },
  { name: "run_datetime", label: "Run date & time" },
];

const RESERVED_VARIABLES = ["run_date", "run_datetime"];

// Stand-in for a consumer-supplied brand icon; mosaic itself ships none.
const GITHUB_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.262.793-.577 0-.286-.01-1.04-.016-2.04-3.337.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.09-.744.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.304.76-1.604-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.123-.304-.535-1.527.118-3.183 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.404 1.02.006 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.656.243 2.879.12 3.183.77.84 1.233 1.912 1.233 3.222 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .318.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.63-5.373-12-12-12z"/></svg>';

const GITHUB_ICON = { svg: GITHUB_SVG, className: "text-label" };

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

const INPUT_WELL =
  "rounded-md border border-separator-secondary bg-surface-input p-3 input-shadow hover:border-separator-input-hover focus-within:border-separator-input-focus";

function EditorWell({
  initialValue,
  reserved = false,
  className = "h-32 w-72",
}: {
  initialValue: string;
  reserved?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <div className={cn(INPUT_WELL, className)}>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        variables={SAMPLE_VARIABLES}
        reservedVariables={reserved ? RESERVED_VARIABLES : undefined}
        placeholder="Describe what the agent should do…"
      />
    </div>
  );
}

const COLUMNS = ["empty (placeholder)", "filled", "reserved variable"] as const;

export const States = () => (
  <div className="grid grid-cols-[repeat(3,max-content)] gap-x-4 gap-y-2">
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <EditorWell initialValue="" />
    <EditorWell
      initialValue={
        "## Triage\n\nRead **{{ticket}}** and tag it with `{{priority}}`.\n\n- Refunds go to billing"
      }
    />
    <EditorWell
      reserved
      initialValue="Summarize tickets since {{run_date}} for {{customer}}."
    />
  </div>
);

export const Autocomplete = () => {
  const [value, setValue] = useState(
    "Type {{ for a variable, or @ for a repo or file.\n\n",
  );
  return (
    <div className="flex flex-col gap-2">
      <ColumnLabel>
        variables, magic variables, repos, and files (type {"{{"} or @)
      </ColumnLabel>
      <div className={cn(INPUT_WELL, "h-50 w-150")}>
        <MarkdownEditor
          value={value}
          onChange={setValue}
          variables={SAMPLE_VARIABLES}
          magicVariables={SAMPLE_MAGIC_VARIABLES}
          repos={SAMPLE_REPOS}
          repoIcon={GITHUB_ICON}
          files={SAMPLE_FILES}
        />
      </div>
    </div>
  );
};

type SpecimenItem = {
  sourceIcon?: UIIcon;
  label: string;
  selected?: boolean;
};

/*
 * Static mirror of the autocomplete dropdown, which CodeMirror renders into
 * document.body from markdown-editor.css, so its styling can be reviewed
 * without typing into a live editor.
 */
function AutocompleteSpecimen({ items }: { items: SpecimenItem[] }) {
  return (
    <div className="min-w-80 rounded-md border border-separator-secondary p-1 floating-surface overlay-shadow">
      <ul className="flex flex-col gap-px">
        {items.map((item) => (
          <li
            key={item.label}
            aria-selected={item.selected || undefined}
            className={cn(
              "flex h-8 items-center gap-2 rounded-sm px-2 text-body text-label",
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

const ROWS = Array.from({ length: 30 }, (_, index) => `Line ${index + 1}`);

function InsertableEditor() {
  const editorRef = useRef<MarkdownEditorHandle>(null);
  const [value, setValue] = useState("Reply to the customer. ");
  return (
    <div className="flex flex-col gap-2">
      <div className={cn(INPUT_WELL, "h-24 w-120")}>
        <MarkdownEditor
          ref={editorRef}
          value={value}
          onChange={setValue}
          variables={SAMPLE_VARIABLES}
        />
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => editorRef.current?.insertText("{{customer}}")}
        >
          Insert customer
        </Button>
        <Button
          size="sm"
          onClick={() => editorRef.current?.insertText("{{ticket}}")}
        >
          Insert ticket
        </Button>
      </div>
    </div>
  );
}

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="autocomplete dropdown (static specimen)">
      <AutocompleteSpecimen
        items={[
          { sourceIcon: GithubIcon, label: "@sunnyday/agents" },
          { sourceIcon: GithubIcon, label: "@sunnyday/docs", selected: true },
          { sourceIcon: GithubIcon, label: "@sunnyday/runner" },
          { sourceIcon: GithubIcon, label: "@vercel/next.js" },
        ]}
      />
    </Example>
    <Example label="overflow (scrolls inside a fixed height)">
      <EditorWell initialValue={ROWS.join("\n")} className="h-32 w-120" />
    </Example>
    <Example label="long unbroken line (wraps)">
      <EditorWell
        initialValue={`Fetch https://sunnyday.app/agents/support-triage/runs/run_8f2c41/outputs/${"x".repeat(80)}.md`}
        className="h-24 w-120"
      />
    </Example>
    <Example label="insertText via ref">
      <InsertableEditor />
    </Example>
  </div>
);

const INSTRUCTIONS = [
  "You triage incoming support tickets for {{customer}}.",
  "",
  "1. Read the ticket and the policy in @refund-policy.md",
  "2. Tag it with a priority",
  "3. Draft a reply, but never promise a refund over $500",
].join("\n");

export const InContext = () => {
  const [instructions, setInstructions] = useState(INSTRUCTIONS);
  const [pageText, setPageText] = useState(INSTRUCTIONS);
  return (
    <div className="flex flex-col gap-6">
      <Example label="agent instructions field">
        <div className="flex w-150 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
          <div className="flex flex-col gap-2">
            <Label>Instructions</Label>
            <div className={cn(INPUT_WELL, "h-40")}>
              <MarkdownEditor
                value={instructions}
                onChange={setInstructions}
                variables={SAMPLE_VARIABLES}
                magicVariables={SAMPLE_MAGIC_VARIABLES}
                files={SAMPLE_FILES}
              />
            </div>
            <p className="text-body text-label-secondary">
              Type {"{{"} to insert an input, or @ to reference a file.
            </p>
          </div>
        </div>
      </Example>
      <Example label="full-page document (cm-centered-content)">
        <div className="h-60 w-200 rounded-md border border-separator-secondary bg-surface-card card-shadow">
          <MarkdownEditor
            className="cm-centered-content"
            value={pageText}
            onChange={setPageText}
            variables={SAMPLE_VARIABLES}
          />
        </div>
      </Example>
    </div>
  );
};
