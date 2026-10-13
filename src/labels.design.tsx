import { Section, TokenRow } from "../studio/TokenRow";

export const meta = {
  title: "Labels",
  group: "Foundations",
  description: "Text color tokens",
};

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
