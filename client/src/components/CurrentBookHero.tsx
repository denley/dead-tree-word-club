/*
 * CurrentBookHero — Book Club 2026
 * Prominently displays the current month's book right after the hero,
 * so visitors see all details without scrolling to the timeline.
 * Design: warm parchment card, forest green accents, sienna highlights.
 */

import { useState } from "react";
import { BookMonth, getDaysUntilMeeting, formatDateDisplay } from "@/data/books";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  BookOpen,
  Headphones,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Library,
  Music,
} from "lucide-react";

interface Props {
  book: BookMonth;
}

export function CurrentBookHero({ book }: Props) {
  const [showSpanish, setShowSpanish] = useState(false);
  const daysUntil = getDaysUntilMeeting(book.meetingDate);
  const isPast = daysUntil !== null && daysUntil < 0;
  const isToday = daysUntil === 0;

  return (
    <motion.section
      className="container py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{ backgroundColor: "#FDFAF5" }}
      >
        {/* Header bar with month and countdown */}
        <div
          className="px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3"
          style={{ backgroundColor: "#2D4A3E" }}
        >
          <div className="flex items-center gap-3">
            <BookOpen size={20} style={{ color: "#D4A853" }} />
            <span
              className="font-ui text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(245,240,232,0.6)" }}
            >
              Now Reading — {book.month}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isToday ? (
              <span
                className="font-display text-lg font-bold"
                style={{ color: "#D4A853" }}
              >
                Meeting Today!
              </span>
            ) : isPast ? (
              <span
                className="font-ui text-sm"
                style={{ color: "rgba(245,240,232,0.7)" }}
              >
                Meeting passed — keep reading!
              </span>
            ) : daysUntil !== null ? (
              <span className="flex items-center gap-2">
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: "#D4A853" }}
                >
                  {daysUntil}
                </span>
                <span
                  className="font-ui text-xs"
                  style={{ color: "rgba(245,240,232,0.7)" }}
                >
                  {daysUntil === 1 ? "day" : "days"} until
                  <br />
                  meeting
                </span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Cover image — large and prominent */}
            <div className="flex-shrink-0 self-start flex justify-center lg:justify-start">
              <div
                className="relative rounded-xl overflow-hidden shadow-lg inline-block"
                style={{ width: "200px" }}
              >
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Book details */}
            <div className="flex-1 min-w-0">
              <h2
                className="font-display text-3xl sm:text-4xl font-bold leading-snug mb-2"
                style={{ color: "#2D4A3E" }}
              >
                {book.title}
              </h2>
              <p
                className="font-body text-lg mb-1"
                style={{ color: "#C4572A" }}
              >
                {book.author}
              </p>
              <p
                className="font-body text-sm italic mb-4"
                style={{ color: "#8B7E70" }}
              >
                {book.authorBio}
              </p>

              {/* Blurb — fully visible for current book */}
              <p
                className="font-body text-base leading-relaxed mb-6"
                style={{ color: "#4A4340" }}
              >
                {book.blurb}
              </p>

              {/* Meeting & Library Info */}
              <div
                className="rounded-lg p-4 mb-5"
                style={{ backgroundColor: "rgba(45,74,62,0.05)" }}
              >
                <div
                  className="flex flex-wrap gap-x-6 gap-y-3 font-ui text-sm"
                  style={{ color: "#4A4340" }}
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} style={{ color: "#2D4A3E" }} />
                    <span className="font-medium">Meeting:</span>
                    {book.meetingDateConfirmed ? (
                      <span className="font-medium">
                        {formatDateDisplay(book.meetingDate)}
                        {book.meetingTime && (
                          <span className="ml-1">{book.meetingTime}</span>
                        )}
                      </span>
                    ) : (
                      <span className="italic">
                        {formatDateDisplay(book.meetingDate)}
                        <span
                          className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: "rgba(212,168,83,0.2)",
                            color: "#9A7B2E",
                          }}
                        >
                          tentative
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} style={{ color: "#2D4A3E" }} />
                    <span className="font-medium">Venue:</span>
                    {book.meetingVenueConfirmed ? (
                      <span className="font-medium">{book.meetingVenue}</span>
                    ) : (
                      <span className="italic" style={{ color: "#8B7E70" }}>
                        TBD
                      </span>
                    )}
                  </span>
                </div>
                <div
                  className="flex flex-wrap gap-x-6 gap-y-2 font-ui text-xs mt-3"
                  style={{ color: "#8B7E70" }}
                >
                  <span className="flex items-center gap-1.5">
                    <Library size={13} />
                    Library pickup: {book.pickupDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Library size={13} />
                    Return by: {book.returnDate}
                  </span>
                </div>
              </div>

              {/* Purchase & Listen Links */}
              <div className="mb-4">
                <p
                  className="font-ui text-xs uppercase tracking-wider mb-2.5 font-medium"
                  style={{ color: "#6B5E50" }}
                >
                  Get the Book
                </p>
                <div className="flex flex-wrap gap-2">
                  {book.links.amazon && (
                    <LinkPill
                      href={book.links.amazon}
                      icon={<ShoppingCart size={13} />}
                      label="Amazon"
                    />
                  )}
                  {book.links.kindle && (
                    <LinkPill
                      href={book.links.kindle}
                      icon={<BookOpen size={13} />}
                      label="Kindle"
                    />
                  )}
                  {book.links.audible && (
                    <LinkPill
                      href={book.links.audible}
                      icon={<Headphones size={13} />}
                      label="Audible"
                    />
                  )}
                  {book.links.spotify && (
                    <LinkPill
                      href={book.links.spotify}
                      icon={<Music size={13} />}
                      label="Spotify"
                    />
                  )}
                  {book.links.bookshop && (
                    <LinkPill
                      href={book.links.bookshop}
                      icon={<ShoppingCart size={13} />}
                      label="Bookshop.org"
                    />
                  )}
                </div>
              </div>

              {/* Spanish section */}
              {book.spanish.available && (
                <div>
                  <button
                    onClick={() => setShowSpanish(!showSpanish)}
                    className="font-ui text-xs flex items-center gap-1 hover:underline"
                    style={{ color: "#8B7E70" }}
                  >
                    <span>Edición en español</span>
                    {book.spanish.title && book.spanish.title !== book.title && (
                      <span className="italic">({book.spanish.title})</span>
                    )}
                    {showSpanish ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                  </button>
                  {showSpanish && (
                    <motion.div
                      className="flex flex-wrap gap-2 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                    >
                      {book.spanish.amazon && (
                        <LinkPill
                          href={book.spanish.amazon}
                          icon={<ShoppingCart size={12} />}
                          label="Amazon (ES)"
                          small
                        />
                      )}
                      {book.spanish.kindle && (
                        <LinkPill
                          href={book.spanish.kindle}
                          icon={<BookOpen size={12} />}
                          label="Kindle (ES)"
                          small
                        />
                      )}
                      {book.spanish.audible && (
                        <LinkPill
                          href={book.spanish.audible}
                          icon={<Headphones size={12} />}
                          label="Audible (ES)"
                          small
                        />
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function LinkPill({
  href,
  icon,
  label,
  small,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors no-underline ${
        small ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-2 text-xs"
      }`}
      style={{
        borderColor: "#D5CFC4",
        color: "#4A4340",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#2D4A3E";
        e.currentTarget.style.color = "#2D4A3E";
        e.currentTarget.style.backgroundColor = "rgba(45,74,62,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#D5CFC4";
        e.currentTarget.style.color = "#4A4340";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {icon}
      {label}
      <ExternalLink size={small ? 9 : 10} style={{ opacity: 0.5 }} />
    </a>
  );
}
