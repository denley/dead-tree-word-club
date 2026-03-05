/*
 * Book Club 2026 — Data
 * Design: "The Reading Room" — Arts & Crafts / Bookish Warmth
 * All book data, meeting dates, and purchase links
 * Updated: corrected month assignments per revised CSV
 */

export interface BookMonth {
  month: string;
  monthIndex: number; // 0-based (Jan=0)
  title: string;
  author: string;
  authorBio: string;
  blurb: string;
  coverUrl: string;
  isbn: string;
  pickupDate: string;
  returnDate: string;
  meetingDate: string;
  meetingDateConfirmed: boolean;
  meetingVenue: string;
  meetingVenueConfirmed: boolean;
  links: {
    amazon?: string;
    kindle?: string;
    audible?: string;
    bookshop?: string;
    spotify?: string;
  };
  spanish: {
    available: boolean;
    title?: string;
    amazon?: string;
    kindle?: string;
    audible?: string;
  };
  isNoMeeting?: boolean;
  isTBA?: boolean;
}

export const ASSET_URLS = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/hero-banner-7rZyjNibuubgPgCqwuaFqf.webp",
  heroFull: "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/hero-banner-BdzccYS5fVvUUj6oDYix9L.png",
  texture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/reading-texture-QY4zoKs3YapH22R5Fs7vGZ.webp",
  divider: "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/divider-botanical-3f44yzXcrKrwUN2DFeGexP.png",
  bookPattern: "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/book-pattern-mCUdJdYfAptji4ijFYFJtT.webp",
};

// Helper: get last Saturday of a given month/year
function getLastSaturday(year: number, month: number): string {
  const lastDay = new Date(year, month + 1, 0);
  const dayOfWeek = lastDay.getDay();
  const diff = dayOfWeek >= 6 ? dayOfWeek - 6 : dayOfWeek + 1;
  const lastSat = new Date(year, month + 1, -diff);
  const d = lastSat.getDate();
  const m = lastSat.getMonth() + 1;
  const y = lastSat.getFullYear();
  return `${d.toString().padStart(2, "0")}/${m.toString().padStart(2, "0")}/${y}`;
}

export const books: BookMonth[] = [
  {
    month: "January",
    monthIndex: 0,
    title: "17 Years Later",
    author: "JP Pomare",
    authorBio:
      "J. P. Pomare is a New Zealand author who lives in Melbourne, Australia. He is the author of critically acclaimed and best-selling novels including In The Clearing (adapted as The Clearing by Disney) and The Last Guests.",
    blurb:
      "The violent slaughter of the wealthy Primrose family while they slept shocked the nation of New Zealand and scarred the small idyllic rural town of Cambridge forever. All of the evidence pointed to their young live-in chef, Bill Ruatara, who was swiftly charged with murder and brought to justice. Seventeen years later, prison psychologist TK Phillips is fighting for an appeal. He is convinced Bill did not receive a fair trial. When celebrity true-crime podcaster Sloane Abbott takes a sudden interest, it's not long before she uncovers new evidence that could set fire to the prosecution's case.",
    coverUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/17-years-later-cover_9034501c.jpeg",
    isbn: "9780733649639",
    pickupDate: "31/12/2025",
    returnDate: "04/02/2026",
    meetingDate: "01/02/2026",
    meetingDateConfirmed: true,
    meetingVenue: "Mia and Shaun's House",
    meetingVenueConfirmed: true,
    links: {
      amazon: "https://www.amazon.com/gp/product/B0C4DN4DHN",
      kindle: "https://www.amazon.com/gp/product/B0C4DN4DHN",
      audible: "https://www.audible.com/search?keywords=17+Years+Later+JP+Pomare",
      bookshop: "https://bookshop.org/p/books/17-years-later-a-shocking-crime-thriller-j-p-pomare/92a0270eb2bf58e1",
    },
    spanish: {
      available: false,
    },
  },
  {
    month: "February",
    monthIndex: 1,
    title: "The Bookbinder of Jericho",
    author: "Pip Williams",
    authorBio:
      "Pip Williams was born in London, grew up in Sydney, and now calls the Adelaide Hills home. She is the bestselling author of The Dictionary of Lost Words.",
    blurb:
      "A young British woman working in a book bindery gets a chance to pursue knowledge and love when World War I upends her life. It is 1914, and as the war draws the young men of Britain away to fight, women must keep the nation running. Peggy and Maude are twin sisters who live on a narrow boat in Oxford and work in the bindery at the university press. As war and illness reshape her world, Peggy begins to see the possibility of another future — but her love for a Belgian soldier threatens to hold her back.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/bAcBtpzYQFzjYyJu.jpg",
    isbn: "9781529921304",
    pickupDate: "30/01/2026",
    returnDate: "13/03/2026",
    meetingDate: "28/02/2026",
    meetingDateConfirmed: true,
    meetingVenue: "Denley and Emma's House",
    meetingVenueConfirmed: true,
    links: {
      amazon: "https://www.amazon.com/Bookbinder-Novel-Pip-Williams/dp/0593600444",
      kindle: "https://www.amazon.com/Bookbinder-Novel-Pip-Williams/dp/0593600444",
      audible: "https://www.audible.com/pd/The-Bookbinder-of-Jericho-Audiobook/B0BT4ZMNWP",
      bookshop: "https://uk.bookshop.org/p/books/the-bookbinder-of-jericho-from-the-author-of-reese-witherspoon-book-club-pick-the-dictionary-of-lost-words-pip-williams/7599046",
    },
    spanish: {
      available: true,
      title: "La artesana de libros",
      amazon: "https://www.amazon.com/-/es/artesana-libros-Pip-Williams/dp/8419638560",
      kindle: "https://www.amazon.com/-/es/Pip-Williams-ebook/dp/B0CQLXTBDQ",
      audible: "https://www.audible.com/pd/La-artesana-de-libros-Audiobook/B0CZNZ2875",
    },
  },
  {
    month: "March",
    monthIndex: 2,
    title: "Orbital",
    author: "Samantha Harvey",
    authorBio:
      "Samantha Harvey is the author of five novels and one work of non-fiction. She lives in Bath, UK, and is a Reader in Creative Writing at Bath Spa University.",
    blurb:
      "A slender novel of epic power, Orbital deftly snapshots one day in the lives of six women and men hurtling through space — not towards the moon or the vast unknown, but around our planet. Their experiences of sixteen sunrises and sunsets and the bright, blinking constellations of the galaxy are at once breathtakingly awesome and surprisingly intimate. Profound, contemplative and gorgeous, Orbital is a gift — a moving elegy to our humanity, environment, and planet.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/YxVLqZNoWCpJwSHK.webp",
    isbn: "9780802163622",
    pickupDate: "27/02/2026",
    returnDate: "10/04/2026",
    meetingDate: getLastSaturday(2026, 2),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Orbital-Samantha-Harvey/dp/0802163629",
      kindle: "https://www.amazon.com/Orbital-Samantha-Harvey-ebook/dp/B0BZ5Y513V",
      audible: "https://www.audible.com/pd/Orbital-Audiobook/B0CN1XH312",
      bookshop: "https://bookshop.org/a/3546/9780802161543",
    },
    spanish: {
      available: true,
      title: "Orbital",
      amazon: "https://www.amazon.com/Orbital-Spanish-Samantha-Harvey/dp/8433929690",
      kindle: "https://www.amazon.com/-/es/Samantha-Harvey-ebook/dp/B0DP1TYXCV",
    },
  },
  {
    month: "April",
    monthIndex: 3,
    title: "Lola in the Mirror",
    author: "Trent Dalton",
    authorBio:
      "Trent Dalton is a two-time Walkley Award-winning journalist and the international bestselling author of Boy Swallows Universe and All Our Shimmering Skies.",
    blurb:
      "A girl and her mother have been on the run for sixteen years, from the monster they left in their kitchen with a knife in his throat. Home is now a van with four flat tires in a junkyard by the edge of the Brisbane River. The girl has no name, because names are dangerous when you're on the run. But she has a dream — a vision of a life as an artist. And once her mother can no longer protect her, there's only one person who can help make her dreams come true. That person is Lola.",
    coverUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/lola-cover_d3fc790b.jpg",
    isbn: "9781460713327",
    pickupDate: "27/03/2026",
    returnDate: "05/08/2026",
    meetingDate: getLastSaturday(2026, 3),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Lola-Mirror-Novel-Trent-Dalton/dp/0063414740",
      kindle: "https://www.amazon.com/Lola-Mirror-heartbreaking-award-winning-bestsellers-ebook/dp/B0C6L2WNCN",
      audible: "https://www.audible.com/pd/Lola-in-the-Mirror-Audiobook/B0CB1LQLDJ",
      bookshop: "https://bookshop.org/p/books/lola-in-the-mirror-a-novel-trent-dalton/9b1daf5d4c36192e",
      spotify: "https://open.spotify.com/show/3L67slKeJ8hmI7GUKpbY5k",
    },
    spanish: {
      available: true,
      title: "Lola en el espejo",
      amazon: "https://www.amazon.com/-/es/Lola-en-espejo-Trent-Dalton/dp/8410641577",
      kindle: "https://www.amazon.com/Lola-espejo-Spanish-Trent-Dalton-ebook/dp/B0F4Y6SH1W",
    },
  },
  {
    month: "May",
    monthIndex: 4,
    title: "Apeirogon",
    author: "Colum McCann",
    authorBio:
      "Colum McCann is the Dublin-born author of thirteen books. He has won numerous international honours including the U.S. National Book Award.",
    blurb:
      "Bassam Aramin is Palestinian. Rami Elhanan is Israeli. They inhabit a world of conflict that colors every aspect of their lives. But their lives are upended: Rami's thirteen-year-old daughter becomes the victim of suicide bombers; a decade later, Bassam's ten-year-old daughter is killed by a rubber bullet. When they learn of each other's stories, they recognize the loss that connects them. Together they attempt to use their grief as a weapon for peace.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/TceEvCavhsAMvwop.webp",
    isbn: "9780812981933",
    pickupDate: "24/04/2026",
    returnDate: "05/06/2026",
    meetingDate: getLastSaturday(2026, 4),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Apeirogon-Novel-Colum-McCann/dp/1400069602",
      kindle: "https://www.amazon.com/Apeirogon-Novel-Colum-McCann-ebook/dp/B07T3XGLW1",
      audible: "https://www.audible.com/pd/Apeirogon-Audiobook/0307878058",
      bookshop: "https://bookshop.org/p/books/apeirogon-a-novel-colum-mccann/7843721?ean=9780812981933",
      spotify: "https://open.spotify.com/episode/3eAdy30J8XflOVHghDXq9C",
    },
    spanish: {
      available: true,
      title: "Apeirógono",
      amazon: "https://www.amazon.com/-/es/Apeir%C3%B3gono-Colum-McCann/dp/8432239313",
      kindle: "https://www.amazon.com/Apeir%C3%B3gono-Biblioteca-Formentor-Spanish-McCann-ebook/dp/B09BKCT8XV",
    },
  },
  {
    month: "June",
    monthIndex: 5,
    title: "Three Wild Dogs and the Truth",
    author: "Markus Zusak",
    authorBio:
      "Markus Zusak was born in 1975 in Sydney, Australia. He is the bestselling author of The Book Thief, one of the most beloved novels of our time.",
    blurb:
      "In this poignant, funny, and disarmingly honest memoir, one of the world's most beloved storytellers tells of his family's adoption of three troublesome rescue dogs — a charming and courageous love story about making even the most incorrigible animals family.",
    coverUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/three-wild-dogs-cover_0bc29186.jpg",
    isbn: "9780063426078",
    pickupDate: "29/05/2026",
    returnDate: "10/07/2026",
    meetingDate: getLastSaturday(2026, 5),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Three-Wild-Dogs-truth-Memoir/dp/0063426072",
      kindle: "https://www.amazon.com/Three-Wild-Dogs-Truth-Memoir-ebook/dp/B0D2DJKBM9",
      audible: "https://www.audible.com/pd/Three-Wild-Dogs-and-the-Truth-Audiobook/B0D3VVRM6K",
      bookshop: "https://bookshop.org/p/books/three-wild-dogs-and-the-truth-a-memoir-markus-zusak/ac0ca3b287a1bbf0",
    },
    spanish: {
      available: true,
      title: "Tres perros salvajes",
      amazon: "https://www.amazon.com/Tres-perros-salvajes-Three-Spanish/dp/8426431739",
      kindle: "https://www.amazon.com/perros-salvajes-Spanish-Markus-Zusak-ebook/dp/B0F4Y6SH1W",
      audible: "https://www.audible.com/pd/Tres-perros-salvajes-Three-Wild-Dogs-Audiobook/B0F9R78BYX",
    },
  },
  {
    month: "July",
    monthIndex: 6,
    title: "A Language of Limbs",
    author: "Dylin Hardcastle",
    authorBio:
      "Dylin Hardcastle (they/them) is an award-winning author, artist, screenwriter and scholar. Their debut novel won the 2023 Kathleen Mitchell Literary Award.",
    blurb:
      "The first love of a teenage girl is a powerful thing, particularly when the object of that desire is her best friend, also a girl. On a quiet summer night in Newcastle, 1972, a choice must be made: to act upon these desires, or suppress them? Over three decades, two lives almost intersect in pivotal moments. Against the backdrop of Australia's first Mardi Gras and the AIDS pandemic, this story finds the humanity in all of us.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/KtEwetaIjozIHcRQ.webp",
    isbn: "9780593852712",
    pickupDate: "26/06/2026",
    returnDate: "07/08/2026",
    meetingDate: getLastSaturday(2026, 6),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Language-Limbs-Novel-Dylin-Hardcastle/dp/0593852710",
      kindle: "https://www.amazon.com/Language-Limbs-Novel-Dylin-Hardcastle-ebook/dp/B0CWT27KZT",
      audible: "https://www.audible.com/pd/A-Language-of-Limbs-Audiobook/B0DG3S441P",
      bookshop: "https://bookshop.org/p/books/a-language-of-limbs-a-novel-dylin-hardcastle/fded21d4dba4ad83",
      spotify: "https://open.spotify.com/show/4B7gCNhXxuzLrvzGMGGBtl",
    },
    spanish: {
      available: false,
    },
  },
  {
    month: "August",
    monthIndex: 7,
    title: "Limberlost",
    author: "Robbie Arnott",
    authorBio:
      "Robbie Arnott was born in Launceston, Tasmania in 1989 and now lives in Hobart. His writing has appeared in numerous magazines and anthologies.",
    blurb:
      "Ned West is a young man living on his family's apple orchard, Limberlost, near a large river in the north of Tasmania. His father runs the property while his two older brothers are away at the Second World War. This novel tells the story of Ned trapping and shooting rabbits over his summer school holidays to raise money for a boat — but it is really a story of his relationship to the land, the animals, and its indigenous history.",
    coverUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663325128704/YnsM6thAYWMyhpiR6RdVin/limberlost-cover_e78235de.jpg",
    isbn: "9781922458766",
    pickupDate: "31/07/2026",
    returnDate: "11/09/2026",
    meetingDate: getLastSaturday(2026, 7),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Limberlost-Robbie-Arnott/dp/1922458767",
      kindle: "https://www.amazon.com/Limberlost-Robbie-Arnott-ebook/dp/B0B1J2V71T",
      audible: "https://www.audible.com/pd/Limberlost-Audiobook/B0BFYTNHH2",
      bookshop: "https://bookshop.org/p/books/limberlost-robbie-arnott/18614041?ean=9781922458766",
    },
    spanish: {
      available: true,
      title: "Limberlost",
      amazon: "https://www.amazon.com/Limberlost-Robbie-Arnott/dp/8412678273",
    },
  },
  {
    month: "September",
    monthIndex: 8,
    title: "American Dirt",
    author: "Jeanine Cummins",
    authorBio:
      "Jeanine Cummins is the #1 New York Times bestselling author of American Dirt, an Oprah's Book Club pick translated into thirty-seven languages.",
    blurb:
      "Lydia lives in Acapulco with her son Luca and her journalist husband. After her husband's tell-all profile of the newest drug lord is published, none of their lives will ever be the same. Forced to flee, Lydia and Luca join the countless people trying to reach the United States. Lydia soon sees that everyone is running from something. But what exactly are they running to?",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/zVXtBJRunwveGwIZ.jpeg",
    isbn: "9781250209764",
    pickupDate: "28/08/2026",
    returnDate: "09/10/2026",
    meetingDate: getLastSaturday(2026, 8),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      audible: "https://www.audible.com/pd/American-Dirt-Oprahs-Book-Club-Audiobook/1250260604",
      bookshop: "https://bookshop.org/p/books/american-dirt-jeanine-cummins/18479562?ean=9781250209764",
      spotify: "https://open.spotify.com/show/4czFVRkY8OWy5OkGXVcsbg",
    },
    spanish: {
      available: true,
      title: "Tierra americana",
      audible: "https://www.audible.com/pd/Tierra-Americana-American-Dirt-Audiobook/8466667989",
    },
  },
  {
    month: "October",
    monthIndex: 9,
    title: "Hamnet",
    author: "Maggie O'Farrell",
    authorBio:
      "Maggie O'Farrell was born in Northern Ireland in 1972. She is the author of nine novels, a memoir, and two books for children, and has won numerous awards.",
    blurb:
      "Drawing on Maggie O'Farrell's long-term fascination with the little-known story behind Shakespeare's most enigmatic play, Hamnet is a luminous portrait of a marriage, at its heart the loss of a beloved child. Warwickshire in the 1580s: Agnes settles with her husband in Henley Street, Stratford, and has three children. The boy, Hamnet, dies in 1596, aged eleven. Four years later, the husband writes a play called Hamlet.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/hokNsbPOblnPaLox.webp",
    isbn: "9781472223791",
    pickupDate: "25/09/2026",
    returnDate: "06/11/2026",
    meetingDate: getLastSaturday(2026, 9),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Hamnet-Maggie-OFarrell/dp/0525657606",
      kindle: "https://www.amazon.com/Hamnet-Maggie-OFarrell-ebook/dp/B07ZN51NL3",
      audible: "https://www.audible.com/pd/Hamnet-Audiobook/0593212142",
      bookshop: "https://bookshop.org/p/books/hamnet-maggie-o-farrell/d8af232bf0b72169",
      spotify: "https://open.spotify.com/show/2aa1OqdCyQmyTLcEC761bz",
    },
    spanish: {
      available: true,
      title: "Hamnet",
      amazon: "https://www.amazon.com/Hamnet-Libros-del-Asteroide-Spanish/dp/8417977589",
      kindle: "https://www.amazon.com/Hamnet-Libros-del-Asteroide-Spanish-ebook/dp/B08VC47CK3",
      audible: "https://www.audible.com/es_US/pd/Hamnet-Audiolibro/B0D1BL2NVB",
    },
  },
  {
    month: "November",
    monthIndex: 10,
    title: "The Wind Knows My Name",
    author: "Isabel Allende",
    authorBio:
      "Isabel Allende — novelist, feminist, and philanthropist — is one of the most widely-read authors in the world, having sold more than 80 million books.",
    blurb:
      "This powerful novel weaves together past and present, tracing the ripple effects of war and immigration on one child in Europe in 1938 and another in the United States in 2019. Vienna, 1938: Samuel Adler is five years old when his father disappears during Kristallnacht. Arizona, 2019: Anita Díaz and her mother flee El Salvador seeking refuge. Intertwining past and present, this is a testament to the sacrifices that parents make.",
    coverUrl:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663325128704/vcvhrmImilovrKjm.jpg",
    isbn: "9780593598122",
    pickupDate: "30/10/2026",
    returnDate: "11/12/2026",
    meetingDate: getLastSaturday(2026, 10),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {
      amazon: "https://www.amazon.com/Wind-Knows-My-Name-Novel/dp/0593598121",
      audible: "https://www.audible.com/pd/The-Wind-Knows-My-Name-A-Novel-Audiobook/B0BJ5XG4BQ",
      bookshop: "https://bookshop.org/p/books/the-wind-knows-my-name-isabel-allende/18973949?ean=9780593598108",
      spotify: "https://open.spotify.com/show/44vni3erBn2E67SYdhj7SI",
    },
    spanish: {
      available: true,
      title: "El viento conoce mi nombre",
      amazon: "https://www.amazon.com/-/es/viento-conoce-nombre-Knows-Spanish/dp/1644738317",
      audible: "https://www.audible.com/pd/El-viento-conoce-mi-nombre-The-Wind-Knows-My-Name-Audiobook/B0C5RY5TKG",
    },
  },
  {
    month: "December",
    monthIndex: 11,
    title: "TBA",
    author: "TBA",
    authorBio: "",
    blurb: "The December book selection has not yet been announced. Check back soon!",
    coverUrl: "",
    isbn: "",
    pickupDate: "27/11/2026",
    returnDate: "08/01/2027",
    meetingDate: getLastSaturday(2026, 11),
    meetingDateConfirmed: false,
    meetingVenue: "TBD",
    meetingVenueConfirmed: false,
    links: {},
    spanish: { available: false },
    isTBA: true,
  },
];

export function getCurrentMonthIndex(): number {
  return new Date().getMonth();
}

export function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === "TBD") return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
}

export function formatDateDisplay(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getBookStatus(
  book: BookMonth
): "completed" | "current" | "upcoming" {
  if (book.isNoMeeting) return "upcoming";
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if (currentYear > 2026) return "completed";
  if (currentYear < 2026) return "upcoming";

  if (book.monthIndex < currentMonth) return "completed";
  if (book.monthIndex === currentMonth) return "current";
  return "upcoming";
}

export function getDaysUntilMeeting(book: BookMonth): number | null {
  const meetingDate = parseDate(book.meetingDate);
  if (!meetingDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  meetingDate.setHours(0, 0, 0, 0);
  const diff = meetingDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
