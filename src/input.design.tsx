import { Search } from "lucide-react";
import { Input } from "./input";
import { Textarea } from "./textarea";

export const meta = {
  title: "Input & Textarea",
  description: "Text input controls",
};

export const DefaultInput = () => <Input defaultValue="Active text" />;

export const PlaceholderInput = () => <Input placeholder="Placeholder text" />;

export const InputWithIcon = () => (
  <Input icon={Search} placeholder="Search Agents" />
);

export const DisabledInput = () => (
  <Input placeholder="Disabled" disabled value="Can't touch this" />
);

export const DefaultTextarea = () => (
  <Textarea placeholder="Write something…" rows={3} />
);

export const TextareaWithContent = () => (
  <Textarea
    rows={4}
    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  />
);
