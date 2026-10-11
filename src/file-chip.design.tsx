import { ImageIcon } from "lucide-react";
import { FileChip } from "./file-chip";

export const meta = {
  title: "File Chip",
  description:
    "Compact file reference with optional download link and hover-to-remove",
};

export const Default = () => <FileChip filename="report.pdf" sizeText="235B" />;

export const Image = () => (
  <FileChip icon={ImageIcon} filename="screenshot.png" sizeText="1.2MB" />
);

export const Removable = () => (
  <FileChip filename="notes.md" sizeText="4.1KB" onRemove={() => {}} />
);

export const AsLink = () => (
  <FileChip filename="export.csv" sizeText="12KB" href="#" />
);

export const LongName = () => (
  <FileChip
    filename="very_long_file_name_that_truncates_eventually.pdf"
    sizeText="235B"
  />
);

export const WithoutSize = () => <FileChip filename="report.pdf" />;

export const Loading = () => (
  <FileChip filename="uploading.pdf" state="loading" />
);

export const Error = () => <FileChip filename="failed.pdf" state="error" />;

export const LoadingRemovable = () => (
  <FileChip filename="uploading.pdf" state="loading" onRemove={() => {}} />
);

export const ErrorRemovable = () => (
  <FileChip filename="failed.pdf" state="error" onRemove={() => {}} />
);
