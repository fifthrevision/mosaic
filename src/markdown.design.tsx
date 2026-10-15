import { Example } from "../studio/DesignHelpers";
import { Markdown } from "./markdown";

export const meta = {
  title: "Markdown",
  description:
    "Renders agent text as read-only GitHub-flavored markdown in Mosaic type",
};

export const Elements = () => (
  <div className="grid w-200 grid-cols-2 gap-8">
    <Example label="headings, paragraphs, inline">
      <Markdown
        text={[
          "# Heading 1",
          "## Heading 2",
          "### Heading 3",
          "#### Heading 4",
          "",
          "A paragraph with **bold**, *italics*, ~~strikethrough~~, `inline code`, and a [link](https://example.com).",
          "",
          "---",
          "",
          "A second paragraph after a rule.",
        ].join("\n")}
      />
    </Example>
    <Example label="lists, quote, code">
      <Markdown
        text={[
          "1. Clone the repository",
          "2. Install dependencies",
          "   - `pnpm` if a lockfile exists",
          "   - otherwise `npm`",
          "",
          "- [x] Read the ticket",
          "- [ ] Draft a reply",
          "",
          "> Publishing stays manual until you're happy with the output.",
          "",
          "```bash",
          "pnpm install && pnpm build",
          "```",
        ].join("\n")}
      />
    </Example>
    <Example label="table">
      <Markdown
        text={[
          "| Agent | Runs | Pass rate |",
          "| --- | --- | --- |",
          "| Support Triage | 1,204 | 97% |",
          "| PR Summarizer | 388 | 100% |",
          "| Weekly Digest | 12 | 92% |",
        ].join("\n")}
      />
    </Example>
  </div>
);

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="inline only (one paragraph)">
      <Markdown text="Done. I opened **3 tickets** and tagged `@billing`." />
    </Example>
    <Example label="long code line (scrolls horizontally)">
      <Markdown
        text={[
          "```json",
          '{"agent":"support-triage","run":"run_8f2c41","input":{"ticket":"T-10293","priority":"high","tags":["refund","escalation","vip"]}}',
          "```",
        ].join("\n")}
      />
    </Example>
    <Example label="long unbroken URL">
      <Markdown text="See https://sunnyday.app/agents/support-triage/runs/run_8f2c41/outputs/weekly-summary-final-v2.md for the full output." />
    </Example>
    <Example label="wide table (scrolls horizontally)">
      <Markdown
        text={[
          "| Run | Agent | Trigger | Started | Duration | Tokens | Result |",
          "| --- | --- | --- | --- | --- | --- | --- |",
          "| run_8f2c41 | Support Triage | Webhook | 2026-10-15 09:02 | 41s | 18,204 | Passed |",
        ].join("\n")}
      />
    </Example>
    <Example label="empty string">
      <Markdown text="" />
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent reply in a chat">
      <div className="flex w-120 flex-col gap-3">
        <p className="self-end rounded-lg bg-surface-bubble px-3 py-2 text-body text-label">
          Which tickets need a human today?
        </p>
        <Markdown
          text={[
            "Three tickets need a human:",
            "",
            "1. **T-10293**: refund over $500",
            "2. **T-10301**: refund over $500",
            "3. **T-10317**: mentions legal action",
            "",
            "I drafted replies for the other 14 and left them in `Drafts`.",
          ].join("\n")}
        />
      </div>
    </Example>
    <Example label="run output card">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <h3 className="text-title text-label">Weekly digest</h3>
        <Markdown
          text={[
            "### Highlights",
            "- Ticket volume down **12%** week over week",
            "- Median first reply: `4m 10s`",
            "",
            "> Refund requests spiked on Tuesday after the pricing email.",
          ].join("\n")}
        />
      </div>
    </Example>
  </div>
);
