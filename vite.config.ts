import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import { calendar } from "./client/src/data/club";
import { buildCalendar } from "./client/src/lib/ics";

/**
 * Publishes the club's meetings as a subscribable calendar at ./meetings.ics
 * (built from the same data as the page, so it is never out of step).
 */
function meetingsCalendar(): Plugin {
  const ics = () => buildCalendar(calendar);
  return {
    name: "meetings-calendar",
    configureServer(server) {
      server.middlewares.use("/meetings.ics", (_req, res) => {
        res.setHeader("Content-Type", "text/calendar; charset=utf-8");
        res.end(ics());
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "meetings.ics", source: ics() });
    },
  };
}

export default defineConfig({
  // Relative asset URLs: the same build works at the root of a host
  // (bookclub.denley.me) and under a sub-path (GitHub Pages).
  base: "./",
  plugins: [react(), tailwindcss(), meetingsCalendar()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
  },
  test: {
    root: import.meta.dirname,
    include: ["client/src/**/*.test.ts"],
  },
});
