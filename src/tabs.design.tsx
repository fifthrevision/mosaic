import {
  FileCode,
  FileText,
  History,
  ScrollText,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { EmptyState } from "./empty-state";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs";

export const meta = {
  title: "Tabs",
  description:
    "Pill-style in-page tabs (Radix under the hood), with optional icons and close buttons",
};

const SIZES = ["md", "sm"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(3,max-content)] items-center gap-x-8 gap-y-4">
    <span />
    {["text", "icon", "closable"].map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {SIZES.map((size) => (
      <div key={size} className="contents">
        <ColumnLabel>{size}</ColumnLabel>
        <Tabs defaultValue="instructions">
          <TabsList>
            <TabsTrigger value="instructions" size={size}>
              Instructions
            </TabsTrigger>
            <TabsTrigger value="runs" size={size}>
              Runs
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="instructions">
          <TabsList>
            <TabsTrigger value="instructions" size={size} icon={ScrollText}>
              Instructions
            </TabsTrigger>
            <TabsTrigger value="runs" size={size} icon={History}>
              Runs
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs defaultValue="instructions">
          <TabsList>
            <TabsTrigger
              value="instructions"
              size={size}
              icon={FileText}
              onClose={() => {}}
            >
              notes.md
            </TabsTrigger>
            <TabsTrigger
              value="runs"
              size={size}
              icon={FileCode}
              onClose={() => {}}
            >
              agent.ts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    ))}
  </div>
);

const DRAFTS = ["Draft one", "Draft two", "Draft three"];

function ClosableTabs({ size }: { size: "sm" | "md" }) {
  const [openTabs, setOpenTabs] = useState(DRAFTS);
  const [activeTab, setActiveTab] = useState(DRAFTS[0]);

  function closeTab(tab: string) {
    const remainingTabs = openTabs.filter((openTab) => openTab !== tab);
    setOpenTabs(remainingTabs);
    if (tab === activeTab) {
      setActiveTab(remainingTabs[0] ?? "");
    }
  }

  if (openTabs.length === 0) {
    return (
      <Button
        size="sm"
        variant="subtle"
        onClick={() => {
          setOpenTabs(DRAFTS);
          setActiveTab(DRAFTS[0]);
        }}
      >
        Reopen tabs
      </Button>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        {openTabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            size={size}
            onClose={() => closeTab(tab)}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export const Closable = () => (
  <div className="flex flex-col gap-6">
    {SIZES.map((size) => (
      <Example key={size} label={`${size} (close a tab, then reopen)`}>
        <ClosableTabs size={size} />
      </Example>
    ))}
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long label (fades at the 240px max width)">
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" icon={FileText}>
            quarterly-planning-notes-final-revised.md
          </TabsTrigger>
          <TabsTrigger value="b">Runs</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
    <Example label='closable, narrower max width (className="max-w-48")'>
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger
            value="a"
            icon={FileText}
            className="max-w-48"
            onClose={() => {}}
          >
            quarterly-planning-notes-final-revised.md
          </TabsTrigger>
          <TabsTrigger value="b" className="max-w-48" onClose={() => {}}>
            agent.ts
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>
    <Example label="many tabs in a w-80 container (overflows)">
      <div className="w-80">
        <Tabs defaultValue="instructions">
          <TabsList>
            {["Instructions", "Inputs", "Runs", "Files", "Settings"].map(
              (tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase()} size="sm">
                  {tab}
                </TabsTrigger>
              ),
            )}
          </TabsList>
        </Tabs>
      </div>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent page sections, with panels">
      <Tabs defaultValue="instructions" className="flex w-120 flex-col gap-4">
        <TabsList>
          <TabsTrigger value="instructions" icon={ScrollText}>
            Instructions
          </TabsTrigger>
          <TabsTrigger value="runs" icon={History}>
            Runs
          </TabsTrigger>
          <TabsTrigger value="settings" icon={SlidersHorizontal}>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsPanel value="instructions">
          <div className="rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
            <p className="text-body text-label">
              Summarize each new pull request in three bullets and flag any
              change to the public API.
            </p>
          </div>
        </TabsPanel>
        <TabsPanel value="runs">
          <EmptyState>No runs yet. Click Run to start one.</EmptyState>
        </TabsPanel>
        <TabsPanel value="settings">
          <p className="text-body text-label-secondary">
            Model, tools, and trigger settings live here.
          </p>
        </TabsPanel>
      </Tabs>
    </Example>
    <Example label="open files (sm, closable)">
      <div className="w-120 rounded-md border border-separator-secondary bg-surface-card p-2 card-shadow">
        <Tabs defaultValue="instructions.md">
          <TabsList className="gap-1">
            <TabsTrigger
              value="instructions.md"
              size="sm"
              icon={FileText}
              onClose={() => {}}
            >
              instructions.md
            </TabsTrigger>
            <TabsTrigger
              value="tools.ts"
              size="sm"
              icon={FileCode}
              onClose={() => {}}
            >
              tools.ts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Example>
  </div>
);
