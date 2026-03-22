/*
 * NextMeeting — Book Club 2026
 * Shows a countdown to the next meeting with book info.
 * Design: warm card with forest green accent.
 */

import { BookMonth, getDaysUntilMeeting, formatDateDisplay } from "@/data/books";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Props {
  book: BookMonth;
}

export function NextMeeting({ book }: Props) {
  const daysUntil = getDaysUntilMeeting(book.meetingDate);
  const isPast = daysUntil !== null && daysUntil < 0;
  const isToday = daysUntil === 0;

  return (
    <motion.section
      className="container py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="rounded-xl overflow-hidden shadow-lg"
        style={{ backgroundColor: "#2D4A3E" }}
      >
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Left: countdown */}
            <div className="flex-shrink-0 text-center sm:text-left">
              {isToday ? (
                <div>
                  <p className="font-display text-4xl sm:text-5xl font-bold" style={{ color: "#D4A853" }}>
                    Today!
                  </p>
                  <p className="font-ui text-sm mt-1" style={{ color: "rgba(245,240,232,0.7)" }}>
                    Meeting day
                  </p>
                </div>
              ) : isPast ? (
                <div>
                  <p className="font-display text-2xl font-bold" style={{ color: "#D4A853" }}>
                    Currently Reading
                  </p>
                </div>
              ) : daysUntil !== null ? (
                <div>
                  <p className="font-display text-5xl sm:text-6xl font-bold" style={{ color: "#D4A853" }}>
                    {daysUntil}
                  </p>
                  <p className="font-ui text-sm mt-1" style={{ color: "rgba(245,240,232,0.7)" }}>
                    {daysUntil === 1 ? "day" : "days"} until next meeting
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-display text-2xl font-bold" style={{ color: "#D4A853" }}>
                    Up Next
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block w-px self-stretch"
              style={{ backgroundColor: "rgba(245,240,232,0.2)" }}
            />

            {/* Right: book info */}
            <div className="flex-1">
              <p className="font-ui text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(245,240,232,0.5)" }}>
                {book.month} Read
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1" style={{ color: "#F5F0E8" }}>
                {book.title}
              </h3>
              <p className="font-body text-base mb-4" style={{ color: "rgba(245,240,232,0.75)" }}>
                by {book.author}
              </p>

              <div className="flex flex-wrap gap-4 font-ui text-sm" style={{ color: "rgba(245,240,232,0.7)" }}>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {book.meetingDateConfirmed ? (
                    <span>
                      {formatDateDisplay(book.meetingDate)}
                      {book.meetingTime && (
                        <span className="ml-1">{book.meetingTime}</span>
                      )}
                    </span>
                  ) : (
                    <span className="italic">
                      {formatDateDisplay(book.meetingDate)}
                      <span
                        className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(212,168,83,0.25)", color: "#D4A853" }}
                      >
                        tentative
                      </span>
                    </span>
                  )}
                </span>
                {book.meetingVenueConfirmed && book.meetingVenue !== "TBD" && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {book.meetingVenue}
                  </span>
                )}
                {!book.meetingVenueConfirmed && (
                  <span className="flex items-center gap-1.5 italic">
                    <MapPin size={14} />
                    Venue TBD
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
