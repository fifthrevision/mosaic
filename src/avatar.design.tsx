import { ColumnLabel, Example } from "../studio/DesignHelpers";
import { Avatar } from "./avatar";

export const meta = {
  title: "Avatar",
  description: "User avatar with an image or an initials fallback",
};

const IMAGE = "https://api.dicebear.com/9.x/thumbs/svg?seed=Aneka";

const SIZES = ["sm", "md", "lg"] as const;

const COLUMNS = ["two names", "one name", "image", "no name"] as const;

export const States = () => (
  <div className="grid grid-cols-[6rem_repeat(4,6rem)] items-center gap-y-4">
    <span />
    {COLUMNS.map((column) => (
      <ColumnLabel key={column}>{column}</ColumnLabel>
    ))}
    {SIZES.map((size) => (
      <div key={size} className="contents">
        <ColumnLabel>{size}</ColumnLabel>
        <Avatar name="Maya Okafor" size={size} />
        <Avatar name="Alice" size={size} />
        <Avatar src={IMAGE} name="Jane Doe" size={size} />
        <Avatar size={size} />
      </div>
    ))}
  </div>
);

export const EdgeCases = () => (
  <div className="flex flex-col gap-6">
    <Example label="three names (first + last initial)">
      <Avatar name="Mary Jane Watson" />
    </Example>
    <Example label="extra whitespace">
      <Avatar name="  ada   lovelace " />
    </Example>
    <Example label="email as name">
      <Avatar name="maya@sunnyday.dev" />
    </Example>
    <Example label="broken image (no initials fallback)">
      <Avatar src="https://example.invalid/missing.png" name="Jane Doe" />
    </Example>
  </div>
);

const MEMBERS = [
  { name: "Maya Okafor", email: "maya@sunnyday.dev", role: "Owner" },
  { name: "Jane Doe", email: "jane@sunnyday.dev", role: "Editor", src: IMAGE },
  { name: "Theo Park", email: "theo@sunnyday.dev", role: "Viewer" },
];

export const InContext = () => (
  <div className="flex flex-col gap-6">
    <Example label="workspace members">
      <div className="w-96 rounded-md border border-separator-secondary bg-surface-card card-shadow">
        {MEMBERS.map((member) => (
          <div
            key={member.email}
            className="flex items-center gap-3 border-b border-separator-secondary px-4 py-3 last:border-b-0"
          >
            <Avatar src={member.src} name={member.name} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-body text-label">{member.name}</span>
              <span className="text-subhead text-label-secondary">
                {member.email}
              </span>
            </div>
            <span className="text-subhead text-label-secondary">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </Example>
    <Example label="run attribution (sm)">
      <div className="flex items-center gap-2 text-subhead text-label-secondary">
        <Avatar name="Maya Okafor" size="sm" />
        <span>
          <span className="text-label">Maya Okafor</span> started this run
        </span>
      </div>
    </Example>
    <Example label="profile header (lg)">
      <div className="flex items-center gap-4">
        <Avatar src={IMAGE} name="Jane Doe" size="lg" />
        <div className="flex flex-col">
          <h2 className="text-title text-label">Jane Doe</h2>
          <p className="text-body text-label-secondary">Editor · 14 agents</p>
        </div>
      </div>
    </Example>
  </div>
);
