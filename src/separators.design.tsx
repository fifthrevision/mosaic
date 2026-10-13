import { Section, TokenRow } from "../studio/TokenRow";

export const meta = {
  title: "Separators",
  group: "Foundations",
  description: "Border and divider color tokens",
};

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
