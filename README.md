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

The rules for writing UI with Mosaic ship as an agent skill in
[`skills/mosaic/`](skills/mosaic/SKILL.md): type roles, text colors, surfaces,
controls, the component catalog, and the lint setup. It's plain Markdown, so
it doubles as the usage docs. To give an app's Claude Code sessions the skill,
commit a link to the installed copy:

```sh
mkdir -p .claude/skills
ln -s ../../node_modules/@fifthrevision/mosaic/skills/mosaic .claude/skills/mosaic
```

The link follows the app's lockfile, so the skill always matches the
installed Mosaic. It resolves once `pnpm install` has run. For agents that
don't read skills, point the app's agent instructions at
`node_modules/@fifthrevision/mosaic/skills/mosaic/SKILL.md`.

Mosaic has no routing dependency. Route-driven navigation (a tab strip
backed by `NavLink`, say) lives in the app, built on the class recipes
`tabs.tsx` exports (`tabClassName`, `tabIconClassName`) so the look stays
here.

Apps that render on the server (Vite SSR) must add the package to
`ssr.noExternal`, since the source is `.tsx`.

## Local iteration

Point the app at a sibling checkout instead of the pinned commit:

```sh
pnpm add "@fifthrevision/mosaic@file:../mosaic"
```

pnpm copies the package into the app and installs its dependencies there,
so React and Radix are shared with the app. The copy doesn't follow edits:
run `pnpm install` in the app after changing Mosaic. If the app runs in
Docker, mount the checkout where the relative path resolves inside the
container.

Don't use `link:`. A linked package resolves its dependencies from Mosaic's
own `node_modules`, so server rendering loads a second React and crashes
(`resolve.dedupe` only covers code Vite bundles).

Revert `package.json` and the lockfile before committing.

## Working in this repo

- `pnpm studio` browses every `*.design.tsx` at <http://localhost:4400>.
  Each component ships one, and that is how changes get verified.
- `pnpm dtg emit` regenerates `src/colors.generated.css` from
  `src/colors.dtg.yaml` (configured in `dtg.config.yaml`). Never hand-edit
  the generated file. The definition uses dtg 0.3's format, which the
  installed 0.2.0 can't read; until 0.3 is published, run a local build:
  `node ../dtg/dist/cli.js emit`.
- `pnpm typecheck`, `pnpm lint`, `pnpm format`.
