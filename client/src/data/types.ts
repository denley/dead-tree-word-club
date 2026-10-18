/** A date as YYYY-MM-DD (local Adelaide date, no time). */
export type ISODate = string;

export interface Book {
  /** Also the cover's file name: client/public/covers/<slug>.jpg */
  slug: string;
  title: string;
  author: string;
  isbn?: string;
  published?: number;
  pages?: number;
  blurb: string;
  authorBio?: string;
  /**
   * Direct links that beat the generated search links (see lib/links.ts).
   * Only add ones that have been checked to open the right book.
   */
  links?: Partial<Record<StoreKey, string>>;
  /** The Spanish edition's title, if there is one (store links are generated from it). */
  spanish?: { title: string };
}

export type StoreKey =
  | "amazon"
  | "kindle"
  | "audible"
  | "spotify"
  | "goodreads";

export interface Meeting {
  date: ISODate;
  /** 24h "HH:MM". Leave out when only the day is known. */
  start?: string;
  end?: string;
  venue?: string;
  /** Floated but not locked in yet. */
  tentative?: boolean;
  note?: string;
}

export interface ClubMonth {
  year: number;
  /** 1–12: the month on the library's list (the meeting is often in the next one). */
  month: number;
  /** Missing for an own-book month whose book hasn't been picked. */
  book?: Book;
  /** An "OWN BOOK" month on the library list: no kit, everyone sources their own copy. */
  ownBook?: boolean;
  /** Library kit dates (from the library's list, also there for own-book months). */
  pickup: ISODate;
  returnBy: ISODate;
  /** Leave out until it's actually arranged; the site shows "date to be decided". */
  meeting?: Meeting;
}
