import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { ConfirmProvider, useAlert, useConfirm } from "./confirm-dialog";

export const meta = {
  title: "Confirm Dialog",
  description:
    "Imperative dialogs from one provider: useConfirm() asks and returns a Promise<boolean>, useAlert() states and returns a Promise<void>",
};

function DefaultDemoInner() {
  const confirm = useConfirm();
  return (
    <Button
      onClick={async () => {
        const ok = await confirm({
          title: "Save changes?",
          description: "Your edits will be applied immediately.",
          confirm: { label: "Save" },
        });
        console.log("confirmed:", ok);
      }}
    >
      Open confirm
    </Button>
  );
}

function DestructiveDemoInner() {
  const confirm = useConfirm();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const ok = await confirm({
          title: "Delete this agent?",
          description: "This action cannot be undone.",
          confirm: { label: "Delete", icon: Trash2 },
          destructive: true,
        });
        console.log("confirmed:", ok);
      }}
    >
      Delete agent
    </Button>
  );
}

function AlertDemoInner() {
  const alert = useAlert();
  return (
    <Button
      onClick={() =>
        alert({
          title: "Couldn't upload brand-deck.zip",
          description:
            "SKILL.md must start with a YAML frontmatter block delimited by ---.",
        })
      }
    >
      Open alert
    </Button>
  );
}

function AlertListDemoInner() {
  const alert = useAlert();
  return (
    <Button
      onClick={() =>
        alert({
          title: "3 uploads failed",
          description: [
            "brand-deck.zip — SKILL.md must start with a YAML frontmatter block delimited by ---.",
            "notes.zip — This archive contains 2 SKILL.md files; a skill bundle must contain exactly one.",
            "dump.csv — File exceeds max size for text (5242880 bytes)",
          ].join("\n\n"),
        })
      }
    >
      Open alert (batch)
    </Button>
  );
}

export const Default = () => (
  <ConfirmProvider>
    <DefaultDemoInner />
  </ConfirmProvider>
);

export const Alert = () => (
  <ConfirmProvider>
    <AlertDemoInner />
  </ConfirmProvider>
);

export const AlertList = () => (
  <ConfirmProvider>
    <AlertListDemoInner />
  </ConfirmProvider>
);

export const Destructive = () => (
  <ConfirmProvider>
    <DestructiveDemoInner />
  </ConfirmProvider>
);
