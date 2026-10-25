import { Plus } from "lucide-react";
import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Card } from "./card";
import { EmptyState } from "./empty-state";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "EmptyState",
  description:
    "Placeholder text for lists and panels with nothing to show. Use plain inside a container that already has a card border.",
};

export const Variants = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="card (default)">
      <EmptyState>No agents yet. Create one to get started.</EmptyState>
    </Example>
    <Example label="plain, inside a card">
      <Card>
        <EmptyState variant="plain">No runs yet.</EmptyState>
      </Card>
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="long text in a narrow card">
      <div className="w-64">
        <EmptyState>
          No files match &ldquo;quarterly-report-final-v3.pdf&rdquo; in this
          agent&rsquo;s inputs.
        </EmptyState>
      </div>
    </Example>
    <Example label='className="min-h-24" overrides the card height'>
      <EmptyState className="min-h-24">No secrets.</EmptyState>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="section with an add action">
      <div className="flex flex-col gap-1">
        <SectionHeader
          title="Inputs"
          action={
            <Button size="sm" variant="subtle" icon={Plus}>
              Add
            </Button>
          }
        />
        <EmptyState>
          This agent takes no inputs. Add one to ask for it at run time.
        </EmptyState>
      </div>
    </Example>
    <Example label="list card with a header row">
      <div className="rounded-md border border-separator-secondary bg-surface-card card-shadow">
        <div className="flex items-center justify-between border-b border-separator-secondary px-4 py-3">
          <h2 className="text-title text-label">Recent runs</h2>
          <Button size="sm" variant="primary">
            Run now
          </Button>
        </div>
        <EmptyState variant="plain">
          No runs yet. Runs show up here as they start.
        </EmptyState>
      </div>
    </Example>
  </div>
);
