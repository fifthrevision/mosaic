export const meta = {
  title: "Shadows",
  group: "Foundations",
  description: "Elevation shadow utilities",
};

export const Shadows = () => (
  <section className="flex flex-col gap-3">
    <h3 className="text-title text-label">Shadows</h3>
    <div className="grid grid-cols-3 gap-6 rounded-xl bg-surface-canvas p-8">
      {[
        { name: "control-shadow", cls: "control-shadow" },
        { name: "overlay-shadow", cls: "overlay-shadow" },
        { name: "dialog-shadow", cls: "dialog-shadow" },
      ].map(({ name, cls }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div
            className={`h-24 w-full rounded-xl border border-separator-secondary bg-surface-card ${cls}`}
          />
          <span className="font-mono text-caption text-label-secondary">
            {name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export const InteractiveCard = () => (
  <section className="flex flex-col gap-3">
    <h3 className="text-title text-label">Interactive card</h3>
    <div className="rounded-xl bg-surface-canvas p-8">
      <button
        type="button"
        className="flex w-80 flex-col gap-1 rounded-lg border border-separator-secondary bg-surface-card p-6 text-left card-shadow card-interactive outline-none focus-visible:control-focus-ring"
      >
        <span className="text-title text-label">Hover me</span>
        <span className="text-body text-label-secondary">
          card-shadow + card-interactive
        </span>
      </button>
    </div>
  </section>
);
