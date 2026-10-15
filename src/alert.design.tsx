import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Alert } from "./alert";
import { Button } from "./button";

export const meta = {
  title: "Alert",
  description:
    "Inline alert for navigation outcomes and persistent page state. Use a toast for in-the-moment action feedback instead.",
};

const VARIANTS = [
  {
    variant: "info",
    message: "Connect repositories so agents can read code.",
  },
  { variant: "success", message: "Agent published." },
  { variant: "error", message: "Run failed: the model timed out." },
] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(2,20rem)] items-center gap-x-4 gap-y-4">
    <span />
    <ColumnLabel>default</ColumnLabel>
    <ColumnLabel>onDismiss</ColumnLabel>
    {VARIANTS.map(({ variant, message }) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <Alert variant={variant}>{message}</Alert>
        <Alert variant={variant} onDismiss={() => {}}>
          {message}
        </Alert>
      </div>
    ))}
  </div>
);

export const Dismiss = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex w-120 flex-col items-start gap-3">
      {open ? (
        <Alert
          variant="success"
          onDismiss={() => setOpen(false)}
          className="w-full"
        >
          GitHub installation updated.
        </Alert>
      ) : (
        <Button size="sm" icon={RefreshCw} onClick={() => setOpen(true)}>
          Show again
        </Button>
      )}
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="long message wraps; icon stays on the first line">
      <Alert variant="error" onDismiss={() => {}}>
        The GitHub app was installed by a different account in this workspace.
        Disconnect it first, or ask the original installer to manage repository
        access for your agents.
      </Alert>
    </Example>
    <Example label="inline emphasis and link">
      <Alert>
        <span className="font-medium">PR Summarizer</span> uses a model that is
        being retired.{" "}
        <a href="#" className="text-label-link">
          Choose a new model
        </a>
      </Alert>
    </Example>
    <Example label="multiple paragraphs">
      <Alert variant="error">
        <p>Run 214 stopped after 3 retries.</p>
        <p className="text-label-secondary">
          Last error: rate limit exceeded on the search tool.
        </p>
      </Alert>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="top of a settings page">
      <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-canvas p-4">
        <h1 className="text-large-title text-label">Integrations</h1>
        <Alert variant="success" onDismiss={() => {}}>
          GitHub connected. Agents can now read 12 repositories.
        </Alert>
        <p className="text-body text-label-secondary">
          Choose which services agents can use during a run.
        </p>
      </div>
    </Example>
    <Example label="failed run, above the transcript">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-title text-label">Run 214</h2>
          <Button size="sm" icon={RefreshCw}>
            Retry
          </Button>
        </div>
        <Alert variant="error">
          The model timed out after 120 seconds. Partial output is shown below.
        </Alert>
      </div>
    </Example>
  </div>
);
