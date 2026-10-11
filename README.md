# Mosaic

The design system shared by Sunny Day and Readview: tokens, the Tailwind
theme, and the React components built on it. Consumed straight from this
repo as a pnpm git dependency; the TypeScript source is the package.

## Consuming

```sh
pnpm add "@fifthrevision/mosaic@github:fifthrevision/mosaic#main"
```

The lockfile pins the commit. To pick up new changes, run
`pnpm update @fifthrevision/mosaic` and commit the lockfile.

In the app stylesheet, after Tailwind:

```css
@import "tailwindcss";
@import "@fifthrevision/mosaic/styles.css";
```

That brings in the color tokens, the `@theme` block, the utilities the
components rely on, and an `@source` so Tailwind scans the package.

Components are subpath imports, one per module:

```ts
import { Button } from "@fifthrevision/mosaic/button";
```

Mosaic has no routing dependency. Route-driven navigation (a tab strip
backed by `NavLink`, say) lives in the app, built on the class recipes
`tabs.tsx` exports (`tabClassName`, `tabIconClassName`) so the look stays
here.

Apps that render on the server (Vite SSR) must add the package to
`ssr.noExternal`, since the source is `.tsx`.

## Local iteration

Link a sibling checkout instead of the pinned commit:

```sh
pnpm add "@fifthrevision/mosaic@link:../mosaic"
```

Revert `package.json` and the lockfile before committing. With a link, the
app's Vite config needs `resolve.dedupe: ["react", "react-dom"]`, or the
linked package resolves its own copy of React.

## Working in this repo

- `pnpm studio` browses every `*.design.tsx` at <http://localhost:4400>.
  Each component ships one, and that is how changes get verified.
- `pnpm dtg emit` regenerates `src/colors.generated.css` from
  `design-tokens/colors.dtg.yaml`. Never hand-edit the generated file.
- `pnpm typecheck`, `pnpm lint`, `pnpm format`.
