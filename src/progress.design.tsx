import { Progress } from "./progress";

export const meta = {
  title: "Progress",
  description: "A fill on a track, for completion or a proportion",
};

export const Values = () => (
  <div className="flex w-80 flex-col gap-4">
    <Progress value={0} aria-label="Not started" />
    <Progress value={0.4} aria-label="Uploading" />
    <Progress value={1} aria-label="Done" />
  </div>
);

export const Inline = () => (
  <div className="flex w-120 items-center gap-3">
    <span className="min-w-0 flex-1 text-body text-label-secondary">
      Clone repository
    </span>
    <Progress value={0.65} aria-hidden className="w-15 shrink-0" />
    <span className="text-subhead text-label-tertiary">4.2s</span>
  </div>
);
