import path from "node:path";
import { defineConfig } from "vitest/config";

// Imagens estáticas viram o mesmo objeto que o Next entrega (src, width, height).
const imagensEstaticas = {
  name: "imagens-estaticas",
  enforce: "pre" as const,
  load(id: string) {
    if (/\.(webp|png|jpe?g|avif)$/.test(id)) {
      return `export default { src: ${JSON.stringify(id)}, width: 1280, height: 800 };`;
    }
  },
};

export default defineConfig({
  plugins: [imagensEstaticas],
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "src/test/server-only.ts"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    env: { NEXT_PUBLIC_APP_URL: "http://localhost:3000" },
  },
});
