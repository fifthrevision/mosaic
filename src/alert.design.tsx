import { useState } from "react";
import { Alert } from "./alert";

export const meta = {
  title: "Alert",
  description:
    "Inline alert for navigation outcomes and persistent page state. Use a toast for in-the-moment action feedback instead.",
};

export const Success = () => <Alert variant="success">Plan submitted.</Alert>;

export const Error = () => (
  <Alert variant="error">
    Failed to fetch installation details from GitHub. Try Refresh.
  </Alert>
);

export const Info = () => (
  <Alert>Connect repositories so agents can read code on your behalf.</Alert>
);

export const Dismissible = () => {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-base text-label-secondary underline"
      >
        Show alert again
      </button>
    );
  }
  return (
    <Alert variant="success" onDismiss={() => setOpen(false)}>
      GitHub installation updated.
    </Alert>
  );
};

export const LongContent = () => (
  <Alert variant="error">
    The install was started by a different account in this workspace. Disconnect
    first or have the original installer manage it.
  </Alert>
);
