import { Box, SlidersHorizontal } from "lucide-react";
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
