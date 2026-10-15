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
      name="Shape primary (strong neutral, action icons)"
      varName="--shape-primary"
      preview={<IconSwatch varName="--shape-primary" />}
    />
    <TokenRow
      name="Shape secondary (default neutral)"
      varName="--shape-secondary"
      preview={<IconSwatch varName="--shape-secondary" />}
    />
    <TokenRow
      name="Shape tertiary (de-emphasized)"
      varName="--shape-tertiary"
      preview={<IconSwatch varName="--shape-tertiary" />}
    />
    <TokenRow
      name="Shape theme (accent)"
      varName="--shape-theme"
      preview={<IconSwatch varName="--shape-theme" />}
    />
    <TokenRow
      name="Shape warning"
      varName="--shape-warning"
      preview={<IconSwatch varName="--shape-warning" />}
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
