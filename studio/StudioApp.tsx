import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { ConfirmProvider } from "@fifthrevision/mosaic/confirm-dialog";
import { NavItem } from "@fifthrevision/mosaic/nav-item";
import { SectionHeader } from "@fifthrevision/mosaic/section-header";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@fifthrevision/mosaic/segmented-control";
import { TooltipProvider } from "@fifthrevision/mosaic/tooltip";
import generatedColorsCss from "../src/colors.generated.css?raw";
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

const DEFAULT_THEME = "light";

// The default mode is `:root` in the generated CSS, so only the other modes
// are discoverable: they're the classes in unindented rules made of `:root`
// and classes. A mode with no values of its own shares `:root`'s rule.
const MODE_CLASSES = [
  ...new Set(
    [
      ...generatedColorsCss.matchAll(
        /^((?::root|\.[\w-]+)(?:,\s*(?::root|\.[\w-]+))*)\s*\{/gm,
      ),
    ]
      .flatMap((match) => match[1].split(","))
      .map((selector) => selector.trim())
      .filter((selector) => selector.startsWith("."))
      .map((selector) => selector.slice(1)),
  ),
];

const THEME_OPTIONS: readonly SegmentedOption<string>[] = [
  DEFAULT_THEME,
  ...MODE_CLASSES,
].map((mode) => ({
  value: mode,
  label: mode[0].toUpperCase() + mode.slice(1),
}));

function currentTheme(): string {
  const classes = document.documentElement.classList;
  return (
    MODE_CLASSES.findLast((mode) => classes.contains(mode)) ?? DEFAULT_THEME
  );
}

function applyTheme(theme: string) {
  const classes = document.documentElement.classList;
  classes.remove(...MODE_CLASSES);
  if (theme !== DEFAULT_THEME) classes.add(theme);
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
    <aside className="fixed top-0 left-0 flex h-full w-56 flex-col gap-4 border-r border-separator-primary bg-surface-shell px-6 py-4">
      <h1 className="text-body font-medium text-label">Studio</h1>
      <nav className="-mx-6 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6">
        {import.meta.env.VITE_DTG_URL && (
          <NavItem
            variant="tinted"
            active={activePath === COLORS_PATH}
            href={`#/${COLORS_PATH}`}
          >
            Colors
          </NavItem>
        )}
        {groupEntries(entries).map(([group, members]) => (
          <section key={group} className="flex flex-col gap-0.5">
            <SectionHeader title={group} />
            {members.map((e) => (
              <NavItem
                key={e.path}
                variant="tinted"
                active={activePath === e.path}
                href={`#/${e.path}`}
              >
                {e.name}
              </NavItem>
            ))}
          </section>
        ))}
      </nav>
      <SegmentedControl
        className="-mx-2"
        aria-label="Theme"
        options={THEME_OPTIONS}
        value={theme}
        onChange={(option) => {
          applyTheme(option);
          setTheme(option);
        }}
      />
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

type FramePlacement = "page" | "hidden";

const FRAME_PLACEMENT_CLASS: Record<FramePlacement, string> = {
  page: "fixed inset-y-0 right-0 left-56",
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
// an edit or a theme switch, so the editor is drawn on the page's canvas.
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
  const frameRef = useRef<HTMLIFrameElement>(null);
  useLiveColors(frameRef);
  const placement: FramePlacement = path === COLORS_PATH ? "page" : "hidden";

  return (
    <TooltipProvider>
      <ConfirmProvider>
        <div className="flex min-h-screen">
          <Sidebar entries={entries} activePath={path} />
          <main className="ml-56 flex-1">
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
