import { Plus } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Section } from "../studio/TokenRow";
import { Button } from "./button";
import { Card } from "./card";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "Type Scale",
  group: "Typography",
  order: 1,
  description: "Font families, type roles, and weights",
};

const SAMPLE = "The agent reads the repository and produces a docs site";

function useComputedType() {
  const ref = useRef<HTMLSpanElement>(null);
  const [computed, setComputed] = useState("");

  useLayoutEffect(() => {
    if (!ref.current) return;
    const style = getComputedStyle(ref.current);
    setComputed(
      `${style.fontSize} / ${style.lineHeight} · ${style.fontWeight}`,
    );
  }, []);

  return { ref, computed };
}

function SpecimenRow({
  name,
  usage,
  className,
  sample = SAMPLE,
}: {
  name: string;
  usage?: string;
  className: string;
  sample?: string;
}) {
  const { ref, computed } = useComputedType();
  return (
    <div className="flex items-baseline gap-6 border-b border-separator-secondary py-3 last:border-b-0">
      <div className="flex w-48 shrink-0 flex-col">
        <span className="font-mono text-caption text-label">{name}</span>
        <span className="font-mono text-caption text-label-tertiary">
          {computed}
        </span>
        {usage ? (
          <span className="text-caption text-label-secondary">{usage}</span>
        ) : null}
      </div>
      <span ref={ref} className={`min-w-0 flex-1 truncate ${className}`}>
        {sample}
      </span>
    </div>
  );
}

const ROLES = [
  { name: "text-large-title", usage: "Page titles" },
  { name: "text-title", usage: "Card, section, and dialog titles" },
  { name: "text-body", usage: "Default text" },
  { name: "text-subhead", usage: "Dense rows; group labels with medium" },
  {
    name: "text-caption",
    usage: "Component internals only: badges, tooltips, code",
  },
];

export const Roles = () => (
  <Section title="Roles">
    {ROLES.map(({ name, usage }) => (
      <SpecimenRow
        key={name}
        name={name}
        usage={usage}
        className={`${name} text-label`}
      />
    ))}
  </Section>
);

export const Families = () => (
  <Section title="Families">
    <SpecimenRow
      name="font-sans"
      className="font-sans text-title text-label"
      sample="Inter Variable — Aa Bb Cc 0123456789"
    />
    <SpecimenRow
      name="font-mono"
      className="font-mono text-title text-label"
      sample="IBM Plex Mono — Aa Bb Cc 0123456789"
    />
  </Section>
);

export const Weights = () => (
  <Section title="Weights">
    <SpecimenRow
      name="font-regular"
      className="font-regular text-body text-label"
    />
    <SpecimenRow
      name="font-medium"
      className="font-medium text-body text-label"
    />
  </Section>
);

const PARAGRAPH =
  "Agents run on a schedule or when a trigger fires. Each run reads its inputs, follows the instructions in the prompt, and writes artifacts you can review before anything is published. Runs that fail keep their logs so you can see which step went wrong.";

function WrappingSample({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-caption text-label-tertiary">
        {label}
      </span>
      {children}
    </div>
  );
}

export const Wrapping = () => (
  <Section title="Wrapping">
    <div className="grid grid-cols-2 gap-8 py-3">
      <WrappingSample label="text-body · secondary">
        <p className="text-body text-label-secondary">{PARAGRAPH}</p>
      </WrappingSample>
      <WrappingSample label="text-subhead · secondary">
        <p className="text-subhead text-label-secondary">{PARAGRAPH}</p>
      </WrappingSample>
      <WrappingSample label="text-large-title · two lines">
        <h3 className="max-w-64 text-large-title text-label">
          Weekly digest of repository changes
        </h3>
      </WrappingSample>
      <WrappingSample label="text-title · two lines">
        <h3 className="max-w-56 text-title text-label">
          Weekly digest of repository changes
        </h3>
      </WrappingSample>
    </div>
  </Section>
);

function SampleCard({ rows }: { rows: [string, string][] }) {
  return (
    <Card>
      {rows.map(([name, value]) => (
        <div
          key={name}
          className="flex justify-between border-b border-separator-secondary px-4 py-2 text-body last:border-b-0"
        >
          <span className="font-medium text-label">{name}</span>
          <span className="text-label-secondary">{value}</span>
        </div>
      ))}
    </Card>
  );
}

function HierarchySample({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <WrappingSample label={label}>
      <div className="flex flex-col gap-6 rounded-lg border border-separator-secondary p-6">
        {children}
      </div>
    </WrappingSample>
  );
}

export const Hierarchy = () => (
  <Section title="Hierarchy">
    <div className="grid grid-cols-2 gap-8 py-3">
      <HierarchySample label="page title → heading">
        <h1 className="text-large-title text-label">AI</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-title text-label">R5V0 Go</h2>
          <p className="text-body text-label-secondary">
            R5V0 Go runs Readview's AI features for you, with no API key to set
            up. Sign in with GitHub or Google to get a free account.
          </p>
        </div>
        <hr className="border-separator-primary" />
        <div className="flex flex-col gap-2">
          <h2 className="text-title text-label">Model</h2>
          <p className="text-body text-label-secondary">
            The model that writes walkthroughs and commit messages.
          </p>
        </div>
      </HierarchySample>
      <HierarchySample label="page title → SectionHeader → Card">
        <h1 className="text-large-title text-label">Run 28d9620e</h1>
        <div className="flex flex-col gap-1">
          <SectionHeader
            title="Evaluations"
            action={
              <Button variant="subtle" size="sm">
                View all
              </Button>
            }
          />
          <SampleCard
            rows={[
              ["instruction.quality", "0.38"],
              ["plan.adherence", "0.52"],
            ]}
          />
        </div>
        <div className="flex flex-col gap-1">
          <SectionHeader title="Details" />
          <SampleCard
            rows={[
              ["Model", "Claude Sonnet 4.6"],
              ["Duration", "37.5s"],
            ]}
          />
        </div>
      </HierarchySample>
      <div className="col-span-2">
        <HierarchySample label="page title → heading → SectionHeader → Card, subtle button with bleed">
          <h1 className="text-large-title text-label">Workspace</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-title text-label">Members</h2>
              <p className="text-body text-label-secondary">
                Members can run agents and review their output. Admins also
                manage billing and connectors.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <SectionHeader title="Active" />
              <SampleCard
                rows={[
                  ["Chong Han Chua", "Admin"],
                  ["Ada Lovelace", "Member"],
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <SectionHeader title="Pending invites" />
              <SampleCard rows={[["grace@example.com", "Sent 2d ago"]]} />
            </div>
            <div>
              <Button variant="subtle" size="sm" icon={Plus} bleed="start">
                Invite member
              </Button>
            </div>
          </div>
          <hr className="border-separator-primary" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-title text-label">Connectors</h2>
              <p className="text-body text-label-secondary">
                Services every agent in this workspace can reach.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <SectionHeader title="Installed" />
              <SampleCard
                rows={[
                  ["GitHub", "3 repositories"],
                  ["Linear", "1 team"],
                ]}
              />
            </div>
          </div>
        </HierarchySample>
      </div>
    </div>
  </Section>
);
