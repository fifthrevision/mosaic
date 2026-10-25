# Mosaic tokens

The full reference behind the rules in [SKILL.md](SKILL.md).

## Color tokens

Colors are semantic roles, used with any color utility: `bg-surface-card`,
`border-separator-secondary`, `text-shape-secondary`. Stock palette classes
(`bg-white`, `text-gray-500`, `border-zinc-200`) still generate CSS but stay
fixed across modes, so they break dark mode. Pick the role by what the thing
is, not by the shade you want.

### Surfaces

Surfaces are layers. Each sits on the one before it:

| Token                     | Layer                                                                   |
| ------------------------- | ----------------------------------------------------------------------- |
| `bg-surface-shell`        | The app frame: sidebars, top bars                                       |
| `bg-surface-canvas`       | Page content (set on `body`). Windows that hold content (dialogs, popovers) also sit on canvas, so cards nest inside them |
| `bg-surface-card`         | Cards and list containers on the canvas                                 |
| `bg-surface-card-subdued` | A region inside a card: code blocks, nested blocks, chips               |

Above the page:

| Token                 | Layer                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `bg-surface-panel`    | The frame of a persistent window (the docked assistant). Its content area is a card. Follows `shell`; pair with `panel-shadow` |
| `floating-surface`    | Menus and choice lists (`Menu`, `Combobox`, autocomplete): `bg-surface-floating` (card color) at 95% with a 4px backdrop blur, opaque under `prefers-reduced-transparency`. Pair with `overlay-shadow` |
| `bg-surface-floating` | The opaque floating color, for tooltips                                                      |
| `bg-surface-elevated` | Toasts: a step lifted from canvas and cards in each mode. Text and icons on it use the normal roles |
| `bg-surface-scrim`    | The backdrop behind a modal: translucent black, darker in dark mode. `Dialog` and `ConfirmDialog` use it |

`bg-surface-bubble` is a theme-tinted chat bubble, placed on any layer.
Controls have their own surfaces; see [Controls](#controls).

Pick the surface by layer, not by shade: a box inside page content is a
card or a card region even if `shell` happens to look right.

- A card is `rounded-md border border-separator-secondary bg-surface-card`,
  plus `card-shadow` when it sits on the canvas. A clickable card adds
  `card-interactive` and `focus-visible:control-focus-ring`.
- Don't put a card inside a card. Nest with `bg-surface-card-subdued`.

### States

| Token                    | Use                                                             |
| ------------------------ | --------------------------------------------------------------- |
| `bg-state-hover`         | Hover on flat things: rows, nav items, subtle buttons, menu items |
| `bg-state-active`        | Pressed or open: `active:` and `data-[state=open]:`             |
| `bg-state-selected`      | The selected item in a set: current tab, segment, nav item      |

- `state-hover` is translucent, so it works over any surface.
- Strips tint, surfaces lift. `state-hover` is for strips: rows, menu
  items, nav items, subtle buttons. A large clickable surface (a card)
  doesn't tint, because a tinted card turns darker than the canvas and
  greys out the controls inside it. Use `card-interactive` instead.
- Selected reads as raised, not tinted: pair it with `control-shadow` and
  `text-label` (unselected siblings use `text-label-secondary`).

### Controls

Controls come in three families. Each has its own tokens, so each can be
tuned without moving the others. Use a family's tokens together.

| Family | Surface | Hover | Other | Used by |
| --- | --- | --- | --- | --- |
| Button (raised) | `bg-surface-button` | `bg-state-button-hover`, also the menu-open color | `control-shadow`, `active:control-shadow-active` | `Button`, `IconButton` |
| Input (sunken well) | `bg-surface-input` | `border-separator-input-hover` | `focus:border-separator-input-focus`, `input-shadow` | `Input`, `Textarea`, `Select`, `Combobox`, `EmailInput`, `ChatInput`, `FilePicker`, `SegmentedControl` track |
| Toggle | `bg-surface-toggle` | `border-separator-toggle-hover` | Checked fill `bg-shape-theme`; `border-separator-toggle-selected` for a checked radio | `Checkbox`, `Radio`, `Switch` track |

- `bg-surface-track` is the track behind a fill (`Progress`). It follows
  `surface-toggle` but is its own name, so a track can diverge later.
- A hand-built button copies the button family:
  `border border-separator-secondary bg-surface-button control-shadow
  hover:bg-state-button-hover`.
- A custom input well (e.g. around `MarkdownEditor`) copies `Input`:
  `border border-separator-secondary bg-surface-input input-shadow
  hover:border-separator-input-hover
  focus-within:border-separator-input-focus`.
- Flat triggers with no surface (subtle buttons, text triggers) aren't
  buttons in this sense: they hover with `bg-state-hover`.

### Separators

| Token                                       | Use                                                       |
| ------------------------------------------- | --------------------------------------------------------- |
| `border-separator-secondary`                | Default: card, control, and menu borders; row dividers    |
| `border-separator-primary`                  | Stronger: checkbox/radio/switch outlines, table header rule |
| `border-separator-*-translucent`            | Borders on content of unknown color (avatars, images)     |

Row dividers: `border-b border-separator-secondary last:border-b-0` on the
rows, or `h-px bg-separator-secondary` for a standalone rule.

### Shapes

Icons and glyphs take `text-shape-*`, not `text-label-*`:

| Token                     | Use                                                     |
| ------------------------- | ------------------------------------------------------- |
| `text-shape-primary`      | Strong neutral: icons on actions (`Button`, `IconButton`, `IconToggle`), navigation |
| `text-shape-secondary`    | Default icon color: icons in inputs, rows, menus, and other content |
| `text-shape-tertiary`     | De-emphasized icons                                     |
| `text-shape-theme`        | The theme accent: primary actions, checked, success confirmations |
| `text-shape-destructive`  | Destructive actions and errors                          |
| `text-shape-constructive` | Positive status                                         |
| `text-shape-warning`      | Needs a look: something changed that the user may want to act on |

They also work as fills: `bg-shape-theme` is the switch's on track.

"Success" means confirming something the user just did (saved, connected,
uploaded), so it takes the theme color: `Alert variant="success"` and
`toast.success`. Green (`shape-constructive`) is for positive *status*: a
run that passed, a healthy connection.

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
| `overlay-shadow`        | Menus, tooltips, toasts                              |
| `dialog-shadow`         | Dialogs and popovers                                 |
| `panel-shadow`          | Persistent windows (`bg-surface-panel`)              |
| `input-shadow`     | The inset shadow of input wells                      |
| `card-interactive`      | Clickable cards: on hover the border turns `separator-card-hover` and the shadow lifts; the fill doesn't change. Use with `card-shadow` |

A shadow none of these covers uses the tokens, lightest to darkest:
`shadow-[0px_4px_12px_var(--color-shadow-1)]` with `shadow-1`, `shadow-2`,
`shadow-3`, `shadow-4`. Never a literal `rgba(0,0,0,…)`.

### Radius

| Class        | Size | Use                                             |
| ------------ | ---- | ----------------------------------------------- |
| `rounded-xs` | 2px  | Tiny marks                                      |
| `rounded-sm` | 4px  | Checkboxes, tooltips, segments, small chips     |
| `rounded-md` | 8px  | Controls, rows, menus, cards, alerts            |
| `rounded-lg` | 12px | Larger cards                                    |
| `rounded-xl` | 16px | Dialogs, popovers, prominent cards              |

This replaces Tailwind's radius scale: bare `rounded`, `rounded-2xl` and up
generate nothing, and `rounded-lg`/`rounded-xl` are 12px/16px.

### Focus

Every custom interactive element (a clickable row, a link styled as a
card, a hand-built button) gets `focus-visible:control-focus-ring`. Don't
hand-roll `ring-*` or `outline-*`. Mosaic components already have it. Text
fields show focus with `separator-input-focus` on the border instead.

### Truncation and loading text

- `truncate-fade` fades single-line overflow instead of cutting it with an
  ellipsis. The element's width must come from its container
  (`flex-1 min-w-0`, `w-full`, a fixed `w-32`, a grid cell). On a
  content-sized element the right edge is where the text ends, so the fade
  eats the last characters of text that fits. If it has to be content-sized, add `pr-6`.
- `shimmer-text` is the animated loading text. It sets its own color, so
  use it instead of a `text-label*` class, not alongside one.

### Widths

`w-dialog-small` (440px), `w-dialog-medium` (640px), `w-dialog-large`
(960px). `Dialog`'s `size` prop applies them.
