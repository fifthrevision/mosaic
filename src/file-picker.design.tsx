import { useState } from "react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { FilePicker, type FilePickerFile } from "./file-picker";

export const meta = {
  title: "File Picker",
  description:
    "Drop-or-browse panel with an inline list of file chips and drag state",
};

export const Empty = () => <FilePicker files={[]} onAddFiles={() => {}} />;

export const WithFiles = () => (
  <FilePicker
    files={[
      { id: "1", filename: "report.pdf", sizeText: "235 B", icon: FileText },
      {
        id: "2",
        filename: "diagram.png",
        sizeText: "1.2 MB",
        icon: ImageIcon,
      },
    ]}
    onAddFiles={() => {}}
    onRemove={() => {}}
  />
);

export const MixedStates = () => (
  <FilePicker
    files={[
      { id: "1", filename: "done.pdf", sizeText: "4.1 KB" },
      { id: "2", filename: "uploading.pdf", state: "loading" },
      { id: "3", filename: "failed.pdf", state: "error" },
    ]}
    onAddFiles={() => {}}
    onRemove={() => {}}
  />
);

export const LongNames = () => (
  <FilePicker
    files={[
      {
        id: "1",
        filename: "expense_account_summary_2026.pdf",
        sizeText: "2.3 KB",
        icon: FileText,
      },
      {
        id: "2",
        filename: "balance_sheet_and_financials_q1.pdf",
        sizeText: "5.1 KB",
        icon: FileText,
      },
      { id: "3", filename: "notes.md", sizeText: "95 B", icon: FileText },
    ]}
    onAddFiles={() => {}}
    onRemove={() => {}}
  />
);

export const Overflow = () => (
  <FilePicker
    files={Array.from({ length: 24 }, (_, i) => ({
      id: `${i}`,
      filename: `document_${i + 1}.pdf`,
      sizeText: "235 B",
      icon: FileText,
    }))}
    onAddFiles={() => {}}
    onRemove={() => {}}
  />
);

export const Interactive = () => {
  const [files, setFiles] = useState<FilePickerFile[]>([]);
  return (
    <FilePicker
      files={files}
      onAddFiles={(added) =>
        setFiles((prev) => [
          ...prev,
          ...added.map((file) => ({
            id: `${file.name}-${file.size}`,
            filename: file.name,
            sizeText: `${file.size} B`,
          })),
        ])
      }
      onRemove={(id) => setFiles((prev) => prev.filter((p) => p.id !== id))}
    />
  );
};
