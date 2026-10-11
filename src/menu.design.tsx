import {
  Copy,
  LogOut,
  Pencil,
  RefreshCw,
  Settings,
  Trash2,
} from "lucide-react";
import { Button } from "./button";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "./menu";

export const meta = {
  title: "Menu",
  description: "Dropdown menu with icon items, built on Radix",
};

export const Default = () => (
  <Menu
    trigger={
      <Button icon={Settings} size="sm">
        Options
      </Button>
    }
  >
    <MenuItem icon={Pencil}>Edit</MenuItem>
    <MenuItem icon={Copy}>Duplicate</MenuItem>
    <MenuItem icon={Trash2}>Delete</MenuItem>
  </Menu>
);

export const AlignStart = () => (
  <Menu trigger={<Button size="sm">Align start</Button>} align="start">
    <MenuItem icon={Pencil}>Edit</MenuItem>
    <MenuItem icon={Copy}>Duplicate</MenuItem>
  </Menu>
);

export const ManyItems = () => (
  <Menu trigger={<Button size="sm">Account</Button>}>
    <MenuItem icon={Pencil}>Edit profile</MenuItem>
    <MenuItem icon={Settings}>Settings</MenuItem>
    <MenuItem icon={Copy}>Copy ID</MenuItem>
    <MenuItem icon={LogOut}>Sign out</MenuItem>
  </Menu>
);

export const WithLabels = () => (
  <Menu trigger={<Button size="sm">Variables</Button>} align="start">
    <MenuLabel>Built-in</MenuLabel>
    <MenuItem icon={Copy}>Date</MenuItem>
    <MenuItem icon={Copy}>Date & time</MenuItem>
    <MenuSeparator />
    <MenuLabel>Custom</MenuLabel>
    <MenuItem icon={Pencil}>customer_id</MenuItem>
  </Menu>
);

export const WithDestructive = () => (
  <Menu trigger={<Button size="sm">More</Button>}>
    <MenuItem icon={RefreshCw}>Refresh</MenuItem>
    <MenuSeparator />
    <MenuItem icon={Trash2} variant="destructive">
      Disconnect
    </MenuItem>
  </Menu>
);
