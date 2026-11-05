import {
  Braces,
  FileText,
  FolderOpen,
  PanelLeft,
  Search,
  Settings,
  SquareFunction,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import {
  CommandMenu,
  CommandMenuItem,
  CommandMenuMessage,
} from "./command-menu";
import { rankBySearch } from "./search-menu";
import { Shortcut } from "./shortcut";
import type { UIIcon } from "./ui-icon";

export const meta = {
  title: "Command Menu",
  description:
    "A search field over a list, floating at the top of the window and opened by a shortcut. The caller decides what the rows are and filters them; the menu handles the window, search field, keyboard, and highlight.",
};

type Entry = {
  value: string;
  icon?: UIIcon;
  title: string;
  subtitle?: string;
  detail?: string;
  shortcut?: string[];
};

const MIXED: Entry[] = [
  {
    value: "open-folder",
    icon: FolderOpen,
    title: "Open Folder…",
    shortcut: ["⌘", "O"],
  },
  {
    value: "toggle-sidebar",
    icon: PanelLeft,
    title: "Toggle Sidebar",
    shortcut: ["⌘", "B"],
  },
  {
    value: "settings",
    icon: Settings,
    title: "Settings…",
    shortcut: ["⌘", ","],
  },
  {
    value: "find-in-files",
    icon: Search,
    title: "Find in Files",
    shortcut: ["⇧", "⌘", "F"],
  },
  {
    value: "workspace-tsx",
    icon: FileText,
    title: "Workspace.tsx",
    subtitle: "src/renderer/src/components",
  },
  {
    value: "menu-ts",
    icon: FileText,
    title: "menu.ts",
    subtitle: "src/main",
  },
  {
    value: "open-repository-symbol",
    icon: SquareFunction,
    title: "openRepositorySymbol",
    subtitle: "function in Workspace",
    detail: "src/renderer/src/components/Workspace.tsx:412",
  },
  {
    value: "typescript-project-anchors",
    icon: SquareFunction,
    title: "typescriptProjectAnchors",
    subtitle: "function",
    detail: "src/main/language-servers/typescript-projects.ts:75",
  },
];

function EntryRow({
  entry,
  onPick,
}: {
  entry: Entry;
  onPick: (value: string) => void;
}) {
  return (
    <CommandMenuItem
      value={entry.value}
      onSelect={() => onPick(entry.value)}
      icon={entry.icon}
      title={entry.title}
      subtitle={entry.subtitle}
      detail={entry.detail}
      shortcut={entry.shortcut}
    />
  );
}

function Picked({ value }: { value: string }) {
  return (
    <span className="text-subhead text-label-secondary">
      picked: {value || "—"}
    </span>
  );
}

export const OpenedByShortcut = () => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpen((isOpen) => !isOpen);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="flex items-center gap-2 text-body text-label-secondary">
        Press <Shortcut keys={["⌘", "K"]} /> to open
      </span>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        label="Command menu"
        placeholder="Search commands, files, and symbols…"
      >
        {(search) => {
          const visible = rankBySearch(MIXED, search, (entry) => entry.title);
          if (visible.length === 0)
            return <CommandMenuMessage>No matches</CommandMenuMessage>;
          return visible.map((entry) => (
            <EntryRow key={entry.value} entry={entry} onPick={setPicked} />
          ));
        }}
      </CommandMenu>
      <Picked value={picked} />
    </div>
  );
};

const ROW_SHAPES: Entry[] = [
  { value: "title", title: "Title only" },
  { value: "icon", icon: Braces, title: "Icon and title" },
  {
    value: "shortcut",
    icon: Settings,
    title: "Title and shortcut",
    shortcut: ["⌘", ","],
  },
  {
    value: "two-lines",
    icon: FileText,
    title: "Two lines",
    subtitle: "The second line is supporting text",
  },
  {
    value: "detail",
    icon: SquareFunction,
    title: "Two lines and a detail",
    subtitle: "function in CommandMenu",
    detail: "src/command-menu.tsx:10",
  },
  {
    value: "everything",
    icon: SquareFunction,
    title: "Everything at once",
    subtitle: "Second line",
    detail: "Detail",
    shortcut: ["⇧", "⌘", "E"],
  },
  {
    value: "long",
    icon: SquareFunction,
    title:
      "aVeryLongSymbolNameThatKeepsGoingUntilItHasToTruncateSomewhereInTheRow",
    subtitle:
      "method in AnExtremelyLongContainerNameThatAlsoNeedsToTruncateAtTheEdge",
    detail:
      "src/some/deeply/nested/directory/structure/that/goes/on/and/on/file.ts:1234",
  },
];

export const Rows = () => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");
  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant="default" size="sm" onClick={() => setOpen(true)}>
        Show row shapes
      </Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        label="Row shapes"
        placeholder="Filter row shapes…"
      >
        {(search) =>
          rankBySearch(ROW_SHAPES, search, (entry) => entry.title).map(
            (entry) => (
              <EntryRow key={entry.value} entry={entry} onPick={setPicked} />
            ),
          )
        }
      </CommandMenu>
      <Picked value={picked} />
    </div>
  );
};

type AsyncResults =
  { status: "searching" } | { status: "loaded"; entries: Entry[] };

const SYMBOLS = MIXED.filter((entry) => entry.detail !== undefined).concat(
  ROW_SHAPES.filter((entry) => entry.detail !== undefined),
);

// Earlier results stay up until the next ones arrive, so the list doesn't
// blank on every keystroke.
function AsyncSymbols({
  search,
  onPick,
}: {
  search: string;
  onPick: (value: string) => void;
}) {
  const [results, setResults] = useState<AsyncResults>({
    status: "searching",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setResults({
        status: "loaded",
        entries: rankBySearch(SYMBOLS, search, (entry) => entry.title),
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  if (results.status === "searching")
    return <CommandMenuMessage>Searching…</CommandMenuMessage>;
  if (results.entries.length === 0)
    return <CommandMenuMessage>No matching symbols</CommandMenuMessage>;
  return results.entries.map((entry) => (
    <EntryRow key={entry.value} entry={entry} onPick={onPick} />
  ));
}

export const AsyncSearch = () => {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");
  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant="default" size="sm" onClick={() => setOpen(true)}>
        Search symbols (300 ms)
      </Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        label="Go to symbol"
        placeholder="Go to symbol…"
      >
        {(search) => <AsyncSymbols search={search} onPick={setPicked} />}
      </CommandMenu>
      <Picked value={picked} />
    </div>
  );
};

function MessageMenu({ label, message }: { label: string; message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="default" size="sm" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        label={label}
        placeholder="Go to symbol…"
      >
        {() => <CommandMenuMessage>{message}</CommandMenuMessage>}
      </CommandMenu>
    </>
  );
}

export const Messages = () => (
  <Example label="loading, empty search, and unavailable">
    <div className="flex gap-2">
      <MessageMenu label="Loading" message="Loading projects…" />
      <MessageMenu label="Empty search" message="Type a symbol name" />
      <MessageMenu
        label="Unavailable"
        message="No language server for this repository"
      />
    </div>
  </Example>
);
