import { useEffect, useState, useSyncExternalStore } from "react";
import { ConfirmProvider } from "../src/confirm-dialog";
import { TooltipProvider } from "../src/tooltip";
import { Portfolio } from "./Portfolio";

const designModules = import.meta.glob<Record<string, unknown>>(
  "../src/**/*.design.tsx",
  { eager: false },
);

const metaModules = import.meta.glob<{
  title?: string;
  group?: string;
  order?: number;
}>("../src/**/*.design.tsx", { eager: true, import: "meta" });

const DEFAULT_GROUP = "Components";
const GROUP_ORDER = ["Foundations", "Typography", DEFAULT_GROUP];

type DesignEntry = {
  name: string;
  group: string;
  order: number;
  path: string;
  load: () => Promise<Record<string, unknown>>;
};

function parseEntries(): DesignEntry[] {
  return Object.entries(designModules).map(([filePath, load]) => {
    const match = filePath.match(/\/([^/]+)\.design\.tsx$/);
    const fileName = match?.[1] ?? filePath;
    const meta = metaModules[filePath];
    const fallback = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    const name = meta?.title ?? fallback;
    const urlPath = encodeURIComponent(fileName);
    return {
      name,
      group: meta?.group ?? DEFAULT_GROUP,
      order: meta?.order ?? Infinity,
      path: urlPath,
      load: load as () => Promise<Record<string, unknown>>,
    };
  });
}

function groupEntries(entries: DesignEntry[]): [string, DesignEntry[]][] {
  const groups = new Map<string, DesignEntry[]>();
  for (const entry of entries) {
    const members = groups.get(entry.group) ?? [];
    members.push(entry);
    groups.set(entry.group, members);
  }
  for (const members of groups.values()) {
    members.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  }
  return [...groups.entries()].sort(
    ([a], [b]) => groupRank(a) - groupRank(b) || a.localeCompare(b),
  );
}

function groupRank(group: string) {
  const index = GROUP_ORDER.indexOf(group);
  return index === -1 ? GROUP_ORDER.length : index;
}

function getPath() {
  return window.location.pathname.replace(/^\//, "");
}

function usePath() {
  return useSyncExternalStore((cb) => {
    window.addEventListener("popstate", cb);
    return () => window.removeEventListener("popstate", cb);
  }, getPath);
}

function navigate(path: string) {
  window.history.pushState(null, "", `/${path}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const STUDIO_THEMES = ["light", "dark", "black"] as const;
type StudioTheme = (typeof STUDIO_THEMES)[number];

function currentTheme(): StudioTheme {
  const classes = document.documentElement.classList;
  if (classes.contains("black")) return "black";
  if (classes.contains("dark")) return "dark";
  return "light";
}

function applyTheme(theme: StudioTheme) {
  const classes = document.documentElement.classList;
  classes.remove("dark", "black");
  if (theme !== "light") classes.add(theme);
  localStorage.setItem("studio-theme", theme);
}

function Sidebar({
  entries,
  activePath,
}: {
  entries: DesignEntry[];
  activePath: string;
}) {
  const [theme, setTheme] = useState(currentTheme);

  return (
    <aside className="fixed left-0 top-0 flex h-full w-52 flex-col border-r border-separator-primary bg-surface-card p-4">
      <h1 className="mb-4 text-caption font-bold text-label-secondary uppercase tracking-wide">
        Studio
      </h1>
      <nav className="-mx-4 min-h-0 flex-1 space-y-4 overflow-y-auto px-4">
        {groupEntries(entries).map(([group, members]) => (
          <section key={group}>
            <h2 className="mb-1 px-3 text-caption font-medium text-label-tertiary">
              {group}
            </h2>
            <ul className="space-y-0.5">
              {members.map((e) => (
                <li key={e.path}>
                  <button
                    onClick={() => navigate(e.path)}
                    className={`w-full rounded-xl px-3 py-1.5 text-left text-body text-label hover:bg-state-hover ${
                      activePath === e.path ? "bg-state-selected" : ""
                    }`}
                  >
                    {e.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <div className="flex gap-0.5">
        {STUDIO_THEMES.map((option) => (
          <button
            key={option}
            onClick={() => {
              applyTheme(option);
              setTheme(option);
            }}
            className={`flex-1 rounded-xl py-1.5 text-caption capitalize hover:bg-state-hover ${
              theme === option
                ? "bg-state-selected text-label"
                : "text-label-secondary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </aside>
  );
}

function DesignPage({ entry }: { entry: DesignEntry }) {
  const [mod, setMod] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setMod(null);
    entry.load().then(setMod);
  }, [entry]);

  if (!mod) return <div className="p-8 text-label-secondary">Loading…</div>;
  return <Portfolio module={mod} name={entry.name} />;
}

export function StudioApp() {
  const path = usePath();
  const entries = parseEntries();
  const entry = path ? entries.find((e) => e.path === path) : null;

  return (
    <TooltipProvider>
      <ConfirmProvider>
        <div className="flex min-h-screen">
          <Sidebar entries={entries} activePath={path} />
          <main className="ml-52 flex-1">
            {!path && (
              <div className="p-8 text-label-secondary">
                Select a component from the sidebar.
              </div>
            )}
            {path && !entry && (
              <div className="p-8 text-label-secondary">Not found.</div>
            )}
            {entry && <DesignPage entry={entry} />}
          </main>
        </div>
      </ConfirmProvider>
    </TooltipProvider>
  );
}

if (import.meta.hot) {
  import.meta.hot.accept();
}
