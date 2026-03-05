/*
 * Footer — Book Club 2026
 * Simple, warm footer with the book pattern background.
 * Design: forest green background, cream text.
 */

import { ASSET_URLS } from "@/data/books";
import { BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#2D4A3E" }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${ASSET_URLS.bookPattern})`,
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 container py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen size={20} style={{ color: "#D4A853" }} />
          <span
            className="font-display text-lg font-semibold"
            style={{ color: "#F5F0E8" }}
          >
            Dead Tree Word Club
          </span>
        </div>
        <p
          className="font-body text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          A year of shared stories, lively discussions, and the joy of reading together.
        </p>
        <div
          className="mt-6 pt-6 flex items-center justify-center gap-1 font-ui text-xs"
          style={{
            borderTop: "1px solid rgba(245,240,232,0.1)",
            color: "rgba(245,240,232,0.4)",
          }}
        >
          Made with <Heart size={12} style={{ color: "#C4572A" }} /> for our book club
        </div>
      </div>
    </footer>
  );
}
