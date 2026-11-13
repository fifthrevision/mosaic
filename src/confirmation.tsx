import type { LucideIcon } from "lucide-react";
import { useEffect } from "react";
import { useTooltipAnnouncer } from "./tooltip";

export type Confirmation = { icon?: LucideIcon; title: string };

export function useAnnounceConfirmation(text: string | undefined) {
  const announce = useTooltipAnnouncer();
  useEffect(() => {
    if (!announce || text === undefined) return;
    announce(text);
    // Clearing lets the same text ("Copied" twice) announce again.
    return () => announce("");
  }, [announce, text]);
}
