import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { TruncatedText } from "./truncated-text";

export const meta = {
  title: "TruncatedText",
  description:
    "Clamps content to maxHeight (px) with a bottom fade when it overflows. fadeClassName is a from-* color matching the background.",
};

const INSTRUCTIONS = `You review pull requests for the Sunny Day web app.

Read the diff and the linked issue. Summarize what changed in three bullets or fewer, then list anything that looks risky: migrations, changes to shared components, removed tests, or new dependencies.

Keep the tone neutral. Do not approve or request changes; a person makes that call.

If the diff is larger than 2,000 lines, summarize only the files under src/ and say so at the top.`;

export const Variants = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="overflows maxHeight={96} (fade shows)">
      <div className="rounded-md border border-separator-secondary bg-surface-card p-4">
        <TruncatedText maxHeight={96} fadeClassName="from-surface-card">
          <p className="whitespace-pre-wrap text-body text-label-secondary">
            {INSTRUCTIONS}
          </p>
        </TruncatedText>
      </div>
    </Example>
    <Example label="fits (no clamp, no fade)">
      <div className="rounded-md border border-separator-secondary bg-surface-card p-4">
        <TruncatedText maxHeight={96} fadeClassName="from-surface-card">
          <p className="text-body text-label-secondary">
            Summarize the pull request in three bullets.
          </p>
        </TruncatedText>
      </div>
    </Example>
  </div>
);

function ExpandableInstructions() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col items-start gap-2 rounded-md border border-separator-secondary bg-surface-card p-4">
      <TruncatedText
        maxHeight={expanded ? 10000 : 72}
        fadeClassName="from-surface-card"
      >
        <p className="whitespace-pre-wrap text-body text-label-secondary">
          {INSTRUCTIONS}
        </p>
      </TruncatedText>
      <Button size="sm" variant="subtle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show less" : "Show more"}
      </Button>
    </div>
  );
}

export const Expand = () => (
  <div className="w-120">
    <ExpandableInstructions />
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label='on a subdued region (fadeClassName="from-surface-card-subdued")'>
      <div className="rounded-md bg-surface-card-subdued p-4">
        <TruncatedText maxHeight={72} fadeClassName="from-surface-card-subdued">
          <p className="whitespace-pre-wrap text-body text-label-secondary">
            {INSTRUCTIONS}
          </p>
        </TruncatedText>
      </div>
    </Example>
    <Example label="no fadeClassName (gradient has no color)">
      <div className="rounded-md border border-separator-secondary bg-surface-card p-4">
        <TruncatedText maxHeight={72}>
          <p className="whitespace-pre-wrap text-body text-label-secondary">
            {INSTRUCTIONS}
          </p>
        </TruncatedText>
      </div>
    </Example>
  </div>
);

const AGENTS = [
  {
    name: "PR Summarizer",
    description:
      "Reads each new pull request and posts a short summary with risky changes called out. Runs on every push to an open pull request and skips drafts unless they are marked ready for review.",
  },
  {
    name: "Daily Digest",
    description: "Emails yesterday's runs and failures at 9am.",
  },
];

export const InContext = () => (
  <Example label="agent cards with clamped descriptions">
    <div className="grid w-160 grid-cols-2 gap-4">
      {AGENTS.map((agent) => (
        <div
          key={agent.name}
          className="flex flex-col gap-1 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow"
        >
          <h2 className="text-title text-label">{agent.name}</h2>
          <TruncatedText maxHeight={63} fadeClassName="from-surface-card">
            <p className="text-body text-label-secondary">
              {agent.description}
            </p>
          </TruncatedText>
        </div>
      ))}
    </div>
  </Example>
);
