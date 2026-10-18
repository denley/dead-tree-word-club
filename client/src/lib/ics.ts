/*
 * iCalendar output: the subscribable meetings.ics feed (built by vite.config.ts) and the
 * single-event files behind "Add to calendar". Relative imports only (used by the config).
 */

import type { ClubMonth } from "../data/types";
import { addDays, monthId, monthName } from "./schedule";

const TZ = "Australia/Adelaide";
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZ}`,
  "BEGIN:STANDARD",
  "DTSTART:19700405T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU",
  "TZOFFSETFROM:+1030",
  "TZOFFSETTO:+0930",
  "TZNAME:ACST",
  "END:STANDARD",
  "BEGIN:DAYLIGHT",
  "DTSTART:19701004T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU",
  "TZOFFSETFROM:+0930",
  "TZOFFSETTO:+1030",
  "TZNAME:ACDT",
  "END:DAYLIGHT",
  "END:VTIMEZONE",
];

const escape = (s: string) =>
  s.replace(/[\\;,]/g, c => `\\${c}`).replace(/\n/g, "\\n");
const compactDate = (iso: string) => iso.replace(/-/g, "");
const compactTime = (hhmm: string) => `${hhmm.replace(":", "")}00`;

/** Default length when only a start time is known. */
function plusTwoHours(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return `${String(Math.min(h + 2, 23)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** RFC 5545 folds lines longer than 75 octets. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = " " + rest.slice(74);
  }
  out.push(rest);
  return out.join("\r\n");
}

function event(m: ClubMonth, stamp: string): string[] {
  const meeting = m.meeting!;
  const what = m.book
    ? `${m.book.title} by ${m.book.author}`
    : "own-book month";
  const lines = [
    "BEGIN:VEVENT",
    `UID:${monthId(m)}@dead-tree-word-club`,
    `DTSTAMP:${stamp}`,
    `SUMMARY:${escape(`Dead Tree Word Club: ${m.book?.title ?? "Own book"}`)}`,
    `DESCRIPTION:${escape(`${monthName(m)} ${m.year} book: ${what}.${meeting.note ? `\n${meeting.note}` : ""}`)}`,
  ];
  if (meeting.start) {
    lines.push(
      `DTSTART;TZID=${TZ}:${compactDate(meeting.date)}T${compactTime(meeting.start)}`,
      `DTEND;TZID=${TZ}:${compactDate(meeting.date)}T${compactTime(meeting.end ?? plusTwoHours(meeting.start))}`
    );
  } else {
    lines.push(
      `DTSTART;VALUE=DATE:${compactDate(meeting.date)}`,
      `DTEND;VALUE=DATE:${compactDate(addDays(meeting.date, 1))}`
    );
  }
  if (meeting.venue) lines.push(`LOCATION:${escape(meeting.venue)}`);
  lines.push(
    `STATUS:${meeting.tentative ? "TENTATIVE" : "CONFIRMED"}`,
    "END:VEVENT"
  );
  return lines;
}

export function buildCalendar(months: ClubMonth[], now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dead Tree Word Club//Meetings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Dead Tree Word Club",
    `X-WR-TIMEZONE:${TZ}`,
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
    ...VTIMEZONE,
    ...months.filter(m => m.meeting).flatMap(m => event(m, stamp)),
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
