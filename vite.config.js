import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.js",
    passWithNoTests: true,
  },
});
