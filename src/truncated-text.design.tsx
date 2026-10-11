import { TruncatedText } from "./truncated-text";

export const meta = {
  title: "TruncatedText",
  description: "Height-clamped text with a fade when content overflows",
};

const LONG_TEXT = Array.from(
  { length: 12 },
  (_, i) =>
    `Line ${i + 1}: the quick brown fox jumps over the lazy dog and keeps going.`,
).join("\n");

export const Variants = () => {
  return (
    <div className="flex w-120 flex-col gap-6">
      <div className="rounded-lg border border-separator-secondary bg-surface-card p-4">
        <TruncatedText maxHeight={96} fadeClassName="from-surface-card">
          <p className="whitespace-pre-wrap text-base text-label-secondary">
            {LONG_TEXT}
          </p>
        </TruncatedText>
      </div>
      <div className="rounded-lg border border-separator-secondary bg-surface-card p-4">
        <TruncatedText maxHeight={96} fadeClassName="from-surface-card">
          <p className="text-base text-label-secondary">
            Short content is untouched — no fade, no clamp.
          </p>
        </TruncatedText>
      </div>
    </div>
  );
};
