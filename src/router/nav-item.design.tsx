import { Home, Settings, Users, Bell } from "lucide-react";
import { MemoryRouter } from "react-router";
import { NavItem } from "./nav-item";

export const meta = {
  title: "NavItem",
  description: "Sidebar navigation link with icon and active state",
};

export const Default = () => (
  <MemoryRouter initialEntries={["/other"]}>
    <div className="w-48">
      <NavItem icon={Home} to="/home">
        Home
      </NavItem>
    </div>
  </MemoryRouter>
);

export const Active = () => (
  <MemoryRouter initialEntries={["/settings"]}>
    <div className="w-48">
      <NavItem icon={Settings} to="/settings">
        Settings
      </NavItem>
    </div>
  </MemoryRouter>
);

export const WithoutIcon = () => (
  <MemoryRouter initialEntries={["/other"]}>
    <div className="w-48">
      <NavItem to="/about">About</NavItem>
    </div>
  </MemoryRouter>
);

export const SidebarGroup = () => (
  <MemoryRouter initialEntries={["/team"]}>
    <div className="w-48 space-y-0.5">
      <NavItem icon={Home} to="/home">
        Home
      </NavItem>
      <NavItem icon={Users} to="/team">
        Team
      </NavItem>
      <NavItem icon={Bell} to="/notifications">
        Notifications
      </NavItem>
      <NavItem icon={Settings} to="/settings">
        Settings
      </NavItem>
    </div>
  </MemoryRouter>
);
