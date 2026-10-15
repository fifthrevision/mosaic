# Using Mosaic

Rules for writing UI with Mosaic's tokens and components. The lint plugin
(`@fifthrevision/mosaic/eslint-plugin`) enforces the ones marked **(lint)**.

Before building something, check [Components](#components): most hand-rolled
controls, overlays, and rows here already exist.

## Setup

```css
/* app.css */
@import "tailwindcss";
@import "@fifthrevision/mosaic/styles.css";
```

- Every component is a subpath import, `@fifthrevision/mosaic/<name>`. There
  is no root index.
- Mount `TooltipProvider` (`/tooltip`) and `ConfirmProvider`
  (`/confirm-dialog`) once at the root, and render one `<Toaster />`
  (`/toaster`). `Button` and `IconButton` render a `Tooltip` for `title`, so
  they need the provider too.
- Modes are a class on an ancestor (usually `<html>`): none for light,
  `.dark`, or `.black` (a darker dark). The `dark:` variant matches both.
  `Theme` (`/theme`) is `"system" | "light" | "dark" | "black"`; the app
  applies the class, Mosaic doesn't.
- Semantic color tokens switch per mode on their own. Don't add `dark:`
  overrides to them.

## Type

Mosaic doesn't use Tailwind's size scale. `text-sm`, `text-base`, `text-lg`
and friends generate no CSS here **(lint)**. Mosaic's body text is 14px,
which is Tailwind's `text-sm`, so habits carried over from stock Tailwind
come out one or two steps too small.

Use a role:

| Role               | Size | Weight | Use                                              |
| ------------------ | ---- | ------ | ------------------------------------------------ |
| `text-large-title` | 18px | medium | Page headings                                    |
| `text-title`       | 16px | medium | Card, section, and dialog titles; stat values    |
| `text-body`        | 14px | —      | Default text                                     |
| `text-subhead`     | 13px | —      | Dense rows; group labels with `font-medium`      |
| `text-caption`     | 12px | —      | Mosaic component internals only **(lint)**       |

- Nothing in an app goes below `text-subhead`. Error messages and help text
  are sentences people need to read: use `text-body`.
- Weights are `font-regular` and `font-medium`. Title roles carry medium;
  an explicit `font-*` class still overrides it.
- Sizes are in `rem`, so browser zoom and the user's default font size scale
  the whole ramp. Don't write sizes in `px` **(lint)**.

### Line height

Every role inherits one line height (1.5) from `body`. Don't set
`leading-*` or a `text-body/5` modifier on individual elements **(lint)**.

### Write the element, add the look

Use the native element that says what the text is, and put the role and
color on it as classes. The element carries the meaning (heading level,
paragraph vs. inline), the classes carry the look, and the two vary
independently:

```tsx
<h1 className="text-large-title text-label">Agents</h1>
<h2 className="text-title text-label">Instructions</h2>
<p className="text-body text-label-secondary">
  Runs <span className="font-medium text-label">daily</span> at 9am.
</p>
```

Pick the heading level from the document outline, not from the size you
want: a small heading can still be an `h2`.

### Form labels

`<label>` is the one element with a component. Use `Label` from
`@fifthrevision/mosaic/label`, which takes every `<label>` prop plus
`visuallyHidden` for screen-reader-only labels **(lint)**.

## Text color

| Token                    | Use                                                 |
| ------------------------ | --------------------------------------------------- |
| `text-label`             | Primary text: content, titles, values               |
| `text-label-secondary`   | Supporting text people read                         |
| `text-label-tertiary`    | Text people skim past                               |
| `text-label-theme`       | Theme-tinted text: primary button labels, accents   |
| `text-label-link`        | Links (the saturated theme color)                   |
| `text-label-destructive` | Destructive actions and error text                  |
| `text-label-shimmer`     | The loading shimmer                                 |

Secondary vs. tertiary is the choice that goes wrong most:

- **Secondary** is text someone reads to understand the page: descriptions
  under a heading, help text under a field, metadata in a row, group labels.
- **Tertiary** is text that only has to be findable: placeholders, empty
  states, separators like "·", timestamps in a dense list.

When in doubt, use secondary. Tertiary on a sentence makes it hard to read.

## Spacing

UI text carries no margins. The parent spaces its children with `gap`.
`TextStack` (`@fifthrevision/mosaic/text-stack`) is the stack for a heading
and its description. It puts 4px between a heading and what follows it, and
8px between paragraphs. It finds the heading by tag, so the heading has to be
a direct child:

```tsx
<TextStack>
  <h2 className="text-title text-label">Notifications</h2>
  <p className="text-body text-label-secondary">
    Choose what we email you about.
  </p>
</TextStack>
```

## Color tokens

Colors are semantic roles, used with any color utility: `bg-surface-card`,
`border-separator-secondary`, `text-shape-secondary`. Stock palette classes
(`bg-white`, `text-gray-500`, `border-zinc-200`) still generate CSS but stay
fixed across modes, so they break dark mode. Pick the role by what the thing
is, not by the shade you want.

### Surfaces

Backgrounds, from the outside in:

| Token                       | Use                                                      |
| --------------------------- | -------------------------------------------------------- |
| `bg-surface-canvas`         | Page background (set on `body`); dialog bodies           |
| `bg-surface-navigation`     | Sidebar                                                  |
| `bg-surface-panel`          | Docked side panel next to the page                       |
| `bg-surface-card`           | Cards and list containers; menus, popovers, toasts       |
| `bg-surface-card-subdued`   | An inset inside a card: code blocks, nested blocks, chips |
| `bg-surface-floating`       | Floating layers (`Tooltip`)                              |
| `bg-surface-bubble`         | A theme-tinted chat bubble                               |
| `bg-surface-control`        | Raised controls (`Button`)                               |
| `bg-surface-control-sunken` | Input wells (`Input`, `Textarea`, editors)               |
| `bg-surface-control-deep`   | Checkbox and radio boxes, switch track                   |

- A card is `rounded-md border border-separator-secondary bg-surface-card`,
  plus `card-shadow` when it sits on the canvas.
- Don't put a card inside a card. Nest with `bg-surface-card-subdued`.
- A custom input well (e.g. around `MarkdownEditor`) copies `Input`:
  `border border-separator-secondary`, `bg-surface-control-sunken`,
  `shadow-[inset_0px_0px_4px_var(--color-shadow-1)]`, with
  `hover:border-separator-control-hover` and
  `focus-within:border-separator-control-active`.

### States

| Token                    | Use                                                             |
| ------------------------ | --------------------------------------------------------------- |
| `bg-state-hover`         | Hover on flat things: rows, nav items, subtle buttons, menu items |
| `bg-state-control-hover` | Hover on raised controls (`bg-surface-control`)                 |
| `bg-state-active`        | Pressed or open: `active:` and `data-[state=open]:`             |
| `bg-state-selected`      | The selected item in a set: current tab, segment, nav item      |

- `state-hover` is translucent, so it works over any surface.
- Selected reads as raised, not tinted: pair it with `control-shadow` and
  `text-label` (unselected siblings use `text-label-secondary`).

### Separators

| Token                                       | Use                                                       |
| ------------------------------------------- | --------------------------------------------------------- |
| `border-separator-secondary`                | Default: card, control, and menu borders; row dividers    |
| `border-separator-primary`                  | Stronger: checkbox/radio/switch outlines, table header rule |
| `border-separator-*-translucent`            | Borders on content of unknown color (avatars, images)     |
| `border-separator-control-hover`            | Input border on hover                                     |
| `border-separator-control-active`           | Input border on focus                                     |
| `border-separator-control-selected`         | Checked radio border                                      |

Row dividers: `border-b border-separator-secondary last:border-b-0` on the
rows, or `h-px bg-separator-secondary` for a standalone rule.

### Shapes

Icons and glyphs take `text-shape-*`, not `text-label-*`:

| Token                     | Use                                                     |
| ------------------------- | ------------------------------------------------------- |
| `text-shape-secondary`    | Default icon color                                      |
| `text-shape-tertiary`     | De-emphasized icons                                     |
| `text-shape-primary`      | Accent: primary actions, checked, success               |
| `text-shape-destructive`  | Destructive actions and errors                          |
| `text-shape-constructive` | Positive status                                         |

They also work as fills: `bg-shape-primary` is the switch's on track.
`theme-primary` is the theme accent; Mosaic uses `text-theme-primary` for
the active tab's icon.

### Palette and diff

- `theme-*`, `emerald-*`, `ruby-*`, `yellow-*` (stops 50–950) are public, but
  they don't change with the mode. Reach for them only when no role fits,
  and give them a `dark:` counterpart.
- `light-*`, `dark-*`, `midnight-*` are the ramps the roles are built from.
  Use the roles.
- Diffs: `bg-diff-added-line` / `bg-diff-removed-line` for a changed line,
  `bg-diff-added-text` / `bg-diff-removed-text` for the changed span within
  it.

## Elevation, shape, and utilities

### Shadows

Use the utilities. Stock `shadow-sm`/`shadow-md` aren't tuned per mode;
Mosaic's shadow colors deepen in dark mode.

| Utility                 | Use                                                  |
| ----------------------- | ---------------------------------------------------- |
| `control-shadow`        | Raised controls; selected tabs, segments, nav items  |
| `control-shadow-active` | A raised control while pressed (`active:`)           |
| `card-shadow`           | Cards on the canvas                                  |
| `overlay-shadow`        | Floating overlays                                    |
| `dialog-shadow`         | Modal dialogs                                        |

A shadow none of these covers uses the tokens, lightest to darkest:
`shadow-[0px_4px_12px_var(--color-shadow-1)]` with `shadow-1`, `shadow-2`,
`shadow-3`. Never a literal `rgba(0,0,0,…)`.

### Radius

| Class        | Size | Use                                             |
| ------------ | ---- | ----------------------------------------------- |
| `rounded-sm` | 4px  | Checkboxes, tooltips, segments, small chips     |
| `rounded-md` | 8px  | Controls, rows, menus, cards, alerts            |
| `rounded-lg` | 16px | Dialogs, popovers                               |

These replace Tailwind's values: `rounded-lg` is 16px here, not 8px.

### Focus

Every custom interactive element (a clickable row, a link styled as a
card, a hand-built button) gets `focus-visible:control-focus-ring`. Don't
hand-roll `ring-*` or `outline-*`. Mosaic components already have it. Text
fields show focus with `separator-control-active` on the border instead.

### Truncation and loading text

- `truncate-fade` fades single-line overflow instead of cutting it with an
  ellipsis. The element's width must come from its container
  (`flex-1 min-w-0`, `w-full`, a fixed `w-32`, a grid cell). On a
  content-sized element the right edge is where the text ends, so the fade
  eats the last characters of text that fits. If it has to be content-sized, add `pr-6`.
- `shimmer-text` is the animated loading text. It sets its own color, so
  use it instead of a `text-label*` class, not alongside one.

### Widths

`w-dialog-small` (280px), `w-dialog-medium` (560px), `w-dialog-large`
(840px). `Dialog`'s `size` prop applies them.

## Components

Import paths are `@fifthrevision/mosaic/<path>`. Icons are Lucide
components passed as `icon={Trash2}`, not elements.

### Buttons

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

### Form controls

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

### Overlays

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
content has a surface, border, and radius but no width or padding: add them
(`className="w-64 p-3"`).

**`Tooltip`** (`tooltip`): `<Tooltip content side align>` wrapping one
trigger element. On `Button` and `IconButton`, use `title` instead.

**`toast`** (`toaster`): `toast.success(…)`, `toast.error(…)`, `toast(…)`.
Import it from `@fifthrevision/mosaic/toaster`, not `sonner`. For a
message that should stay on the page, use `Alert`.

### Layout and feedback

| Component           | Path                 | Use                                                                         |
| ------------------- | -------------------- | --------------------------------------------------------------------------- |
| `TextStack`         | `text-stack`         | Heading plus description (see [Spacing](#spacing))                          |
| `SectionHeader`     | `section-header`     | Group label above a list or card: `title`, optional `action`                |
| `Tabs`              | `tabs`               | In-page tabs. See below                                                     |
| `Alert`             | `alert`              | Inline message: `variant` `info` (default) / `success` / `error`, `onDismiss` |
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

### Content

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
  [Surfaces](#surfaces)). Add `cm-centered-content` to center the text in a
  40rem column.
- **`SVGIcon`** (`svg-icon`): renders a raw SVG string at `size`. The SVG
  should use `width="100%" height="100%"` and `currentColor`, so color comes
  from a `text-*` class.

## `cn()`

Merge class names with `cn` from `@fifthrevision/mosaic/cn`, not a bare
`twMerge`. Plain tailwind-merge reads the role names as colors and drops
them next to a text color: `twMerge("text-body text-label")` returns
`"text-label"`.

## Lint setup

```js
// eslint.config.js
import mosaic from "@fifthrevision/mosaic/eslint-plugin";
import betterTailwind from "eslint-plugin-better-tailwindcss";

export default [
  // ...
  mosaic.configs.recommended,
  {
    files: ["app/**/*.tsx"],
    plugins: { "better-tailwindcss": betterTailwind },
    settings: {
      // The stylesheet that imports tailwindcss and Mosaic's styles.css.
      "better-tailwindcss": { entryPoint: "app/app.css" },
    },
    rules: {
      // CodeMirror classes come from Mosaic's markdown-editor.css.
      "better-tailwindcss/no-unknown-classes": ["error", { ignore: ["^cm-"] }],
    },
  },
];
```

| Rule                                    | Catches                                                     |
| --------------------------------------- | ----------------------------------------------------------- |
| `mosaic/type-scale`                     | Tailwind size names and arbitrary sizes (`text-[13px]`)     |
| `mosaic/no-line-height`                 | `leading-*` and `/n` line-height modifiers on roles         |
| `mosaic/no-caption`                     | `text-caption` outside Mosaic                               |
| `mosaic/form-label`                     | A bare `<label>` instead of `Label`                         |
| `better-tailwindcss/no-unknown-classes` | Any class Tailwind doesn't generate, e.g. a misspelled token |

The `mosaic/*` rules read string literals and template literals, so they
cover `className`, `cn()` arguments, and class maps alike. A class built at
runtime (`` `text-${size}` ``) slips past them, and also past Tailwind, which
needs full class names in source.
