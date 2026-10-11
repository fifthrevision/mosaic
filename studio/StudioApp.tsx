import { useEffect, useState, useSyncExternalStore } from "react";
import { ConfirmProvider } from "../src/confirm-dialog";
import { TooltipProvider } from "../src/tooltip";
import { Portfolio } from "./Portfolio";

const designModules = import.meta.glob<Record<string, unknown>>(
  "../src/**/*.design.tsx",
  { eager: false },
);

const metaModules = import.meta.glob<{ title?: string }>(
  "../src/**/*.design.tsx",
  { eager: true, import: "meta" },
);

type DesignEntry = {
  name: string;
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
      path: urlPath,
      load: load as () => Promise<Record<string, unknown>>,
    };
  });
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

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

function toggleDarkMode() {
  const next = !isDarkMode();
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem("studio-theme", next ? "dark" : "light");
}

function Sidebar({
  entries,
  activePath,
}: {
  entries: DesignEntry[];
  activePath: string;
}) {
  const [dark, setDark] = useState(() => isDarkMode());

  return (
    <aside className="fixed left-0 top-0 flex h-full w-52 flex-col border-r border-separator-primary bg-surface-card p-4">
      <h1 className="mb-4 text-sm font-bold text-label-secondary uppercase tracking-wide">
        Studio
      </h1>
      <ul className="space-y-0.5 flex-1">
        {entries.map((e) => (
          <li key={e.path}>
            <button
              onClick={() => navigate(e.path)}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-base text-label hover:bg-state-hover ${
                activePath === e.path ? "bg-state-selected" : ""
              }`}
            >
              {e.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          toggleDarkMode();
          setDark((d) => !d);
        }}
        className="rounded-lg px-3 py-1.5 text-left text-sm text-label-secondary hover:bg-state-hover"
      >
        {dark ? "Light mode" : "Dark mode"}
      </button>
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
