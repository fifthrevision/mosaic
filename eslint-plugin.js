const TAILWIND_SIZE = /^text-(xs|sm|md|base|lg|xl|[2-9]xl)$/;
const ARBITRARY_SIZE = /^text-\[[\d.]+(px|rem|em)\]$/;
const LINE_HEIGHT =
  /^leading-(none|tight|snug|normal|relaxed|loose|[\d.]+|\[.+\])$/;
const ROLE = /^text-(caption|subhead|body|title|large-title)$/;

const ROLES_HINT =
  "text-large-title (18), text-title (16), text-body (14), text-subhead (13)";

function stripVariants(token) {
  let depth = 0;
  let lastColon = -1;
  for (let i = 0; i < token.length; i++) {
    if (token[i] === "[") depth++;
    else if (token[i] === "]") depth--;
    else if (token[i] === ":" && depth === 0) lastColon = i;
  }
  return token.slice(lastColon + 1).replace(/^!|!$/g, "");
}

function classTokens(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      const utility = stripVariants(raw);
      const slash = utility.indexOf("/");
      return slash === -1
        ? { raw, base: utility, modifier: null }
        : {
            raw,
            base: utility.slice(0, slash),
            modifier: utility.slice(slash + 1),
          };
    });
}

function classStringRule({ meta, check }) {
  return {
    meta: { type: "problem", ...meta },
    create(context) {
      function inspect(node, text) {
        for (const token of classTokens(text)) {
          const messageId = check(token);
          if (messageId) {
            context.report({ node, messageId, data: { token: token.raw } });
          }
        }
      }
      return {
        Literal(node) {
          if (typeof node.value !== "string") return;
          if (node.parent.type === "ImportDeclaration") return;
          inspect(node, node.value);
        },
        TemplateElement(node) {
          inspect(node, node.value.cooked ?? node.value.raw);
        },
      };
    },
  };
}

const typeScale = classStringRule({
  meta: {
    messages: {
      tailwindSize: `\`{{token}}\` isn't in mosaic's type scale. Use a role: ${ROLES_HINT}. See USAGE.md.`,
      arbitrarySize: `\`{{token}}\` hard-codes a font size. Use a role: ${ROLES_HINT}. See USAGE.md.`,
    },
  },
  check({ base }) {
    if (TAILWIND_SIZE.test(base)) return "tailwindSize";
    if (ARBITRARY_SIZE.test(base)) return "arbitrarySize";
    return null;
  },
});

const noLineHeight = classStringRule({
  meta: {
    messages: {
      lineHeight:
        "`{{token}}` overrides the line height. Text inherits a constant line height from body; don't set one per element. See USAGE.md.",
    },
  },
  check({ base, modifier }) {
    if (LINE_HEIGHT.test(base)) return "lineHeight";
    if (ROLE.test(base) && modifier !== null) return "lineHeight";
    return null;
  },
});

const noCaption = classStringRule({
  meta: {
    messages: {
      caption:
        "`{{token}}` is reserved for mosaic component internals (badges, tooltips, code). App text uses text-subhead or larger. See USAGE.md.",
    },
  },
  check({ base }) {
    return base === "text-caption" ? "caption" : null;
  },
});

const formLabel = {
  meta: {
    type: "problem",
    messages: {
      bareLabel:
        "Use `Label` from @fifthrevision/mosaic/label instead of a bare <label> (`visuallyHidden` for screen-reader-only labels).",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type === "JSXIdentifier" && node.name.name === "label") {
          context.report({ node, messageId: "bareLabel" });
        }
      },
    };
  },
};

const plugin = {
  meta: { name: "@fifthrevision/mosaic" },
  rules: {
    "type-scale": typeScale,
    "no-line-height": noLineHeight,
    "no-caption": noCaption,
    "form-label": formLabel,
  },
};

plugin.configs = {
  recommended: {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { mosaic: plugin },
    rules: {
      "mosaic/type-scale": "error",
      "mosaic/no-line-height": "error",
      "mosaic/no-caption": "error",
      "mosaic/form-label": "error",
    },
  },
};

export default plugin;
