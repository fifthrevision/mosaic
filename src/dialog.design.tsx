import { Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Dialog, DialogClose, type DialogSize } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

export const meta = {
  title: "Dialog",
  description:
    "Controlled modal built from Header, Title, Description, and Actions. No Cancel button: the close button, overlay click, and Escape all dismiss.",
};

const SIZES: DialogSize[] = ["small", "medium", "large"];

const COLUMNS = [
  "default",
  "hidden description",
  "secondary actions",
  "long content",
] as const;

type Column = (typeof COLUMNS)[number];

function SampleDialog({ size, column }: { size: DialogSize; column: Column }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Dialog size={size} open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Rename agent</Dialog.Title>
          <Dialog.Description visuallyHidden={column === "hidden description"}>
            The name shows in the sidebar and in run history.
          </Dialog.Description>
        </Dialog.Header>
        {column === "long content" ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 30 }, (_, index) => (
              <p key={index} className="text-body text-label-secondary">
                Step {index + 1}: read the open pull requests, summarize each
                diff, and post the summary to the review channel.
              </p>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Label htmlFor={`name-${size}-${column}`}>Name</Label>
            <Input id={`name-${size}-${column}`} defaultValue="PR Summarizer" />
          </div>
        )}
        <Dialog.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
          {column === "secondary actions" && (
            <Dialog.Actions.Secondary>
              <Button variant="destructive" icon={Trash2}>
                Delete
              </Button>
            </Dialog.Actions.Secondary>
          )}
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,9rem)] items-center gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {SIZES.map((size) => (
      <div key={size} className="contents">
        <ColumnLabel>{size}</ColumnLabel>
        {COLUMNS.map((column) => (
          <div key={column}>
            <SampleDialog size={size} column={column} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const DEFAULT_NAME = "PR Summarizer";

export const Form = () => {
  const [open, setOpen] = useState(false);
  const [savedName, setSavedName] = useState(DEFAULT_NAME);
  const [draft, setDraft] = useState(DEFAULT_NAME);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body text-label-secondary">
        Agent name: <span className="font-medium text-label">{savedName}</span>
      </p>
      <div>
        <Button onClick={() => setOpen(true)}>Rename</Button>
      </div>
      <ColumnLabel>
        onClosed resets the draft after the close animation
      </ColumnLabel>
      <Dialog
        size="small"
        open={open}
        onOpenChange={setOpen}
        onClosed={() => setDraft(savedName)}
      >
        <Dialog.Header>
          <Dialog.Title>Rename agent</Dialog.Title>
          <Dialog.Description visuallyHidden>
            Change the agent&apos;s display name.
          </Dialog.Description>
        </Dialog.Header>
        <form
          id="rename-agent"
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            setSavedName(draft.trim() || savedName);
            setOpen(false);
          }}
        >
          <Label htmlFor="rename-agent-name">Name</Label>
          <Input
            id="rename-agent-name"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        </form>
        <Dialog.Actions>
          <Button type="submit" form="rename-agent" variant="primary">
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

function AgentSettingsDialog() {
  const [open, setOpen] = useState(false);
  const [scheduled, setScheduled] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Agent settings</Button>
      <Dialog size="large" open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Agent settings</Dialog.Title>
          <Dialog.Description>
            Applies to every future run of PR Summarizer.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="settings-name">Name</Label>
            <Input id="settings-name" defaultValue="PR Summarizer" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="settings-model">Model</Label>
            <Select id="settings-model" defaultValue="opus">
              <option value="opus">Claude Opus</option>
              <option value="sonnet">Claude Sonnet</option>
              <option value="haiku">Claude Haiku</option>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Label htmlFor="settings-instructions">Instructions</Label>
            <Textarea
              id="settings-instructions"
              rows={4}
              defaultValue="Summarize each open pull request in three bullets and flag risky changes."
            />
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <Label htmlFor="settings-schedule">Run every weekday at 9am</Label>
            <Switch
              id="settings-schedule"
              checked={scheduled}
              onCheckedChange={setScheduled}
            />
          </div>
        </div>
        <Dialog.Actions>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
          <Dialog.Actions.Secondary>
            <Button variant="destructive" icon={Trash2}>
              Delete agent
            </Button>
          </Dialog.Actions.Secondary>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

function RunWithInputsDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" icon={Play} onClick={() => setOpen(true)}>
        Run
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.Title>Run PR Summarizer</Dialog.Title>
          <Dialog.Description>
            Fill in the inputs this run needs.
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="run-repo">Repository</Label>
            <Input id="run-repo" defaultValue="sunnyday/agents" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="run-since">Since</Label>
            <Select id="run-since" defaultValue="1d">
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </Select>
          </div>
        </div>
        <Dialog.Actions>
          <DialogClose asChild>
            <Button variant="primary" icon={Play}>
              Start run
            </Button>
          </DialogClose>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="run with inputs (medium, DialogClose on the action)">
      <div>
        <RunWithInputsDialog />
      </div>
    </Example>
    <Example label="settings form (large, destructive secondary action)">
      <div>
        <AgentSettingsDialog />
      </div>
    </Example>
  </div>
);
