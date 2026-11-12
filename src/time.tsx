import { useEffect, useState } from "react";

export function formatUtc(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
    date.getUTCDate(),
  )} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(
    date.getUTCSeconds(),
  )} UTC`;
}

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

function formatRelative(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "narrow",
  });
  const diffSeconds = (date.getTime() - Date.now()) / 1000;
  const absDiff = Math.abs(diffSeconds);

  for (const [unit, secondsInUnit] of UNITS) {
    if (absDiff >= secondsInUnit || unit === "second") {
      const value = Math.round(diffSeconds / secondsInUnit);
      return rtf.format(value, unit);
    }
  }
  return rtf.format(0, "second");
}

// setTimeout fires at once for a delay past 2^31 - 1 ms.
const LONGEST_TIMEOUT_MS = 2 ** 31 - 1;

// The relative text changes when the rounded count flips, halfway through a
// unit, or when the age crosses into another unit.
function millisecondsUntilRelativeTextChanges(date: Date): number {
  const ageSeconds = (Date.now() - date.getTime()) / 1000;
  const absAge = Math.abs(ageSeconds);
  const unitIndex = UNITS.findIndex(
    ([unit, secondsInUnit]) => absAge >= secondsInUnit || unit === "second",
  );
  const secondsInUnit = UNITS[unitIndex][1];
  const fraction = (absAge / secondsInUnit) % 1;
  const isGrowing = ageSeconds >= 0;
  const secondsToFlip = isGrowing
    ? (fraction < 0.5 ? 0.5 - fraction : 1.5 - fraction) * secondsInUnit
    : (fraction > 0.5 ? fraction - 0.5 : fraction + 0.5) * secondsInUnit;
  const largerUnit = UNITS[unitIndex - 1];
  const secondsToUnitChange = isGrowing
    ? largerUnit === undefined
      ? Infinity
      : largerUnit[1] - absAge
    : absAge >= secondsInUnit
      ? absAge - secondsInUnit
      : Infinity;
  const seconds = Math.min(secondsToFlip, secondsToUnitChange);
  return Math.min(seconds * 1000 + 50, LONGEST_TIMEOUT_MS);
}

function formatLocal(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const tz =
    new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}${tz ? ` ${tz}` : ""}`;
}

export type TimeFormat = "relative" | "local" | "utc";

export function Time({
  value,
  format = "relative",
  fallback = "—",
}: {
  value: Date | string | null | undefined;
  format?: TimeFormat;
  fallback?: React.ReactNode;
}) {
  const date =
    value == null ? null : typeof value === "string" ? new Date(value) : value;
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null;

  // Initial value must match between SSR and client hydration.
  // - utc: render directly; UTC is identical on both sides
  // - local: render UTC as a fallback, then update to local on mount
  // - relative: render blank, since server "now" != client "now"
  const initial: string | null =
    validDate && (format === "utc" || format === "local")
      ? formatUtc(validDate)
      : null;

  const [text, setText] = useState<string | null>(initial);

  const time = validDate?.getTime();
  useEffect(() => {
    if (time === undefined) return;
    const parsed = new Date(time);
    if (format === "local") setText(formatLocal(parsed));
    if (format !== "relative") return;

    let timeout: ReturnType<typeof setTimeout>;
    const refresh = () => {
      setText(formatRelative(parsed));
      clearTimeout(timeout);
      timeout = setTimeout(
        refresh,
        millisecondsUntilRelativeTextChanges(parsed),
      );
    };
    // Timers are throttled or paused while the page is hidden.
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    refresh();
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [time, format]);

  if (!validDate) return <>{fallback}</>;

  return <time dateTime={validDate.toISOString()}>{text ?? " "}</time>;
}
