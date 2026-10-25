---
name: mosaic
description: Use when writing or styling UI in an app that depends on @fifthrevision/mosaic, including text, colors, surfaces, spacing, focus, or choosing a component. Mosaic replaces Tailwind's type and radius scales and has its own color tokens, so stock Tailwind habits come out wrong.
---

# Mosaic

Rules for writing UI with Mosaic's tokens and components. The lint plugin
(`@fifthrevision/mosaic/eslint-plugin`) enforces the ones marked **(lint)**.

Read the other files in this folder when the task needs them:

- [components.md](components.md): every component, its props, and which to
  pick. Check it before hand-building a control, overlay, or row; it
  probably exists.
- [tokens.md](tokens.md): the full color tokens (surfaces, states, controls,
  separators, shapes, palette), shadows, radius, focus, and utilities.
- [setup.md](setup.md): stylesheet import, root providers, modes, and the
  lint config.

## When Mosaic is missing something

If the UI needs a component, token, or utility that Mosaic doesn't have,
stop and raise it with the user before building around it. Say what's
missing, what you'd use it for, and the closest thing Mosaic does have.
The user decides whether to use that, or to add the missing piece to Mosaic
so every app gets it.

Don't fill the gap yourself in app code:

- No one-off components that duplicate or reskin a Mosaic one.
- No new colors, stock palette classes (`bg-gray-100`), arbitrary values
  (`bg-[#f5f5f5]`, `shadow-[…]`, `text-[13px]`), or local CSS variables
  standing in for a missing token.
- No restyling a Mosaic component from the outside to make it something
  else.

Composing is fine: laying out Mosaic components and tokens to build a
feature is the normal job. The line is inventing a new visual piece.

## Type

Mosaic doesn't use Tailwind's size scale. `text-sm`, `text-base`, `text-lg`
and friends generate no CSS here **(lint)**. Mosaic's body text is 14px,
which is Tailwind's `text-sm`, so habits carried over from stock Tailwind
come out one or two steps too small.

Use a role:

| Role               | Size | Weight | Use                                                 |
| ------------------ | ---- | ------ | --------------------------------------------------- |
| `text-large-title` | 18px | 600    | Page titles                                         |
| `text-title`       | 16px | medium | Headings in a page; card and dialog titles; stat values |
| `text-body`        | 14px | —      | Default text                                        |
| `text-subhead`     | 13px | —      | Dense rows; group labels with `font-medium`         |
| `text-caption`     | 12px | —      | Mosaic component internals only **(lint)**          |

- Nothing in an app goes below `text-subhead`. Error messages and help text
  are sentences people need to read: use `text-body`.
- Weights are `font-regular` and `font-medium`. `text-title` carries
  medium; `text-large-title` carries 600 and Inter's Display cut, which
  needs the optical-size build (see [setup.md](setup.md)). An explicit
  `font-*` class still overrides the weight.
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

### Heading levels

A page uses at most three looks, and each one is a step away from the
next. Two adjacent levels never share a size.

| Level       | Look                                  | Use                                                    |
| ----------- | ------------------------------------- | ------------------------------------------------------ |
| Page title  | `text-large-title text-label`         | One per view: the page, or the pane of a settings dialog |
| Heading     | `text-title text-label`               | A section with prose or controls under it, its description in a `TextStack`; card and dialog titles |
| Group label | `SectionHeader`                       | Labels a list, table, or card below it; optional action |

Most pages need two: a page title over group labels, or a page title over
headings. The page title is what makes the steps read, so a view with
headings always has one above them.

### Alignment

Text sits flush on the column edge: page titles, headings, prose, and
`SectionHeader`. Anything with a box or a hover background hangs outside
the column by its padding, so its text lands 8px in from the text around
it. Mosaic builds the overhang in; app code doesn't write negative margins.

- `Card` hangs 8px each side; rows inside it take `px-4`.
- `NavItem` hangs 8px each side, so its label lines up with the
  `SectionHeader` above it.
- A `subtle` `Button` or `IconButton` at the start or end of a line of text
  takes `bleed`, which pulls it out by its own padding.
- Controls with chrome (inputs, selects, `default` and `primary` buttons)
  keep their box on the column edge.

The overhang needs room: the parent leaves at least 8px beyond the column
on each side (see `Card` in [components.md](components.md)).

### Form labels

`<label>` is the one element with a component. Use `Label` from
`@fifthrevision/mosaic/label`, which takes every `<label>` prop plus
`variant`: `field` (default, above an input), `inline` (body text beside a
checkbox, radio, or switch), or `hidden` (screen readers only) **(lint)**.

## Text color

| Token                    | Use                                                 |
| ------------------------ | --------------------------------------------------- |
| `text-label`             | Primary text: content, titles, values               |
| `text-label-secondary`   | Supporting text people read                         |
| `text-label-tertiary`    | Placeholders and empty states, rarely               |
| `text-label-theme`       | Theme-tinted text: primary button labels, accents   |
| `text-label-link`        | Links (the saturated theme color)                   |
| `text-label-destructive` | Destructive actions and error text                  |
| `text-label-shimmer`     | The loading shimmer                                 |

Secondary vs. tertiary is the choice that goes wrong most:

- **Secondary** is every kind of supporting text: descriptions under a
  heading, help text under a field, metadata in a row, group labels, table
  headers, captions, numbers beside a value, timestamps.
- **Tertiary** is for placeholders and empty states at most, and often not
  even those. It is never the color of something a person has to read.

Use secondary. Reach for tertiary only when the text's job is to be absent
until someone looks for it.

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

A heading and its description are one item in a `gap` list: wrap them in a
`TextStack`. As separate items, the list's gap pushes the description as far
from its heading as from the controls below.

A section with controls under its `TextStack` steps the gaps: `gap-6`
(24px) between the `TextStack` and the controls, `gap-4` (16px) between
controls. Equal gaps make the description read as one more row.

## Surfaces and states, in brief

Surfaces are layers: `bg-surface-shell` (app frame) → `bg-surface-canvas`
(page content, and windows like dialogs and popovers) → `bg-surface-card` →
`bg-surface-card-subdued` (a region inside a card). Pick the surface by
layer, not by shade. Details, plus the floating, panel, and elevated
surfaces, are in [tokens.md](tokens.md#surfaces).

- Strips tint, surfaces lift: rows, menu items, nav items, and subtle
  buttons hover with `bg-state-hover`; a clickable card uses
  `card-interactive` instead of a tint.
- Controls come in three families (button, input, toggle), each with its own
  surface and hover tokens. Use a family's tokens together; see
  [tokens.md](tokens.md#controls).
- Every custom interactive element gets `focus-visible:control-focus-ring`.
  Text fields show focus on their border instead.
- Use roles, never stock palette classes (`bg-white`, `text-gray-500`):
  those don't change with the mode.

## `cn()`

Merge class names with `cn` from `@fifthrevision/mosaic/cn`, not a bare
`twMerge`. Plain tailwind-merge reads the role names as colors and drops
them next to a text color: `twMerge("text-body text-label")` returns
`"text-label"`.
