import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Switch } from "./switch";
import { TextStack } from "./text-stack";

export const meta = {
  title: "TextStack",
  group: "Typography",
  order: 2,
  description:
    "Stacks a heading with its description: 4px after the heading, 8px between paragraphs",
};

export const Variants = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="h1 + two paragraphs (page header)">
      <TextStack>
        <h1 className="text-large-title text-label">Skills</h1>
        <p className="text-body text-label-secondary">
          Reusable instructions agents can load when a task calls for them.
        </p>
        <p className="text-body text-label-secondary">
          Changes apply to the next run.
        </p>
      </TextStack>
    </Example>
    <Example label="h2 + paragraph (card title)">
      <TextStack>
        <h2 className="text-title text-label">Notifications</h2>
        <p className="text-body text-label-secondary">
          Choose what we email you about.
        </p>
      </TextStack>
    </Example>
    <Example label="h3 + paragraph (row label)">
      <TextStack>
        <h3 className="text-body font-medium text-label">Run on push</h3>
        <p className="text-body text-label-secondary">
          Start a run whenever the main branch changes.
        </p>
      </TextStack>
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="paragraphs only (8px everywhere)">
      <TextStack>
        <p className="text-body text-label">
          Inputs are filled in at run time.
        </p>
        <p className="text-body text-label-secondary">
          Leave a field empty to use its default.
        </p>
      </TextStack>
    </Example>
    <Example label="heading wrapped in a div (not a direct child: gets 8px)">
      <TextStack>
        <div>
          <h2 className="text-title text-label">Secrets</h2>
        </div>
        <p className="text-body text-label-secondary">
          Values are encrypted and never shown again.
        </p>
      </TextStack>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="card header">
      <div className="flex flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <TextStack>
          <h2 className="text-title text-label">Model</h2>
          <p className="text-body text-label-secondary">
            Used for every run of this agent unless a run overrides it.
          </p>
        </TextStack>
        <div>
          <Button dropdown>Claude Sonnet</Button>
        </div>
      </div>
    </Example>
    <Example label="settings row beside a control">
      <div className="flex items-center justify-between gap-6 rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <TextStack>
          <h3 className="text-body font-medium text-label">Email on failure</h3>
          <p className="text-body text-label-secondary">
            Send a summary when a scheduled run fails.
          </p>
        </TextStack>
        <Switch defaultChecked aria-label="Email on failure" />
      </div>
    </Example>
  </div>
);
