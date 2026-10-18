import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ClubMonth } from "@/data/types";
import {
  formatDate,
  formatTimeRange,
  monthId,
  monthName,
  type Status,
} from "@/lib/schedule";
import { Cover } from "./Cover";

/* The whole year at a glance, one tab per year, like the library's list but nicer. */

interface Props {
  calendar: ClubMonth[];
  statuses: Status[];
  selected: number;
  onSelect: (index: number) => void;
}

export function ReadingList({ calendar, statuses, selected, onSelect }: Props) {
  const years = [...new Set(calendar.map(m => m.year))];
  const selectedYear = calendar[selected].year;
  const [year, setYear] = useState(selectedYear);
  useEffect(() => setYear(selectedYear), [selectedYear]);
  const rows = calendar
    .map((m, i) => ({ m, i }))
    .filter(r => r.m.year === year);
  const done = rows.filter(r => statuses[r.i] === "discussed").length;

  return (
    <section id="list" className="scroll-mt-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-ui text-xs uppercase tracking-[0.25em] text-sienna">
            The reading list
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
            A year of books
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Year"
          className="flex rounded-full bg-paper-deep p-1 font-ui text-sm"
        >
          {years.map(y => (
            <button
              key={y}
              role="tab"
              aria-selected={y === year}
              onClick={() => setYear(y)}
              className={`relative rounded-full px-4 py-1.5 transition-colors ${y === year ? "text-cream" : "text-muted hover:text-ink"}`}
            >
              {y === year && (
                <motion.span
                  layoutId="year-pill"
                  className="absolute inset-0 rounded-full bg-forest"
                />
              )}
              <span className="relative">{y}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center gap-4 font-ui text-sm text-muted">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-deep">
          <motion.div
            className="h-full rounded-full bg-forest"
            initial={false}
            animate={{ width: `${(done / rows.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <span>
          {done} of {rows.length} discussed
        </span>
      </div>

      <ol className="overflow-hidden rounded-2xl bg-card ring-1 ring-line">
        {rows.map(({ m, i }) => (
          <li
            key={monthId(m)}
            className="border-b border-line/70 last:border-0"
          >
            <Row
              month={m}
              status={statuses[i]}
              selected={i === selected}
              onClick={() => onSelect(i)}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Row({
  month,
  status,
  selected,
  onClick,
}: {
  month: ClubMonth;
  status: Status;
  selected: boolean;
  onClick: () => void;
}) {
  const meeting = month.meeting;
  const when = meeting
    ? [formatDate(meeting.date, "weekday"), formatTimeRange(meeting)]
        .filter(Boolean)
        .join(", ")
    : status === "discussed"
      ? "Not recorded"
      : "Date TBD";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className={`grid w-full grid-cols-[3.2rem_2.6rem_1fr] items-center gap-x-4 px-4 py-3 text-left transition sm:grid-cols-[5.5rem_2.8rem_1fr_13rem_6.5rem] sm:px-6 ${
        selected ? "bg-gold/12" : "hover:bg-paper/80"
      } ${status === "discussed" ? "text-muted" : ""}`}
    >
      <span className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        <span className="sm:hidden">{monthName(month).slice(0, 3)}</span>
        <span className="max-sm:hidden">{monthName(month)}</span>
      </span>
      <Cover
        month={month}
        className={`w-full shadow ${status === "discussed" ? "opacity-80" : ""}`}
      />
      <span className="min-w-0">
        <span
          className={`block truncate font-display text-lg font-semibold ${status === "discussed" ? "text-ink-soft" : "text-forest"}`}
        >
          {month.book?.title ?? "Our own pick"}
        </span>
        <span className="block truncate font-body text-sm text-muted">
          {month.book?.author ?? "to be announced"}
          <span className="sm:hidden"> · {when}</span>
        </span>
      </span>
      <span className="truncate font-ui text-sm max-sm:hidden">
        {when}
        {meeting?.venue && (
          <span className="block truncate text-xs text-muted">
            {meeting.venue}
          </span>
        )}
      </span>
      <span className="justify-self-end max-sm:hidden">
        <RowStatus status={status} />
      </span>
    </button>
  );
}

function RowStatus({ status }: { status: Status }) {
  if (status === "discussed")
    return (
      <span className="inline-flex items-center gap-1 font-ui text-xs text-forest/70">
        <Check size={13} /> Discussed
      </span>
    );
  if (status === "current")
    return (
      <span className="rounded-full bg-sienna px-2.5 py-1 font-ui text-xs font-semibold text-cream">
        Reading
      </span>
    );
  return <span className="font-ui text-xs text-muted">Coming up</span>;
}
