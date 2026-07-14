import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      "@/lib/db": resolve(__dirname, "./src/stubs/db-mock.ts"),
      "@": resolve(__dirname, "./src"),
      "@tanstack/react-start/server": resolve(__dirname, "./src/stubs/react-start-mock.ts"),
      "@tanstack/react-start": resolve(__dirname, "./src/stubs/react-start-mock.ts"),
    },
  },
  build: {
    outDir: "dist-spa",
    emptyOutDir: true,
  },
});
