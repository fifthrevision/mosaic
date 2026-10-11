import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  root: import.meta.dirname,
  plugins: [tailwindcss()],
  server: {
    port: 4400,
  },
});
