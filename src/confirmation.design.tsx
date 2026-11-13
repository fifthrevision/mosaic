import { Check, Copy, Plug, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import type { Confirmation } from "./confirmation";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { Label } from "./label";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

export const meta = {
  title: "Confirmation",
  group: "Buttons",
  order: 5,
  description:
    "confirmation on Button or IconButton says an invisible action worked (or didn't): a held-open tooltip, plus an icon swap when the button has an icon. The caller owns the timing; useCopyToClipboard supplies it for copy.",
};

const COPIED: Confirmation = { icon: Check, title: "Copied" };

function CopyButton({
  value,
  children = "Copy",
  ...props
}: { value: string } & Omit<
  React.ComponentProps<typeof Button>,
  "confirmation" | "onClick" | "children"
> & { children?: React.ReactNode }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      {...props}
      confirmation={copied ? COPIED : undefined}
      onClick={(event) => {
        event.stopPropagation();
        void copy(value);
      }}
    >
      {children}
    </Button>
  );
}

function CopyIconButton({
  value,
  ...props
}: { value: string } & Omit<
  React.ComponentProps<typeof IconButton>,
  "confirmation" | "onClick" | "icon"
>) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <IconButton
      title="Copy"
      aria-label="Copy"
      {...props}
      icon={Copy}
      confirmation={copied ? COPIED : undefined}
      onClick={(event) => {
        event.stopPropagation();
        void copy(value);
      }}
    />
  );
}

function useTimedConfirmation() {
  const [confirmation, setConfirmation] = useState<Confirmation | undefined>();
  useEffect(() => {
    if (!confirmation) return;
    const timeout = setTimeout(() => setConfirmation(undefined), 2000);
    return () => clearTimeout(timeout);
  }, [confirmation]);
  return [confirmation, setConfirmation] as const;
}

function TestConnectionButton({ succeeds }: { succeeds: boolean }) {
  const [testing, setTesting] = useState(false);
  const [confirmation, setConfirmation] = useTimedConfirmation();
  return (
    <Button
      icon={Plug}
      loading={testing}
      confirmation={confirmation}
      onClick={() => {
        setTesting(true);
        setTimeout(() => {
          setTesting(false);
          setConfirmation(
            succeeds
              ? { icon: Check, title: "Connected" }
              : { icon: X, title: "Couldn't reach the server" },
          );
        }, 800);
      }}
    >
      Test connection
    </Button>
  );
}

function SyncIconButton() {
  const [confirmation, setConfirmation] = useTimedConfirmation();
  return (
    <IconButton
      icon={RefreshCw}
      variant="subtle"
      title="Sync"
      aria-label="Sync"
      confirmation={confirmation}
      onClick={() => setConfirmation({ title: "Up to date" })}
    />
  );
}

function SaveTextButton() {
  const [confirmation, setConfirmation] = useTimedConfirmation();
  return (
    <Button
      variant="primary"
      confirmation={confirmation}
      onClick={() => setConfirmation({ icon: Check, title: "Saved" })}
    >
      Save
    </Button>
  );
}

const VARIANTS = ["default", "primary", "subtle"] as const;

export const Copying = () => (
  <div className="grid grid-cols-[6rem_repeat(4,max-content)] items-center gap-x-4 gap-y-4">
    <span />
    {["Button", "Button sm", "IconButton", "IconButton sm"].map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {VARIANTS.map((variant) => (
      <div key={variant} className="contents">
        <ColumnLabel>{variant}</ColumnLabel>
        <CopyButton value="run_8f2c41" variant={variant} icon={Copy} />
        <CopyButton
          value="run_8f2c41"
          variant={variant}
          size="sm"
          icon={Copy}
        />
        <CopyIconButton value="run_8f2c41" variant={variant} />
        <CopyIconButton value="run_8f2c41" variant={variant} size="sm" />
      </div>
    ))}
  </div>
);

export const OtherActions = () => (
  <div className="flex flex-col gap-6">
    <Example label="success: icon swaps to the confirmation's icon">
      <TestConnectionButton succeeds />
    </Example>
    <Example label="failure: same prop, different icon and text">
      <TestConnectionButton succeeds={false} />
    </Example>
    <Example label="no confirmation icon: the button keeps its own glyph">
      <SyncIconButton />
    </Example>
    <Example label="button without an icon: tooltip only, the label never moves">
      <SaveTextButton />
    </Example>
  </div>
);

export const InContext = () => {
  const [rowClicks, setRowClicks] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <Example label="webhook URL field">
        <div className="flex w-120 flex-col gap-2">
          <Label htmlFor="confirmation-webhook">Trigger URL</Label>
          <div className="flex gap-2">
            <Input
              id="confirmation-webhook"
              readOnly
              value="https://hooks.sunnyday.app/t/support-triage/8f2c41"
            />
            <CopyButton
              value="https://hooks.sunnyday.app/t/support-triage/8f2c41"
              icon={Copy}
            />
          </div>
        </div>
      </Example>
      <Example
        label={`inside a clickable row: row clicked ${rowClicks} times (copy stops propagation)`}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setRowClicks(rowClicks + 1)}
          onKeyDown={(event) => {
            if (event.key === "Enter") setRowClicks(rowClicks + 1);
          }}
          className="flex w-96 cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-state-hover focus-visible:control-focus-ring"
        >
          <span className="font-mono text-subhead text-label">run_8f2c41</span>
          <CopyIconButton value="run_8f2c41" variant="subtle" size="sm" />
        </div>
      </Example>
      <Example label="run metadata">
        <div className="grid w-120 grid-cols-[8rem_1fr_max-content] items-center gap-x-3 gap-y-2 text-body">
          <span className="text-label-secondary">Run ID</span>
          <span className="font-mono text-label">run_8f2c41</span>
          <CopyButton value="run_8f2c41" variant="subtle" size="sm" />
          <span className="text-label-secondary">Agent ID</span>
          <span className="font-mono text-label">agt_support_triage</span>
          <CopyButton value="agt_support_triage" variant="subtle" size="sm" />
        </div>
      </Example>
    </div>
  );
};
