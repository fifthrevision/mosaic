import { Braces } from "lucide-react";
import { useState } from "react";
import { Example } from "../studio/DesignHelpers";
import { Button } from "./button";
import {
  rankBySearch,
  SearchMenu,
  SearchMenuItem,
  SearchMenuMessage,
} from "./search-menu";

export const meta = {
  title: "Search Menu",
  description:
    "Searchable menu on any trigger. The caller filters and renders the rows; the menu handles the popover, search input, keyboard, and highlight. Combobox is built on it.",
};

type CodeSymbol = { name: string; line: number };

const SYMBOLS: CodeSymbol[] = [
  { name: "SearchMenu", line: 7 },
  { name: "SearchMenuCommand", line: 55 },
  { name: "SearchMenuItem", line: 93 },
  { name: "SearchMenuMessage", line: 121 },
  { name: "rankBySearch", line: 129 },
  { name: "CloseSearchMenuContext", line: 5 },
  { name: "useHighlightedSymbol", line: 140 },
  { name: "parseSourceMap", line: 162 },
];

function SymbolRow({ symbol }: { symbol: CodeSymbol }) {
  return (
    <>
      <span className="w-[3ch] shrink-0 text-right font-mono text-subhead text-label-tertiary tabular-nums">
        {symbol.line}
      </span>
      <span className="min-w-0 truncate">{symbol.name}</span>
    </>
  );
}

function SymbolMenu({
  filter,
}: {
  filter: (symbols: CodeSymbol[], search: string) => CodeSymbol[];
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState("");
  const [picked, setPicked] = useState("");
  return (
    <div className="flex flex-col items-start gap-2">
      <SearchMenu
        open={open}
        onOpenChange={setOpen}
        placeholder="Go to symbol…"
        onHighlightChange={setHighlighted}
        className="w-80"
        trigger={
          <Button icon={Braces} variant="subtle" size="sm" dropdown>
            Symbols
          </Button>
        }
      >
        {(search) => {
          const visible = filter(SYMBOLS, search);
          if (visible.length === 0)
            return <SearchMenuMessage>No matches</SearchMenuMessage>;
          return visible.map((symbol) => (
            <SearchMenuItem
              key={symbol.name}
              value={symbol.name}
              onSelect={() => setPicked(symbol.name)}
            >
              <SymbolRow symbol={symbol} />
            </SearchMenuItem>
          ));
        }}
      </SearchMenu>
      <span className="text-subhead text-label-secondary">
        highlighted: {highlighted || "—"} · picked: {picked || "—"}
      </span>
    </div>
  );
}

const bySubstring = (symbols: CodeSymbol[], search: string) => {
  const needle = search.trim().toLowerCase();
  return symbols.filter((symbol) => symbol.name.toLowerCase().includes(needle));
};

const byFuzzyRank = (symbols: CodeSymbol[], search: string) =>
  rankBySearch(symbols, search, (symbol) => symbol.name);

export const Filtering = () => (
  <div className="flex flex-col gap-6">
    <Example label="substring, original order (try “menu”)">
      <SymbolMenu filter={bySubstring} />
    </Example>
    <Example label="rankBySearch, fuzzy and ranked (try “smi”)">
      <SymbolMenu filter={byFuzzyRank} />
    </Example>
  </div>
);

function MessageMenu({ label, message }: { label: string; message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <SearchMenu
      open={open}
      onOpenChange={setOpen}
      className="w-80"
      trigger={
        <Button variant="subtle" size="sm" dropdown>
          {label}
        </Button>
      }
    >
      {() => <SearchMenuMessage>{message}</SearchMenuMessage>}
    </SearchMenu>
  );
}

export const Messages = () => (
  <div className="flex gap-4">
    <MessageMenu label="Loading" message="Loading symbols…" />
    <MessageMenu label="Empty" message="No symbols in this file" />
    <MessageMenu label="Unavailable" message="Language server not running" />
  </div>
);
