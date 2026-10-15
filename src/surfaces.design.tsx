import { Section, TokenRow } from "../studio/TokenRow";

export const meta = {
  title: "Surfaces",
  group: "Foundations",
  description: "Surface, control, and state background tokens",
};

function ColorSwatch({ varName }: { varName: string }) {
  return (
    <div className="size-8 rounded" style={{ background: `var(${varName})` }} />
  );
}

export const Surfaces = () => (
  <div className="flex flex-col gap-8">
    <section className="flex flex-col gap-3">
      <h3 className="text-title text-label">Surface hierarchy</h3>
      <div className="rounded-lg bg-surface-canvas p-10">
        <p className="mb-4 text-body text-label-secondary">
          surface-canvas (outermost)
        </p>
        <div className="flex gap-6">
          <div className="w-60 shrink-0 rounded-lg bg-surface-navigation p-6">
            <p className="mb-4 text-body text-label-secondary">
              surface-navigation (sidebar)
            </p>
            <div className="flex flex-col gap-1">
              <div className="rounded-md px-3 py-2 text-body text-label">
                default nav row
              </div>
              <div className="rounded-md bg-state-hover px-3 py-2 text-body text-label">
                state-hover
              </div>
              <div className="rounded-md bg-state-selected px-3 py-2 text-body text-label">
                state-selected
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-lg border border-separator-secondary bg-surface-card p-8">
            <p className="mb-5 text-body text-label-secondary">
              surface-card (card on surface-canvas)
            </p>
            <div className="rounded-md bg-surface-card-subdued p-6">
              <p className="mb-4 text-body text-label-secondary">
                surface-card-subdued (inset)
              </p>
              <div className="flex flex-col gap-1">
                <div className="rounded-md px-3 py-2 text-body text-label">
                  default row
                </div>
                <div className="rounded-md bg-state-active px-3 py-2 text-body text-label">
                  state-active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Section title="Surfaces">
      <TokenRow
        name="Canvas"
        varName="--surface-canvas"
        preview={<ColorSwatch varName="--surface-canvas" />}
      />
      <TokenRow
        name="Navigation (sidebar)"
        varName="--surface-navigation"
        preview={<ColorSwatch varName="--surface-navigation" />}
      />
      <TokenRow
        name="Panel (docked assistant)"
        varName="--surface-panel"
        preview={<ColorSwatch varName="--surface-panel" />}
      />
      <TokenRow
        name="Card"
        varName="--surface-card"
        preview={<ColorSwatch varName="--surface-card" />}
      />
      <TokenRow
        name="Card subdued"
        varName="--surface-card-subdued"
        preview={<ColorSwatch varName="--surface-card-subdued" />}
      />
      <TokenRow
        name="Floating (dialogs, menus)"
        varName="--surface-floating"
        preview={<ColorSwatch varName="--surface-floating" />}
      />
    </Section>

    <Section title="States (light tier)">
      <TokenRow
        name="Hover"
        varName="--state-hover"
        preview={<ColorSwatch varName="--state-hover" />}
      />
      <TokenRow
        name="Selected"
        varName="--state-selected"
        preview={<ColorSwatch varName="--state-selected" />}
      />
      <TokenRow
        name="Active"
        varName="--state-active"
        preview={<ColorSwatch varName="--state-active" />}
      />
    </Section>
  </div>
);

export const Controls = () => (
  <div className="flex flex-col gap-6">
    <Section title="Control surfaces">
      <TokenRow
        name="Control (raised, e.g. buttons)"
        varName="--surface-control"
        preview={<ColorSwatch varName="--surface-control" />}
      />
      <TokenRow
        name="Control sunken (inputs)"
        varName="--surface-control-sunken"
        preview={<ColorSwatch varName="--surface-control-sunken" />}
      />
      <TokenRow
        name="Control deep (switch track)"
        varName="--surface-control-deep"
        preview={<ColorSwatch varName="--surface-control-deep" />}
      />
    </Section>
    <Section title="States (control tier)">
      <TokenRow
        name="Control hover"
        varName="--state-control-hover"
        preview={<ColorSwatch varName="--state-control-hover" />}
      />
    </Section>
  </div>
);
