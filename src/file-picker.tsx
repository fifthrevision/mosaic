import type { LucideIcon } from "lucide-react";
import { ArrowUpFromLine } from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "./cn";
import { FadingScrollArea } from "./fading-scroll-area";
import { FileChip } from "./file-chip";

function FileChipItem({
  file,
  onRemove,
}: {
  file: FilePickerFile;
  onRemove?: () => void;
}) {
  return (
    <li className="flex min-w-0">
      <FileChip
        className="max-w-full"
        filename={file.filename}
        sizeText={file.sizeText}
        icon={file.icon}
        state={file.state}
        onRemove={onRemove}
      />
    </li>
  );
}

export interface FilePickerFile {
  id: string;
  filename: string;
  sizeText?: string;
  icon?: LucideIcon;
  state?: "ready" | "loading" | "error";
}

export function FilePicker({
  files,
  onAddFiles,
  onRemove,
  multiple = true,
  accept,
  label = "Choose or drop files",
  dropLabel = "Drop files here",
  className,
}: {
  files: FilePickerFile[];
  onAddFiles: (files: File[]) => void;
  onRemove?: (id: string) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
  dropLabel?: string;
  className?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    if (list && list.length > 0) {
      onAddFiles(Array.from(list));
    }
    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
    const list = event.dataTransfer.files;
    if (list && list.length > 0) {
      onAddFiles(Array.from(list));
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col gap-1 rounded-md border border-separator-secondary bg-surface-control-sunken p-1.5 shadow-[inset_0px_0px_4px_var(--color-shadow-1)] transition-colors hover:border-separator-control-hover",
        files.length === 0 && "h-8 justify-center py-0",
        isDragging &&
          "border-dashed border-separator-control-active hover:border-separator-control-active",
        className,
      )}
    >
      {files.length > 0 && (
        <FadingScrollArea
          className="max-h-32"
          fadeClassName="bg-surface-control-sunken"
          pinToBottom
        >
          <ul className="flex flex-wrap gap-1">
            {files.map((file) => (
              <FileChipItem
                key={file.id}
                file={file}
                onRemove={onRemove ? () => onRemove(file.id) : undefined}
              />
            ))}
          </ul>
        </FadingScrollArea>
      )}
      {isDragging && files.length === 0 ? (
        <div className="flex h-6 items-center justify-center">
          <span className="text-subhead text-label-secondary">{dropLabel}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-6 w-full items-center justify-center gap-1.5 rounded-sm text-subhead font-medium text-label-secondary transition-colors hover:text-label-theme focus-visible:control-focus-ring"
        >
          <ArrowUpFromLine size={12} className="shrink-0" />
          {label}
        </button>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple={multiple}
        accept={accept}
        className="sr-only"
        onChange={handleInputChange}
      />
    </div>
  );
}
