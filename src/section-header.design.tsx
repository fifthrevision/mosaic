import { Ellipsis, Plus } from "lucide-react";
import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "SectionHeader",
  description:
    "Small secondary h3 that labels a group above a list or card, with an optional trailing action",
};

export const Variants = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="title only">
      <SectionHeader title="Recent runs" />
    </Example>
    <Example label="action (subtle Button, sm)">
      <SectionHeader
        title="Inputs"
        action={
          <Button size="sm" variant="subtle" icon={Plus}>
            Add
          </Button>
        }
      />
    </Example>
    <Example label="action (subtle IconButton, sm)">
      <SectionHeader
        title="Files"
        action={
          <IconButton
            icon={Ellipsis}
            variant="subtle"
            size="sm"
            aria-label="More"
          />
        }
      />
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long title in a narrow column (no truncation)">
      <div className="w-56">
        <SectionHeader
          title="Environment variables shared with every agent"
          action={
            <Button size="sm" variant="subtle" icon={Plus}>
              Add
            </Button>
          }
        />
      </div>
    </Example>
  </div>
);

const INPUTS = [
  { name: "repository", type: "Text" },
  { name: "pull_request", type: "Number" },
  { name: "style_guide", type: "File" },
];

export const InContext = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="above a card list">
      <div className="flex flex-col gap-1">
        <SectionHeader
          title="Inputs"
          action={
            <Button size="sm" variant="subtle" icon={Plus}>
              Add
            </Button>
          }
        />
        <div className="rounded-md border border-separator-secondary bg-surface-card card-shadow">
          {INPUTS.map((input) => (
            <div
              key={input.name}
              className="flex items-center justify-between border-b border-separator-secondary px-4 py-3 last:border-b-0"
            >
              <span className="font-mono text-body text-label">
                {input.name}
              </span>
              <span className="text-subhead text-label-secondary">
                {input.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Example>
    <Example label="grouping sidebar items">
      <nav className="flex w-56 flex-col rounded-md bg-surface-shell p-2">
        <SectionHeader title="Agents" />
        {["PR Summarizer", "Daily Digest", "Triage Bot"].map((name) => (
          <a
            key={name}
            href="#"
            className="rounded-md px-2 py-1.5 text-body text-label hover:bg-state-hover focus-visible:control-focus-ring"
          >
            {name}
          </a>
        ))}
      </nav>
    </Example>
  </div>
);
