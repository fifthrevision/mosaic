import { Radio } from "./radio";

export const meta = {
  title: "Radio",
  description: "Single-choice control with selected and disabled states",
};

export const Unselected = () => <Radio aria-label="Unselected radio" />;

export const Selected = () => (
  <Radio aria-label="Selected radio" defaultChecked />
);

export const DisabledUnselected = () => (
  <Radio aria-label="Disabled unselected radio" disabled />
);

export const DisabledSelected = () => (
  <Radio aria-label="Disabled selected radio" disabled defaultChecked />
);

export const Group = () => (
  <div role="radiogroup" aria-label="Plan" className="flex flex-col gap-2">
    <label className="inline-flex items-center gap-2 label-header">
      <Radio name="plan" value="free" defaultChecked />
      Free
    </label>
    <label className="inline-flex items-center gap-2 label-header">
      <Radio name="plan" value="pro" />
      Pro
    </label>
    <label className="inline-flex items-center gap-2 label-header">
      <Radio name="plan" value="enterprise" disabled />
      Enterprise
    </label>
  </div>
);
