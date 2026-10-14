import { Box, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs";

export const meta = {
  title: "Tabs",
  description: "Pill-style tabs (Radix under the hood)",
};

export const Default = () => (
  <Tabs defaultValue="workbench" className="w-80">
    <TabsList>
      <TabsTrigger value="workbench" icon={Box}>
        Workbench
      </TabsTrigger>
      <TabsTrigger value="options" icon={SlidersHorizontal}>
        Options
      </TabsTrigger>
    </TabsList>
    <TabsPanel value="workbench" className="mt-4">
      <p className="text-base text-label-secondary">Workbench panel content.</p>
    </TabsPanel>
    <TabsPanel value="options" className="mt-4">
      <p className="text-base text-label-secondary">Options panel content.</p>
    </TabsPanel>
  </Tabs>
);

export const WithoutIcons = () => (
  <Tabs defaultValue="a" className="w-80">
    <TabsList>
      <TabsTrigger value="a">Tab one</TabsTrigger>
      <TabsTrigger value="b">Tab two</TabsTrigger>
      <TabsTrigger value="c">Tab three</TabsTrigger>
    </TabsList>
  </Tabs>
);

const closableTabs = ["Draft one", "Draft two", "Draft three"];

function ClosableTabs({ size }: { size?: "sm" | "md" }) {
  const [openTabs, setOpenTabs] = useState(closableTabs);
  const [activeTab, setActiveTab] = useState(closableTabs[0]);

  function closeTab(tab: string) {
    const remainingTabs = openTabs.filter((openTab) => openTab !== tab);
    setOpenTabs(remainingTabs);
    if (tab === activeTab) {
      setActiveTab(remainingTabs[0] ?? "");
    }
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

export const Closable = () => <ClosableTabs />;

export const Small = () => (
  <Tabs defaultValue="a">
    <TabsList>
      <TabsTrigger value="a" size="sm" icon={Box}>
        Workbench
      </TabsTrigger>
      <TabsTrigger value="b" size="sm" icon={SlidersHorizontal}>
        Options
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export const SmallClosable = () => <ClosableTabs size="sm" />;
