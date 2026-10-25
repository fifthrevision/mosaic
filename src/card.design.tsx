import { Example } from "../studio/DesignHelpers";
import { Card } from "./card";

export const meta = {
  title: "Card",
  description:
    "Bordered container for a list, table, or panel in a page's text column. It hangs 8px past the column on each side, so content padded 16px inside lines up 8px in from the text around it.",
};

const MEMBERS: [string, string][] = [
  ["Chong Han Chua", "Admin"],
  ["Ada Lovelace", "Member"],
  ["Grace Hopper", "Member"],
];

export const Variants = () => (
  <div className="flex w-120 flex-col gap-6 px-4">
    <Example label="list rows (px-4)">
      <Card>
        {MEMBERS.map(([name, role]) => (
          <div
            key={name}
            className="flex justify-between border-b border-separator-secondary px-4 py-2 text-body last:border-b-0"
          >
            <span className="font-medium text-label">{name}</span>
            <span className="text-label-secondary">{role}</span>
          </div>
        ))}
      </Card>
    </Example>
    <Example label="panel (p-4)">
      <Card className="flex flex-col gap-1 p-4">
        <span className="text-body font-medium text-label">Schedule</span>
        <span className="text-body text-label-secondary">
          Runs daily at 9am in the workspace's time zone.
        </span>
      </Card>
    </Example>
    <Example label="in a text column">
      <div className="flex flex-col gap-4">
        <p className="text-body text-label-secondary">
          Text around the card sits on the column edge; the card border hangs
          8px outside it.
        </p>
        <Card>
          <div className="px-4 py-2 text-body text-label">
            Content 8px in from the column edge
          </div>
        </Card>
      </div>
    </Example>
  </div>
);
