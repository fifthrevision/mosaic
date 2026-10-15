import { Time } from "./time";

export const meta = {
  title: "Time",
  description: "Hydration-safe timestamp in relative, local, or UTC format",
};

const SAMPLE = new Date(Date.now() - 1000 * 60 * 60 * 3);

export const Formats = () => {
  return (
    <div className="flex flex-col gap-3 text-body text-label">
      <div className="flex items-center gap-4">
        <span className="w-20 text-label-secondary">relative</span>
        <Time value={SAMPLE} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-label-secondary">local</span>
        <Time value={SAMPLE} format="local" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-label-secondary">utc</span>
        <Time value={SAMPLE} format="utc" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-label-secondary">null</span>
        <Time value={null} />
      </div>
    </div>
  );
};
