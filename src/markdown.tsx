import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Inline code and fenced code share the `code` renderer; the fenced case is
// reset back to a plain block via the `pre` styles below.
const components: Components = {
  p: ({ children }) => <p className="text-body text-label">{children}</p>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-label underline underline-offset-2 hover:text-label-secondary"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-body text-label">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-1 pl-5 text-body text-label">
      {children}
    </ol>
  ),
  h1: ({ children }) => <h1 className="text-title text-label">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="text-body font-medium text-label">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-body font-medium text-label">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-body font-medium text-label-secondary">{children}</h4>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-surface-card-subdued px-1 py-0.5 font-mono text-caption">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-md bg-surface-card-subdued p-3 text-caption [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="flex flex-col gap-2 border-l-2 border-separator-primary pl-3 text-label-secondary">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-separator-secondary" />,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-body text-label">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="mosaic-th">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="mosaic-td">
      {children}
    </td>
  ),
};

export function Markdown({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
