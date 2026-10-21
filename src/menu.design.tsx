import {
  Archive,
  Bot,
  Columns2,
  Copy,
  Ellipsis,
  FileText,
  History,
  Pencil,
  Play,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import {
  Menu,
  MenuGrid,
  MenuGridItem,
  MenuItem,
  MenuLabel,
  MenuRadioItem,
  MenuSeparator,
  SubMenu,
} from "./menu";

export const meta = {
  title: "Menu",
  description:
    "Dropdown list of actions on a Button or IconButton trigger: items, labels, separators, submenus, radio items, and grids",
};

const ALIGNS = ["start", "center", "end"] as const;

function AgentActions() {
  return (
    <>
      <MenuItem icon={Pencil}>Rename</MenuItem>
      <MenuItem icon={Copy}>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem icon={Trash2} variant="destructive">
        Delete
      </MenuItem>
    </>
  );
}

export const Triggers = () => (
  <div className="grid grid-cols-[6rem_repeat(3,8rem)] items-center gap-y-4">
    <span />
    {ALIGNS.map((align) => (
      <ColumnLabel key={align}>align {align}</ColumnLabel>
    ))}
    <ColumnLabel>button</ColumnLabel>
    {ALIGNS.map((align) => (
      <div key={align}>
        <Menu align={align} trigger={<Button dropdown>Actions</Button>}>
          <AgentActions />
        </Menu>
      </div>
    ))}
    <ColumnLabel>button sm</ColumnLabel>
    {ALIGNS.map((align) => (
      <div key={align}>
        <Menu
          align={align}
          trigger={
            <Button size="sm" variant="subtle" dropdown>
              Actions
            </Button>
          }
        >
          <AgentActions />
        </Menu>
      </div>
    ))}
    <ColumnLabel>icon button</ColumnLabel>
    {ALIGNS.map((align) => (
      <div key={align}>
        <Menu
          align={align}
          trigger={
            <IconButton icon={Ellipsis} variant="subtle" aria-label="More" />
          }
        >
          <AgentActions />
        </Menu>
      </div>
    ))}
  </div>
);

export const Items = () => (
  <div className="grid grid-cols-[repeat(4,max-content)] items-start gap-x-8 gap-y-2">
    <ColumnLabel>items, disabled, destructive</ColumnLabel>
    <ColumnLabel>labels and submenu</ColumnLabel>
    <ColumnLabel>mixed icons (icon-less rows stay flush)</ColumnLabel>
    <ColumnLabel>radio items</ColumnLabel>
    <div>
      <Menu align="start" trigger={<Button dropdown>Agent</Button>}>
        <MenuItem icon={Play}>Run now</MenuItem>
        <MenuItem icon={History} disabled>
          View last run
        </MenuItem>
        <MenuItem icon={Copy}>Copy agent ID</MenuItem>
        <MenuSeparator />
        <MenuItem icon={Trash2} variant="destructive">
          Delete
        </MenuItem>
      </Menu>
    </div>
    <div>
      <Menu align="start" trigger={<Button dropdown>Insert</Button>}>
        <MenuLabel>Inputs</MenuLabel>
        <MenuItem icon={FileText}>repository</MenuItem>
        <MenuItem icon={FileText}>since</MenuItem>
        <MenuSeparator />
        <MenuLabel>Built-in</MenuLabel>
        <SubMenu icon={History} label="Date">
          <MenuItem icon={FileText}>Today</MenuItem>
          <MenuItem icon={FileText}>Date &amp; time</MenuItem>
        </SubMenu>
        <MenuItem icon={Bot}>Agent name</MenuItem>
      </Menu>
    </div>
    <div>
      <Menu align="start" trigger={<Button dropdown>Window</Button>}>
        <MenuItem>Minimize All</MenuItem>
        <MenuItem>Zoom All</MenuItem>
        <MenuSeparator />
        <SubMenu icon={Columns2} label="Move &amp; Resize">
          <MenuItem>Left</MenuItem>
          <MenuItem>Right</MenuItem>
        </SubMenu>
        <MenuSeparator />
        <SubMenu label="Select Split">
          <MenuItem>Split 1</MenuItem>
          <MenuItem>Split 2</MenuItem>
        </SubMenu>
      </Menu>
    </div>
    <ModelMenu />
  </div>
);

const REACTIONS = ["👍", "❤️", "🎉", "👀", "🚀", "😂", "🤔", "👎"];

const WINDOW_COLORS = [
  ["Red", "#e5484d"],
  ["Orange", "#f76b15"],
  ["Yellow", "#ffe629"],
  ["Green", "#30a46c"],
  ["Blue", "#0090ff"],
  ["Purple", "#8e4ec6"],
  ["Pink", "#e93d82"],
  ["Gray", "#8b8d98"],
] as const;

function WindowColorMenu() {
  const [color, setColor] = useState<string>(WINDOW_COLORS[4][0]);
  return (
    <div>
      <Menu align="start" trigger={<Button dropdown>{color}</Button>}>
        <MenuLabel>Window color</MenuLabel>
        <MenuGrid columns={4}>
          {WINDOW_COLORS.map(([name, hex]) => (
            <MenuGridItem
              key={name}
              label={name}
              selected={name === color}
              onSelect={() => setColor(name)}
            >
              <span
                className="size-4 rounded-full"
                style={{ backgroundColor: hex }}
              />
            </MenuGridItem>
          ))}
        </MenuGrid>
        <MenuSeparator />
        <MenuItem icon={Settings}>Window settings</MenuItem>
      </Menu>
    </div>
  );
}

export const Grids = () => (
  <div className="grid grid-cols-[repeat(2,max-content)] items-start gap-x-8 gap-y-2">
    <ColumnLabel>emoji (actions, no selection)</ColumnLabel>
    <ColumnLabel>swatches (selected cell)</ColumnLabel>
    <div>
      <Menu align="start" trigger={<Button dropdown>React</Button>}>
        <MenuGrid columns={4}>
          {REACTIONS.map((emoji) => (
            <MenuGridItem key={emoji} label={emoji}>
              {emoji}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </Menu>
    </div>
    <WindowColorMenu />
  </div>
);

const MODELS = ["Claude Opus", "Claude Sonnet", "Claude Haiku"];

function ModelMenu() {
  const [model, setModel] = useState(MODELS[0]);
  return (
    <div>
      <Menu align="start" trigger={<Button dropdown>{model}</Button>}>
        <MenuLabel>Model</MenuLabel>
        {MODELS.map((option) => (
          <MenuRadioItem
            key={option}
            active={option === model}
            onSelect={() => setModel(option)}
          >
            {option}
          </MenuRadioItem>
        ))}
      </Menu>
    </div>
  );
}

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="long item labels (menu widens, no wrap)">
      <div>
        <Menu align="start" trigger={<Button dropdown>Files</Button>}>
          <MenuItem icon={FileText}>
            quarterly-planning-notes-final-v3-reviewed.md
          </MenuItem>
          <MenuItem icon={FileText}>README.md</MenuItem>
        </Menu>
      </div>
    </Example>
    <Example label="long radio label (truncates)">
      <div>
        <Menu align="start" trigger={<Button dropdown>Branch</Button>}>
          <MenuRadioItem active>main</MenuRadioItem>
          <MenuRadioItem active={false}>
            feature/very-long-branch-name-for-the-new-summarizer-pipeline-rewrite
          </MenuRadioItem>
        </Menu>
      </div>
    </Example>
    <Example label="many items">
      <div>
        <Menu align="start" trigger={<Button dropdown>Runs</Button>}>
          {Array.from({ length: 14 }, (_, index) => (
            <MenuItem key={index} icon={History}>
              Run #{1240 - index}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Example>
  </div>
);

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="agent card overflow menu">
      <div className="flex w-120 items-center justify-between rounded-md border border-separator-secondary bg-surface-card px-4 py-3 card-shadow">
        <span className="text-title text-label">PR Summarizer</span>
        <div className="flex items-center gap-2">
          <Button variant="primary" icon={Play}>
            Run
          </Button>
          <Menu
            trigger={
              <IconButton icon={Ellipsis} variant="subtle" aria-label="More" />
            }
          >
            <MenuItem icon={Settings}>Settings</MenuItem>
            <MenuItem icon={Copy}>Duplicate</MenuItem>
            <MenuItem icon={Archive}>Archive</MenuItem>
            <MenuSeparator />
            <MenuItem icon={Trash2} variant="destructive">
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Example>
    <Example label="run rows (subtle sm trigger per row)">
      <div className="w-120 rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {["Run #1240", "Run #1239", "Run #1238"].map((run) => (
          <div
            key={run}
            className="flex items-center justify-between border-b border-separator-secondary py-1.5 pr-2 pl-4 last:border-b-0"
          >
            <span className="text-body text-label">{run}</span>
            <Menu
              trigger={
                <IconButton
                  icon={Ellipsis}
                  variant="subtle"
                  size="sm"
                  aria-label={`${run} actions`}
                />
              }
            >
              <MenuItem icon={Play}>Run again</MenuItem>
              <MenuItem icon={Copy}>Copy run ID</MenuItem>
              <MenuSeparator />
              <MenuItem icon={Trash2} variant="destructive">
                Delete run
              </MenuItem>
            </Menu>
          </div>
        ))}
      </div>
    </Example>
  </div>
);
