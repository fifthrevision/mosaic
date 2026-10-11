import { Markdown } from "./markdown";

export const meta = {
  title: "Markdown",
  description: "Renders agent message text as GitHub-flavored markdown",
};

export const Default = () => (
  <Markdown
    text={[
      "## Summary",
      "",
      "The agent reads `{{repo}}` and produces a docs site. Key steps:",
      "",
      "1. Clone the repository",
      "2. Detect the package manager — `pnpm`, `npm`, or `yarn`",
      "3. Build with [Docusaurus](https://docusaurus.io)",
      "",
      "> Publishing stays manual until you're happy with the output.",
      "",
      "```bash",
      "git clone https://github.com/org/repo.git",
      "pnpm install && pnpm build",
      "```",
    ].join("\n")}
  />
);

export const Table = () => (
  <Markdown
    text={[
      "| Model | Tier | Thinking |",
      "| --- | --- | --- |",
      "| GLM 5.2 | Performance | Yes |",
      "| DeepSeek V4 Pro | Balanced | Yes |",
    ].join("\n")}
  />
);

export const InlineOnly = () => (
  <Markdown text="A single paragraph with **bold**, *italics*, and `inline code` — plus a [link](https://example.com)." />
);
