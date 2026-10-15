import { Plus } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { FadingScrollArea } from "./fading-scroll-area";

export const meta = {
  title: "Fading Scroll Area",
  description:
    "Scrollable region with fade-out gradients that appear only while there is more content to scroll. Optional sticky footer anchored at the bottom.",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-56 w-72 overflow-hidden rounded-md border border-separator-secondary bg-surface-card">
      {children}
    </div>
  );
}

function Steps({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      {Array.from({ length: count }, (_, i) => (
        <p key={i} className="text-body text-label">
          Step {i + 1}: read a file from the repository
        </p>
      ))}
    </div>
  );
}

function StatusFooter() {
  return (
    <div className="border-t border-separator-secondary bg-surface-card px-4 py-2 text-subhead text-label-secondary">
      Running · 3.2s
    </div>
  );
}

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(2,max-content)] items-start gap-x-4 gap-y-4">
    <span />
    <ColumnLabel>fits</ColumnLabel>
    <ColumnLabel>overflows</ColumnLabel>
    <ColumnLabel>no footer</ColumnLabel>
    <Frame>
      <FadingScrollArea className="h-full">
        <Steps count={3} />
      </FadingScrollArea>
    </Frame>
    <Frame>
      <FadingScrollArea className="h-full">
        <Steps count={20} />
      </FadingScrollArea>
    </Frame>
    <ColumnLabel>footer</ColumnLabel>
    <Frame>
      <FadingScrollArea className="h-full" footer={<StatusFooter />}>
        <Steps count={3} />
      </FadingScrollArea>
    </Frame>
    <Frame>
      <FadingScrollArea className="h-full" footer={<StatusFooter />}>
        <Steps count={20} />
      </FadingScrollArea>
    </Frame>
  </div>
);

export const PinToBottom = () => {
  const [count, setCount] = useState(8);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button size="sm" icon={Plus} onClick={() => setCount(count + 1)}>
        Add step
      </Button>
      <div className="grid grid-cols-[repeat(2,max-content)] gap-x-4 gap-y-2">
        <ColumnLabel>pinToBottom</ColumnLabel>
        <ColumnLabel>default</ColumnLabel>
        <Frame>
          <FadingScrollArea
            className="h-full"
            pinToBottom
            footer={<StatusFooter />}
          >
            <Steps count={count} />
          </FadingScrollArea>
        </Frame>
        <Frame>
          <FadingScrollArea className="h-full" footer={<StatusFooter />}>
            <Steps count={count} />
          </FadingScrollArea>
        </Frame>
      </div>
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label='fadeClassName="bg-surface-card-subdued" on a subdued region'>
      <div className="h-40 w-72 overflow-hidden rounded-md bg-surface-card-subdued">
        <FadingScrollArea
          className="h-full"
          fadeClassName="bg-surface-card-subdued"
        >
          <Steps count={12} />
        </FadingScrollArea>
      </div>
    </Example>
    <Example label="bounded by max-h-40 instead of a fixed height">
      <div className="w-72 overflow-hidden rounded-md border border-separator-secondary bg-surface-card">
        <FadingScrollArea className="max-h-40">
          <Steps count={12} />
        </FadingScrollArea>
      </div>
    </Example>
    <Example label="fadeClassName mismatched to the background (shows as a band)">
      <div className="h-40 w-72 overflow-hidden rounded-md bg-surface-card-subdued">
        <FadingScrollArea className="h-full">
          <Steps count={12} />
        </FadingScrollArea>
      </div>
    </Example>
  </div>
);

const FILES = [
  "README.md",
  "package.json",
  "src/index.ts",
  "src/agent.ts",
  "src/tools/search.ts",
  "src/tools/fetch.ts",
  "src/prompts/system.md",
  "tests/agent.test.ts",
  "tests/fixtures/run.json",
  "docs/setup.md",
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="run transcript with a sticky status footer">
      <div className="flex h-72 w-96 flex-col overflow-hidden rounded-md border border-separator-secondary bg-surface-card card-shadow">
        <div className="border-b border-separator-secondary px-4 py-3">
          <h2 className="text-title text-label">PR Summarizer · Run 214</h2>
        </div>
        <FadingScrollArea
          className="min-h-0 flex-1"
          pinToBottom
          footer={<StatusFooter />}
        >
          <div className="flex flex-col gap-3 p-4">
            <p className="text-body text-label">
              Reading the diff for pull request #482.
            </p>
            <p className="text-body text-label-secondary">
              Called fetch_diff · 1.1s
            </p>
            <p className="text-body text-label">
              The change moves token definitions into a generated stylesheet and
              updates eight components to use the new surface roles.
            </p>
            <p className="text-body text-label-secondary">
              Called list_files · 0.4s
            </p>
            <p className="text-body text-label">
              Two components still reference the old card color. Drafting the
              summary now.
            </p>
          </div>
        </FadingScrollArea>
      </div>
    </Example>
    <Example label="file list in a card">
      <div className="w-72 rounded-md border border-separator-secondary bg-surface-card card-shadow">
        <h2 className="border-b border-separator-secondary px-4 py-3 text-title text-label">
          Files
        </h2>
        <FadingScrollArea className="max-h-48">
          <ul className="flex flex-col py-1">
            {FILES.map((file) => (
              <li
                key={file}
                className="px-4 py-1.5 font-mono text-subhead text-label"
              >
                {file}
              </li>
            ))}
          </ul>
        </FadingScrollArea>
      </div>
    </Example>
  </div>
);
