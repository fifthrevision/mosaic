import { Box, FileText, SlidersHorizontal } from "lucide-react";
import { MemoryRouter } from "react-router";
import { NavTabs } from "./nav-tabs";

export const meta = {
  title: "NavTabs",
  description:
    "Route-driven sibling of Tabs: the same pill look, active state from NavLink",
};

const TABS = [
  { to: "/workbench", label: "Workbench", icon: Box },
  { to: "/files", label: "Files", icon: FileText },
  { to: "/options", label: "Options", icon: SlidersHorizontal },
];

export const Default = () => (
  <MemoryRouter initialEntries={["/workbench"]}>
    <NavTabs tabs={TABS} />
  </MemoryRouter>
);

export const LastActive = () => (
  <MemoryRouter initialEntries={["/options"]}>
    <NavTabs tabs={TABS} />
  </MemoryRouter>
);
