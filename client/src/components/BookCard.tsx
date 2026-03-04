/*
 * BookCard — Book Club 2026
 * Each month's book displayed as an editorial card with cover, blurb, links.
 * Alternating layout (cover left/right) on desktop. Timeline dot in center.
 * Design: warm parchment card, forest green accents, sienna highlights.
 */

import { useState } from "react";
import { BookMonth, getBookStatus, formatDateDisplay } from "@/data/books";
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
  Check,
  Clock,
} from "lucide-react";

interface Props {
  book: BookMonth;
  index: number;
}

export function BookCard({ book, index }: Props) {
  const [showSpanish, setShowSpanish] = useState(false);
  const [blurbExpanded, setBlurbExpanded] = useState(false);
  const status = getBookStatus(book);
  const isEven = index % 2 === 0;

  if (book.isTBA) {
    return <TBACard book={book} index={index} />;
  }

  const statusConfig = {
    completed: {
      label: "Completed",
      color: "#2D4A3E",
      bgColor: "rgba(45,74,62,0.1)",
      icon: <Check size={12} />,
    },
    current: {
      label: "Now Reading",
      color: "#C4572A",
      bgColor: "rgba(196,87,42,0.1)",
      icon: <BookOpen size={12} />,
    },
    upcoming: {
      label: "Upcoming",
      color: "#8B7E70",
      bgColor: "rgba(139,126,112,0.1)",
      icon: <Clock size={12} />,
    },
  };

  const sc = statusConfig[status];

  return (
    <motion.div
      className="relative mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Timeline dot (desktop) */}
      <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <div
          className="w-5 h-5 rounded-full border-[3px]"
          style={{
            borderColor: sc.color,
            backgroundColor: status === "completed" ? sc.color : "#F5F0E8",
          }}
        />
      </div>

      {/* Card */}
      <div
        className={`lg:w-[46%] ${isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}
      >
        <div
          className="rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
          style={{ backgroundColor: "#FDFAF5" }}
        >
          {/* Month header */}
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ backgroundColor: "rgba(45,74,62,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-display text-2xl font-bold"
                style={{ color: "#2D4A3E" }}
              >
                {book.month}
              </span>
              <span
                className="font-ui text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: sc.bgColor, color: sc.color }}
              >
                {sc.icon}
                {sc.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Cover */}
              <div className="flex-shrink-0 sm:w-36">
                <div
                  className="relative rounded-lg overflow-hidden shadow-md mx-auto sm:mx-0"
                  style={{ width: "144px" }}
                >
                  <img
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-auto object-cover"
                    style={{ minHeight: "200px", backgroundColor: "#EDE8DD" }}
                    loading="lazy"
                  />
                  {status === "current" && (
                    <div
                      className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-ui font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: "#C4572A", color: "#F5F0E8" }}
                    >
                      Reading
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-display text-xl sm:text-2xl font-bold leading-snug mb-1"
                  style={{ color: "#2D4A3E" }}
                >
                  {book.title}
                </h3>
                <p className="font-body text-base mb-1" style={{ color: "#C4572A" }}>
                  {book.author}
                </p>
                <p className="font-body text-xs italic mb-3" style={{ color: "#8B7E70" }}>
                  {book.authorBio}
                </p>

                {/* Blurb */}
                <div className="mb-4">
                  <p
                    className={`font-body text-sm leading-relaxed ${
                      !blurbExpanded ? "line-clamp-3" : ""
                    }`}
                    style={{ color: "#4A4340" }}
                  >
                    {book.blurb}
                  </p>
                  {book.blurb.length > 180 && (
                    <button
                      onClick={() => setBlurbExpanded(!blurbExpanded)}
                      className="font-ui text-xs mt-1 flex items-center gap-0.5 hover:underline"
                      style={{ color: "#C4572A" }}
                    >
                      {blurbExpanded ? (
                        <>
                          Show less <ChevronUp size={12} />
                        </>
                      ) : (
                        <>
                          Read more <ChevronDown size={12} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Meeting & Library Info */}
                <div
                  className="rounded-lg p-3 mb-4"
                  style={{ backgroundColor: "rgba(45,74,62,0.04)" }}
                >
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-ui text-sm" style={{ color: "#4A4340" }}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} style={{ color: "#2D4A3E" }} />
                      <span className="font-medium">Meeting:</span>
                      {book.meetingDateConfirmed ? (
                        <span>{formatDateDisplay(book.meetingDate)}</span>
                      ) : (
                        <span className="italic">
                          {formatDateDisplay(book.meetingDate)}
                          <span
                            className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: "rgba(212,168,83,0.2)", color: "#9A7B2E" }}
                          >
                            tentative
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} style={{ color: "#2D4A3E" }} />
                      <span className="font-medium">Venue:</span>
                      {book.meetingVenueConfirmed ? (
                        <span>{book.meetingVenue}</span>
                      ) : (
                        <span className="italic" style={{ color: "#8B7E70" }}>
                          TBD
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-ui text-xs mt-2" style={{ color: "#8B7E70" }}>
                    <span className="flex items-center gap-1.5">
                      <Library size={12} />
                      Pickup: {book.pickupDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Library size={12} />
                      Return: {book.returnDate}
                    </span>
                  </div>
                </div>

                {/* Purchase Links */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {book.links.amazon && (
                    <LinkPill href={book.links.amazon} icon={<ShoppingCart size={12} />} label="Amazon" />
                  )}
                  {book.links.kindle && (
                    <LinkPill href={book.links.kindle} icon={<BookOpen size={12} />} label="Kindle" />
                  )}
                  {book.links.audible && (
                    <LinkPill href={book.links.audible} icon={<Headphones size={12} />} label="Audible" />
                  )}
                  {book.links.bookshop && (
                    <LinkPill href={book.links.bookshop} icon={<ShoppingCart size={12} />} label="Bookshop.org" />
                  )}
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
                      {showSpanish ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {showSpanish && (
                      <motion.div
                        className="flex flex-wrap gap-2 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                      >
                        {book.spanish.amazon && (
                          <LinkPill href={book.spanish.amazon} icon={<ShoppingCart size={12} />} label="Amazon (ES)" small />
                        )}
                        {book.spanish.kindle && (
                          <LinkPill href={book.spanish.kindle} icon={<BookOpen size={12} />} label="Kindle (ES)" small />
                        )}
                        {book.spanish.audible && (
                          <LinkPill href={book.spanish.audible} icon={<Headphones size={12} />} label="Audible (ES)" small />
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TBACard({ book, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Timeline dot */}
      <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <div
          className="w-5 h-5 rounded-full border-[3px]"
          style={{ borderColor: "#C4B99A", backgroundColor: "#F5F0E8" }}
        />
      </div>

      <div className={`lg:w-[46%] ${isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}>
        <div
          className="rounded-xl overflow-hidden shadow-md"
          style={{ backgroundColor: "#FDFAF5", borderStyle: "dashed", borderWidth: "2px", borderColor: "#C4B99A" }}
        >
          <div
            className="px-5 py-3"
            style={{ backgroundColor: "rgba(45,74,62,0.04)" }}
          >
            <span className="font-display text-2xl font-bold" style={{ color: "#2D4A3E" }}>
              {book.month}
            </span>
          </div>
          <div className="p-6 text-center">
            <div
              className="w-20 h-28 mx-auto rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: "#EDE8DD" }}
            >
              <BookOpen size={32} style={{ color: "#C4B99A" }} />
            </div>
            <p className="font-display text-lg italic" style={{ color: "#8B7E70" }}>
              To be announced
            </p>
            <p className="font-body text-sm mt-1" style={{ color: "#A89F91" }}>
              Check back for the November book selection
            </p>
            <div className="font-ui text-xs mt-4" style={{ color: "#A89F91" }}>
              <span className="flex items-center justify-center gap-1.5">
                <Library size={12} />
                Pickup: {book.pickupDate} · Return: {book.returnDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
        small ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
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
