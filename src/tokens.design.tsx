import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

export const meta = {
  title: "Tokens",
  description: "Semantic color, surface, and shadow tokens",
};

function useResolvedValue(cssVar: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const read = () =>
      setValue(
        getComputedStyle(document.documentElement)
          .getPropertyValue(cssVar)
          .trim(),
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [cssVar]);

  return value;
}

function TokenRow({
  name,
  preview,
  varName,
}: {
  name: string;
  preview: React.ReactNode;
  varName: string;
}) {
  const value = useResolvedValue(varName);
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-separator-secondary">
        {preview}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-medium text-label">{name}</span>
        <span className="font-mono text-sm text-label-secondary">
          {varName}
        </span>
      </div>
      <span className="font-mono text-sm text-label-secondary">{value}</span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="page-title text-label">{title}</h3>
      <div className="rounded-lg border border-separator-secondary bg-surface-card px-4 py-2">
        {children}
      </div>
    </section>
  );
}

function ColorSwatch({ varName }: { varName: string }) {
  return (
    <div className="size-8 rounded" style={{ background: `var(${varName})` }} />
  );
}

function IconSwatch({ varName }: { varName: string }) {
  return <Circle size={20} style={{ color: `var(${varName})` }} />;
}

function TextSwatch({ varName }: { varName: string }) {
  return (
    <span
      className="text-base font-medium"
      style={{ color: `var(${varName})` }}
    >
      Aa
    </span>
  );
}

export const Surfaces = () => (
  <div className="flex flex-col gap-8">
    <section className="flex flex-col gap-3">
      <h3 className="page-title text-label">Surface hierarchy</h3>
      <div className="rounded-lg bg-surface-canvas p-10">
        <p className="mb-4 text-base text-label-secondary">
          surface-canvas (outermost)
        </p>
        <div className="flex gap-6">
          <div className="w-60 shrink-0 rounded-lg bg-surface-navigation p-6">
            <p className="mb-4 text-base text-label-secondary">
              surface-navigation (sidebar)
            </p>
            <div className="flex flex-col gap-1">
              <div className="rounded-md px-3 py-2 text-base text-label">
                default nav row
              </div>
              <div className="rounded-md bg-state-hover px-3 py-2 text-base text-label">
                state-hover
              </div>
              <div className="rounded-md bg-state-selected px-3 py-2 text-base text-label">
                state-selected
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-lg border border-separator-secondary bg-surface-card p-8">
            <p className="mb-5 text-base text-label-secondary">
              surface-card (card on surface-canvas)
            </p>
            <div className="rounded-md bg-surface-card-subdued p-6">
              <p className="mb-4 text-base text-label-secondary">
                surface-card-subdued (inset)
              </p>
              <div className="flex flex-col gap-1">
                <div className="rounded-md px-3 py-2 text-base text-label">
                  default row
                </div>
                <div className="rounded-md bg-state-active px-3 py-2 text-base text-label">
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

export const Labels = () => (
  <Section title="Labels">
    <TokenRow
      name="Label (primary)"
      varName="--label"
      preview={<TextSwatch varName="--label" />}
    />
    <TokenRow
      name="Label secondary"
      varName="--label-secondary"
      preview={<TextSwatch varName="--label-secondary" />}
    />
    <TokenRow
      name="Label tertiary"
      varName="--label-tertiary"
      preview={<TextSwatch varName="--label-tertiary" />}
    />
  </Section>
);

export const Shapes = () => (
  <Section title="Shapes (icon colors)">
    <TokenRow
      name="Shape primary (accent)"
      varName="--shape-primary"
      preview={<IconSwatch varName="--shape-primary" />}
    />
    <TokenRow
      name="Shape secondary (neutral)"
      varName="--shape-secondary"
      preview={<IconSwatch varName="--shape-secondary" />}
    />
    <TokenRow
      name="Shape destructive"
      varName="--shape-destructive"
      preview={<IconSwatch varName="--shape-destructive" />}
    />
    <TokenRow
      name="Shape constructive"
      varName="--shape-constructive"
      preview={<IconSwatch varName="--shape-constructive" />}
    />
  </Section>
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

export const Separators = () => (
  <Section title="Separators">
    <TokenRow
      name="Separator primary"
      varName="--separator-primary"
      preview={
        <div
          className="size-8  border-y"
          style={{ borderColor: "var(--separator-primary)" }}
        />
      }
    />
    <TokenRow
      name="Separator secondary"
      varName="--separator-secondary"
      preview={
        <div
          className="size-8  border-y"
          style={{ borderColor: "var(--separator-secondary)" }}
        />
      }
    />
  </Section>
);

export const Shadows = () => (
  <section className="flex flex-col gap-3">
    <h3 className="page-title text-label">Shadows</h3>
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
          <span className="font-mono text-sm text-label-secondary">{name}</span>
        </div>
      ))}
    </div>
  </section>
);
