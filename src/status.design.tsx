import {
  Bot,
  Check,
  CircleCheck,
  CircleHelp,
  CircleMinus,
  CircleX,
  MoreHorizontal,
  RefreshCw,
  ShieldOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { cn } from "./cn";
import { IconButton } from "./icon-button";
import { Menu, MenuItem, MenuSeparator } from "./menu";
import { Status } from "./status";

export const meta = {
  title: "Status",
  description:
    "The current state of a thing: an indicator and a label. The app maps its states to a tone and indicator.",
};

type Tone = "neutral" | "theme" | "constructive" | "warning" | "destructive";
type Indicator = "dot" | "spinner" | LucideIcon;

const TONES: Tone[] = [
  "neutral",
  "theme",
  "constructive",
  "warning",
  "destructive",
];

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(5,max-content)] items-center gap-x-6 gap-y-4">
    <span />
    {TONES.map((tone) => (
      <ColumnLabel key={tone}>{tone}</ColumnLabel>
    ))}
    {(["md", "sm"] as const).map((size) => (
      <div key={size} className="contents">
        <ColumnLabel>dot, {size}</ColumnLabel>
        {TONES.map((tone) => (
          <Status key={tone} tone={tone} size={size}>
            Label
          </Status>
        ))}
        <ColumnLabel>icon, {size}</ColumnLabel>
        {TONES.map((tone) => (
          <Status key={tone} tone={tone} size={size} indicator={CircleCheck}>
            Label
          </Status>
        ))}
        <ColumnLabel>spinner, {size}</ColumnLabel>
        {TONES.map((tone) => (
          <Status key={tone} tone={tone} size={size} indicator="spinner">
            Label
          </Status>
        ))}
      </div>
    ))}
  </div>
);

export const Padded = () => (
  <div className="flex flex-col gap-4">
    {(["md", "sm"] as const).map((size) => (
      <Example
        key={size}
        label={`padded, ${size}: lines up with a ${size} button`}
      >
        <div className="flex items-center gap-2">
          <Status tone="constructive" indicator={Check} size={size} padded>
            Enabled
          </Status>
          <Button size={size}>Refresh</Button>
          <IconButton icon={MoreHorizontal} size={size} aria-label="More" />
        </div>
      </Example>
    ))}
  </div>
);

type RunStatus = "running" | "completed" | "errored" | "cancelled" | "unknown";

const RUN_STATUSES: RunStatus[] = [
  "running",
  "completed",
  "errored",
  "cancelled",
  "unknown",
];

function runStatusConfig(status: RunStatus): {
  label: string;
  tone: Tone;
  indicator: Indicator;
} {
  switch (status) {
    case "running":
      return { label: "Running", tone: "theme", indicator: "spinner" };
    case "completed":
      return {
        label: "Completed",
        tone: "constructive",
        indicator: CircleCheck,
      };
    case "errored":
      return { label: "Errored", tone: "destructive", indicator: CircleX };
    case "cancelled":
      return { label: "Cancelled", tone: "neutral", indicator: CircleMinus };
    case "unknown":
      return { label: "Unknown", tone: "neutral", indicator: CircleHelp };
  }
}

type ConnectorState =
  | { kind: "unconfigured" }
  | { kind: "not-set-up" }
  | { kind: "enabling" }
  | { kind: "enabled" }
  | { kind: "disabled" };

const CONNECTOR_KINDS: ConnectorState["kind"][] = [
  "unconfigured",
  "not-set-up",
  "enabling",
  "enabled",
  "disabled",
];

function ConnectorHeader({ state }: { state: ConnectorState }) {
  return (
    <div className="flex w-160 items-center justify-between gap-4 rounded-md bg-surface-canvas px-6 py-4">
      <div className="flex flex-col">
        <span className="text-large-title text-label">
          <span className="text-label-secondary">Connectors › </span>
          Google
        </span>
        <span className="text-body text-label-secondary">
          Access Google Workspace files and BigQuery using a service account.
        </span>
      </div>
      <div className="flex items-center gap-2">
        {state.kind === "enabled" ? (
          <Status tone="constructive" indicator={Check} padded>
            Enabled
          </Status>
        ) : state.kind === "disabled" ? (
          <Status tone="destructive" indicator={CircleX} padded>
            Disabled
          </Status>
        ) : (
          <Button
            variant="primary"
            disabled={state.kind === "unconfigured"}
            loading={state.kind === "enabling"}
            title={
              state.kind === "unconfigured"
                ? "Google isn't configured on this server"
                : undefined
            }
          >
            Enable
          </Button>
        )}
        <Menu trigger={<IconButton icon={MoreHorizontal} aria-label="More" />}>
          <MenuItem icon={RefreshCw} onSelect={() => {}}>
            Refresh
          </MenuItem>
          <MenuSeparator />
          <MenuItem icon={ShieldOff} variant="destructive" onSelect={() => {}}>
            Revoke account
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

const REVIEWS: {
  title: string;
  status: { tone: Tone; label: string; detail: string | null } | null;
}[] = [
  {
    title: "Revamp branch review generation",
    status: {
      tone: "warning",
      label: "Outdated",
      detail: "1 commit since · 6 files edited",
    },
  },
  { title: "Require explicit file accounting", status: null },
  {
    title: "Split comparison picker",
    status: { tone: "neutral", label: "Not checked out", detail: null },
  },
  {
    title: "Track generation progress",
    status: {
      tone: "destructive",
      label: "Branch not found",
      detail: null,
    },
  },
];

export const InContext = () => {
  const [connectorKind, setConnectorKind] =
    useState<ConnectorState["kind"]>("enabled");
  const latest = runStatusConfig("completed");
  return (
    <div className="flex flex-col gap-6">
      <Example label="page header, padded beside actions">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {CONNECTOR_KINDS.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setConnectorKind(kind)}
                className={cn(
                  "rounded-sm px-2 text-subhead focus-visible:control-focus-ring",
                  kind === connectorKind
                    ? "bg-state-hover text-label"
                    : "text-label-secondary hover:bg-state-hover",
                )}
              >
                {kind}
              </button>
            ))}
          </div>
          <ConnectorHeader state={{ kind: connectorKind } as ConnectorState} />
        </div>
      </Example>

      <Example label="beside a title">
        <div className="flex items-center gap-3">
          <h1 className="text-large-title text-label">
            <span className="text-label-secondary">All Runs › </span>
            Run 114ef3ad
          </h1>
          <Status tone={latest.tone} indicator={latest.indicator}>
            {latest.label}
          </Status>
          <span className="text-body text-label-secondary">3w ago</span>
        </div>
      </Example>

      <Example label="list rows">
        <ul className="flex w-160 flex-col rounded-md bg-surface-card py-1 card-shadow">
          {RUN_STATUSES.map((runStatus, index) => {
            const config = runStatusConfig(runStatus);
            return (
              <li
                key={runStatus}
                className="flex h-10 items-center gap-4 px-4 text-body"
              >
                <span className="w-32 truncate text-label">
                  Run {(0x114ef3ad + index).toString(16)}
                </span>
                <span className="flex flex-1 items-center gap-4">
                  <Status tone={config.tone} indicator={config.indicator}>
                    {config.label}
                  </Status>
                  <span className="text-label-secondary">1m 12s</span>
                </span>
                <span className="text-label-tertiary">3w ago</span>
              </li>
            );
          })}
        </ul>
      </Example>

      <Example label="card">
        <div className="flex w-96 flex-col gap-2 rounded-md border border-separator-secondary bg-surface-card p-4 card-shadow">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-shape-secondary" />
            <span className="text-title text-label">Release notes agent</span>
          </div>
          <div className="flex items-center gap-2 text-body text-label-secondary">
            <Status tone={latest.tone} indicator={latest.indicator}>
              Run 114ef3ad
            </Status>
            <span>· {latest.label}</span>
            <span>· 1m 12s</span>
          </div>
        </div>
      </Example>

      <Example label="sm, leading a detail line">
        <div className="flex w-80 flex-col gap-1 rounded-md bg-surface-shell p-2">
          {REVIEWS.map((review) => (
            <div
              key={review.title}
              className="flex w-full flex-col gap-0.5 rounded-sm px-2 py-1.5 hover:bg-state-hover"
            >
              <span className="truncate text-body font-medium text-label">
                {review.title}
              </span>
              <span className="truncate text-subhead text-label-secondary">
                review-revamp-oct15 · since merge base with main · Oct 15
              </span>
              {review.status ? (
                <span className="flex min-w-0 items-center gap-1.5 text-subhead text-label-secondary">
                  <Status tone={review.status.tone} size="sm">
                    {review.status.label}
                  </Status>
                  {review.status.detail ? (
                    <span className="min-w-0 truncate">
                      · {review.status.detail}
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Example>
    </div>
  );
};
