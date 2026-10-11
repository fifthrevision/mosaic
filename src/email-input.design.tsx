import { useState } from "react";
import { EmailInput } from "./email-input";

export const meta = {
  title: "Email Input",
  description: "Multi-email chips input with per-address validation",
};

export const Empty = () => {
  const [emails, setEmails] = useState<string[]>([]);
  return <EmailInput value={emails} onChange={setEmails} />;
};

export const WithEmails = () => {
  const [emails, setEmails] = useState<string[]>([
    "ada@example.com",
    "grace@example.com",
  ]);
  return <EmailInput value={emails} onChange={setEmails} />;
};

export const WithInvalid = () => {
  const [emails, setEmails] = useState<string[]>([
    "valid@example.com",
    "not-an-email",
  ]);
  return <EmailInput value={emails} onChange={setEmails} />;
};

export const Disabled = () => (
  <EmailInput value={["ada@example.com"]} onChange={() => {}} disabled />
);
