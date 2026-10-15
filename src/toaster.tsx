import { Toaster as SonnerToaster } from "sonner";
import type { Theme } from "./theme";

export function Toaster({ theme = "system" }: { theme?: Theme }) {
  return (
    <SonnerToaster
      theme={theme === "black" ? "dark" : theme}
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-md! border! border-separator-secondary! bg-surface-card! shadow-[0px_4px_12px_var(--color-shadow-1)]! text-label!",
          title: "text-body! font-medium! text-label!",
          description: "text-body! text-label-secondary!",
          closeButton:
            "border-separator-secondary! bg-surface-card! text-label!",
          success: "[&_[data-icon]]:text-shape-primary!",
          error: "[&_[data-icon]]:text-shape-destructive!",
        },
      }}
    />
  );
}

export { toast } from "sonner";
