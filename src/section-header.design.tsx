import { Plus } from "lucide-react";
import { Button } from "./button";
import { SectionHeader } from "./section-header";

export const meta = {
  title: "SectionHeader",
  description: "Titled section heading with an optional trailing action",
};

export const Variants = () => {
  return (
    <div className="flex w-120 flex-col gap-6">
      <SectionHeader title="Recent Runs" />
      <SectionHeader
        title="Inputs"
        action={
          <Button size="sm" variant="subtle" icon={Plus}>
            Add
          </Button>
        }
      />
    </div>
  );
};
