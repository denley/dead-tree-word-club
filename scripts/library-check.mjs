// Looks every book up in the SA library network's apps (Libby and BorrowBox), in English and,
// where there's a Spanish edition, in Spanish, and prints the `library` value to paste into each
// book in client/src/data/club.ts. Run after adding books: `node scripts/library-check.mjs`
// (Node 23+, which reads the TypeScript data directly). Only `print` for Spanish editions isn't
// checked here: the One Card catalogue blocks scripts, so look those up by hand.
import { calendar } from "../client/src/data/club.ts";

const LIBBY = "sapln";
const BORROWBOX = "librariessa";

const norm = s =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\(|\)|^the /g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/ +/g, " ")
    .trim();
const lastName = author => norm(author.split(" ").at(-1));
const same = (a, b) =>
  norm(a) === norm(b) ||
  norm(a).replace(/ and /g, " ") === norm(b).replace(/ and /g, " ");

async function libby(title, author, lang) {
  const url = `https://thunder.api.overdrive.com/v2/libraries/${LIBBY}/media?perPage=50&query=${encodeURIComponent(`${title} ${author}`)}`;
  const { items = [] } = await (await fetch(url)).json();
  const found = {};
  for (const it of items.sort(
    (a, b) => (b.ownedCopies ?? 0) - (a.ownedCopies ?? 0)
  )) {
    const format = it.type?.id;
    if (format !== "ebook" && format !== "audiobook") continue;
    if (!same(it.title, title) || !it.languages?.some(l => l.id === lang))
      continue;
    if (!it.creators?.some(c => norm(c.name).includes(lastName(author))))
      continue;
    found[format] ??= it.id;
  }
  return found;
}

async function borrowbox(title, author, lang) {
  const url = `https://${BORROWBOX}.borrowbox.com/search?q=${encodeURIComponent(`${title} ${author}`)}`;
  const html = await (await fetch(url)).text();
  const json = html.match(
    /<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s
  )?.[1];
  const products =
    JSON.parse(json ?? "{}").props?.pageProps?.dehydratedState?.queries?.[0]
      ?.state?.data?.products ?? [];
  const language = lang === "es" ? "Spanish" : "English";
  const found = {};
  for (const p of products) {
    if (!same(p.title, title) || !p.languages?.includes(language)) continue;
    if (!p.authors?.some(a => norm(a.name).includes(lastName(author))))
      continue;
    const format =
      p.formatSpecifics?.loanFormat === "eAudiobook" || p.format === "MP3"
        ? "audiobook"
        : "ebook";
    found[format] ??= p.productId;
  }
  return found;
}

const show = copies => {
  const parts = Object.entries(copies)
    .filter(([, v]) => Object.keys(v).length)
    .map(
      ([app, v]) =>
        `${app}: { ${Object.entries(v)
          .map(([f, id]) => `${f}: "${id}"`)
          .join(", ")} }`
    );
  return `{ ${parts.join(", ")} }`.replace("{  }", "{}");
};

for (const { year, month, book } of calendar) {
  if (!book) continue;
  const en = {
    libby: await libby(book.title, book.author, "en"),
    borrowbox: await borrowbox(book.title, book.author, "en"),
  };
  console.log(
    `${year}-${String(month).padStart(2, "0")} ${book.title}\n  library: ${show(en)},`
  );
  if (book.spanish) {
    const t = book.spanish.title;
    const es = {
      libby: await libby(t, book.author, "es"),
      borrowbox: await borrowbox(t, book.author, "es"),
    };
    console.log(`  spanish: { title: "${t}", library: ${show(es)} },`);
  }
}
