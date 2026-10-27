import type { Book, LibraryCopies, StoreKey } from "@/data/types";

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

/*
 * The SA Public Library Network: one card, one catalogue and one collection in each app
 * for every council library in the state.
 */
const LIBBY = "sapln";
const BORROWBOX = "librariessa";
const CATALOGUE = (q: string) =>
  `https://onecard.network/client/en_AU/sapubliclibraries/search/results?qu=${q}`;

const FORMATS = ["ebook", "audiobook"] as const;

function copyLinks(copies: LibraryCopies): { label: string; url: string }[] {
  return [
    ...FORMATS.flatMap(f => {
      const id = copies.libby?.[f];
      return id
        ? [
            {
              label: `Libby ${f}`,
              url: `https://libbyapp.com/library/${LIBBY}/everything/page-1/${id}`,
            },
          ]
        : [];
    }),
    ...FORMATS.flatMap(f => {
      const id = copies.borrowbox?.[f];
      return id
        ? [
            {
              label: `BorrowBox ${f}`,
              url: `https://${BORROWBOX}.borrowbox.com/product/${id}`,
            },
          ]
        : [];
    }),
  ];
}

/**
 * Borrowing the book: straight to each ebook and audiobook copy in Libby and BorrowBox
 * (searches there if the book hasn't been checked yet), plus the catalogue for print.
 */
export function libraryLinks(book: Book): { label: string; url: string }[] {
  const q = encodeURIComponent(`${book.title} ${book.author}`);
  const apps = book.library
    ? copyLinks(book.library)
    : [
        {
          label: "Libby",
          url: `https://libbyapp.com/search/${LIBBY}/search/query-${q}/page-1`,
        },
        {
          label: "BorrowBox",
          url: `https://${BORROWBOX}.borrowbox.com/search?q=${q}`,
        },
      ];
  return [...apps, { label: "Library catalogue", url: CATALOGUE(q) }];
}

/** The Spanish edition's library copies: only the ones known to be there. */
export function spanishLibraryLinks(
  book: Book
): { label: string; url: string }[] {
  const copies = book.spanish?.library;
  if (!copies) return [];
  const q = encodeURIComponent(`${book.spanish!.title} ${book.author}`);
  return [
    ...copyLinks(copies),
    ...(copies.print ? [{ label: "Library (print)", url: CATALOGUE(q) }] : []),
  ];
}
