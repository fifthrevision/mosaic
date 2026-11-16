import {
  CalendarRange,
  FileCode,
  Folder,
  History,
  MessageSquareText,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { ChatInput } from "./chat-input";
import { Chip } from "./chip";
import { cn } from "./cn";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { Menu, MenuRadioItem } from "./menu";
import { SegmentedControl } from "./segmented-control";
import { Status } from "./status";

export const meta = {
  title: "Chip",
  description:
    "A state the view is in, like a review copy or an active filter, with an optional × to leave it",
};

const TONES = ["neutral", "warning", "destructive"] as const;

const ROWS = ["label", "icon", "removable", "icon, removable"] as const;

function rowProps(row: (typeof ROWS)[number]) {
  return {
    icon: row.startsWith("icon") ? History : undefined,
    onRemove: row.endsWith("removable") ? () => {} : undefined,
  };
}

export const States = () => (
  <div className="grid grid-cols-[9rem_repeat(3,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    {TONES.map((tone) => (
      <ColumnLabel key={tone}>{tone}</ColumnLabel>
    ))}
    {ROWS.map((row) => (
      <div key={row} className="contents">
        <ColumnLabel>{row}</ColumnLabel>
        {TONES.map((tone) => (
          <Chip key={tone} tone={tone} {...rowProps(row)}>
            Review copy, Nov 13
          </Chip>
        ))}
      </div>
    ))}
  </div>
);

const FILE_BAR_ROWS = [
  { label: "md controls, neutral", controls: "md", tone: "neutral" },
  { label: "md controls, warning", controls: "md", tone: "warning" },
  { label: "sm controls, neutral", controls: "sm", tone: "neutral" },
] as const;

function FileBarRow({
  controls,
  tone,
  onReviewCopy,
  onLeaveReviewCopy,
}: {
  controls: "sm" | "md";
  tone: "neutral" | "warning";
  onReviewCopy: boolean;
  onLeaveReviewCopy: () => void;
}) {
  const [view, setView] = useState<"diff" | "file">("file");
  return (
    <div className="flex w-180 items-center gap-2 rounded-md bg-surface-shell px-3 py-2">
      <span
        className={cn(
          "truncate font-medium text-label",
          controls === "sm" ? "text-subhead" : "text-body",
        )}
      >
        <span className="text-label-secondary">src / review / </span>
        generate.ts
      </span>
      {onReviewCopy && (
        <Chip tone={tone} icon={CalendarRange} onRemove={onLeaveReviewCopy}>
          Review copy, Nov 13
        </Chip>
      )}
      <span className="flex-1" />
      {controls === "md" && (
        <SegmentedControl
          aria-label="View"
          options={[
            { value: "diff", label: "Diff" },
            { value: "file", label: "File" },
          ]}
          value={view}
          onChange={setView}
        />
      )}
      <Button variant="subtle" size={controls}>
        Open in editor
      </Button>
      <IconButton
        icon={MoreHorizontal}
        variant="subtle"
        size={controls}
        aria-label="More"
      />
    </div>
  );
}

export const FileBar = () => {
  const [onReviewCopy, setOnReviewCopy] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      {FILE_BAR_ROWS.map((row) => (
        <Example key={row.label} label={row.label}>
          <FileBarRow
            controls={row.controls}
            tone={row.tone}
            onReviewCopy={onReviewCopy}
            onLeaveReviewCopy={() => setOnReviewCopy(false)}
          />
        </Example>
      ))}
      {!onReviewCopy && (
        <Button
          variant="subtle"
          size="sm"
          className="self-start"
          onClick={() => setOnReviewCopy(true)}
        >
          Back to the review copy
        </Button>
      )}
    </div>
  );
};

const INITIAL_FILTERS = [
  "Status: Open",
  "Author: chong",
  "Label: design-system",
  "Title contains: Revamp branch review generation and require explicit file accounting",
];

const REVIEW_ROWS = [
  "Revamp branch review generation",
  "Require explicit file accounting",
  "Split comparison picker",
];

export const ActiveFilters = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  return (
    <Example label="active filters: remove one, or clear all">
      <div className="flex w-160 flex-col gap-3">
        <Input icon={Search} placeholder="Search reviews" />
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => (
            <Chip
              key={filter}
              onRemove={() =>
                setFilters((current) => current.filter((f) => f !== filter))
              }
            >
              {filter}
            </Chip>
          ))}
          {filters.length > 0 ? (
            <Button variant="subtle" size="sm" onClick={() => setFilters([])}>
              Clear all
            </Button>
          ) : (
            <Button
              variant="subtle"
              size="sm"
              onClick={() => setFilters(INITIAL_FILTERS)}
            >
              Reset filters
            </Button>
          )}
        </div>
        <div className="flex flex-col">
          {REVIEW_ROWS.map((title) => (
            <div
              key={title}
              className="flex h-10 items-center justify-between border-b border-separator-secondary"
            >
              <span className="text-body text-label">{title}</span>
              <Status size="sm">Open</Status>
            </div>
          ))}
        </div>
      </div>
    </Example>
  );
};

export const SearchScope = () => {
  const [scope, setScope] = useState<string | null>("src/review");
  return (
    <Example label="a scope inside a search field: × searches everywhere">
      <div className="flex w-100 flex-col gap-2">
        <div className="mosaic-field flex h-8 items-center gap-1.5 pr-3 pl-1 focus-within:border-separator-input-focus">
          {scope ? (
            <Chip icon={Folder} onRemove={() => setScope(null)}>
              {scope}
            </Chip>
          ) : (
            <Search size={16} className="ml-2 shrink-0 text-shape-secondary" />
          )}
          <input
            aria-label="Search files"
            placeholder={scope ? "Search in folder" : "Search all files"}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-label-tertiary"
          />
        </div>
        {!scope && (
          <Button
            variant="subtle"
            size="sm"
            className="self-start"
            onClick={() => setScope("src/review")}
          >
            Scope to src/review
          </Button>
        )}
      </div>
    </Example>
  );
};

const COMPOSER_ATTACHMENTS = [
  { id: "1", filename: "rubric.md", state: "ready" as const },
  { id: "2", filename: "screenshot.png", state: "ready" as const },
];

export const ComposerScope = () => {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState(COMPOSER_ATTACHMENTS);
  const [scoped, setScoped] = useState(true);
  return (
    <Example label="a scope (Chip) beside files (Attachment) in one composer">
      <div className="w-160">
        <ChatInput
          value={value}
          onChange={setValue}
          onSubmit={() => setValue("")}
          placeholder="Ask about this review"
          attachments={{
            items: attachments,
            onAdd: () => {},
            onRemove: (id) =>
              setAttachments((current) => current.filter((a) => a.id !== id)),
          }}
          leading={
            scoped && (
              <Chip icon={FileCode} onRemove={() => setScoped(false)}>
                Asking about generate.ts
              </Chip>
            )
          }
        />
      </div>
    </Example>
  );
};

const STATUS_OPTIONS = ["Open", "Merged", "Closed"] as const;

function StatusFilterChip({ onRemove }: { onRemove: () => void }) {
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("Open");
  return (
    <Menu
      align="start"
      trigger={<Chip onRemove={onRemove}>Status: {status}</Chip>}
    >
      {STATUS_OPTIONS.map((option) => (
        <MenuRadioItem
          key={option}
          active={option === status}
          onSelect={() => setStatus(option)}
        >
          {option}
        </MenuRadioItem>
      ))}
    </Menu>
  );
}

export const Clickable = () => {
  const [opened, setOpened] = useState<string | null>(null);
  const [onReview, setOnReview] = useState(true);
  const [statusFilter, setStatusFilter] = useState(true);
  return (
    <div className="flex flex-col gap-6">
      <Example label="body opens the review, × leaves it">
        <div className="flex w-180 items-center gap-2 rounded-md bg-surface-shell px-3 py-2">
          <span className="truncate text-body font-medium text-label">
            <span className="text-label-secondary">src / review / </span>
            generate.ts
          </span>
          {onReview && (
            <Chip
              icon={MessageSquareText}
              onClick={() => setOpened("Opened the review tab")}
              onRemove={() => setOnReview(false)}
            >
              Changing models for review generation
            </Chip>
          )}
          <span className="flex-1" />
          <Button variant="subtle">Open in editor</Button>
        </div>
      </Example>
      <Example label="body opens a menu to edit the filter">
        <div className="flex w-160 flex-wrap items-center gap-1.5">
          {statusFilter && (
            <StatusFilterChip onRemove={() => setStatusFilter(false)} />
          )}
          <Chip onClick={() => setOpened("Edit author filter")}>
            Author: chong
          </Chip>
          <Chip tone="warning" icon={History} onClick={() => {}} onRemove={() => {}}>
            Review copy, Nov 13
          </Chip>
          <Chip tone="destructive" onClick={() => {}} onRemove={() => {}}>
            not-an-email
          </Chip>
        </div>
      </Example>
      <div className="flex items-center gap-2 text-subhead text-label-secondary">
        <span>Last action: {opened ?? "none"}</span>
        <Button
          variant="subtle"
          size="sm"
          onClick={() => {
            setOpened(null);
            setOnReview(true);
            setStatusFilter(true);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
