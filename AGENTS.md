# Dead Tree Word Club

The book club's website: what we're reading now, when we next meet, and the whole list, year by
year. A static single page (Vite + React + Tailwind), no backend.

- Public: https://denley.github.io/dead-tree-word-club/ (GitHub Pages, deployed by
  `.github/workflows/deploy.yml` on every push to `main`). This is the link to share with the club.
- Home server (tailnet only): https://bookclub.denley.me/ and
  https://homebox.jaguar-munsell.ts.net/bookclub/. A timer there redeploys within 15 minutes of a
  push to `main`; details in `~/server/dead-tree-word-club/AGENTS.md` on homebox.

## Updating the club's details

Everything lives in `client/src/data/club.ts` (types and field notes in `data/types.ts`).

- **A meeting is arranged:** add `meeting` to that month, e.g.
  `meeting: { date: "2026-11-08", start: "10:00", end: "12:30", venue: "Mia and Shaun's House" }`.
  `start`/`end` are 24-hour and optional; `tentative: true` marks a date that's floated but not
  locked in. Leave `meeting` out until something is actually arranged: the site shows "Date to
  be decided" rather than a guess. The meeting also lands in the calendar feed.
- **The month a book "belongs" to is the library's month**, even when the meeting is in the next
  calendar month (January's book met on 1 February).
- **An own-book month gets its book:** add `book` to it (keep `ownBook: true`, which hides the
  library-kit panel).
- **A new year's list:** append twelve months (dates from the library sheet, ISO format), add a
  cover per book as `client/public/covers/<slug>.jpg` (portrait, ~600px wide), then run
  `scripts/cover-info.sh` to refresh `client/src/data/covers.json` (size + glow colour). A book
  with no cover gets a drawn cloth cover automatically.
- Then `pnpm test` (it checks the calendar is in order and complete) and push to `main`.

## How "now reading" is worked out (`client/src/lib/schedule.ts`)

Not from the calendar month. A book counts as discussed once its meeting day has passed; with no
meeting recorded, once the kit's return date plus a week has passed. The current book is the
earliest one not yet discussed, so the site doesn't jump ahead while a meeting is still to come.
The page opens on that book (centred on the shelf, previous and next beside it); `#2027-03`
style links open a specific month.

## Pieces

- `client/src/components/Shelf.tsx`: every book on one scrolling shelf; `Spotlight.tsx`: the
  selected book in full; `ReadingList.tsx`: per-year list; `Cover.tsx`: covers and the drawn
  fallback.
- `client/src/lib/ics.ts`: iCalendar output. `vite.config.ts` publishes `meetings.ics` (the
  subscribable feed in the footer) from the same data, and each upcoming meeting has an "Add to
  calendar" link.
- `client/src/lib/links.ts`: store links. Search links by default; a book's `links` override
  them only with direct links that have been checked.
- All images are in the repo. Never hot-link covers from elsewhere: the original site's images
  were on a CDN that started returning 403, which is why every picture vanished.
- `base: "./"` in `vite.config.ts` makes asset URLs relative, so one build works at a domain root
  and under a sub-path.

## Commands

`pnpm dev` · `pnpm test` · `pnpm check` (types) · `pnpm build` (to `dist/`). Use
`corepack pnpm ...` on homebox.
