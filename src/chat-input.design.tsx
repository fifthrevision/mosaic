import { useState } from "react";
import { ChatInput } from "./chat-input";

export const meta = {
  title: "Chat Input",
  description: "Message composer with textarea and send button",
};

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
    />
  );
};

export const WithDraft = () => {
  const [value, setValue] = useState(
    "Can you summarize the tool output and suggest the next step?",
  );

  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState("Waiting for the current run to finish…");

  return (
    <ChatInput value={value} onChange={setValue} onSubmit={() => {}} disabled />
  );
};

export const Streaming = () => {
  const [value, setValue] = useState("Waiting for the current run to finish…");

  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => {}}
      isStreaming
      onStop={() => {}}
    />
  );
};

export const SteerableStreaming = () => {
  const [value, setValue] = useState("Actually, focus on the README instead.");

  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
      isStreaming
      steerable
      onStop={() => {}}
    />
  );
};

export const CustomPlaceholder = () => {
  const [value, setValue] = useState("");

  return (
    <ChatInput
      value={value}
      onChange={setValue}
      onSubmit={() => setValue("")}
      placeholder="Ask a follow-up question"
    />
  );
};

export const WithAttachments = () => {
  const [value, setValue] = useState("What stands out in these?");
  const [items, setItems] = useState([
    { id: "1", filename: "q3-revenue.csv", state: "ready" as const },
    {
      id: "2",
      filename: "a-rather-long-meeting-notes-filename.md",
      state: "loading" as const,
    },
    { id: "3", filename: "too-big.parquet", state: "error" as const },
  ]);

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
        onAdd: () => {},
        onRemove: (id) =>
          setItems((current) => current.filter((item) => item.id !== id)),
      }}
    />
  );
};
