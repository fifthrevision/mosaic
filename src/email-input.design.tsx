import { Send } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { EmailInput, isValidEmail } from "./email-input";
import { Label } from "./label";

export const meta = {
  title: "Email Input",
  description:
    "Multi-email chips input. Commits on Enter, comma, semicolon, Tab, blur, and paste; invalid addresses stay in the value, shown in red.",
};

const noop = () => {};

const COLUMNS = ["empty", "valid", "invalid", "disabled"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,16rem)] items-start gap-x-4 gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    <ColumnLabel>email input</ColumnLabel>
    <EmailInput value={[]} onChange={noop} />
    <EmailInput value={["ada@sunnyday.dev"]} onChange={noop} />
    <EmailInput value={["ada@sunnyday.dev", "not-an-email"]} onChange={noop} />
    <EmailInput value={["ada@sunnyday.dev"]} onChange={noop} disabled />
  </div>
);

export const Controlled = () => {
  const [emails, setEmails] = useState<string[]>(["grace@sunnyday.dev"]);
  const invalid = emails.filter((email) => !isValidEmail(email));
  return (
    <div className="flex w-96 flex-col gap-2">
      <EmailInput value={emails} onChange={setEmails} />
      <ColumnLabel>
        {emails.length} added · {invalid.length} invalid
      </ColumnLabel>
    </div>
  );
};

export const EdgeCases = () => {
  const [many, setMany] = useState<string[]>([
    "ada@sunnyday.dev",
    "grace@sunnyday.dev",
    "alan@sunnyday.dev",
    "katherine@sunnyday.dev",
    "edsger@sunnyday.dev",
  ]);
  const [long, setLong] = useState<string[]>([
    "release-notifications-for-the-platform-team@sunnyday.dev",
  ]);
  return (
    <div className="flex w-80 flex-col gap-6">
      <Example label="many chips wrap (w-80)">
        <EmailInput value={many} onChange={setMany} />
      </Example>
      <Example label="long address truncates">
        <EmailInput value={long} onChange={setLong} />
      </Example>
      <Example label="custom placeholder">
        <EmailInput
          value={[]}
          onChange={noop}
          placeholder="Paste a list of addresses…"
        />
      </Example>
    </div>
  );
};

function ShareAgent() {
  const [emails, setEmails] = useState<string[]>(["ada@sunnyday.dev"]);
  const hasInvalid = emails.some((email) => !isValidEmail(email));
  return (
    <div className="flex w-120 flex-col gap-4 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
      <h3 className="text-title text-label">Share PR Summarizer</h3>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email-context-share">Invite people</Label>
        <EmailInput
          id="email-context-share"
          value={emails}
          onChange={setEmails}
        />
        {hasInvalid && (
          <p className="text-body text-label-destructive">
            Fix the addresses in red before sending.
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={Send}
          disabled={emails.length === 0 || hasInvalid}
        >
          Send invites
        </Button>
      </div>
    </div>
  );
}

export const InContext = () => {
  const [oncall, setOncall] = useState<string[]>(["oncall@sunnyday.dev"]);
  return (
    <div className="flex flex-col gap-6">
      <Example label="share an agent (add an invalid address)">
        <ShareAgent />
      </Example>
      <Example label="run notifications">
        <div className="flex w-120 flex-col gap-1.5">
          <Label htmlFor="email-context-notify">
            Email me when a run fails
          </Label>
          <EmailInput
            id="email-context-notify"
            value={oncall}
            onChange={setOncall}
          />
        </div>
      </Example>
    </div>
  );
};
