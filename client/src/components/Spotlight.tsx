import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CalendarPlus,
  Clock,
  ExternalLink,
  Library,
  MapPin,
} from "lucide-react";
import type { ClubMonth, ISODate } from "@/data/types";
import { buildCalendar } from "@/lib/ics";
import {
  libraryLinks,
  spanishLibraryLinks,
  spanishLinks,
  storeLinks,
} from "@/lib/links";
import {
  daysBetween,
  formatDate,
  formatTimeRange,
  kitState,
  monthId,
  monthName,
  relativeDays,
  type Status,
} from "@/lib/schedule";
import { Cover, coverTint } from "./Cover";

interface Props {
  calendar: ClubMonth[];
  statuses: Status[];
  index: number;
  direction: number;
  today: ISODate;
  onSelect: (index: number) => void;
}

export function Spotlight({
  calendar,
  statuses,
  index,
  direction,
  today,
  onSelect,
}: Props) {
  const month = calendar[index];
  return (
    <section
      id="spotlight"
      aria-live="polite"
      className="relative overflow-hidden rounded-[28px] bg-card shadow-[0_30px_60px_-30px_rgb(27_47_39/0.45)] ring-1 ring-black/5"
    >
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={monthId(month)}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Feature month={month} status={statuses[index]} today={today} />
        </motion.div>
      </AnimatePresence>
      <Neighbours
        calendar={calendar}
        statuses={statuses}
        index={index}
        onSelect={onSelect}
      />
    </section>
  );
}

function Feature({
  month,
  status,
  today,
}: {
  month: ClubMonth;
  status: Status;
  today: ISODate;
}) {
  const book = month.book;
  const tint = coverTint(month);
  return (
    // Phones: a small cover beside the title, details full width below.
    // Wider: the cover gets its own column alongside everything.
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-5 gap-y-7 p-5 sm:grid-cols-[10rem_1fr] sm:gap-x-8 sm:p-10 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-x-12 lg:p-12">
      {/* Cover, lit from behind in its own colour */}
      <div className="relative self-start md:row-span-2">
        <div
          className="absolute -inset-6 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: tint }}
          aria-hidden
        />
        <div className="relative [perspective:900px]">
          <div className="transition-transform duration-500 [transform:rotateY(-9deg)] hover:[transform:rotateY(0)]">
            <Cover
              month={month}
              eager
              className="w-full shadow-[18px_24px_40px_-18px_rgb(0_0_0/0.55),2px_2px_0_rgb(0_0_0/0.05)]"
            />
          </div>
        </div>
        {book && (book.published || book.pages) && (
          <p className="relative mt-5 text-center font-ui text-xs tracking-wide text-muted max-md:hidden">
            {[
              book.published && `First published ${book.published}`,
              book.pages && `${book.pages} pages`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>

      <div className="min-w-0 self-center md:self-start">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-ui text-[11px] uppercase tracking-[0.2em] sm:text-xs">
          <StatusChip month={month} status={status} today={today} />
          <span className="text-muted">
            {monthName(month)} {month.year}
          </span>
          {month.ownBook && (
            <span className="text-muted max-sm:hidden">· Our own pick</span>
          )}
        </div>

        <h2 className="font-display text-[1.7rem] font-bold leading-[1.08] text-forest text-balance sm:text-5xl">
          {book?.title ?? "Our own pick"}
        </h2>
        <p className="mt-2 font-body text-lg text-sienna sm:text-xl">
          {book ? book.author : "To be announced"}
        </p>
      </div>

      <div className="col-span-2 min-w-0 md:col-span-1 md:col-start-2">
        <div className="grid gap-3 sm:grid-cols-2">
          <MeetingPanel month={month} status={status} today={today} />
          <KitPanel month={month} today={today} />
        </div>

        {book ? (
          <>
            <p className="mt-8 font-body text-[1.07rem] leading-[1.75] text-ink-soft text-pretty first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-forest">
              {book.blurb}
            </p>
            {book.authorBio && (
              <p className="mt-5 border-l-2 border-gold/60 pl-4 font-body text-[0.95rem] italic leading-relaxed text-muted">
                {book.authorBio}
              </p>
            )}
            <Links month={month} />
          </>
        ) : (
          <p className="mt-8 max-w-prose font-body text-[1.07rem] leading-[1.75] text-ink-soft">
            The library's list leaves this month to us, so there's no kit to
            collect. Once we've chosen the book it will show up here, with a
            link to grab a copy.
          </p>
        )}
      </div>
    </div>
  );
}

function StatusChip({
  month,
  status,
  today,
}: {
  month: ClubMonth;
  status: Status;
  today: ISODate;
}) {
  const waiting = today < month.pickup;
  const { label, cls } =
    status === "current"
      ? waiting
        ? { label: "Up next", cls: "bg-gold/20 text-[#8a6a22]" }
        : { label: "Now reading", cls: "bg-sienna text-cream" }
      : status === "discussed"
        ? { label: "Discussed", cls: "bg-forest/10 text-forest" }
        : { label: "Coming up", cls: "bg-paper-deep text-muted" };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold ${cls}`}
    >
      {status === "current" && !waiting && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-cream/80" />
          <span className="relative inline-flex size-1.5 rounded-full bg-cream" />
        </span>
      )}
      {label}
    </span>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line/80 bg-paper/60 p-4">
      <p className="mb-3 flex items-center gap-2 font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        {icon}
        {title}
      </p>
      {children}
    </div>
  );
}

function MeetingPanel({
  month,
  status,
  today,
}: {
  month: ClubMonth;
  status: Status;
  today: ISODate;
}) {
  const meeting = month.meeting;

  if (!meeting) {
    return (
      <Panel icon={<CalendarPlus size={13} />} title="Meeting">
        <div className="flex items-center gap-4">
          <DateTile />
          <div className="font-ui text-sm leading-snug">
            {status === "discussed" ? (
              <p className="text-muted">
                Done and dusted. The date wasn't recorded here.
              </p>
            ) : (
              <>
                <p className="font-semibold text-ink">Date to be decided</p>
                <p className="mt-0.5 text-muted">
                  It'll appear here once it's set.
                </p>
              </>
            )}
          </div>
        </div>
      </Panel>
    );
  }

  const days = daysBetween(today, meeting.date);
  const time = formatTimeRange(meeting);
  const past = days < 0;
  return (
    <Panel
      icon={<CalendarPlus size={13} />}
      title={past ? "We met" : "Meeting"}
    >
      <div className="flex items-start gap-4">
        <DateTile date={meeting.date} muted={past} />
        <div className="min-w-0 font-ui text-sm leading-snug">
          <p className="font-semibold text-ink">
            {formatDate(meeting.date)}
            {meeting.tentative && (
              <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-[#8a6a22]">
                tentative
              </span>
            )}
          </p>
          {time && (
            <p className="mt-1 flex items-center gap-1.5 text-ink-soft">
              <Clock size={13} className="shrink-0 text-muted" /> {time}
            </p>
          )}
          {meeting.venue && (
            <p className="mt-1 flex items-center gap-1.5 text-ink-soft">
              <MapPin size={13} className="shrink-0 text-muted" />{" "}
              {meeting.venue}
            </p>
          )}
          {!past && (
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={
                  days <= 7 ? "font-semibold text-sienna" : "text-muted"
                }
              >
                {days === 0 ? "Today!" : relativeDays(days)}
              </span>
              <a
                href={`data:text/calendar;charset=utf-8,${encodeURIComponent(buildCalendar([month]))}`}
                download={`dead-tree-word-club-${monthId(month)}.ics`}
                className="inline-flex items-center gap-1 text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
              >
                <CalendarPlus size={13} /> Add to calendar
              </a>
            </p>
          )}
          {meeting.note && <p className="mt-2 text-muted">{meeting.note}</p>}
        </div>
      </div>
    </Panel>
  );
}

/** A tear-off calendar page; a question mark until there's a date. */
function DateTile({ date, muted }: { date?: string; muted?: boolean }) {
  const d = date ? new Date(`${date}T12:00:00Z`) : undefined;
  const part = (o: Intl.DateTimeFormatOptions) =>
    d!.toLocaleDateString("en-AU", { ...o, timeZone: "UTC" });
  return (
    <div
      className={`w-[58px] shrink-0 overflow-hidden rounded-lg bg-card text-center shadow-sm ring-1 ring-line ${muted ? "opacity-60" : ""}`}
    >
      <div
        className={`py-0.5 font-ui text-[10px] font-bold uppercase tracking-widest text-cream ${d ? "bg-sienna" : "bg-muted/60"}`}
      >
        {d ? part({ month: "short" }) : "TBD"}
      </div>
      <div className="font-display text-[1.7rem] font-bold leading-[1.15] text-forest">
        {d ? part({ day: "numeric" }) : "?"}
      </div>
      <div className="pb-1 font-ui text-[10px] uppercase tracking-wider text-muted">
        {d ? part({ weekday: "short" }) : " "}
      </div>
    </div>
  );
}

function KitPanel({ month, today }: { month: ClubMonth; today: ISODate }) {
  if (month.ownBook) {
    return (
      <Panel icon={<BookMarked size={13} />} title="Own-book month">
        <p className="font-ui text-sm leading-snug text-ink-soft">
          No library kit this month: everyone finds their own copy.
        </p>
      </Panel>
    );
  }
  const kit = kitState(month, today);
  return (
    <Panel icon={<Library size={13} />} title="Library kit">
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-ui text-sm">
        <dt className="text-muted">Pick up</dt>
        <dd className="text-ink">
          {formatDate(month.pickup, "weekday")}
          {kit.kind === "waiting" && (
            <span className="text-muted"> · {relativeDays(kit.days)}</span>
          )}
        </dd>
        <dt className="text-muted">Return</dt>
        <dd className="text-ink">
          {formatDate(month.returnBy, "weekday")}
          {kit.kind === "out" && (
            <span
              className={
                kit.daysLeft <= 7 ? "font-semibold text-sienna" : "text-muted"
              }
            >
              {" "}
              ·{" "}
              {kit.daysLeft === 0
                ? "due today"
                : `${relativeDays(kit.daysLeft).replace("in ", "")} left`}
            </span>
          )}
          {kit.kind === "returned" && (
            <span className="text-muted"> · returned</span>
          )}
        </dd>
      </dl>
    </Panel>
  );
}

function Links({ month }: { month: ClubMonth }) {
  const book = month.book!;
  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        {storeLinks(book).map(l => (
          <Pill key={l.key} href={l.url} label={l.label} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 font-ui text-sm">
        <span className="mr-1 text-muted">
          Borrow free with a library card:
        </span>
        {libraryLinks(book).map(l => (
          <Pill key={l.url} href={l.url} label={l.label} small />
        ))}
      </div>
      {book.spanish && (
        <div className="flex flex-wrap items-center gap-2 font-ui text-sm">
          <span className="mr-1 text-muted">
            En español:{" "}
            <i className="font-body text-ink-soft">{book.spanish.title}</i>
          </span>
          {[...spanishLinks(book), ...spanishLibraryLinks(book)].map(l => (
            <Pill key={l.url} href={l.url} label={l.label} small />
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({
  href,
  label,
  small,
}: {
  href: string;
  label: string;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-card font-ui text-ink-soft transition hover:-translate-y-px hover:border-forest hover:text-forest hover:shadow-sm ${
        small ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-[13px]"
      }`}
    >
      {label}
      <ExternalLink size={small ? 10 : 11} className="opacity-50" />
    </a>
  );
}

function Neighbours({
  calendar,
  statuses,
  index,
  onSelect,
}: {
  calendar: ClubMonth[];
  statuses: Status[];
  index: number;
  onSelect: (i: number) => void;
}) {
  const side = (i: number, dir: "prev" | "next") => {
    const m = calendar[i];
    if (!m) return <div />;
    const caption =
      statuses[i] === "current"
        ? "Now reading"
        : statuses[i] === "discussed"
          ? "Discussed"
          : "Coming up";
    return (
      <button
        type="button"
        onClick={() => onSelect(i)}
        className={`group flex min-w-0 items-center gap-4 p-5 text-left transition hover:bg-paper/70 sm:px-8 ${
          dir === "next" ? "flex-row-reverse text-right" : ""
        }`}
      >
        {dir === "prev" ? (
          <ArrowLeft
            size={18}
            className="shrink-0 text-muted transition group-hover:-translate-x-1 group-hover:text-forest"
          />
        ) : (
          <ArrowRight
            size={18}
            className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-forest"
          />
        )}
        <Cover month={m} className="h-16 shrink-0 shadow-md max-sm:hidden" />
        <span className="min-w-0">
          <span className="block font-ui text-[11px] uppercase tracking-[0.18em] text-muted">
            {monthName(m).slice(0, 3)} {m.year} · {caption}
          </span>
          <span className="block truncate font-display text-lg font-semibold text-forest">
            {m.book?.title ?? "Our own pick"}
          </span>
        </span>
      </button>
    );
  };
  return (
    <nav
      aria-label="Neighbouring books"
      className="grid grid-cols-2 divide-x divide-line border-t border-line"
    >
      {side(index - 1, "prev")}
      {side(index + 1, "next")}
    </nav>
  );
}
