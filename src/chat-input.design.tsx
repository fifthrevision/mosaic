import { useRef, useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { ChatInput } from "./chat-input";
import { Menu, MenuRadioItem } from "./menu";

export const meta = {
  title: "Chat Input",
  description:
    "Message composer: auto-growing textarea with send, stop while streaming, attachments, and a leading toolbar slot. Enter sends, Shift+Enter breaks a line.",
};

const noop = () => {};

type Attachment = {
  id: string;
  filename: string;
  state: "ready" | "loading" | "error";
};

const ATTACHMENTS: Attachment[] = [
  { id: "1", filename: "q3-revenue.csv", state: "ready" },
  { id: "2", filename: "meeting-notes.md", state: "loading" },
  { id: "3", filename: "too-big.parquet", state: "error" },
];

export const States = () => (
  <div className="grid grid-cols-[8rem_28rem] items-start gap-x-4 gap-y-4">
    <ColumnLabel>empty</ColumnLabel>
    <ChatInput value="" onChange={noop} onSubmit={noop} />

    <ColumnLabel>draft</ColumnLabel>
    <ChatInput
      value="Summarize the tool output and suggest the next step."
      onChange={noop}
      onSubmit={noop}
    />

    <ColumnLabel>disabled</ColumnLabel>
    <ChatInput
      value="Waiting for the current run to finish…"
      onChange={noop}
      onSubmit={noop}
      disabled
    />

    <ColumnLabel>streaming</ColumnLabel>
    <ChatInput
      value="Actually, focus on the README."
      onChange={noop}
      onSubmit={noop}
      isStreaming
      onStop={noop}
    />

    <ColumnLabel>streaming, steerable</ColumnLabel>
    <ChatInput
      value="Actually, focus on the README."
      onChange={noop}
      onSubmit={noop}
      isStreaming
      steerable
      onStop={noop}
    />

    <ColumnLabel>attachments</ColumnLabel>
    <ChatInput
      value="What stands out in these?"
      onChange={noop}
      onSubmit={noop}
      attachments={{ items: ATTACHMENTS, onAdd: noop, onRemove: noop }}
    />
  </div>
);

type Message = { id: number; text: string };

function Conversation() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const stop = () => {
    clearTimeout(timer.current);
    setStreaming(false);
  };

  return (
    <div className="flex w-120 flex-col gap-3">
      {messages.length > 0 && (
        <ul className="flex flex-col items-end gap-2">
          {messages.map((message) => (
            <li
              key={message.id}
              className="max-w-80 rounded-lg bg-surface-bubble px-3 py-2 text-body text-label"
            >
              {message.text}
            </li>
          ))}
        </ul>
      )}
      {streaming && (
        <p className="text-body shimmer-text">Agent is responding…</p>
      )}
      <ChatInput
        value={value}
        onChange={setValue}
        isStreaming={streaming}
        onStop={stop}
        onSubmit={() => {
          setMessages((current) => [
            ...current,
            { id: current.length, text: value },
          ]);
          setValue("");
          setStreaming(true);
          timer.current = setTimeout(() => setStreaming(false), 3000);
        }}
      />
    </div>
  );
}

function AttachmentsDemo() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Attachment[]>(ATTACHMENTS);
  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => {
        setValue("");
        setItems([]);
      }}
      attachments={{
        items,
        onAdd: (files) =>
          setItems((current) => [
            ...current,
            ...files.map((file) => ({
              id: `${file.name}-${file.lastModified}`,
              filename: file.name,
              state: "ready" as const,
            })),
          ]),
        onRemove: (id) =>
          setItems((current) => current.filter((item) => item.id !== id)),
      }}
    />
  );
}

export const Interactive = () => (
  <div className="flex flex-col gap-6">
    <Example label="send, then stop while streaming">
      <Conversation />
    </Example>
    <Example label="attachments (remove the loading and error files to send)">
      <div className="w-120">
        <AttachmentsDemo />
      </div>
    </Example>
  </div>
);

function GrowingDraft() {
  const [value, setValue] = useState(
    Array.from(
      { length: 14 },
      (_, i) => `${i + 1}. Check the run log for step ${i + 1}.`,
    ).join("\n"),
  );
  return <ChatInput value={value} onChange={setValue} onSubmit={noop} />;
}

export const EdgeCases = () => (
  <div className="flex w-120 flex-col gap-6">
    <Example label="long draft (grows to max-h-60, then scrolls)">
      <GrowingDraft />
    </Example>
    <Example label="custom placeholder">
      <ChatInput
        value=""
        onChange={noop}
        onSubmit={noop}
        placeholder="Ask a follow-up about this run"
      />
    </Example>
    <Example label="narrow (w-64)">
      <div className="w-64">
        <ChatInput
          value=""
          onChange={noop}
          onSubmit={noop}
          attachments={{ items: [], onAdd: noop, onRemove: noop }}
        />
      </div>
    </Example>
  </div>
);

const MODELS = ["Claude Opus", "Claude Sonnet", "Claude Haiku"];

function AgentComposer() {
  const [value, setValue] = useState("");
  const [model, setModel] = useState("Claude Sonnet");
  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
      placeholder="Message PR Summarizer"
      attachments={{ items: [], onAdd: noop, onRemove: noop }}
      leading={
        <Menu
          align="start"
          trigger={
            <Button variant="subtle" size="sm" dropdown>
              {model}
            </Button>
          }
        >
          {MODELS.map((option) => (
            <MenuRadioItem
              key={option}
              active={option === model}
              onSelect={() => setModel(option)}
            >
              {option}
            </MenuRadioItem>
          ))}
        </Menu>
      }
    />
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent chat with a model picker in leading">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <div className="flex flex-col gap-2">
          <p className="self-end rounded-lg bg-surface-bubble px-3 py-2 text-body text-label">
            Summarize last night’s merged PRs.
          </p>
          <p className="text-body text-label">
            Seven PRs merged. Three touch the run scheduler; one changes the
            billing webhook and needs a second review.
          </p>
        </div>
        <AgentComposer />
      </div>
    </Example>
    <Example label="run in progress (stop, no steering)">
      <div className="flex w-120 flex-col gap-3 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
        <p className="text-body shimmer-text">Reading 42 files…</p>
        <ChatInput
          value=""
          onChange={noop}
          onSubmit={noop}
          isStreaming
          onStop={noop}
          placeholder="Wait for the run to finish"
        />
      </div>
    </Example>
  </div>
);
