import { Button } from "./button";
import { Toaster, toast } from "./toaster";

export const meta = {
  title: "Toaster",
  description:
    "Ephemeral feedback for actions. Built on Sonner, styled to the design system.",
};

export const Variants = () => (
  <>
    <Toaster theme="system" />
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Plain message.")}>Default</Button>
      <Button onClick={() => toast.success("GitHub installation connected.")}>
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Failed to fetch installation details.")}
      >
        Error
      </Button>
    </div>
  </>
);

export const WithDescription = () => (
  <>
    <Toaster theme="system" />
    <Button
      onClick={() =>
        toast.success("Plan submitted.", {
          description: "Revision 3 of 3 saved to this run.",
        })
      }
    >
      Trigger
    </Button>
  </>
);
