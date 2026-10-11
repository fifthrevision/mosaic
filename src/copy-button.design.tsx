import { CopyButton } from "./copy-button";

export const meta = {
  title: "CopyButton",
  description:
    "Copies a string to the clipboard and briefly flips to a confirmation state.",
};

export const Default = () => (
  <CopyButton value="https://example.com/api/v1/invoke/abc123">
    Copy URL
  </CopyButton>
);

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <CopyButton value="default">Copy</CopyButton>
    <CopyButton value="primary" variant="primary">
      Copy
    </CopyButton>
    <CopyButton value="subtle" variant="subtle">
      Copy
    </CopyButton>
  </div>
);

export const CustomLabel = () => (
  <CopyButton value="sk-secret-token" copiedLabel="Copied to clipboard">
    Copy token
  </CopyButton>
);

export const Small = () => (
  <CopyButton value="small" size="sm">
    Copy
  </CopyButton>
);
