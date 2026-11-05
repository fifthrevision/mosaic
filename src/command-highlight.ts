import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Row = { value: string; disabled: boolean };
type RegisterRow = (element: HTMLElement, row: Row) => () => void;

const RowRegistryContext = createContext<RegisterRow>(() => () => {});

export const RowRegistryProvider = RowRegistryContext.Provider;

// cmdk only reports highlight changes when `value` is controlled. It also
// highlights the first row on open and on every search change, and reports
// those too.
//
// cmdk loses the highlight when the highlighted row and others leave in the
// same update, as when async results replace a list: nothing is highlighted
// and Enter does nothing. It shows only in production React builds. Rows
// register here, so the highlight moves to the first row whenever its row is
// gone, without reading cmdk's markup.
export function useCommandHighlight(
  onHighlightChange?: (value: string) => void,
) {
  const [highlighted, setHighlighted] = useState("");
  const highlightedRef = useRef("");
  const onHighlightChangeRef = useRef(onHighlightChange);
  useLayoutEffect(() => {
    onHighlightChangeRef.current = onHighlightChange;
  });

  const highlight = useCallback((value: string) => {
    highlightedRef.current = value;
    setHighlighted(value);
    onHighlightChangeRef.current?.(value);
  }, []);

  const rowsRef = useRef(new Map<HTMLElement, Row>());
  const isCheckQueuedRef = useRef(false);

  const registerRow = useCallback<RegisterRow>(
    (element, row) => {
      const highlightFirstIfLost = () => {
        isCheckQueuedRef.current = false;
        const enabled = [...rowsRef.current]
          .filter(([, candidate]) => !candidate.disabled)
          .sort(([a], [b]) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );
        if (enabled.length === 0) return;
        if (enabled.some(([, row]) => row.value === highlightedRef.current))
          return;
        highlight(enabled[0][1].value);
      };
      const queueCheck = () => {
        if (isCheckQueuedRef.current) return;
        isCheckQueuedRef.current = true;
        queueMicrotask(highlightFirstIfLost);
      };
      rowsRef.current.set(element, row);
      queueCheck();
      return () => {
        rowsRef.current.delete(element);
        queueCheck();
      };
    },
    [highlight],
  );

  return { highlighted, highlight, registerRow };
}

// cmdk trims values before it reports or matches them, so the registered
// value is trimmed too.
export function useRegisteredRow(value: string, disabled: boolean) {
  const registerRow = useContext(RowRegistryContext);
  const rowRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (rowRef.current === null) return;
    return registerRow(rowRef.current, { value: value.trim(), disabled });
  }, [registerRow, value, disabled]);
  return rowRef;
}
