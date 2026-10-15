import { FileText, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { FilePicker, type FilePickerFile } from "./file-picker";
import { Label } from "./label";

export const meta = {
  title: "File Picker",
  description:
    "Click-or-drop zone that lists the files you own as removable chips",
};

const READY_FILES: FilePickerFile[] = [
  { id: "1", filename: "rubric.md", sizeText: "4.1 KB", icon: FileText },
  { id: "2", filename: "diagram.png", sizeText: "1.2 MB", icon: ImageIcon },
];

const MIXED_FILES: FilePickerFile[] = [
  { id: "1", filename: "rubric.md", sizeText: "4.1 KB" },
  { id: "2", filename: "transcript.pdf", state: "loading" },
  { id: "3", filename: "brand-guide.pdf", state: "error" },
];

const ROWS = [
  { label: "empty", files: [], removable: true },
  { label: "files", files: READY_FILES, removable: true },
  { label: "mixed states", files: MIXED_FILES, removable: true },
  { label: "no onRemove", files: READY_FILES, removable: false },
] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_24rem] items-center gap-x-4 gap-y-4">
    {ROWS.map((row) => (
      <div key={row.label} className="contents">
        <ColumnLabel>{row.label}</ColumnLabel>
        <FilePicker
          files={[...row.files]}
          onAddFiles={() => {}}
          onRemove={row.removable ? () => {} : undefined}
        />
      </div>
    ))}
    <ColumnLabel>custom label</ColumnLabel>
    <FilePicker
      files={[]}
      onAddFiles={() => {}}
      label="Attach transcripts"
      dropLabel="Drop transcripts here"
    />
  </div>
);

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const MAX_BYTES = 5 * 1024 * 1024;

export const Upload = () => {
  const [files, setFiles] = useState<FilePickerFile[]>([]);

  function addFiles(added: File[]) {
    const entries = added.map((file) => ({
      id: crypto.randomUUID(),
      filename: file.name,
      sizeText: formatSize(file.size),
      tooLarge: file.size > MAX_BYTES,
    }));
    setFiles((prev) => [
      ...prev,
      ...entries.map(({ id, filename, sizeText }) => ({
        id,
        filename,
        sizeText,
        state: "loading" as const,
      })),
    ]);
    setTimeout(
      () =>
        setFiles((prev) =>
          prev.map((file) => {
            const entry = entries.find((item) => item.id === file.id);
            if (!entry) return file;
            return { ...file, state: entry.tooLarge ? "error" : "ready" };
          }),
        ),
      1200,
    );
  }

  return (
    <div className="flex w-96 flex-col gap-2">
      <ColumnLabel>
        choose or drop files; over 5 MB fails after upload
      </ColumnLabel>
      <FilePicker
        files={files}
        onAddFiles={addFiles}
        onRemove={(id) =>
          setFiles((prev) => prev.filter((file) => file.id !== id))
        }
      />
    </div>
  );
};

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long names">
      <FilePicker
        className="w-96"
        files={[
          {
            id: "1",
            filename: "quarterly_support_ticket_export_with_annotations.csv",
            sizeText: "12 MB",
          },
          {
            id: "2",
            filename: "customer_interview_transcripts_batch_04.pdf",
            sizeText: "5.1 MB",
          },
          { id: "3", filename: "notes.md", sizeText: "95 B" },
        ]}
        onAddFiles={() => {}}
        onRemove={() => {}}
      />
    </Example>
    <Example label="overflow (scrolls past max-h-32, pinned to bottom)">
      <FilePicker
        className="w-96"
        files={Array.from({ length: 24 }, (_, index) => ({
          id: `${index}`,
          filename: `transcript-${index + 1}.pdf`,
          sizeText: "235 KB",
          icon: FileText,
        }))}
        onAddFiles={() => {}}
        onRemove={() => {}}
      />
    </Example>
    <Example label="narrow (w-48)">
      <FilePicker
        className="w-48"
        files={READY_FILES}
        onAddFiles={() => {}}
        onRemove={() => {}}
      />
    </Example>
    <Example label='single image (multiple={false}, accept="image/*")'>
      <FilePicker
        className="w-96"
        files={[]}
        onAddFiles={() => {}}
        multiple={false}
        accept="image/*"
        label="Choose an avatar"
      />
    </Example>
  </div>
);

export const InContext = () => {
  const [knowledge, setKnowledge] = useState<FilePickerFile[]>([
    {
      id: "1",
      filename: "refund-policy.md",
      sizeText: "3.2 KB",
      icon: FileText,
    },
    {
      id: "2",
      filename: "escalation-matrix.pdf",
      sizeText: "220 KB",
      icon: FileText,
    },
  ]);
  return (
    <div className="flex flex-col gap-6">
      <Example label="agent settings field">
        <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
          <h3 className="text-title text-label">Knowledge</h3>
          <div className="flex flex-col gap-2">
            <Label>Reference files</Label>
            <FilePicker
              files={knowledge}
              onAddFiles={() => {}}
              onRemove={(id) =>
                setKnowledge((prev) => prev.filter((file) => file.id !== id))
              }
            />
            <p className="text-body text-label-secondary">
              Support Triage reads these before answering a ticket.
            </p>
          </div>
        </div>
      </Example>
      <Example label="run input">
        <div className="flex w-120 flex-col gap-2 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
          <Label>Transcripts to summarize</Label>
          <FilePicker
            files={[]}
            onAddFiles={() => {}}
            accept=".txt,.pdf,.vtt"
            label="Choose or drop transcripts"
          />
        </div>
      </Example>
    </div>
  );
};
