import { FileText, ImageIcon, Plus, Sheet } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { FileChip } from "./file-chip";

export const meta = {
  title: "File Chip",
  description:
    "Compact file reference with upload state, optional download link, and hover-to-remove",
};

const ROWS = ["static", "removable", "link"] as const;

const COLUMNS = ["ready", "no size", "icon", "loading", "error"] as const;

function chipProps(row: (typeof ROWS)[number]) {
  if (row === "removable") return { onRemove: () => {} };
  if (row === "link") return { href: "#" };
  return {};
}

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(5,max-content)] items-center gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {ROWS.map((row) => (
      <div key={row} className="contents">
        <ColumnLabel>{row}</ColumnLabel>
        <FileChip filename="rubric.md" sizeText="4.1 KB" {...chipProps(row)} />
        <FileChip filename="rubric.md" {...chipProps(row)} />
        <FileChip
          icon={ImageIcon}
          filename="diagram.png"
          sizeText="1.2 MB"
          {...chipProps(row)}
        />
        <FileChip
          filename="transcript.pdf"
          sizeText="88 KB"
          state="loading"
          {...chipProps(row)}
        />
        <FileChip
          filename="transcript.pdf"
          sizeText="88 KB"
          state="error"
          {...chipProps(row)}
        />
      </div>
    ))}
  </div>
);

type UploadingFile = {
  id: string;
  filename: string;
  sizeText: string;
  state: "ready" | "loading" | "error";
};

const INITIAL_FILES: UploadingFile[] = [
  { id: "1", filename: "rubric.md", sizeText: "4.1 KB", state: "ready" },
  {
    id: "2",
    filename: "customer-emails.csv",
    sizeText: "220 KB",
    state: "ready",
  },
  { id: "3", filename: "brand-guide.pdf", sizeText: "3.4 MB", state: "error" },
];

export const Remove = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [nextId, setNextId] = useState(4);

  function addFile() {
    const id = String(nextId);
    setNextId(nextId + 1);
    setFiles((prev) => [
      ...prev,
      {
        id,
        filename: `notes-${id}.md`,
        sizeText: "1.8 KB",
        state: "loading",
      },
    ]);
    setTimeout(
      () =>
        setFiles((prev) =>
          prev.map((file) =>
            file.id === id ? { ...file, state: "ready" } : file,
          ),
        ),
      1500,
    );
  }

  return (
    <div className="flex w-120 flex-col gap-3">
      <ColumnLabel>
        hover a chip and click × to remove; added files upload for 1.5s
      </ColumnLabel>
      <div className="flex flex-wrap gap-1">
        {files.map((file) => (
          <FileChip
            key={file.id}
            filename={file.filename}
            sizeText={file.sizeText}
            state={file.state}
            onRemove={() =>
              setFiles((prev) => prev.filter((item) => item.id !== file.id))
            }
          />
        ))}
      </div>
      <div>
        <Button size="sm" icon={Plus} onClick={addFile}>
          Add file
        </Button>
      </div>
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long name (truncates at max-w-59)">
      <FileChip
        filename="quarterly_support_ticket_export_with_agent_annotations.csv"
        sizeText="12 MB"
      />
    </Example>
    <Example label="long name, removable">
      <FileChip
        filename="quarterly_support_ticket_export_with_agent_annotations.csv"
        sizeText="12 MB"
        onRemove={() => {}}
      />
    </Example>
    <Example label='narrow container (className="max-w-full")'>
      <div className="w-32 rounded-md border border-separator-secondary p-1">
        <FileChip
          className="max-w-full"
          filename="evaluation-results.json"
          sizeText="64 KB"
        />
      </div>
    </Example>
    <Example label="loading and error hide sizeText">
      <div className="flex gap-2">
        <FileChip filename="dataset.parquet" sizeText="40 MB" />
        <FileChip filename="dataset.parquet" sizeText="40 MB" state="loading" />
        <FileChip filename="dataset.parquet" sizeText="40 MB" state="error" />
      </div>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="run outputs (links)">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex items-center justify-between">
          <h3 className="text-title text-label">Run #482</h3>
          <span className="text-subhead text-label-secondary">
            3 files · 2m ago
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          <FileChip
            icon={FileText}
            filename="weekly-summary.md"
            sizeText="6.2 KB"
            href="#"
          />
          <FileChip
            icon={Sheet}
            filename="ticket-breakdown.csv"
            sizeText="48 KB"
            href="#"
          />
          <FileChip
            icon={ImageIcon}
            filename="volume-chart.png"
            sizeText="210 KB"
            href="#"
          />
        </div>
      </div>
    </Example>
    <Example label="chat message attachments">
      <div className="flex w-120 flex-col items-end gap-2">
        <div className="flex flex-wrap justify-end gap-1">
          <FileChip
            filename="contract-v3.pdf"
            sizeText="1.1 MB"
            onRemove={() => {}}
          />
          <FileChip
            filename="redlines.docx"
            state="loading"
            onRemove={() => {}}
          />
        </div>
        <p className="rounded-lg bg-surface-bubble px-3 py-2 text-body text-label">
          Compare the indemnity clauses across these two versions.
        </p>
      </div>
    </Example>
    <Example label="agent input row">
      <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <div className="flex flex-col">
          <span className="text-body font-medium text-label">Style guide</span>
          <span className="text-subhead text-label-secondary">
            Attached to every run
          </span>
        </div>
        <FileChip filename="house-style.md" sizeText="9 KB" href="#" />
      </div>
    </Example>
  </div>
);
