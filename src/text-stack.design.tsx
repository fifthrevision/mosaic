import { TextStack } from "./text-stack";

export const meta = {
  title: "TextStack",
  group: "Typography",
  order: 2,
  description: "Stacks a heading with its description",
};

export const Default = () => (
  <TextStack className="w-120">
    <h2 className="text-title text-label">Notifications</h2>
    <p className="text-body text-label-secondary">
      Choose what we email you about.
    </p>
  </TextStack>
);

export const PageHeader = () => (
  <TextStack className="w-120">
    <h1 className="text-large-title text-label">Skills</h1>
    <p className="text-body text-label-secondary">
      Reusable instructions agents can load when a task calls for them.
    </p>
    <p className="text-body text-label-secondary">
      Changes apply to the next run.
    </p>
  </TextStack>
);
