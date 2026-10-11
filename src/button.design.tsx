import { Plus } from "lucide-react";
import { Button } from "./button";

export const meta = {
  title: "Button",
  description: "Action button with size and variant options",
};

function VariantMatrix({
  variant,
}: {
  variant: "default" | "primary" | "destructive";
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button variant={variant}>Button</Button>
        <Button variant={variant} icon={Plus}>
          Button
        </Button>
        <Button variant={variant} disabled>
          Button
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={variant} size="sm">
          Button
        </Button>
        <Button variant={variant} size="sm" icon={Plus}>
          Button
        </Button>
        <Button variant={variant} size="sm" disabled>
          Button
        </Button>
      </div>
    </div>
  );
}

export const Primary = () => <VariantMatrix variant="primary" />;

export const Default = () => <VariantMatrix variant="default" />;

export const Destructive = () => <VariantMatrix variant="destructive" />;

export const Subtle = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Button variant="subtle">Subtle</Button>
      <Button variant="subtle" icon={Plus}>
        Subtle
      </Button>
      <Button variant="subtle" disabled>
        Subtle
      </Button>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="subtle" size="sm">
        Subtle
      </Button>
      <Button variant="subtle" size="sm" icon={Plus}>
        Subtle
      </Button>
      <Button variant="subtle" size="sm" disabled>
        Subtle
      </Button>
    </div>
  </div>
);

export const FixedWidth = () => (
  <Button icon={Plus} className="w-50">
    Fixed width
  </Button>
);

export const Dropdown = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Button dropdown>Default</Button>
      <Button variant="primary" dropdown>
        Primary
      </Button>
      <Button variant="subtle" dropdown>
        Subtle
      </Button>
      <Button variant="destructive" dropdown>
        Destructive
      </Button>
    </div>
    <div className="flex items-center gap-3">
      <Button size="sm" dropdown>
        Default
      </Button>
      <Button size="sm" icon={Plus} dropdown>
        With icon
      </Button>
      <Button size="sm" disabled dropdown>
        Disabled
      </Button>
    </div>
  </div>
);

export const LongLabel = () => (
  <Button size="sm">
    This is an extremely long button label that might cause layout issues
  </Button>
);

export const Loading = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Button loading>Saving…</Button>
      <Button loading variant="primary">
        Saving…
      </Button>
      <Button loading variant="destructive">
        Deleting…
      </Button>
      <Button loading icon={Plus}>
        Saving…
      </Button>
    </div>
    <div className="flex items-center gap-3">
      <Button loading size="sm">
        Saving…
      </Button>
      <Button loading size="sm" variant="primary">
        Saving…
      </Button>
    </div>
  </div>
);
