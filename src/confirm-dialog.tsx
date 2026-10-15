import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { LucideIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "./button";

export interface ConfirmButtonOptions {
  label?: string;
  icon?: LucideIcon;
}

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirm?: ConfirmButtonOptions;
  cancel?: ConfirmButtonOptions;
  destructive?: boolean;
}

/** A statement, not a question: one button, and nothing to decide. */
export interface AlertOptions {
  title: string;
  /** Newlines are preserved, so a batch can be reported as a list. */
  description?: string;
  dismiss?: ConfirmButtonOptions;
}

type DialogOptions =
  ({ mode: "confirm" } & ConfirmOptions) | ({ mode: "alert" } & AlertOptions);

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;
type AlertFn = (options: AlertOptions) => Promise<void>;

const DialogContext = createContext<{
  confirm: ConfirmFn;
  alert: AlertFn;
} | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [visibleOptions, setVisibleOptions] = useState<DialogOptions | null>(
    null,
  );
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  // Held separately so the content survives the close animation, and synced
  // before paint: back-to-back dialogs would otherwise show one frame of the
  // previous one's title and buttons.
  useLayoutEffect(() => {
    if (options) setVisibleOptions(options);
  }, [options]);

  // One dialog at a time, so opening a second would strand the first promise
  // with no resolver left to settle it. Cancel it instead: its caller unwinds
  // rather than awaiting forever.
  const open = useCallback((next: DialogOptions) => {
    resolverRef.current?.(false);
    setOptions(next);
  }, []);

  const confirm = useCallback<ConfirmFn>(
    (opts) => {
      open({ mode: "confirm", ...opts });
      return new Promise<boolean>((resolve) => {
        resolverRef.current = resolve;
      });
    },
    [open],
  );

  const alert = useCallback<AlertFn>(
    (opts) => {
      open({ mode: "alert", ...opts });
      return new Promise<void>((resolve) => {
        resolverRef.current = () => resolve();
      });
    },
    [open],
  );

  const value = useMemo(() => ({ confirm, alert }), [confirm, alert]);

  const resolve = (value: boolean) => {
    const resolver = resolverRef.current;
    resolverRef.current = null;
    setOptions(null);
    resolver?.(value);
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <AlertDialog.Root
        open={options !== null}
        onOpenChange={(open) => {
          if (!open && resolverRef.current) {
            resolve(false);
          }
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm dark:bg-black/20 data-[state=open]:animate-[dialog-overlay-in_150ms_ease-out] data-[state=closed]:animate-[dialog-overlay-out_100ms_ease-in]" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 z-50 w-105 max-w-[calc(100vw-32px)] -translate-1/2 rounded-xl border border-separator-secondary bg-surface-canvas p-6 dialog-shadow focus:outline-none data-[state=open]:animate-[dialog-content-in_150ms_ease-out] data-[state=closed]:animate-[dialog-content-out_100ms_ease-in]">
            <AlertDialog.Title className="text-title text-label">
              {visibleOptions?.title}
            </AlertDialog.Title>
            {visibleOptions?.description ? (
              <AlertDialog.Description className="mt-2 whitespace-pre-line text-body text-label-secondary">
                {visibleOptions.description}
              </AlertDialog.Description>
            ) : null}
            <div className="mt-6 flex justify-end gap-3">
              {visibleOptions?.mode === "alert" ? (
                <AlertDialog.Action asChild>
                  <Button
                    variant="primary"
                    icon={visibleOptions.dismiss?.icon}
                    onClick={() => resolve(true)}
                  >
                    {visibleOptions.dismiss?.label ?? "OK"}
                  </Button>
                </AlertDialog.Action>
              ) : (
                <>
                  <AlertDialog.Cancel asChild>
                    <Button
                      icon={visibleOptions?.cancel?.icon}
                      onClick={() => resolve(false)}
                    >
                      {visibleOptions?.cancel?.label ?? "Cancel"}
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      variant={
                        visibleOptions?.destructive ? "destructive" : "primary"
                      }
                      icon={visibleOptions?.confirm?.icon}
                      onClick={() => resolve(true)}
                    >
                      {visibleOptions?.confirm?.label ?? "Confirm"}
                    </Button>
                  </AlertDialog.Action>
                </>
              )}
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </DialogContext.Provider>
  );
}

function useDialog() {
  const value = useContext(DialogContext);
  if (!value) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return value;
}

export function useConfirm(): ConfirmFn {
  return useDialog().confirm;
}

export function useAlert(): AlertFn {
  return useDialog().alert;
}
