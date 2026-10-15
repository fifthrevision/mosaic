import { Copy, Play, Save } from "lucide-react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { Toaster, toast } from "./toaster";

export const meta = {
  title: "Toaster",
  description:
    "Transient feedback after an action, built on Sonner. Mount <Toaster> once at the root, then call toast(), toast.success(), or toast.error().",
};

const COLUMNS = ["title", "with description", "long text"] as const;

const LONG_TEXT =
  "The run stopped after 20 steps because it reached this agent's step limit. Raise the limit in settings or split the task into smaller runs.";

export const Variants = () => (
  <>
    <Toaster theme="system" />
    <div className="grid grid-cols-[6rem_repeat(3,9rem)] items-center gap-y-4">
      <span />
      {COLUMNS.map((column) => (
        <ColumnLabel key={column}>{column}</ColumnLabel>
      ))}
      <ColumnLabel>default</ColumnLabel>
      <Button size="sm" onClick={() => toast("Run queued.")}>
        Show
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast("Run queued.", { description: "3 runs ahead of this one." })
        }
      >
        Show
      </Button>
      <Button
        size="sm"
        onClick={() => toast("Run stopped.", { description: LONG_TEXT })}
      >
        Show
      </Button>
      <ColumnLabel>success</ColumnLabel>
      <Button size="sm" onClick={() => toast.success("Agent saved.")}>
        Show
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.success("GitHub connected.", {
            description: "Agents can now read sunnyday/agents.",
          })
        }
      >
        Show
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.success("Plan submitted.", { description: LONG_TEXT })
        }
      >
        Show
      </Button>
      <ColumnLabel>error</ColumnLabel>
      <Button size="sm" onClick={() => toast.error("Run failed.")}>
        Show
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.error("Couldn't upload brand-deck.zip", {
            description: "SKILL.md is missing its frontmatter.",
          })
        }
      >
        Show
      </Button>
      <Button
        size="sm"
        onClick={() => toast.error("Run failed.", { description: LONG_TEXT })}
      >
        Show
      </Button>
    </div>
  </>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <ColumnLabel>
      uses the Toaster mounted in Variants; an app mounts one at its root
    </ColumnLabel>
    <Example label="save settings">
      <div>
        <Button
          variant="primary"
          icon={Save}
          onClick={() => toast.success("Settings saved.")}
        >
          Save
        </Button>
      </div>
    </Example>
    <Example label="start a run">
      <div>
        <Button
          icon={Play}
          onClick={() =>
            toast("Run #1241 started.", {
              description: "You'll get a toast when it finishes.",
            })
          }
        >
          Run
        </Button>
      </div>
    </Example>
    <Example label="copy failed">
      <div>
        <Button
          icon={Copy}
          onClick={() => toast.error("Couldn't copy the run output.")}
        >
          Copy output
        </Button>
      </div>
    </Example>
  </div>
);
