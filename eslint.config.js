import betterTailwind from "eslint-plugin-better-tailwindcss";
import tseslint from "typescript-eslint";
import mosaic from "./eslint-plugin.js";

export default [
  {
    ignores: ["node_modules/**", "studio/dist/**"],
  },
  ...tseslint.configs.recommended,
  mosaic.configs.recommended,
  {
    files: ["src/**/*.tsx", "studio/**/*.tsx"],
    plugins: { "better-tailwindcss": betterTailwind },
    settings: {
      "better-tailwindcss": { entryPoint: "studio/studio.css" },
    },
    rules: {
      // CodeMirror classes are plain CSS in markdown-editor.css.
      "better-tailwindcss/no-unknown-classes": ["error", { ignore: ["^cm-"] }],
    },
  },
  {
    files: ["src/**", "studio/**", "eslint-plugin.js"],
    rules: { "mosaic/no-caption": "off" },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
