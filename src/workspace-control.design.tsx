import { WorkspaceControl } from "./workspace-control";

export const meta = {
  title: "Workspace Control",
  description:
    "Workspace switcher button with an initials avatar, workspace name, and dropdown chevron",
};

export const Default = () => <WorkspaceControl name="Workspace Foobar" />;

export const SingleWord = () => <WorkspaceControl name="Acme" />;

export const LongName = () => (
  <WorkspaceControl
    name="Globex Heavy Industries International"
    className="max-w-48"
  />
);
