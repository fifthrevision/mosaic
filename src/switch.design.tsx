import { Switch } from "./switch";

export const meta = {
  title: "Switch",
  description: "Compact binary control with checked and disabled states",
};

export const Off = () => <Switch aria-label="Off switch" />;

export const On = () => <Switch aria-label="On switch" defaultChecked />;

export const DisabledOff = () => (
  <Switch aria-label="Disabled off switch" disabled />
);

export const DisabledOn = () => (
  <Switch aria-label="Disabled on switch" disabled defaultChecked />
);
