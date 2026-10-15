import { FadingScrollArea } from "./fading-scroll-area";

export const meta = {
  title: "Fading Scroll Area",
  description:
    "Scrollable region with fade-out gradients that appear only while there is more content to scroll. Optional sticky footer anchored at the bottom.",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-80 w-96 overflow-hidden rounded-lg border border-separator-secondary bg-surface-card">
      {children}
    </div>
  );
}

function ShortContent() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 3 }, (_, i) => (
        <p key={i} className="text-body text-label">
          Turn {i + 1} — short content fits without scrolling.
        </p>
      ))}
    </div>
  );
}

function LongContent() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 30 }, (_, i) => (
        <p key={i} className="text-body text-label">
          Turn {i + 1} — long content forces the scroll viewport to overflow, so
          the fades become visible while in the middle of scrolling.
        </p>
      ))}
    </div>
  );
}

function StatusFooter() {
  return (
    <div className="mt-2 bg-surface-card px-4 pt-3 pb-4">
      <div className="flex h-6 items-center gap-2.5 px-1 text-body text-label-secondary">
        Status · 3.2s
      </div>
    </div>
  );
}

export const Default = () => (
  <Frame>
    <FadingScrollArea className="h-full">
      <ShortContent />
    </FadingScrollArea>
  </Frame>
);

export const Overflowing = () => (
  <Frame>
    <FadingScrollArea className="h-full">
      <LongContent />
    </FadingScrollArea>
  </Frame>
);

export const WithFooter = () => (
  <Frame>
    <FadingScrollArea className="h-full" footer={<StatusFooter />}>
      <ShortContent />
    </FadingScrollArea>
  </Frame>
);

export const WithFooterOverflowing = () => (
  <Frame>
    <FadingScrollArea className="h-full" footer={<StatusFooter />}>
      <LongContent />
    </FadingScrollArea>
  </Frame>
);
