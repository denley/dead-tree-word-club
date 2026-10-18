import type { Book, StoreKey } from "@/data/types";

/*
 * Where to get each book. Search links by default (they don't rot when a listing
 * changes); a book's own `links` replace them where a direct link has been checked.
 */

const STORES: {
  key: StoreKey;
  label: string;
  search: (q: string) => string;
}[] = [
  {
    key: "amazon",
    label: "Amazon",
    search: q => `https://www.amazon.com.au/s?k=${q}&i=stripbooks`,
  },
  {
    key: "kindle",
    label: "Kindle",
    search: q => `https://www.amazon.com.au/s?k=${q}&i=digital-text`,
  },
  {
    key: "audible",
    label: "Audible",
    search: q => `https://www.audible.com.au/search?keywords=${q}`,
  },
  {
    key: "spotify",
    label: "Spotify",
    search: q => `https://open.spotify.com/search/${q}/audiobooks`,
  },
  {
    key: "goodreads",
    label: "Goodreads",
    search: q => `https://www.goodreads.com/search?q=${q}`,
  },
];

export function storeLinks(
  book: Book
): { key: StoreKey; label: string; url: string }[] {
  const q = encodeURIComponent(`${book.title} ${book.author}`);
  return STORES.map(s => ({
    key: s.key,
    label: s.label,
    url: book.links?.[s.key] ?? s.search(q),
  }));
}

/** The Spanish edition, searched for in the Australian stores (they carry Spanish editions too). */
export function spanishLinks(book: Book): { label: string; url: string }[] {
  if (!book.spanish) return [];
  const q = encodeURIComponent(`${book.spanish.title} ${book.author}`);
  return STORES.filter(
    s => s.key === "amazon" || s.key === "kindle" || s.key === "audible"
  ).map(s => ({
    label: s.label,
    url: s.search(q),
  }));
}
