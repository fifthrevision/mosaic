import { Checkbox } from "./checkbox";

export const meta = {
  title: "Checkbox",
  description:
    "Selection control with checked, indeterminate, and disabled states",
};

export const Unchecked = () => <Checkbox aria-label="Unchecked checkbox" />;

export const Checked = () => (
  <Checkbox aria-label="Checked checkbox" defaultChecked />
);

export const Indeterminate = () => (
  <Checkbox
    aria-label="Indeterminate checkbox"
    defaultChecked="indeterminate"
  />
);

export const DisabledUnchecked = () => (
  <Checkbox aria-label="Disabled unchecked checkbox" disabled />
);

export const DisabledChecked = () => (
  <Checkbox aria-label="Disabled checked checkbox" disabled defaultChecked />
);

export const DisabledIndeterminate = () => (
  <Checkbox
    aria-label="Disabled indeterminate checkbox"
    disabled
    defaultChecked="indeterminate"
  />
);

export const WithLabel = () => (
  <label className="inline-flex items-center gap-2 label-header">
    <Checkbox />
    Send me product updates
  </label>
);
