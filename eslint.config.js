import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["node_modules/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'JSXOpeningElement[name.name="label"] > JSXAttribute[name.name="className"]:not([value.value=/label-header|sr-only/])',
          message:
            "Form labels use the `label-header` utility (13px / label-secondary — Figma Legend/Regular), not hand-rolled typography. Visually-hidden labels use `sr-only`.",
        },
        {
          selector:
            'JSXOpeningElement[name.name="label"]:not(:has(JSXAttribute[name.name="className"]))',
          message:
            "Form labels need the `label-header` utility (or `sr-only` if visually hidden).",
        },
      ],
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
