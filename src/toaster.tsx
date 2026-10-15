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
            "rounded-md! border! border-separator-primary! bg-surface-elevated! overlay-shadow! text-label!",
          title: "text-body! font-medium! text-label!",
          description: "text-body! text-label-secondary!",
          closeButton:
            "border-separator-primary! bg-surface-elevated! text-label-secondary! hover:text-label!",
          success: "[&_[data-icon]]:text-shape-primary!",
          error: "[&_[data-icon]]:text-shape-destructive!",
        },
      }}
    />
  );
}

export { toast } from "sonner";
