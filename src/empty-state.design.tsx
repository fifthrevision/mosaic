import { EmptyState } from "./empty-state";

export const meta = {
  title: "EmptyState",
  description: "Placeholder for lists and panels with nothing to show",
};

export const Variants = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-subhead text-label-secondary">
          card (default)
        </span>
        <EmptyState>No agents yet. Create one to get started.</EmptyState>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-subhead text-label-secondary">
          plain — for use inside an already-carded container
        </span>
        <div className="rounded-xl border border-separator-secondary bg-surface-card">
          <EmptyState variant="plain">No runs yet.</EmptyState>
        </div>
      </div>
    </div>
  );
};
