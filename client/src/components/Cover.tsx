import { useState } from "react";
import type { ClubMonth } from "@/data/types";
import coverInfo from "@/data/covers.json";

/*
 * A book cover. Real covers live in client/public/covers/<slug>.jpg and are listed in
 * data/covers.json (size and tint, written by scripts/cover-info.sh). A book without one,
 * or an own-book month, gets a cloth-bound cover drawn here, so nothing ever shows a
 * broken image.
 */

type Info = { width: number; height: number; tint: string };
const covers = coverInfo as Record<string, Info>;

const CLOTH = [
  "#2d4a3e",
  "#7a2e2e",
  "#284766",
  "#5b4a2e",
  "#47355e",
  "#2f5a5a",
  "#6b3b24",
];

function cloth(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return CLOTH[h % CLOTH.length];
}

export function coverTint(m: ClubMonth): string {
  return (
    (m.book && covers[m.book.slug]?.tint) ||
    cloth(m.book?.slug ?? `own-${m.year}-${m.month}`)
  );
}

/** Width ÷ height, for laying covers out before they load. */
export function coverAspect(m: ClubMonth): number {
  const info = m.book && covers[m.book.slug];
  return info ? info.width / info.height : 2 / 3;
}

interface Props {
  month: ClubMonth;
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
}

export function Cover({ month, className = "", style, eager }: Props) {
  const book = month.book;
  const info = book && covers[book.slug];
  const [failed, setFailed] = useState(false);

  const frame = `book-sheen relative overflow-hidden rounded-[3px] ${className}`;
  const aspect = { aspectRatio: String(coverAspect(month)), ...style };

  if (book && info && !failed) {
    return (
      <div className={frame} style={aspect}>
        <img
          src={`${import.meta.env.BASE_URL}covers/${book.slug}.jpg`}
          alt={`Cover of ${book.title}`}
          width={info.width}
          height={info.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="block h-full w-full object-cover"
          style={{ backgroundColor: info.tint }}
        />
      </div>
    );
  }

  const title = book?.title ?? "Our Own Pick";
  const byline = book?.author ?? "to be announced";
  return (
    <div
      className={`${frame} @container`}
      style={{ ...aspect, backgroundColor: coverTint(month) }}
      role="img"
      aria-label={book ? `Cover of ${book.title}` : "Own-book month"}
    >
      {/* Cloth weave */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 4px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 4px)",
        }}
      />
      <div className="absolute inset-[5cqw] rounded-[2px] border border-gold/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-between px-[10cqw] py-[13cqw] text-center">
        <span className="h-px w-1/3 bg-gold/70" />
        <span
          className="font-display font-semibold leading-[1.1] text-gold"
          style={{ fontSize: book ? "12cqw" : "15cqw" }}
        >
          {title}
        </span>
        <span
          className="font-ui uppercase tracking-[0.15em] text-cream/75"
          style={{ fontSize: "6.5cqw" }}
        >
          {byline}
        </span>
      </div>
    </div>
  );
}
