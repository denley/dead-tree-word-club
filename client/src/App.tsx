import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { CalendarDays, CornerUpLeft } from "lucide-react";
import { calendar } from "@/data/club";
import {
  currentIndex,
  formatDate,
  formatTimeRange,
  monthId,
  nextMeeting,
  statusAt,
  todayISO,
} from "@/lib/schedule";
import { Shelf } from "@/components/Shelf";
import { Spotlight } from "@/components/Spotlight";
import { ReadingList } from "@/components/ReadingList";
import { Footer } from "@/components/Footer";

/** Today's date, re-read when the tab comes back so a page left open overnight moves on. */
function useToday() {
  const [today, setToday] = useState(todayISO);
  useEffect(() => {
    const refresh = () =>
      document.visibilityState === "visible" && setToday(todayISO());
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, []);
  return today;
}

const indexFromHash = () => {
  const i = calendar.findIndex(m => `#${monthId(m)}` === window.location.hash);
  return i === -1 ? undefined : i;
};

export default function App() {
  const today = useToday();
  const current = useMemo(() => currentIndex(calendar, today), [today]);
  const statuses = useMemo(
    () => calendar.map((_, i) => statusAt(i, current, calendar, today)),
    [current, today]
  );
  const upcoming = useMemo(() => nextMeeting(calendar, today), [today]);

  const [selected, setSelected] = useState(() => indexFromHash() ?? current);
  const [direction, setDirection] = useState(0);

  const select = useCallback(
    (i: number) => {
      if (i < 0 || i >= calendar.length) return;
      setDirection(Math.sign(i - selected));
      setSelected(i);
      // The plain address always opens on the current book; other books get a shareable link.
      const url =
        i === current
          ? window.location.pathname + window.location.search
          : `#${monthId(calendar[i])}`;
      window.history.replaceState(null, "", url);
    },
    [current, selected]
  );

  useEffect(() => {
    const onHash = () => {
      const i = indexFromHash();
      if (i !== undefined) select(i);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [select]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        (e.target as HTMLElement).closest("input, textarea")
      )
        return;
      if (e.key === "ArrowLeft") select(selected - 1);
      if (e.key === "ArrowRight") select(selected + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select, selected]);

  const pickFromList = (i: number) => {
    select(i);
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <header id="top" className="library-wall text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-x-6 gap-y-4 px-5 pt-6 sm:px-8 sm:pt-8">
          <Brand />
          <NextMeetingCard upcoming={upcoming} onSelect={select} />
        </div>

        <Shelf
          calendar={calendar}
          statuses={statuses}
          selected={selected}
          onSelect={select}
        />

        <div className="flex h-28 items-start justify-center pt-2">
          <AnimatePresence>
            {selected !== current && (
              <motion.button
                type="button"
                onClick={() => select(current)}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest-deep/60 px-4 py-1.5 font-ui text-sm text-gold backdrop-blur transition hover:border-gold hover:bg-forest"
              >
                <CornerUpLeft size={14} />
                Back to what we're reading
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="paper-grain">
        <div className="relative mx-auto -mt-14 max-w-6xl px-3 sm:px-8">
          <Spotlight
            calendar={calendar}
            statuses={statuses}
            index={selected}
            direction={direction}
            today={today}
            onSelect={select}
          />
        </div>
        <div className="mx-auto max-w-6xl px-3 py-16 sm:px-8 sm:py-24">
          <ReadingList
            calendar={calendar}
            statuses={statuses}
            selected={selected}
            onSelect={pickFromList}
          />
        </div>
      </main>

      <Footer />
    </MotionConfig>
  );
}

function Brand() {
  return (
    <a href="./" className="group flex items-center gap-3">
      <svg
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M24 13c-5-4-12-5-18-4v27c6-1 13 0 18 4 5-4 12-5 18-4V9c-6-1-13 0-18 4Z"
          stroke="#D4A853"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M24 13v27" stroke="#D4A853" strokeWidth="2" />
        <path d="M30 6v13l3-2 3 2V6.6" fill="#B84F25" />
      </svg>
      <span>
        <span className="block font-display text-xl font-semibold leading-tight tracking-wide sm:text-2xl">
          Dead Tree <span className="text-gold">Word Club</span>
        </span>
        <span className="block font-ui text-[11px] uppercase tracking-[0.22em] text-cream/50">
          A book a month, together
        </span>
      </span>
    </a>
  );
}

function NextMeetingCard({
  upcoming,
  onSelect,
}: {
  upcoming: ReturnType<typeof nextMeeting>;
  onSelect: (i: number) => void;
}) {
  const label = (
    <span className="block font-ui text-[10px] uppercase tracking-[0.22em] text-cream/50">
      Next meeting
    </span>
  );
  if (!upcoming) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-cream/[0.04] px-4 py-2.5">
        <CalendarDays size={20} className="text-cream/40" />
        <span>
          {label}
          <span className="font-ui text-sm text-cream/80">
            Date to be decided
          </span>
        </span>
      </div>
    );
  }
  const { month, meeting } = upcoming;
  const time = formatTimeRange(meeting);
  return (
    <button
      type="button"
      onClick={() => onSelect(calendar.indexOf(month))}
      className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/[0.08] px-4 py-2.5 text-left transition hover:border-gold/70"
    >
      <CalendarDays size={20} className="text-gold" />
      <span>
        {label}
        <span className="font-ui text-sm text-cream">
          {formatDate(meeting.date, "weekday")}
          {time && `, ${time}`}
          {meeting.venue && (
            <span className="text-cream/60"> · {meeting.venue}</span>
          )}
        </span>
      </span>
    </button>
  );
}
