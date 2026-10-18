import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { ClubMonth } from "@/data/types";
import { MONTHS, monthId, monthName, type Status } from "@/lib/schedule";
import { Cover } from "./Cover";

/*
 * Every book of every year standing on one long shelf, kept scrolled so the selected
 * book sits in the middle with the ones before and after it on either side.
 */

interface Props {
  calendar: ClubMonth[];
  statuses: Status[];
  selected: number;
  onSelect: (index: number) => void;
}

export function Shelf({ calendar, statuses, selected, onSelect }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<number, HTMLButtonElement>());
  const placed = useRef(false);
  const reduceMotion = useReducedMotion();

  const centre = (smooth: boolean) => {
    const box = scroller.current;
    const el = items.current.get(selected);
    if (!box || !el) return;
    box.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - box.clientWidth / 2,
      behavior: smooth && !reduceMotion ? "smooth" : "auto",
    });
  };

  useLayoutEffect(() => {
    centre(placed.current);
    placed.current = true;
  }, [selected]);

  useEffect(() => {
    const onResize = () => centre(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar fade-edges relative flex overflow-x-auto overscroll-x-contain pt-6"
        role="listbox"
        aria-label="The club's books, month by month"
        aria-orientation="horizontal"
      >
        <EndSpace />
        {calendar.map((m, i) => (
          <Fragment key={monthId(m)}>
            {(i === 0 || calendar[i - 1].year !== m.year) && (
              <YearBookend year={m.year} />
            )}
            <ShelfBook
              month={m}
              status={statuses[i]}
              selected={i === selected}
              onClick={() => onSelect(i)}
              ref={el => {
                if (el) items.current.set(i, el);
                else items.current.delete(i);
              }}
            />
          </Fragment>
        ))}
        <EndSpace />
      </div>

      <StepButton
        side="left"
        disabled={selected === 0}
        onClick={() => onSelect(selected - 1)}
      />
      <StepButton
        side="right"
        disabled={selected === calendar.length - 1}
        onClick={() => onSelect(selected + 1)}
      />
    </div>
  );
}

const COVER_AREA = "h-[150px] sm:h-[196px]";
const COVER_HEIGHT = "h-[118px] sm:h-[156px]";

function ShelfBook({
  month,
  status,
  selected,
  onClick,
  ref,
}: {
  month: ClubMonth;
  status: Status;
  selected: boolean;
  onClick: () => void;
  ref: (el: HTMLButtonElement | null) => void;
}) {
  const label = month.book
    ? `${month.book.title} by ${month.book.author}`
    : "Own-book month";
  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={selected}
      aria-label={`${monthName(month)} ${month.year}: ${label}${status === "current" ? " (now reading)" : ""}`}
      onClick={onClick}
      className="group flex shrink-0 flex-col outline-none"
    >
      <div
        className={`flex items-end justify-center px-2 sm:px-3 ${COVER_AREA}`}
      >
        <motion.div
          className={`relative ${COVER_HEIGHT}`}
          animate={{ y: selected ? -16 : 0, scale: selected ? 1.1 : 1 }}
          whileHover={{ y: selected ? -16 : -6 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          style={{ originY: 1 }}
        >
          <Cover
            month={month}
            className={`h-full transition-[filter,box-shadow] duration-300 ${
              selected
                ? "shadow-[0_18px_30px_-8px_rgb(0_0_0/0.7),0_0_0_2px_var(--color-gold)]"
                : "shadow-[0_8px_16px_-6px_rgb(0_0_0/0.65)]"
            } ${status === "discussed" && !selected ? "brightness-[.72] saturate-[.6] group-hover:brightness-100 group-hover:saturate-100" : ""}`}
            eager={selected}
          />
          {status === "current" && <Ribbon />}
          {status === "discussed" && (
            <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-forest text-gold shadow ring-2 ring-forest-deep">
              <Check size={12} strokeWidth={3} />
            </span>
          )}
        </motion.div>
      </div>
      <div className="plank" />
      <div className="plank-shadow -mb-2" />
      <span
        className={`h-6 text-center font-ui text-[11px] uppercase tracking-[0.18em] transition-colors ${
          status === "current"
            ? "font-semibold text-gold"
            : selected
              ? "text-cream"
              : "text-cream/45 group-hover:text-cream/80"
        }`}
      >
        {MONTHS[month.month - 1].slice(0, 3)}
      </span>
    </button>
  );
}

/** The bookmark hanging out of the book being read. */
function Ribbon() {
  return (
    <span
      className="absolute -top-2 right-3 h-10 w-3 bg-sienna shadow-md"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)" }}
      aria-hidden
    />
  );
}

function YearBookend({ year }: { year: number }) {
  return (
    <div className="flex shrink-0 flex-col" aria-hidden>
      <div
        className={`flex items-end justify-center px-3 sm:px-5 ${COVER_AREA}`}
      >
        <span className="rotate-180 pb-2 font-display text-3xl font-semibold tracking-wide text-gold/70 [writing-mode:vertical-rl] sm:text-4xl">
          {year}
        </span>
      </div>
      <div className="plank" />
      <div className="plank-shadow -mb-2" />
      <span className="h-6" />
    </div>
  );
}

/** Plank either side of the books, so the first and last can still be centred. */
function EndSpace() {
  return (
    <div className="flex w-[calc(50vw-70px)] shrink-0 flex-col" aria-hidden>
      <div className={COVER_AREA} />
      <div className="plank" />
      <div className="plank-shadow -mb-2" />
      <span className="h-6" />
    </div>
  );
}

function StepButton({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous book" : "Next book"}
      className={`absolute top-[42%] hidden -translate-y-1/2 place-items-center rounded-full border border-cream/15 bg-forest-deep/70 p-2.5 text-cream/80 backdrop-blur transition hover:border-gold/60 hover:text-gold disabled:opacity-0 sm:grid ${
        side === "left" ? "left-3 lg:left-6" : "right-3 lg:right-6"
      }`}
    >
      <Icon size={22} />
    </button>
  );
}
