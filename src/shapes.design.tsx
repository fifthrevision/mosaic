import { Circle } from "lucide-react";
import { Section, TokenRow } from "../studio/TokenRow";

export const meta = {
  title: "Shapes",
  group: "Foundations",
  description: "Icon color tokens",
};

function IconSwatch({ varName }: { varName: string }) {
  return <Circle size={20} style={{ color: `var(${varName})` }} />;
}

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
