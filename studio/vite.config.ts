import tailwindcss from "@tailwindcss/vite";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { createServer, type AddressInfo } from "node:net";
import { resolve } from "node:path";
import { defineConfig, parseAst, type Plugin } from "vite";

// Module namespaces list exports alphabetically, so the page can't see the
// order stories are written in. Record it at load time, as Storybook does.
function namedExportsOrder(): Plugin {
  return {
    name: "studio-named-exports-order",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".design.tsx") || id.endsWith(META_QUERY))
        return null;
      const names = [...code.matchAll(/^export const (\w+)/gm)]
        .map((match) => match[1])
        .filter((name) => name !== "meta");
      return {
        code: `${code}\nexport const __namedExportsOrder = ${JSON.stringify(names)};\n`,
        map: null,
      };
    },
  };
}

const META_QUERY = "?meta";

type Program = ReturnType<typeof parseAst>;
type Expression = Extract<
  Program["body"][number],
  { type: "ExpressionStatement" }
>["expression"];
type ArrayElement = Extract<
  Expression,
  { type: "ArrayExpression" }
>["elements"][number];
type PropertyValue = Extract<
  Extract<Expression, { type: "ObjectExpression" }>["properties"][number],
  { type: "Property" }
>["value"];

function isPlainLiteral(
  node: Expression | ArrayElement | PropertyValue,
): boolean {
  if (node === null) return false;
  switch (node.type) {
    case "Literal":
      return true;
    case "TemplateLiteral":
      return node.expressions.length === 0;
    case "UnaryExpression":
      return node.operator === "-" && isPlainLiteral(node.argument);
    case "ArrayExpression":
      return node.elements.every(isPlainLiteral);
    case "ObjectExpression":
      return node.properties.every(
        (property) =>
          property.type === "Property" &&
          !property.computed &&
          isPlainLiteral(property.value),
      );
    default:
      return false;
  }
}

// The sidebar needs every design file's meta up front. Importing it from the
// design module itself would pull each whole module into the main chunk, so
// `?meta` serves the meta literal alone and the pages stay lazy chunks.
function designMeta(): Plugin {
  return {
    name: "studio-design-meta",
    enforce: "pre",
    load(id) {
      if (!id.endsWith(META_QUERY)) return null;
      const file = id.slice(0, -META_QUERY.length);
      const source = readFileSync(file, "utf8");
      const program = parseAst(source, { lang: "tsx" }, file);
      const meta = program.body
        .flatMap((node) =>
          node.type === "ExportNamedDeclaration" &&
          node.declaration?.type === "VariableDeclaration"
            ? node.declaration.declarations
            : [],
        )
        .find(
          (declarator) =>
            declarator.id.type === "Identifier" &&
            declarator.id.name === "meta",
        );
      if (!meta?.init) return "export default undefined;";
      const init = meta.init;
      if (!isPlainLiteral(init)) {
        this.error(
          `${file}: \`meta\` must be a plain object literal (strings, numbers, no variables), because the studio reads it without running the file.`,
        );
      }
      return `export default ${source.slice(init.start, init.end)};`;
    },
  };
}

function dtgCli() {
  return createRequire(import.meta.url).resolve(
    "@fifthrevision/dtg/cli",
  );
}

function freePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, () => {
      const { port } = probe.address() as AddressInfo;
      probe.close(() => resolvePort(port));
    });
  });
}

function dtgDevServer(): Plugin {
  let port = 0;
  return {
    name: "studio-dtg-dev-server",
    apply: (_, env) => env.command === "serve" && env.mode === "dtg",
    async config() {
      port = await freePort();
      return {
        define: {
          "import.meta.env.VITE_DTG_URL": JSON.stringify(
            `http://localhost:${port}/`,
          ),
        },
      };
    },
    configureServer(server) {
      const dtg = spawn(
        process.execPath,
        [dtgCli(), "dev", "--build", "--port", String(port)],
        { cwd: resolve(import.meta.dirname, ".."), stdio: "inherit" },
      );
      const stop = () => dtg.kill();
      server.httpServer?.on("close", stop);
      process.on("exit", stop);
    },
  };
}

function dtgDocs(): Plugin {
  let outDir = "";
  return {
    name: "studio-dtg-docs",
    apply: "build",
    config: () => ({
      define: { "import.meta.env.VITE_DTG_URL": JSON.stringify("dtg/") },
    }),
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const docs = spawnSync(
        process.execPath,
        [dtgCli(), "docs", "--editable", "--out", resolve(outDir, "dtg")],
        { cwd: resolve(import.meta.dirname, ".."), stdio: "inherit" },
      );
      if (docs.status !== 0) throw new Error("dtg docs failed");
    },
  };
}

export default defineConfig({
  root: import.meta.dirname,
  base: "./",
  plugins: [
    designMeta(),
    namedExportsOrder(),
    tailwindcss(),
    dtgDevServer(),
    dtgDocs(),
  ],
  server: {
    port: 4400,
  },
});
