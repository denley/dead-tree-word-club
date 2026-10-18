/*
 * Where the club is up to, worked out from the data rather than the calendar month.
 *
 * A month's book counts as discussed once its meeting day has passed. When no meeting has
 * been recorded we fall back to the kit's return date plus a week's grace (meetings have
 * landed anywhere from two weeks before to a few days after the return date). The book
 * being read is the earliest one not yet discussed, so the site doesn't jump to the next
 * book just because the month has turned.
 *
 * Imported by vite.config.ts too, so relative imports only (no "@/").
 */

import type { ClubMonth, ISODate, Meeting } from "../data/types";

export const GRACE_DAYS = 7;
const DAY = 86_400_000;

export type Status = "discussed" | "current" | "upcoming";

/** Today's date where the reader is (the club is in Adelaide, and so are its readers). */
export function todayISO(now = new Date()): ISODate {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** Noon UTC on the day, so arithmetic never trips over DST. */
export function parseISO(iso: ISODate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function addDays(iso: ISODate, days: number): ISODate {
  return new Date(parseISO(iso).getTime() + days * DAY)
    .toISOString()
    .slice(0, 10);
}

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from: ISODate, to: ISODate): number {
  return Math.round((parseISO(to).getTime() - parseISO(from).getTime()) / DAY);
}

export const monthId = (m: Pick<ClubMonth, "year" | "month">) =>
  `${m.year}-${String(m.month).padStart(2, "0")}`;

export function isDiscussed(m: ClubMonth, today: ISODate): boolean {
  if (m.meeting) return m.meeting.date < today;
  return addDays(m.returnBy, GRACE_DAYS) < today;
}

/** Index of the book the club is reading now (the last one once everything is done). */
export function currentIndex(calendar: ClubMonth[], today: ISODate): number {
  const i = calendar.findIndex(m => !isDiscussed(m, today));
  return i === -1 ? calendar.length - 1 : i;
}

export function statusAt(
  index: number,
  current: number,
  calendar: ClubMonth[],
  today: ISODate
): Status {
  if (index === current)
    return isDiscussed(calendar[index], today) ? "discussed" : "current";
  return index < current ? "discussed" : "upcoming";
}

/** The soonest meeting that hasn't happened yet (today counts). */
export function nextMeeting(
  calendar: ClubMonth[],
  today: ISODate
): { month: ClubMonth; meeting: Meeting } | undefined {
  return calendar
    .filter(m => m.meeting && m.meeting.date >= today)
    .map(m => ({ month: m, meeting: m.meeting! }))
    .sort((a, b) => a.meeting.date.localeCompare(b.meeting.date))[0];
}

export type KitState =
  | { kind: "waiting"; days: number }
  | { kind: "out"; daysLeft: number }
  | { kind: "returned" };

export function kitState(m: ClubMonth, today: ISODate): KitState {
  if (today < m.pickup)
    return { kind: "waiting", days: daysBetween(today, m.pickup) };
  if (today <= m.returnBy)
    return { kind: "out", daysLeft: daysBetween(today, m.returnBy) };
  return { kind: "returned" };
}

// ── Formatting ────────────────────────────────────────────────────────────────

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthName = (m: Pick<ClubMonth, "month">) => MONTHS[m.month - 1];

export function formatDate(
  iso: ISODate,
  style: "long" | "short" | "weekday" = "long"
): string {
  const opts: Intl.DateTimeFormatOptions =
    style === "long"
      ? { weekday: "long", day: "numeric", month: "long", year: "numeric" }
      : style === "weekday"
        ? { weekday: "short", day: "numeric", month: "short" }
        : { day: "numeric", month: "short" };
  return parseISO(iso).toLocaleDateString("en-AU", {
    ...opts,
    timeZone: "UTC",
  });
}

/** "16:30" → "4:30pm", "10:00" → "10am". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m
    ? `${h12}:${String(m).padStart(2, "0")}${suffix}`
    : `${h12}${suffix}`;
}

export function formatTimeRange(meeting: Meeting): string | undefined {
  if (!meeting.start) return undefined;
  return meeting.end
    ? `${formatTime(meeting.start)} – ${formatTime(meeting.end)}`
    : formatTime(meeting.start);
}

/** "today", "tomorrow", "in 12 days", "3 days ago". */
export function relativeDays(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  if (days > 0)
    return days < 14 ? `in ${days} days` : `in ${Math.round(days / 7)} weeks`;
  return -days < 14
    ? `${-days} days ago`
    : `${Math.round(-days / 7)} weeks ago`;
}
