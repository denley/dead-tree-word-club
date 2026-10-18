import { describe, expect, it } from "vitest";
import { calendar } from "../data/club";
import type { ClubMonth } from "../data/types";
import { buildCalendar } from "./ics";
import {
  addDays,
  currentIndex,
  formatTime,
  isDiscussed,
  kitState,
  monthId,
  nextMeeting,
  statusAt,
} from "./schedule";

const month = (n: number, extra: Partial<ClubMonth> = {}): ClubMonth => ({
  year: 2027,
  month: n,
  pickup: `2027-${String(n).padStart(2, "0")}-01`,
  returnBy: `2027-${String(n + 1).padStart(2, "0")}-10`,
  ...extra,
});

describe("what the club is reading", () => {
  it("stays on a book until its meeting, even once the next month starts", () => {
    const cal = [month(1, { meeting: { date: "2027-02-07" } }), month(2)];
    expect(currentIndex(cal, "2027-02-03")).toBe(0);
    expect(currentIndex(cal, "2027-02-07")).toBe(0); // meeting day itself
    expect(currentIndex(cal, "2027-02-08")).toBe(1);
  });

  it("moves on a week after the kit is due back when no meeting was recorded", () => {
    const cal = [month(1), month(2)]; // January's kit due 10 Feb
    expect(currentIndex(cal, "2027-02-17")).toBe(0);
    expect(currentIndex(cal, "2027-02-18")).toBe(1);
  });

  it("a recorded meeting beats the fallback either way", () => {
    expect(
      isDiscussed(month(1, { meeting: { date: "2027-01-20" } }), "2027-01-25")
    ).toBe(true);
    expect(
      isDiscussed(month(1, { meeting: { date: "2027-03-01" } }), "2027-02-25")
    ).toBe(false);
  });

  it("labels before, now and after", () => {
    const cal = [
      month(1, { meeting: { date: "2027-01-31" } }),
      month(2),
      month(3),
    ];
    const cur = currentIndex(cal, "2027-02-05");
    expect([0, 1, 2].map(i => statusAt(i, cur, cal, "2027-02-05"))).toEqual([
      "discussed",
      "current",
      "upcoming",
    ]);
  });

  it("ends on the last book once everything is done", () => {
    const cal = [month(1), month(2)];
    expect(currentIndex(cal, "2028-01-01")).toBe(1);
    expect(statusAt(1, 1, cal, "2028-01-01")).toBe("discussed");
  });

  it("finds the next meeting, today included", () => {
    const cal = [
      month(1, { meeting: { date: "2027-02-01" } }),
      month(2, { meeting: { date: "2027-03-01" } }),
    ];
    expect(nextMeeting(cal, "2027-02-01")?.month.month).toBe(1);
    expect(nextMeeting(cal, "2027-02-02")?.month.month).toBe(2);
    expect(nextMeeting(cal, "2027-03-02")).toBeUndefined();
  });
});

describe("the real calendar", () => {
  it("is in order with one entry per month", () => {
    const ids = calendar.map(monthId);
    expect([...ids].sort()).toEqual(ids);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no missing months", () => {
    calendar.slice(1).forEach((m, i) => {
      const prev = calendar[i];
      expect(m.year * 12 + m.month, monthId(m)).toBe(
        prev.year * 12 + prev.month + 1
      );
    });
  });

  it("has sane dates", () => {
    for (const m of calendar) {
      expect(m.pickup < m.returnBy, monthId(m)).toBe(true);
      for (const d of [m.pickup, m.returnBy, m.meeting?.date].filter(Boolean))
        expect(d, monthId(m)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("every month that isn't an open own-book month has a book", () => {
    for (const m of calendar)
      if (!m.ownBook) expect(m.book, monthId(m)).toBeDefined();
  });

  it("is reading Hamnet in mid-October 2026", () => {
    expect(calendar[currentIndex(calendar, "2026-10-18")].book?.title).toBe(
      "Hamnet"
    );
  });
});

describe("helpers", () => {
  it("adds days across month ends", () => {
    expect(addDays("2026-12-28", 7)).toBe("2027-01-04");
  });

  it("formats times", () => {
    expect(formatTime("10:00")).toBe("10am");
    expect(formatTime("16:30")).toBe("4:30pm");
    expect(formatTime("12:00")).toBe("12pm");
  });

  it("tracks the library kit", () => {
    const m = month(3);
    expect(kitState(m, "2027-02-27")).toEqual({ kind: "waiting", days: 2 });
    expect(kitState(m, "2027-04-01")).toEqual({ kind: "out", daysLeft: 9 });
    expect(kitState(m, "2027-04-11")).toEqual({ kind: "returned" });
  });

  it("builds a valid calendar feed", () => {
    const ics = buildCalendar(calendar, new Date("2026-10-18T00:00:00Z"));
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("DTSTART;TZID=Australia/Adelaide:20260712T100000");
    expect(ics).toContain("DTEND;VALUE=DATE:20260202");
    expect(ics.split("\r\n").every(l => l.length <= 75)).toBe(true);
  });
});
