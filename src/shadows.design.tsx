export const meta = {
  title: "Shadows",
  group: "Foundations",
  description: "Elevation shadow utilities",
};

export const Shadows = () => (
  <section className="flex flex-col gap-3">
    <h3 className="text-title text-label">Shadows</h3>
    <div className="grid grid-cols-3 gap-6 rounded-lg bg-surface-canvas p-8">
      {[
        { name: "control-shadow", cls: "control-shadow" },
        { name: "overlay-shadow", cls: "overlay-shadow" },
        { name: "dialog-shadow", cls: "dialog-shadow" },
      ].map(({ name, cls }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div
            className={`h-24 w-full rounded-lg border border-separator-secondary bg-surface-card ${cls}`}
          />
          <span className="font-mono text-caption text-label-secondary">
            {name}
          </span>
        </div>
      ))}
    </div>
  </section>
);
