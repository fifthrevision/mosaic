import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
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
}>("../src/**/*.design.tsx", {
  eager: true,
  query: "?meta",
  import: "default",
});

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

const COLORS_PATH = "colors";

function groupRank(group: string) {
  const index = GROUP_ORDER.indexOf(group);
  return index === -1 ? GROUP_ORDER.length : index;
}

function getPath() {
  return window.location.hash.replace(/^#\/?/, "");
}

function usePath() {
  return useSyncExternalStore((cb) => {
    window.addEventListener("hashchange", cb);
    return () => window.removeEventListener("hashchange", cb);
  }, getPath);
}

function navigate(path: string) {
  window.location.hash = `/${path}`;
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
  docked,
  onToggleDocked,
}: {
  entries: DesignEntry[];
  activePath: string;
  docked: boolean;
  onToggleDocked: () => void;
}) {
  const [theme, setTheme] = useState(currentTheme);

  return (
    <aside className="fixed left-0 top-0 flex h-full w-52 flex-col border-r border-separator-primary bg-surface-card p-4">
      <h1 className="mb-4 text-caption font-bold text-label-secondary uppercase tracking-wide">
        Studio
      </h1>
      <nav className="-mx-4 min-h-0 flex-1 space-y-4 overflow-y-auto px-4">
        {import.meta.env.VITE_DTG_URL && (
          <button
            onClick={() => navigate(COLORS_PATH)}
            className={`w-full rounded-xl px-3 py-1.5 text-left text-body text-label hover:bg-state-hover ${
              activePath === COLORS_PATH ? "bg-state-selected" : ""
            }`}
          >
            Colors
          </button>
        )}
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
      {import.meta.env.VITE_DTG_URL && activePath !== COLORS_PATH && (
        <button
          onClick={onToggleDocked}
          className={`mb-2 w-full rounded-xl px-3 py-1.5 text-left text-body text-label hover:bg-state-hover ${
            docked ? "bg-state-selected" : ""
          }`}
        >
          Edit colors
        </button>
      )}
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

type FramePlacement = "page" | "panel" | "hidden";

const FRAME_PLACEMENT_CLASS: Record<FramePlacement, string> = {
  page: "fixed inset-y-0 right-0 left-52",
  panel: "fixed inset-y-0 right-0 w-[480px] border-l border-separator-primary",
  hidden: "hidden",
};

// One frame for the whole session, only ever restyled: moving an iframe to
// another place in the document reloads it, and the editor keeps its
// visitors' edits in the page.
function DtgFrame({
  placement,
  frameRef,
}: {
  placement: FramePlacement;
  frameRef: RefObject<HTMLIFrameElement | null>;
}) {
  return (
    <div className={FRAME_PLACEMENT_CLASS[placement]}>
      <iframe
        ref={frameRef}
        title="Colors"
        src={import.meta.env.VITE_DTG_URL}
        className="block h-full w-full border-0"
      />
    </div>
  );
}

// The dtg editor posts the CSS for whatever it shows, edits being tried
// included; laid over the built colors, it re-skins every component live.
// The page's canvas color goes back to the editor whenever it changes, from
// an edit or a theme switch, so the docked panel is drawn on the same
// background as the page beside it.
function useLiveColors(frameRef: RefObject<HTMLIFrameElement | null>) {
  useEffect(() => {
    const style = document.head.appendChild(document.createElement("style"));
    style.id = "dtg-live";
    const postBackground = () => {
      const canvas = getComputedStyle(document.body)
        .getPropertyValue("--surface-canvas")
        .trim();
      frameRef.current?.contentWindow?.postMessage(
        { type: "dtg:background", color: canvas },
        "*",
      );
    };
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data as { type?: unknown; css?: unknown } | null;
      if (data?.type === "dtg:css" && typeof data.css === "string") {
        style.textContent = data.css;
        postBackground();
      }
    };
    const themeObserver = new MutationObserver(postBackground);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    addEventListener("message", onMessage);
    frameRef.current?.contentWindow?.postMessage({ type: "dtg:css?" }, "*");
    return () => {
      themeObserver.disconnect();
      removeEventListener("message", onMessage);
      style.remove();
    };
  }, [frameRef]);
}

export function StudioApp() {
  const path = usePath();
  const entries = parseEntries();
  const entry = path ? entries.find((e) => e.path === path) : null;
  const [docked, setDocked] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useLiveColors(frameRef);
  const placement: FramePlacement =
    path === COLORS_PATH ? "page" : docked ? "panel" : "hidden";

  return (
    <TooltipProvider>
      <ConfirmProvider>
        <div className="flex min-h-screen">
          <Sidebar
            entries={entries}
            activePath={path}
            docked={docked}
            onToggleDocked={() => setDocked((open) => !open)}
          />
          <main
            className={`ml-52 flex-1 ${placement === "panel" ? "mr-[480px]" : ""}`}
          >
            {!path && (
              <div className="p-8 text-label-secondary">
                Select a component from the sidebar.
              </div>
            )}
            {path && path !== COLORS_PATH && !entry && (
              <div className="p-8 text-label-secondary">Not found.</div>
            )}
            {entry && <DesignPage entry={entry} />}
          </main>
          {import.meta.env.VITE_DTG_URL && (
            <DtgFrame placement={placement} frameRef={frameRef} />
          )}
        </div>
      </ConfirmProvider>
    </TooltipProvider>
  );
}

if (import.meta.hot) {
  import.meta.hot.accept();
}
