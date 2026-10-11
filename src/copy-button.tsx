import { Check, ClipboardCopy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

const COPIED_DURATION_MS = 2000;

export function CopyButton({
  value,
  copiedLabel = "Copied",
  children,
  onCopy,
  ...buttonProps
}: {
  value: string;
  copiedLabel?: string;
  onCopy?: () => void;
} & Omit<React.ComponentProps<typeof Button>, "icon" | "loading" | "onClick">) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async (event: React.MouseEvent) => {
    // Copy is a self-contained side action; don't trigger ambient
    // clickable parents (e.g., a row that's also a link).
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    onCopy?.();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_DURATION_MS);
  };

  return (
    <Button
      {...buttonProps}
      icon={copied ? Check : ClipboardCopy}
      onClick={handleClick}
    >
      {copied ? copiedLabel : children}
    </Button>
  );
}
