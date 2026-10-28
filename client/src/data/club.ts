/*
 * The club's calendar: every month's book, the library kit dates and the meeting.
 *
 * Updating it (see AGENTS.md for more):
 * - A meeting gets arranged: add `meeting: { date, start, end, venue }` to that month.
 *   Until then leave `meeting` out; the site says "date to be decided" and works out
 *   what's being read from the kit dates.
 * - A new year's list arrives: add twelve months at the end, covers in
 *   client/public/covers/<slug>.jpg, then run scripts/cover-info.sh.
 */

import type { ClubMonth } from "./types";

export const calendar: ClubMonth[] = [
  // ───────────────────────────── 2026 ─────────────────────────────
  {
    year: 2026,
    month: 1,
    pickup: "2025-12-31",
    returnBy: "2026-02-04",
    meeting: { date: "2026-02-01", venue: "Mia and Shaun's House" },
    book: {
      slug: "17-years-later",
      title: "17 Years Later",
      author: "J.P. Pomare",
      isbn: "9780733649639",
      published: 2024,
      authorBio:
        "J.P. Pomare is a New Zealand author living in Melbourne, best known for In the Clearing (adapted as Disney's The Clearing) and The Last Guests.",
      blurb:
        "The slaughter of the wealthy Primrose family as they slept shocked New Zealand and scarred the small town of Cambridge forever. Everything pointed to their young live-in chef, Bill Ruatara, who was swiftly convicted. Seventeen years later, prison psychologist TK Phillips is fighting for an appeal, convinced Bill never had a fair trial. When true-crime podcaster Sloane Abbott takes an interest, she uncovers new evidence that could blow the prosecution's case apart.",
      library: {},
    },
  },
  {
    year: 2026,
    month: 2,
    pickup: "2026-01-30",
    returnBy: "2026-03-13",
    meeting: { date: "2026-02-28", venue: "Denley and Emma's House" },
    book: {
      slug: "the-bookbinder-of-jericho",
      title: "The Bookbinder of Jericho",
      author: "Pip Williams",
      isbn: "9781922992925",
      published: 2023,
      authorBio:
        "Pip Williams was born in London, grew up in Sydney and now calls the Adelaide Hills home. She is the bestselling author of The Dictionary of Lost Words.",
      blurb:
        "Oxford, 1914. As the war draws young men away, twin sisters Peggy and Maude live on a narrowboat and work in the bindery at the University Press, folding the books Peggy longs to read. As war and illness reshape her world, Peggy begins to imagine another future, one with a place for her at the university across the road, but her love for a Belgian soldier and her duty to Maude threaten to hold her back.",
      library: {
        libby: { ebook: "9815306" },
        borrowbox: { ebook: "AFP_4676735", audiobook: "BOL_4553552" },
      },
      spanish: { title: "La artesana de libros" },
    },
  },
  {
    year: 2026,
    month: 3,
    ownBook: true,
    pickup: "2026-02-27",
    returnBy: "2026-04-10",
    meeting: {
      date: "2026-03-29",
      start: "10:00",
      end: "12:30",
      venue: "Mia and Shaun's House",
    },
    book: {
      slug: "orbital",
      title: "Orbital",
      author: "Samantha Harvey",
      isbn: "9781529922936",
      published: 2023,
      authorBio:
        "Samantha Harvey lives in Bath and is the author of five novels and a work of non-fiction. Orbital won the 2024 Booker Prize.",
      blurb:
        "One day aboard the International Space Station: six astronauts from five countries, sixteen sunrises and sixteen sunsets as they circle the planet. They eat, sleep, run experiments and gaze down at a world they can see whole but cannot touch. A slender, contemplative novel about time, home and the fragile beauty of Earth, and a moving elegy to our humanity and our planet.",
      library: {
        libby: { audiobook: "10156506", ebook: "10188759" },
        borrowbox: { ebook: "RDH_5414156", audiobook: "PRH_5414090" },
      },
      spanish: { title: "Orbital" },
    },
  },
  {
    year: 2026,
    month: 4,
    pickup: "2026-03-27",
    // The library list says 5/8/2026; every other return is a Friday six weeks on,
    // so this is 8 May with day and month swapped.
    returnBy: "2026-05-08",
    meeting: { date: "2026-05-09", start: "16:30", venue: "Festival of Rice" },
    book: {
      slug: "lola-in-the-mirror",
      title: "Lola in the Mirror",
      author: "Trent Dalton",
      isbn: "9781460713327",
      published: 2024,
      authorBio:
        "Trent Dalton is a two-time Walkley Award-winning journalist and the bestselling author of Boy Swallows Universe and All Our Shimmering Skies.",
      blurb:
        "A girl and her mother have been on the run for sixteen years, from the monster they left in their kitchen with a knife in his throat. Home is a van with four flat tyres in a junkyard by the Brisbane River. The girl has no name, because names are dangerous when you're running, but she has a dream of a life as an artist. And when her mother can no longer protect her, there's only one person who can help: Lola.",
      library: {
        libby: { ebook: "9892494" },
        borrowbox: { ebook: "HCP_4945144", audiobook: "BOL_4994114" },
      },
      spanish: { title: "Lola en el espejo" },
    },
  },
  {
    year: 2026,
    month: 5,
    pickup: "2026-04-24",
    returnBy: "2026-06-05",
    meeting: {
      date: "2026-06-08",
      start: "10:00",
      venue: "Jo & Andrew's House",
    },
    book: {
      slug: "apeirogon",
      title: "Apeirogon",
      author: "Colum McCann",
      isbn: "9781526607898",
      published: 2020,
      authorBio:
        "Colum McCann is the Dublin-born author of thirteen books, including Let the Great World Spin, winner of the U.S. National Book Award.",
      blurb:
        "Bassam Aramin is Palestinian. Rami Elhanan is Israeli. Rami's thirteen-year-old daughter is killed by a suicide bomber; a decade later Bassam's ten-year-old daughter is killed by a rubber bullet. When the two fathers hear each other's stories they recognise the loss that binds them, and together they set out to use their grief as a weapon for peace. Told in 1,001 fragments, a novel built from real lives.",
      library: {
        libby: { ebook: "5041106" },
        borrowbox: { ebook: "BLM_748732" },
      },
      spanish: { title: "Apeirógono" },
    },
  },
  {
    year: 2026,
    month: 6,
    pickup: "2026-05-29",
    returnBy: "2026-07-10",
    meeting: {
      date: "2026-07-12",
      start: "10:00",
      end: "13:00",
      venue: "Mia and Shaun's House",
    },
    book: {
      slug: "three-wild-dogs-and-the-truth",
      title: "Three Wild Dogs (and the Truth)",
      author: "Markus Zusak",
      published: 2025,
      authorBio:
        "Markus Zusak was born in Sydney in 1975 and is the author of The Book Thief, one of the most beloved novels of our time.",
      blurb:
        "A funny, poignant and disarmingly honest memoir of the three troublesome rescue dogs who turned the Zusak household upside down: about the chaos and heartbreak they brought, the vet bills and the bites, and the stubborn, unruly love that made even the most incorrigible animals family.",
      library: {
        libby: { ebook: "10750244" },
        borrowbox: { audiobook: "BOL_5948324" },
      },
      spanish: { title: "Tres perros salvajes" },
    },
  },
  {
    year: 2026,
    month: 7,
    pickup: "2026-06-26",
    returnBy: "2026-08-07",
    book: {
      slug: "a-language-of-limbs",
      title: "A Language of Limbs",
      author: "Dylin Hardcastle",
      published: 2024,
      authorBio:
        "Dylin Hardcastle (they/them) is an award-winning author, artist, screenwriter and scholar from Newcastle, New South Wales.",
      blurb:
        "Newcastle, 1972. On a quiet summer night two teenage girls, best friends, face a choice: act on what they feel for each other, or bury it. Over three decades their lives almost touch at pivotal moments, against the backdrop of Australia's first Mardi Gras and the AIDS crisis. A tender, sweeping story of first love and the different shapes a life can take.",
      library: {
        libby: { ebook: "10625642" },
        borrowbox: { audiobook: "BOL_5684758" },
      },
    },
  },
  {
    year: 2026,
    month: 8,
    pickup: "2026-07-31",
    returnBy: "2026-09-11",
    book: {
      slug: "limberlost",
      title: "Limberlost",
      author: "Robbie Arnott",
      isbn: "9781922458766",
      published: 2022,
      authorBio:
        "Robbie Arnott was born in Launceston, Tasmania in 1989 and lives in Hobart. Limberlost won the 2023 ARA Historical Novel Prize.",
      blurb:
        "Ned West spends his summer holidays trapping rabbits along the river below his family's orchard in northern Tasmania, saving for a small boat while his two older brothers are away at war. Moving between that summer and the long life that follows, Limberlost is a story about love and loss, the land and its history, and what we take from it and give back.",
      library: {
        libby: { ebook: "8994435", audiobook: "9127297" },
        borrowbox: { ebook: "TXT_3946063" },
      },
      spanish: { title: "Limberlost" },
    },
  },
  {
    year: 2026,
    month: 9,
    pickup: "2026-08-28",
    returnBy: "2026-10-09",
    book: {
      slug: "american-dirt",
      title: "American Dirt",
      author: "Jeanine Cummins",
      isbn: "9781472261403",
      published: 2020,
      authorBio:
        "Jeanine Cummins is the author of four books. American Dirt was an Oprah's Book Club pick and has been translated into more than thirty languages.",
      blurb:
        "Lydia runs a bookshop in Acapulco and lives a comfortable life with her journalist husband and their son, Luca. Then her husband publishes a profile of the city's newest cartel boss, and in a single afternoon everything is gone. Forced to flee with Luca, Lydia joins the countless people travelling north towards the United States, and soon sees that everyone on the road is running from something.",
      library: {},
      spanish: { title: "Tierra americana" },
    },
  },
  {
    year: 2026,
    month: 10,
    pickup: "2026-09-25",
    returnBy: "2026-11-06",
    meeting: {
      date: "2026-10-31",
      start: "10:00",
      end: "12:00",
      venue: "Mia and Shaun's House",
    },
    book: {
      slug: "hamnet",
      title: "Hamnet",
      author: "Maggie O'Farrell",
      isbn: "9781472223821",
      published: 2020,
      authorBio:
        "Maggie O'Farrell was born in Northern Ireland in 1972. She is the author of nine novels and a memoir; Hamnet won the Women's Prize for Fiction.",
      blurb:
        "Warwickshire in the 1580s. Agnes, a woman with an uncanny gift for healing, marries a young Latin tutor and settles in Henley Street, Stratford, where they raise three children while he works in London. In 1596 their son Hamnet dies, aged eleven. A few years later his father writes a play called Hamlet. A luminous portrait of a marriage and of a family undone by grief.",
      library: {},
      spanish: { title: "Hamnet" },
    },
  },
  {
    year: 2026,
    month: 11,
    pickup: "2026-10-30",
    returnBy: "2026-12-11",
    book: {
      slug: "the-wind-knows-my-name",
      title: "The Wind Knows My Name",
      author: "Isabel Allende",
      isbn: "9781526660336",
      published: 2023,
      authorBio:
        "Isabel Allende is one of the most widely read authors in the world, with more than 80 million books sold, from The House of the Spirits onwards.",
      blurb:
        "Vienna, 1938: five-year-old Samuel Adler's father vanishes on Kristallnacht, and his mother puts him on a Kindertransport to England. Arizona, 2019: seven-year-old Anita Díaz is separated from her mother at the US border after they flee El Salvador. Moving between past and present, Allende traces the long reach of war and displacement, and the sacrifices parents make for their children.",
      library: {
        libby: { ebook: "9554021", audiobook: "9807093" },
        borrowbox: { ebook: "BLM_4740036" },
      },
      spanish: {
        title: "El viento conoce mi nombre",
        library: { print: true },
      },
    },
  },
  {
    year: 2026,
    month: 12,
    ownBook: true,
    pickup: "2026-11-27",
    returnBy: "2027-01-08",
  },

  // ───────────────────────────── 2027 ─────────────────────────────
  // From the library's Group #14 list. Its spellings "Madeline Carey", "Lei Wen" and
  // "Gary Disher" are Madeleine Cleary, Lai Wen and Garry Disher.
  {
    year: 2027,
    month: 1,
    pickup: "2027-01-29",
    returnBy: "2027-03-12",
    book: {
      slug: "frankie",
      title: "Frankie",
      author: "Graham Norton",
      isbn: "9781529391480",
      published: 2024,
      pages: 304,
      authorBio:
        "Graham Norton is an Irish broadcaster and comedian, best known as the host of The Graham Norton Show. Since his 2016 debut Holding he has become a bestselling novelist, with stories rooted in his native Ireland.",
      blurb:
        "Frances Howe is eighty-four, stuck at home in London with a broken ankle, and in no mood for company. Then Damian, the young Irishman hired to help her, turns out to be a genuine listener, and slowly she begins to tell him her story. It starts with an orphaned girl in 1950s rural Ireland and carries on through swinging London and the downtown New York art scene, a life of courage, love and quiet heartbreak. Warm, funny and tender, it is a portrait of a woman who never quite got the credit she deserved.",
      links: {
        audible: "https://www.audible.com.au/pd/Frankie-Audiobook/B0CYCSNM5D",
        spotify: "https://open.spotify.com/show/5PAKwTbSssjmzJ0JoIuBka",
      },
      library: {},
    },
  },
  {
    year: 2027,
    month: 2,
    pickup: "2027-02-26",
    returnBy: "2027-04-09",
    book: {
      slug: "the-butterfly-women",
      title: "The Butterfly Women",
      author: "Madeleine Cleary",
      isbn: "9781761639890",
      published: 2025,
      pages: 400,
      authorBio:
        "Madeleine Cleary is a writer and podcaster who has worked as a bookseller and as an Australian diplomat in China. Her debut novel grew out of discovering an ancestor who ran a brothel in colonial Melbourne.",
      blurb:
        "Melbourne in 1863 is booming on gold money, but just off its grand new streets lies Little Lon, the city's red-light district. When women working there start turning up dead and the authorities barely look up, an unlikely group comes together to find the killer. They include Johanna, an Irish immigrant now in demand at the elegant brothel Papillon, and Harriet, a society writer who wants the victims remembered as people. Atmospheric and gripping, it is a historical crime story about friendship and courage among women the city would rather ignore.",
      links: {
        audible:
          "https://www.audible.com.au/pd/The-Butterfly-Women-Audiobook/B0F4Z9FCJW",
        spotify: "https://open.spotify.com/show/0d4Z0FoQnG8Xiz1ml3iuG5",
      },
      library: {
        libby: { ebook: "11640554", audiobook: "11878650" },
        borrowbox: { ebook: "SSI_6694053" },
      },
    },
  },
  {
    year: 2027,
    month: 3,
    pickup: "2027-03-25",
    returnBy: "2027-05-06",
    book: {
      slug: "the-quiet-american",
      title: "The Quiet American",
      author: "Graham Greene",
      isbn: "9780099478393",
      published: 1955,
      pages: 180,
      authorBio:
        "Graham Greene (1904-1991) was one of the twentieth century's great English novelists, the author of Brighton Rock, The Power and the Glory and The End of the Affair. He reported from Indochina in the early 1950s, and this novel draws on what he saw there.",
      blurb:
        "Saigon in the early 1950s, with the French losing their war in Indochina. Thomas Fowler is a weary British correspondent who wants nothing more than his opium pipe, his young Vietnamese lover Phuong and to stay well out of things. Then Alden Pyle arrives: earnest, polite and sure that America knows what is best for Vietnam. Their friendship, their rivalry over Phuong, and Pyle's dangerous idealism draw Fowler into a choice he cannot dodge. Short, sharp and morally tangled, it remains one of the great novels about good intentions gone wrong.",
      links: {
        audible:
          "https://www.audible.com.au/pd/The-Quiet-American-Audiobook/B0DWFZ98HW",
        spotify: "https://open.spotify.com/show/41PTPWjH9VlOkmfIu83PHz",
      },
      library: {
        libby: { ebook: "466749" },
        borrowbox: { audiobook: "BOL_233807" },
      },
      spanish: { title: "El americano tranquilo" },
    },
  },
  {
    year: 2027,
    month: 4,
    pickup: "2027-04-30",
    returnBy: "2027-06-11",
    book: {
      slug: "tiananmen-square",
      title: "Tiananmen Square",
      author: "Lai Wen",
      isbn: "9781800753785",
      published: 2024,
      pages: 528,
      authorBio:
        "Lai Wen is the pen name of a writer born in Beijing in 1970 who left China in 1989 and now lives in the UK with her family. This autobiographical novel is her first book.",
      blurb:
        "Lai grows up in a cramped Beijing flat in the 1970s, under the eye of a fierce, loving grandmother and parents who keep their own secrets. She is bookish, curious and often lonely, and as China begins to open up she finds friendship, first love and a place at Peking University. There, a circle of students starts to imagine a different future, and the story builds towards the spring of 1989. Intimate and vivid, it is a coming-of-age novel about family, memory and finding your voice in a country that would rather you stayed silent.",
      links: {
        audible:
          "https://www.audible.com.au/pd/Tiananmen-Square-Audiobook/B0CPB77N31",
        spotify: "https://open.spotify.com/show/1si4SfpZ7xF4VWjrrv3tJy",
      },
      library: { libby: { ebook: "10189846" } },
      spanish: { title: "La estudiante de Tiananmén" },
    },
  },
  {
    year: 2027,
    month: 5,
    pickup: "2027-05-28",
    returnBy: "2027-07-09",
    book: {
      slug: "the-way-it-is-now",
      title: "The Way It Is Now",
      author: "Garry Disher",
      isbn: "9781922458704",
      published: 2021,
      pages: 416,
      authorBio:
        "Garry Disher grew up in rural South Australia and is one of Australia's most celebrated crime writers, author of the Wyatt, Challis and Destry, and Hirsch (Peace, Consolation) series. He has won several Ned Kelly Awards and lives on the Mornington Peninsula.",
      blurb:
        "Twenty years ago Charlie Deravin's mother vanished near the family's beach shack on the Mornington Peninsula. Everyone assumes she was murdered, her body was never found, and Charlie's father, a former cop, has lived under suspicion ever since. Now Charlie is a police officer himself, on forced leave and living alone at the shack, when bones turn up on a building site nearby. Old wounds reopen and the case comes back to life. Moody and character-driven, it is Australian crime writing about family, guilt and the stories a small community tells itself.",
      links: {
        audible:
          "https://www.audible.com.au/pd/The-Way-It-Is-Now-Audiobook/B09HHQRY3Z",
        spotify: "https://open.spotify.com/show/53szc9vD2uM5SI8c5JVmZ4",
      },
      library: {
        libby: { ebook: "6370882", audiobook: "6887331" },
        borrowbox: { ebook: "TXT_2127529" },
      },
    },
  },
  {
    year: 2027,
    month: 6,
    ownBook: true,
    pickup: "2027-06-25",
    returnBy: "2027-08-06",
  },
  {
    year: 2027,
    month: 7,
    pickup: "2027-07-30",
    returnBy: "2027-09-10",
    book: {
      slug: "the-glassmaker",
      title: "The Glassmaker",
      author: "Tracy Chevalier",
      isbn: "9780008153892",
      published: 2024,
      pages: 400,
      authorBio:
        "Tracy Chevalier is an American-British novelist based in London, best known for Girl with a Pearl Earring. Her historical novels often centre on women and the crafts they practise.",
      blurb:
        "On the island of Murano in 1486, glassmaking is men's work, but Orsola Rosso secretly teaches herself to make beads to keep her struggling family afloat. Her story then skips forward like a stone across water. Orsola and her family age only slowly while Venice moves through the centuries around them, with plague, war, carnivals and tourists, right up to the present day. Rich in craft and colour, it is a playful, absorbing novel about art, family loyalty and a woman who keeps her fire burning through every age.",
      links: {
        audible:
          "https://www.audible.com.au/pd/The-Glassmaker-Audiobook/B0D3W9WV6L",
        spotify: "https://open.spotify.com/show/4SyGUy8BFuhu2p0hnkeyLi",
      },
      library: {
        libby: { ebook: "11046320", audiobook: "11328432" },
        borrowbox: { ebook: "HCU_5729109", audiobook: "BOL_5993996" },
      },
      spanish: { title: "La maestra del vidrio" },
    },
  },
  {
    year: 2027,
    month: 8,
    pickup: "2027-08-27",
    returnBy: "2027-10-08",
    book: {
      slug: "sky-burial",
      title: "Sky Burial",
      author: "Xinran",
      isbn: "9780099461937",
      published: 2004,
      pages: 176,
      authorBio:
        "Xinran is a Chinese-born British journalist and author whose late-night radio show in Nanjing invited women to share their stories. She moved to London in 1997 and is best known for The Good Women of China.",
      blurb:
        "In 1958 Shu Wen, a young Chinese doctor, learns that her new husband Kejun, an army doctor posted to Tibet, has been killed. She refuses to accept it and sets off into Tibet to find him. Lost in a vast and unfamiliar land, she is taken in by a nomad family and spends decades learning their language, faith and way of life. Years later she tells her story to the journalist Xinran. Spare and haunting, it is a love story and a meeting of two cultures, set in one of the most remote places on earth.",
      library: {},
    },
  },
  {
    year: 2027,
    month: 9,
    pickup: "2027-09-24",
    returnBy: "2027-11-05",
    book: {
      slug: "journeys-to-the-other-side-of-the-world",
      title: "Journeys to the Other Side of the World",
      author: "David Attenborough",
      isbn: "9781473666672",
      published: 2018,
      pages: 432,
      authorBio:
        "Sir David Attenborough, born in 1926, is a broadcaster and naturalist whose career began at the BBC in the 1950s with Zoo Quest. He went on to make Life on Earth, The Blue Planet and many other landmark natural history series.",
      blurb:
        "In the late 1950s and early 1960s, a young David Attenborough and a tiny BBC crew set off with heavy cameras and a lot of optimism to film places few viewers had ever seen. They search for birds of paradise in New Guinea, track lemurs and chameleons in Madagascar, visit Pacific islands, and travel through Arnhem Land in Australia's Northern Territory. Told with self-deprecating humour and real curiosity about the people they meet, it is a lively, old-fashioned travel adventure from the start of a remarkable career.",
      library: {},
      spanish: { title: "Viajes al otro lado del mundo" },
    },
  },
  {
    year: 2027,
    month: 10,
    pickup: "2027-10-29",
    returnBy: "2027-12-10",
    book: {
      slug: "mythos",
      title: "Mythos",
      author: "Stephen Fry",
      isbn: "9781405934138",
      published: 2017,
      pages: 464,
      authorBio:
        "Stephen Fry is an English actor, comedian, broadcaster and author, known for Blackadder, Jeeves and Wooster and as the original host of QI. Mythos is the first of his retellings of the Greek myths, followed by Heroes, Troy and Odyssey.",
      blurb:
        "Stephen Fry retells the Greek myths from the very beginning: Chaos and the first gods, the overthrow of the Titans, and the rise of Zeus and his quarrelsome family on Olympus. From there come the stories of Prometheus, Pandora, Persephone, Midas, Narcissus and many more, packed with jealousy, mischief, love and transformation. Fry tells them with a storyteller's warmth and plenty of wit, pointing out along the way the words and ideas we still owe them. It is an entertaining, easy way into the stories that underpin so much of Western culture.",
      links: {
        audible: "https://www.audible.com.au/pd/Mythos-Audiobook/B071RLJWHG",
        spotify: "https://open.spotify.com/show/2STDvTDi2CzcPdzTymxVsx",
      },
      library: {
        libby: { audiobook: "3512899", ebook: "3588207" },
        borrowbox: { audiobook: "PRH_654901", ebook: "PRU_469532" },
      },
      spanish: { title: "Mythos" },
    },
  },
  {
    year: 2027,
    month: 11,
    pickup: "2027-11-26",
    returnBy: "2028-01-07",
    book: {
      slug: "opal-song",
      title: "Opal Song",
      author: "Adele Lande",
      isbn: "9780645289503",
      published: 2021,
      pages: 356,
      authorBio:
        "Adele Lande is the pen name of Dr Ruth Baigent, a general practitioner and writer living in South Australia, who studied professional writing at the Adelaide College of the Arts. Opal Song is her first novel.",
      blurb:
        "Cari is a young Welsh doctor working in a big Australian hospital who finds it hard to read what other people really mean. She escapes her controlling partner Richard by taking a job in a remote opal-mining town in outback South Australia. There she joins Samson, a kind-hearted Indian surgeon, in a tiny medical team stretched by heat, isolation and eccentric locals. Then Richard turns up, with more than one reason to want her back in the city. Mixing medical drama, intrigue and dark humour, it is a homegrown story about finding your place.",
      library: { libby: { ebook: "9150066" } },
    },
  },
  {
    year: 2027,
    month: 12,
    ownBook: true,
    pickup: "2027-12-23",
    returnBy: "2028-02-03",
  },
];
