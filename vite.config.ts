import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project Pages: https://matheuspereira64.github.io/Wedding---M-B/
// Workflow uploads this outDir via actions/upload-pages-artifact (not repo root).
// O subcaminho só vale no build/preview (GitHub Pages). Em dev o site fica na raiz
// (http://localhost:5173). BASE_PATH permite outro destino, ex.: "/" no Amplify.
const prodBase = process.env.BASE_PATH ?? "/Wedding---M-B/";

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === "build" || isPreview ? prodBase : "/",
  build: {
    outDir: "docs",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      // A área dos noivos é uma página separada para não pesar no convite.
      input: {
        main: "index.html",
        admin: "admin.html",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
}));
