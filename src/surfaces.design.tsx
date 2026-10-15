import { Section, TokenRow } from "../studio/TokenRow";

export const meta = {
  title: "Surfaces",
  group: "Foundations",
  description: "Surface, control family, and state tokens",
};

function ColorSwatch({ varName }: { varName: string }) {
  return (
    <div
      className="size-8 rounded-sm"
      style={{ background: `var(${varName})` }}
    />
  );
}

export const Surfaces = () => (
  <div className="flex flex-col gap-8">
    <section className="flex flex-col gap-3">
      <h3 className="text-title text-label">Surface hierarchy</h3>
      <div className="rounded-xl bg-surface-canvas p-10">
        <p className="mb-4 text-body text-label-secondary">
          surface-canvas (outermost)
        </p>
        <div className="flex gap-6">
          <div className="w-60 shrink-0 rounded-xl bg-surface-shell p-6">
            <p className="mb-4 text-body text-label-secondary">
              surface-shell (app frame)
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
          <div className="flex-1 rounded-xl border border-separator-secondary bg-surface-card p-8">
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
        name="Shell (app frame)"
        varName="--surface-shell"
        preview={<ColorSwatch varName="--surface-shell" />}
      />
      <TokenRow
        name="Panel (persistent windows)"
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
        name="Floating (menus; floating-surface adds translucency)"
        varName="--surface-floating"
        preview={<ColorSwatch varName="--surface-floating" />}
      />
      <TokenRow
        name="Elevated (toasts)"
        varName="--surface-elevated"
        preview={<ColorSwatch varName="--surface-elevated" />}
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
    <Section title="Button">
      <TokenRow
        name="Button"
        varName="--surface-button"
        preview={<ColorSwatch varName="--surface-button" />}
      />
      <TokenRow
        name="Button hover (and menu open)"
        varName="--state-button-hover"
        preview={<ColorSwatch varName="--state-button-hover" />}
      />
    </Section>
    <Section title="Input">
      <TokenRow
        name="Input well"
        varName="--surface-input"
        preview={<ColorSwatch varName="--surface-input" />}
      />
      <TokenRow
        name="Input border hover"
        varName="--separator-input-hover"
        preview={<ColorSwatch varName="--separator-input-hover" />}
      />
      <TokenRow
        name="Input border focus"
        varName="--separator-input-focus"
        preview={<ColorSwatch varName="--separator-input-focus" />}
      />
    </Section>
    <Section title="Toggle">
      <TokenRow
        name="Toggle (checkbox, radio, switch track)"
        varName="--surface-toggle"
        preview={<ColorSwatch varName="--surface-toggle" />}
      />
      <TokenRow
        name="Toggle border hover"
        varName="--separator-toggle-hover"
        preview={<ColorSwatch varName="--separator-toggle-hover" />}
      />
      <TokenRow
        name="Toggle selected border"
        varName="--separator-toggle-selected"
        preview={<ColorSwatch varName="--separator-toggle-selected" />}
      />
      <TokenRow
        name="Track (progress; follows toggle)"
        varName="--surface-track"
        preview={<ColorSwatch varName="--surface-track" />}
      />
    </Section>
  </div>
);
