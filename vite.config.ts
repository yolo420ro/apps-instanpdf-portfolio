import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// base:"./" => relative asset paths so the build works from any docroot
// (apps.instanpdf.ro root on Cyberfolks).
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
