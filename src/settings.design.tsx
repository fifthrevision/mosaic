import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { Avatar } from "./avatar";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { SegmentedControl } from "./segmented-control";
import { Select } from "./select";
import { SettingsRow, SettingsSection } from "./settings";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

export const meta = {
  title: "Settings",
  description:
    "SettingsSection (title, description, a Card of divided rows, capped at 720px) and SettingsRow (label and description on the left, control or value on the right; stacked for wide fields)",
};

const APPEARANCE_OPTIONS = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

function AppearanceRow() {
  const [appearance, setAppearance] = useState<"system" | "light" | "dark">(
    "system",
  );
  return (
    <SettingsRow label="Appearance">
      <SegmentedControl
        aria-label="Appearance"
        options={APPEARANCE_OPTIONS}
        value={appearance}
        onChange={setAppearance}
      />
    </SettingsRow>
  );
}

function CopyableValue({ value }: { value: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-subhead">{value}</span>
      <IconButton
        icon={Copy}
        size="sm"
        variant="subtle"
        aria-label="Copy"
        confirmation={copied ? { icon: Check, title: "Copied" } : undefined}
        onClick={() => void copy(value)}
      />
    </div>
  );
}

export const Variants = () => (
  <div className="flex w-200 flex-col gap-8 px-4">
    <Example label="control types (fields share a width)">
      <SettingsSection title="Source code">
        <AppearanceRow />
        <SettingsRow label="Syntax theme" htmlFor="settings-syntax">
          <Select id="settings-syntax" defaultValue="github">
            <option value="github">GitHub</option>
            <option value="one-dark">One Dark</option>
            <option value="solarized">Solarized</option>
          </Select>
        </SettingsRow>
        <SettingsRow label="Font" htmlFor="settings-font">
          <Input id="settings-font" placeholder="IBM Plex Mono" />
        </SettingsRow>
        <SettingsRow
          label="Tab width"
          description="Spaces per tab when the file has no editorconfig."
          htmlFor="settings-tab-width"
        >
          <Input id="settings-tab-width" type="number" defaultValue={2} />
        </SettingsRow>
        <SettingsRow label="Wrap long lines" htmlFor="settings-wrap">
          <Switch id="settings-wrap" defaultChecked />
        </SettingsRow>
      </SettingsSection>
    </Example>
    <Example label="switches with descriptions">
      <SettingsSection
        title="Runs"
        description="Applies to every agent in this workspace."
      >
        <SettingsRow
          label="Stream responses"
          description="Show output as the agent writes it."
          htmlFor="settings-stream"
        >
          <Switch id="settings-stream" defaultChecked />
        </SettingsRow>
        <SettingsRow
          label="Require approval for file writes"
          description="Pause the run until someone approves each change."
          htmlFor="settings-approve"
        >
          <Switch id="settings-approve" />
        </SettingsRow>
      </SettingsSection>
    </Example>
    <Example label='layout="stacked" (long-form field)'>
      <SettingsSection title="Instructions">
        <SettingsRow
          label="System prompt"
          description="Sent before every run."
          htmlFor="settings-prompt"
          layout="stacked"
        >
          <Textarea id="settings-prompt" rows={4} />
        </SettingsRow>
      </SettingsSection>
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-200 flex-col gap-8 px-4">
    <Example label="long label and description beside a switch">
      <SettingsSection title="Permissions">
        <SettingsRow
          label="Allow agents to push directly to protected branches without review"
          description="Branch protection rules on the repository still apply. Turn this on only for agents that maintain generated files."
          htmlFor="settings-long"
        >
          <Switch id="settings-long" />
        </SettingsRow>
      </SettingsSection>
    </Example>
    <Example label="width className on a field is overridden (w-full here)">
      <SettingsSection title="Workspace">
        <SettingsRow label="Name" htmlFor="settings-workspace-name">
          <Input
            id="settings-workspace-name"
            className="w-full"
            defaultValue="Sunnyday"
          />
        </SettingsRow>
      </SettingsSection>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex w-200 flex-col gap-8 px-4">
    <Example label="profile page (editable and read-only rows)">
      <div className="flex flex-col gap-6">
        <h1 className="text-large-title text-label">Profile</h1>
        <SettingsSection title="Account">
          <SettingsRow
            label="Profile photo"
            description="PNG, JPEG, or WebP, up to 10MB."
          >
            <Avatar name="Chong Han Chua" size="lg" />
          </SettingsRow>
          <SettingsRow label="Full name" htmlFor="settings-full-name">
            <Input id="settings-full-name" defaultValue="Chong Han Chua" />
          </SettingsRow>
          <SettingsRow label="Email address">chong@example.com</SettingsRow>
          <SettingsRow label="User ID">
            <CopyableValue value="usr_01HZX3K9QW" />
          </SettingsRow>
        </SettingsSection>
      </div>
    </Example>
    <Example label="several sections on a page">
      <div className="flex flex-col gap-8">
        <h1 className="text-large-title text-label">Appearance</h1>
        <SettingsSection title="Theme">
          <AppearanceRow />
        </SettingsSection>
        <SettingsSection
          title="Markdown"
          description="How .md files open and render."
        >
          <SettingsRow label="Open in preview" htmlFor="settings-md-preview">
            <Switch id="settings-md-preview" defaultChecked />
          </SettingsRow>
          <SettingsRow label="Font size" htmlFor="settings-md-size">
            <Input id="settings-md-size" type="number" defaultValue={15} />
          </SettingsRow>
        </SettingsSection>
      </div>
    </Example>
  </div>
);
