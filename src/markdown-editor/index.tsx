import { autocompletion } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
import {
  drawSelection,
  EditorView,
  keymap,
  placeholder as placeholderExt,
  tooltips,
} from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "../cn";
import { type CompletionIcon, renderCompletionIcons } from "./completion-icons";
import "./markdown-editor.css";
import {
  createFileCompletionSource,
  type FileForCompletion,
} from "./file-autocomplete";
import {
  createRepoCompletionSource,
  type RepoForCompletion,
} from "./repo-autocomplete";
import {
  createVariableCompletionSource,
  type MagicVariable,
} from "./variable-autocomplete";
import { createVariableHighlight } from "./variable-highlight";

export const markdownHighlightStyle = HighlightStyle.define([
  { tag: t.heading1, fontSize: "1.5em", fontWeight: "500" },
  { tag: t.heading2, fontSize: "1.3em", fontWeight: "500" },
  { tag: t.heading3, fontSize: "1.1em", fontWeight: "500" },
  { tag: t.heading4, fontWeight: "500" },
  { tag: t.strong, fontWeight: "700" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  {
    tag: t.link,
    color: "var(--color-label-link)",
    textDecoration: "underline",
  },
  { tag: t.url, color: "var(--color-label-tertiary)" },
  {
    tag: t.monospace,
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
    color: "var(--color-label-theme)",
  },
  { tag: t.processingInstruction, color: "var(--color-label-tertiary)" },
  { tag: t.meta, color: "var(--color-label-tertiary)" },
  { tag: t.quote, color: "var(--color-label-secondary)", fontStyle: "italic" },
]);

function createAutocompleteExtension(opts: {
  variables: string[];
  magicVariables: readonly MagicVariable[];
  repos: RepoForCompletion[];
  repoIcon: CompletionIcon | undefined;
  files: FileForCompletion[];
}): Extension {
  return autocompletion({
    override: [
      createVariableCompletionSource(opts.variables, opts.magicVariables),
      createFileCompletionSource(opts.files),
      createRepoCompletionSource(opts.repos, opts.repoIcon),
    ],
    activateOnTyping: true,
    defaultKeymap: true,
    icons: false,
    addToOptions: [
      {
        render: renderCompletionIcons,
        position: 20,
      },
    ],
  });
}

export type {
  CompletionIcon,
  FileForCompletion,
  MagicVariable,
  RepoForCompletion,
};

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  variables?: string[];
  magicVariables?: readonly MagicVariable[];
  reservedVariables?: string[];
  repos?: RepoForCompletion[];
  repoIcon?: CompletionIcon;
  files?: FileForCompletion[];
  placeholder?: string;
  className?: string;
}

export interface MarkdownEditorHandle {
  insertText: (text: string) => void;
}

export const MarkdownEditor = forwardRef<
  MarkdownEditorHandle,
  MarkdownEditorProps
>(function MarkdownEditor(
  {
    value,
    onChange,
    variables = [],
    magicVariables = [],
    reservedVariables = [],
    repos = [],
    repoIcon,
    files = [],
    placeholder,
    className,
  },
  ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      insertText(text: string) {
        const view = viewRef.current;
        if (!view) return;
        const { from, to } = view.state.selection.main;
        view.dispatch({
          changes: { from, to, insert: text },
          selection: { anchor: from + text.length },
        });
        view.focus();
      },
    }),
    [],
  );
  const autocompleteCompartment = useRef(new Compartment());
  const variableHighlightCompartment = useRef(new Compartment());
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!hostRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        history(),
        drawSelection(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({ base: markdownLanguage }),
        syntaxHighlighting(markdownHighlightStyle),
        variableHighlightCompartment.current.of(
          createVariableHighlight(reservedVariables),
        ),
        autocompleteCompartment.current.of(
          createAutocompleteExtension({
            variables,
            magicVariables,
            repos,
            repoIcon,
            files,
          }),
        ),
        tooltips({ position: "fixed", parent: document.body }),
        placeholder ? placeholderExt(placeholder) : [],
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({ state, parent: hostRef.current });
    viewRef.current = view;
    view.focus();

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: autocompleteCompartment.current.reconfigure(
        createAutocompleteExtension({
          variables,
          magicVariables,
          repos,
          repoIcon,
          files,
        }),
      ),
    });
  }, [variables, magicVariables, repos, repoIcon, files]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: variableHighlightCompartment.current.reconfigure(
        createVariableHighlight(reservedVariables),
      ),
    });
  }, [reservedVariables]);

  return <div ref={hostRef} className={cn("cm-markdown-editor", className)} />;
});
