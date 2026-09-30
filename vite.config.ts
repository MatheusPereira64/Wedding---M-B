import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Project Pages: https://matheuspereira64.github.io/Wedding---M-B/
// Workflow uploads this outDir via actions/upload-pages-artifact (not repo root).
export default defineConfig({
  plugins: [react()],
  base: "/Wedding---M-B/",
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
});
