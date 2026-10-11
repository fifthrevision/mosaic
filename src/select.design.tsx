import { Select } from "./select";

export const meta = {
  title: "Select",
  description:
    "Styled native <select>. Matches Input styling with a chevron on the right; uses the system dropdown when opened.",
};

export const Default = () => (
  <Select defaultValue="medium">
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </Select>
);

export const WithPlaceholder = () => (
  <Select defaultValue="">
    <option value="" disabled>
      Choose a size…
    </option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </Select>
);

export const Disabled = () => (
  <Select disabled defaultValue="medium">
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
  </Select>
);
