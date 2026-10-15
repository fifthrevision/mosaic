import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";
import { cn } from "./cn";
import { IconButton } from "./icon-button";
import { TextStack } from "./text-stack";

export const DialogRoot = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

const sizeClass = {
  small: "w-dialog-small",
  medium: "w-dialog-medium",
  large: "w-dialog-large",
} as const;

export type DialogSize = keyof typeof sizeClass;

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClosed?: () => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  size?: DialogSize;
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <TextStack className={cn("mb-6", className)} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <RadixDialog.Title asChild>
      <h2 className={cn("text-title text-label", className)} {...props} />
    </RadixDialog.Title>
  );
}

function DialogDescription({
  className,
  visuallyHidden,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { visuallyHidden?: boolean }) {
  return (
    <RadixDialog.Description asChild>
      <p
        className={cn(
          "text-body text-label-secondary",
          visuallyHidden && "sr-only",
          className,
        )}
        {...props}
      />
    </RadixDialog.Description>
  );
}

function DialogActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-row-reverse gap-3 pt-10", className)}
      {...props}
    />
  );
}

function DialogSecondaryActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row mr-auto gap-3", className)} {...props} />
  );
}

const DialogImpl = ({
  open,
  onOpenChange,
  onClosed,
  defaultOpen,
  children,
  className,
  size = "medium",
}: DialogProps) => {
  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm dark:bg-black/20 data-[state=open]:animate-[dialog-overlay-in_150ms_ease-out] data-[state=closed]:animate-[dialog-overlay-out_100ms_ease-in]" />
        <RadixDialog.Content
          onAnimationEnd={(e) => {
            if (
              e.target === e.currentTarget &&
              e.currentTarget.dataset.state === "closed"
            ) {
              onClosed?.();
            }
          }}
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] min-h-80 max-w-[calc(100vw-32px)] -translate-1/2 flex-col overflow-y-auto rounded-lg border border-separator-secondary bg-surface-canvas p-6 dialog-shadow focus:outline-none data-[state=open]:animate-[dialog-content-in_150ms_ease-out] data-[state=closed]:animate-[dialog-content-out_100ms_ease-in]",
            sizeClass[size],
            className,
          )}
        >
          <RadixDialog.Close asChild>
            <IconButton
              icon={X}
              variant="subtle"
              aria-label="Close"
              className="absolute top-4 right-4"
            />
          </RadixDialog.Close>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export const Dialog = Object.assign(DialogImpl, {
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: Object.assign(DialogActions, {
    Secondary: DialogSecondaryActions,
  }),
});
