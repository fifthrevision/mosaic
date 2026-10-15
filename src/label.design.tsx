import { Input } from "./input";
import { Label } from "./label";

export const meta = {
  title: "Label",
  group: "Typography",
  order: 3,
  description: "Form field label",
};

export const Default = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="label-demo-name">Name</Label>
    <Input id="label-demo-name" placeholder="Docs builder" />
  </div>
);

export const VisuallyHidden = () => (
  <div className="flex w-80 flex-col gap-1.5">
    <Label htmlFor="label-demo-search" visuallyHidden>
      Search
    </Label>
    <Input id="label-demo-search" placeholder="Search agents" />
  </div>
);
