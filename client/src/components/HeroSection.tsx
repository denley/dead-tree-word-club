/*
 * HeroSection — Book Club 2026
 * Full-width hero with the reading nook image, warm overlay, and title.
 * Dark background image → light text.
 */

import { ASSET_URLS } from "@/data/books";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "60vh" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ASSET_URLS.hero}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,74,62,0.55) 0%, rgba(43,43,43,0.65) 60%, rgba(245,240,232,1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center justify-center text-center" style={{ minHeight: "60vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="font-ui text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(245,240,232,0.8)" }}
          >
            A Year of Shared Reading
          </p>
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            style={{ color: "#F5F0E8" }}
          >
            Dead Tree
            <br />
            <span style={{ color: "#D4A853" }}>Word Club</span>
          </h1>
          <p
            className="font-body text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(245,240,232,0.85)" }}
          >
            Twelve months of carefully chosen books.
            <br className="hidden sm:block" />
            Monthly gatherings. One chapter at a time, together.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(245,240,232,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
