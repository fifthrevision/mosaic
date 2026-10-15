# Mosaic components

Import paths are `@fifthrevision/mosaic/<path>`. Icons are Lucide
components passed as `icon={Trash2}`, not elements.

## Buttons

**`Button`** (`button`)

| Prop       | Values                                                  |
| ---------- | ------------------------------------------------------- |
| `variant`  | `default`, `primary`, `subtle`, `destructive`           |
| `size`     | `md` (32px, default), `sm` (24px)                       |
| `icon`     | Leading Lucide icon                                     |
| `dropdown` | Trailing chevron, for a `Menu` trigger                  |
| `loading`  | Swaps the icon for a spinner and disables               |

- `primary` isn't a filled button. It's the same raised surface with a
  theme-colored label: use it for the action the view or dialog exists for.
- `subtle` has no chrome: toolbars, `SectionHeader` actions, low-emphasis
  actions.
- `destructive` for delete, remove, disconnect.
- `title` shows a Mosaic `Tooltip`, not the native one.
- It doesn't set `type`, so inside a `<form>` it submits unless you pass
  `type="button"`.

**`IconButton`** (`icon-button`): icon-only button. `icon` (required),
`variant` `default` | `primary` | `subtle`, `size` `md` | `sm`. Always pass
`aria-label`; add `title` for a hover tooltip.

**`CopyButton`** (`copy-button`): a `Button` that copies `value` and shows
"Copied" for 2s. Takes `Button` props except `icon`, `loading`, `onClick`;
`onCopy` fires after a copy. It stops click propagation, so it's safe inside
a clickable row.

## Form controls

Pair each with a `Label` (`htmlFor`), stacked with `gap`.

| Component          | Path                | Key props / notes                                                                 |
| ------------------ | ------------------- | --------------------------------------------------------------------------------- |
| `Input`            | `input`             | Native `<input>` props, plus `icon` for a leading icon. Full width                |
| `Textarea`         | `textarea`          | Native `<textarea>` props. Not resizable; set `rows`                              |
| `Select`           | `select`            | Native `<select>` with `<option>` children                                        |
| `Combobox`         | `combobox`          | `options` `{ value, label, description?, disabled? }[]`, `value`, `onValueChange`, `loading` |
| `EmailInput`       | `email-input`       | `value: string[]`, `onChange(emails)`. See below                                  |
| `Checkbox`         | `checkbox`          | `checked` (`true` / `false` / `"indeterminate"`), `onCheckedChange(boolean)`      |
| `Radio`            | `radio`             | Native `<input type="radio">`; group by `name`, listen with `onChange`            |
| `Switch`           | `switch`            | `checked`, `onCheckedChange(boolean)`                                             |
| `SegmentedControl` | `segmented-control` | `options` `{ value, label }[]`, `value`, `onChange(value)`, `aria-label`          |
| `FilePicker`       | `file-picker`       | Click-or-drop zone. `files`, `onAddFiles(File[])`, `onRemove(id)`, `accept`       |
| `FileChip`         | `file-chip`         | One file: `filename`, `sizeText`, `state` (`ready` / `loading` / `error`), `href`, `onRemove` |
| `ChatInput`        | `chat-input`        | Message composer. See below                                                       |

Picking one-of-many:

| Situation                                        | Use                |
| ------------------------------------------------ | ------------------ |
| 2–4 short options, all visible, switches a view  | `SegmentedControl` |
| A few options in a form, each needing a label    | `Radio`            |
| A fixed list in a form                           | `Select`           |
| A long or searchable list                        | `Combobox`         |
| Actions, not a value                             | `Menu`             |

Gotchas:

- `Checkbox` and `Switch` are buttons: they take `onCheckedChange`, not
  `onChange`, and post to a form only through `name` (a hidden input is
  added while checked). `SegmentedControl`'s `onChange` gets the value, not
  an event.
- `EmailInput` commits on Enter, comma, semicolon, Tab, blur, and paste.
  Invalid addresses show in red but stay in `value`; check them with the
  exported `isValidEmail` before submitting.
- `FilePicker` and `FileChip` hold no files. You own the list and its
  `state`; they render it.
- `ChatInput`: `value`, `onChange(text)`, `onSubmit`; Enter sends,
  Shift+Enter breaks a line. `isStreaming` + `onStop` show a stop button;
  `steerable` allows sending while streaming. `attachments` (`items`, `onAdd`,
  `onRemove`) adds an attach button, and send waits until every item is
  `ready`. `leading` adds controls to the toolbar's left side, beside attach.

## Overlays

| Need                                        | Use                       |
| ------------------------------------------- | ------------------------- |
| Yes/no before an action, or a one-off notice | `useConfirm` / `useAlert` |
| A task with its own form or content         | `Dialog`                  |
| A list of actions from a trigger            | `Menu`                    |
| A small anchored panel with controls        | `Popover`                 |
| A hint on hover                             | `Tooltip` (or `title`)    |
| Transient feedback after something happens  | `toast`                   |

**`Dialog`** (`dialog`) is controlled only: `open` and `onOpenChange` are
required. `size` is `small` | `medium` (default) | `large`. `onClosed` fires
after the close animation, the place to reset form state. Build it from its
parts:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Header>
    <Dialog.Title>Rename agent</Dialog.Title>
    <Dialog.Description>Shown in the sidebar.</Dialog.Description>
  </Dialog.Header>
  {/* body */}
  <Dialog.Actions>
    <Button variant="primary">Save</Button>
    <Dialog.Actions.Secondary>
      <Button variant="destructive">Delete</Button>
    </Dialog.Actions.Secondary>
  </Dialog.Actions>
</Dialog>
```

- `Dialog.Title` is required for accessibility. If the description would be
  redundant, keep it with `visuallyHidden`.
- `Dialog.Actions` is `flex-row-reverse`: the first child sits rightmost, so
  the primary action goes first. `Dialog.Actions.Secondary` pins its
  buttons to the left.
- The close button, overlay click, and Escape all dismiss, so no Cancel
  button is needed. `DialogClose` (`asChild`) makes another button close it.

**`useConfirm` / `useAlert`** (`confirm-dialog`) need `ConfirmProvider`.
Don't build a `Dialog` for a confirmation:

```tsx
const confirm = useConfirm();
const ok = await confirm({
  title: `Delete ${agent.name}?`,
  description: "This cannot be undone.",
  confirm: { label: "Delete", icon: Trash2 },
  destructive: true,
});
if (!ok) return;
```

`useAlert()` takes `{ title, description, dismiss }` and resolves when
dismissed; use it for a statement with nothing to decide. Description
newlines are kept. Opening a second dialog resolves the first as `false`.

**`Menu`** (`menu`): `<Menu trigger={…} align>`, `align` defaulting to
`"end"`. The trigger is one element that accepts a ref and props (`Button`,
`IconButton`, a native `<button>`). Children:

- `MenuItem`: `icon` (required), `onSelect`, `disabled`,
  `variant="destructive"`. Put destructive items last, after a
  `MenuSeparator`.
- `MenuLabel`: group heading. `MenuSeparator`: divider.
- `SubMenu`: `icon`, `label`, children items.
- `MenuRadioItem`: `active`, `onSelect`. A check marks the active one; for
  choosing a value from a menu.

Menu icons take `UIIcon` (`/ui-icon`): a Lucide icon or an `SVGIcon`-based
component.

**`Popover`** (`popover`): `Popover`, `PopoverTrigger` (`asChild`),
`PopoverContent` (Radix content props: `side`, `align`, `sideOffset`). The
content is a small window (canvas surface, `dialog-shadow`) with a border
and radius but no width or padding: add them (`className="w-64 p-3"`). A
list of choices is a `Menu` or `Combobox`, not a `Popover`.

**`Tooltip`** (`tooltip`): `<Tooltip content side align>` wrapping one
trigger element. On `Button` and `IconButton`, use `title` instead.

**`toast`** (`toaster`): `toast.success(…)`, `toast.error(…)`, `toast(…)`.
Import it from `@fifthrevision/mosaic/toaster`, not `sonner`. For a
message that should stay on the page, use `Alert`.

## Layout and feedback

| Component           | Path                 | Use                                                                         |
| ------------------- | -------------------- | --------------------------------------------------------------------------- |
| `TextStack`         | `text-stack`         | Heading plus description (see [SKILL.md](SKILL.md#spacing))                          |
| `SectionHeader`     | `section-header`     | Group label above a list or card: `title`, optional `action`                |
| `Tabs`              | `tabs`               | In-page tabs. See below                                                     |
| `Alert`             | `alert`              | Inline message: `variant` `info` (default) / `success` / `error`, `onDismiss` |
| `Progress`          | `progress`           | A fill on a track: `value` 0–1, width from `className`. Give it `aria-label`, or `aria-hidden` when the value is already shown as text |
| `EmptyState`        | `empty-state`        | "Nothing here" text: `variant` `card` (default) / `plain`                   |
| `FadingScrollArea`  | `fading-scroll-area` | Scroll region with edge fades, optional sticky `footer`                     |
| `TruncatedText`     | `truncated-text`     | Clamp to `maxHeight` (px) with a bottom fade                                |
| `Avatar`            | `avatar`             | `src`, `name` (initials fallback), `size` `sm` / `md` / `lg`                |
| `WorkspaceControl`  | `workspace-control`  | Sidebar workspace switcher; use as a `Menu` trigger                         |

- `SectionHeader` renders a small secondary `h3`. It labels a group; it
  isn't a page or card title.
- `EmptyState` puts its children in a `<p>`: pass text, not blocks. Use
  `plain` inside a container that already has a card border.
- `FadingScrollArea` needs a bounded height (`min-h-0 flex-1` in a flex
  column, or `max-h-*`). `fadeClassName` is a **`bg-*`** class matching
  what's behind it (default `bg-surface-card`). Padding goes on children.
  `pinToBottom` follows new content when the user is already at the bottom.
- `TruncatedText`'s `fadeClassName` is a **`from-*`** gradient color
  matching what's behind it (`from-surface-card`). Not the same convention
  as `FadingScrollArea`.

**`Tabs`** wraps Radix: `Tabs` (`value` / `defaultValue` / `onValueChange`),
`TabsList`, `TabsTrigger` (`value`, `icon`, `size` `md` | `sm`, `onClose`
adds a close button), `TabsPanel`. For tabs that are routes, don't use
`Tabs`: put the exported recipes on your links.

```tsx
import { tabClassName, tabIconClassName } from "@fifthrevision/mosaic/tabs";

<NavLink to={to} className={({ isActive }) => tabClassName(isActive)}>
  {({ isActive }) => (
    <>
      <Icon size={16} className={tabIconClassName(isActive)} />
      {label}
    </>
  )}
</NavLink>;
```

## Content

- **`Time`** (`time`): `value` (`Date`, ISO string, or `null`), `format`
  `relative` (default) / `local` / `utc`, `fallback` (default "—"). Use it
  instead of formatting dates yourself; it's hydration-safe (relative time
  renders empty on the server). `formatUtc(date)` is exported for strings.
- **`Markdown`** (`markdown`): `text` rendered as GFM with Mosaic styles.
  Read-only.
- **`MarkdownEditor`** (`markdown-editor`): CodeMirror. `value`,
  `onChange`, `placeholder`; autocomplete for `variables` and
  `magicVariables` (`{{`), `repos` and `files` (`@`); `reservedVariables`
  marks those `{{names}}` as errors. A ref exposes `insertText(text)`. It
  fills its container and has no chrome: wrap it in an input well (see
  [tokens.md](tokens.md#controls)). Add `cm-centered-content` to center the text in a
  40rem column.
- **`SVGIcon`** (`svg-icon`): renders a raw SVG string at `size`. The SVG
  should use `width="100%" height="100%"` and `currentColor`, so color comes
  from a `text-*` class.
