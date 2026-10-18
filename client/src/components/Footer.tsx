import { CalendarPlus, Download } from "lucide-react";

export function Footer() {
  // webcal:// makes phones and Calendar apps subscribe (and keep checking) rather than import once.
  const feed = new URL("meetings.ics", window.location.href);
  const webcal = feed.href.replace(/^https?:/, "webcal:");

  return (
    <footer className="library-wall text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            Never miss a meeting
          </h2>
          <p className="mt-2 max-w-md font-body leading-relaxed text-cream/70">
            Subscribe to the club calendar and every meeting turns up on your
            phone as soon as it's set, and moves if the plan changes.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 font-ui text-sm">
            <a
              href={webcal}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-semibold text-forest-deep transition hover:bg-[#e2bb6a]"
            >
              <CalendarPlus size={16} /> Subscribe
            </a>
            <a
              href={feed.href}
              download="dead-tree-word-club.ics"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-cream/85 transition hover:border-cream/60"
            >
              <Download size={15} /> Download .ics
            </a>
          </div>
        </div>
        <div className="font-ui text-sm text-cream/50 md:text-right">
          <p className="font-display text-lg text-cream/85">
            Dead Tree <span className="text-gold">Word Club</span>
          </p>
          <p className="mt-1">Reading together since January 2026.</p>
          <p className="mt-1">
            Books on loan from the library, opinions entirely our own.
          </p>
        </div>
      </div>
    </footer>
  );
}
