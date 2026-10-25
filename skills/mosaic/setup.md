# Mosaic setup

```css
/* app.css */
@import "tailwindcss";
@import "@fifthrevision/mosaic/styles.css";
```

- Load Inter from its optical-size build,
  `import "@fontsource-variable/inter/opsz.css"`. `text-large-title` uses the
  Display cut; the default build has no such axis and falls back to the text
  cut without an error.
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
