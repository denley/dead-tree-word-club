/*
 * Home Page — Dead Tree Word Club 2026
 * Design: "The Reading Room" — Arts & Crafts / Bookish Warmth
 * Warm parchment, forest green, burnt sienna. Editorial scroll layout.
 * Current book displayed prominently at top without scrolling.
 * Current month also appears in the full timeline for visual clarity.
 */

import { useEffect, useRef, useState } from "react";
import { books, ASSET_URLS, getBookStatus, getCurrentMonthIndex } from "@/data/books";
import { HeroSection } from "@/components/HeroSection";
import { YearProgress } from "@/components/YearProgress";
import { BookCard } from "@/components/BookCard";
import { Footer } from "@/components/Footer";
import { CurrentBookHero } from "@/components/CurrentBookHero";

export default function Home() {
  const currentMonthIndex = getCurrentMonthIndex();
  const currentRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Find the current or next upcoming book (not TBA)
  const currentBook = books.find(
    (b) => !b.isNoMeeting && !b.isTBA && getBookStatus(b) === "current"
  );
  const nextUpcoming = books.find(
    (b) => !b.isNoMeeting && !b.isTBA && getBookStatus(b) === "upcoming"
  );
  const highlightBook = currentBook || nextUpcoming;

  // All books for the progress bar and timeline
  const allBooks = books;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      {/* Sticky nav on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-ui ${
          hasScrolled
            ? "bg-[#F5F0E8]/95 backdrop-blur-sm shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 no-underline">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={hasScrolled ? "#2D4A3E" : "#F5F0E8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
            <span
              className="font-display text-lg font-semibold tracking-wide transition-colors duration-500"
              style={{ color: hasScrolled ? "#2D4A3E" : "#F5F0E8" }}
            >
              Dead Tree Word Club
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a
              href="#current-book"
              className="transition-colors duration-500 no-underline"
              style={{ color: hasScrolled ? "#2D4A3E" : "#F5F0E8" }}
            >
              Current
            </a>
            <a
              href="#progress"
              className="transition-colors duration-500 no-underline"
              style={{ color: hasScrolled ? "#2D4A3E" : "#F5F0E8" }}
            >
              Progress
            </a>
            <a
              href="#books"
              className="transition-colors duration-500 no-underline"
              style={{ color: hasScrolled ? "#2D4A3E" : "#F5F0E8" }}
            >
              All Books
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div id="top">
        <HeroSection />
      </div>

      {/* Current Book — prominently displayed */}
      {highlightBook && (
        <div id="current-book">
          <CurrentBookHero book={highlightBook} />
        </div>
      )}

      {/* Year Progress */}
      <div id="progress">
        <YearProgress books={allBooks} />
      </div>

      {/* Divider */}
      <div className="flex justify-center py-4">
        <img
          src={ASSET_URLS.divider}
          alt=""
          className="w-64 sm:w-80 opacity-70"
          loading="lazy"
        />
      </div>

      {/* Book List — all months including current */}
      <section id="books" className="container pb-16">
        <h2
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-2"
          style={{ color: "#2D4A3E" }}
        >
          Our Reading List
        </h2>
        <p className="text-center font-body text-base mb-12" style={{ color: "#6B5E50" }}>
          Twelve months of shared stories
        </p>

        <div className="relative">
          {/* Timeline spine */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: "#C4B99A" }}
          />

          {allBooks.map((book, index) => (
            <div
              key={book.month}
              ref={book.monthIndex === currentMonthIndex ? currentRef : undefined}
            >
              <BookCard book={book} index={index} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
