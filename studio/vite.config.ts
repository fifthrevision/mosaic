import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

// Module namespaces list exports alphabetically, so the page can't see the
// order stories are written in. Record it at load time, as Storybook does.
function namedExportsOrder(): Plugin {
  return {
    name: "studio-named-exports-order",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".design.tsx")) return null;
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

export default defineConfig({
  root: import.meta.dirname,
  plugins: [namedExportsOrder(), tailwindcss()],
  server: {
    port: 4400,
  },
});
