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
  // Initial value must match between SSR and client hydration.
  // - utc: render directly; UTC is identical on both sides
  // - local: render UTC as a fallback, then update to local on mount
  // - relative: render blank, since server "now" != client "now"
  const initial: string | null =
    value == null
      ? null
      : format === "utc" || format === "local"
        ? formatUtc(typeof value === "string" ? new Date(value) : value)
        : null;

  const [text, setText] = useState<string | null>(initial);

  useEffect(() => {
    if (value == null) return;
    const date = typeof value === "string" ? new Date(value) : value;
    if (format === "relative") setText(formatRelative(date));
    else if (format === "local") setText(formatLocal(date));
  }, [value, format]);

  if (value == null) return <>{fallback}</>;

  const iso = typeof value === "string" ? value : value.toISOString();
  return <time dateTime={iso}>{text ?? " "}</time>;
}
