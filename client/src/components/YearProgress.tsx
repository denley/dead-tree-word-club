/*
 * YearProgress — Book Club 2026
 * Horizontal progress bar showing the year's reading journey.
 * Completed months filled in forest green, current in amber, upcoming in muted.
 */

import { BookMonth, getBookStatus } from "@/data/books";
import { motion } from "framer-motion";

interface Props {
  books: BookMonth[];
}

export function YearProgress({ books }: Props) {
  const completedCount = books.filter((b) => getBookStatus(b) === "completed").length;
  const totalBooks = books.filter((b) => !b.isNoMeeting && !b.isTBA).length;
  const progress = totalBooks > 0 ? (completedCount / totalBooks) * 100 : 0;

  return (
    <motion.section
      className="container py-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xl font-semibold" style={{ color: "#2D4A3E" }}>
            Reading Journey
          </h3>
          <span className="font-ui text-sm" style={{ color: "#6B5E50" }}>
            {completedCount} of {totalBooks} books completed
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="relative h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: "#DDD5C8" }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: "#2D4A3E" }}
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>

        {/* Month dots */}
        <div className="flex justify-between mt-4">
          {books.map((book) => {
            const status = getBookStatus(book);
            const dotColor =
              status === "completed"
                ? "#2D4A3E"
                : status === "current"
                ? "#D4A853"
                : "#C4B99A";
            const textColor =
              status === "current" ? "#2D4A3E" : "#8B7E70";

            return (
              <div key={book.month} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: dotColor,
                    boxShadow: status === "current" ? "0 0 0 3px rgba(212,168,83,0.3)" : "none",
                  }}
                />
                <span
                  className="font-ui text-[10px] sm:text-xs"
                  style={{
                    color: textColor,
                    fontWeight: status === "current" ? 600 : 400,
                  }}
                >
                  {book.month.slice(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
