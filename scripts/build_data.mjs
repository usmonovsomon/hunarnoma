// Transform parsed NTC data (data/parsed/*) into an app-ready dataset
// at lib/ntc/data.json — universities, specialties (with per-specialty
// offerings + aggregated stats), all keyed for the Next.js app.
import fs from "fs";

const P = "data/parsed";
const universitiesRaw = JSON.parse(fs.readFileSync(`${P}/universities.json`, "utf8"));
const programs = JSON.parse(fs.readFileSync(`${P}/programs.json`, "utf8"));
const specialtiesRaw = JSON.parse(fs.readFileSync(`${P}/specialties.json`, "utf8"));

// --- transliteration for slugs --------------------------------------------
const TR = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya" };
const slugify = (s) => s.toLowerCase().replace(/[а-яё]/g, (c) => TR[c] ?? "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);

const STOP = new Set(["и", "в", "при", "на", "по", "с", "имени", "им"]);
function acronym(name) {
  const head = name.split(/\bимени\b|\bим\.|\(/)[0];
  const letters = head.split(/\s+/).filter((w) => w && !STOP.has(w.toLowerCase()) && /[А-ЯЁA-Z]/.test(w[0]))
    .map((w) => w[0].toUpperCase());
  return letters.join("").slice(0, 6);
}
const SHORT_OVERRIDES = {
  "Таджикский национальный университет": "ТНУ",
  "Таджикский технический университет имени академика М. С. Осими": "ТТУ",
  "Российско-Таджикский (славянский) университет": "РТСУ",
  "Таджикский государственный медицинский университет имени Абуали ибни Сино": "ТГМУ",
  "Таджикский государственный педагогический университет имени Садриддина Айни": "ТГПУ",
  "Таджикский государственный университет коммерции": "ТГУК",
  "Таджикский государственный финансово-экономический университет": "ТГФЭУ",
  "Таджикский аграрный университет имени Шириншоха Шотемура": "ТАУ",
  "Технологический университет Таджикистана": "ТУТ",
  "Худжандский государственный университет имени академика Бободжона Гафурова": "ХГУ",
};
const WEBSITE = {
  "Таджикский национальный университет": "https://tnu.tj",
  "Таджикский технический университет имени академика М. С. Осими": "https://ttu.tj",
  "Российско-Таджикский (славянский) университет": "https://rtsu.tj",
  "Таджикский государственный медицинский университет имени Абуали ибни Сино": "https://tajmedun.tj",
  "Таджикский государственный педагогический университет имени Садриддина Айни": "https://tgpu.tj",
  "Технологический университет Таджикистана": "https://tut.tj",
  "Филиал Московского государственного университета имени М. В. Ломоносова в городе Душанбе": "https://msu.tj",
  "Университет Центральной Азии": "https://ucentralasia.org",
  "Академия государственного управления при Президенте Республики Таджикистан": "https://apa.tj",
  // found and verified (real reachable site, content matches the institution) this session
  "Хорогский государственный университет имени Моёншо Назаршоева": "https://khogu.tj",
  "Худжандский государственный университет имени академика Бободжона Гафурова": "https://www.hgu.tj",
  "Таджикский государственный университет права, бизнеса и политики": "http://tsulbp.tj",
  "Политехнический институт Таджикского технического университета имени академика М. С. Осими в городе Худжанд": "http://polytech.tj",
  "Институт экономики и торговли Таджикского государственного университета коммерции в городе Худжанд": "https://iet.tj",
  "Кулябский государственный университет имени Абуабдулло Рудаки": "https://new.kgu.tj/ru",
  "Бохтарский государственный университет имени Носири Хусрава": "http://btsu.tj",
  "Дангаринский государственный университет": "http://dsu.tj",
  "Хатлонский государственный медицинский университет": "https://khatmedun.tj",
  "Таджикский аграрный университет имени Шириншоха Шотемура": "https://www.tajagroun.tj/ru/",
  "Таджикский государственный финансово-экономический университет": "https://tgfeu.tj/ru",
  "Международный университет туризма и предпринимательства Таджикистана": "https://iutet.tj/ru/",
  "Медико-социальный институт Таджикистана (негосударственный)": "https://www.msi.tj/ru",
  "Государственный институт изобразительного искусства и дизайна Таджикистана": "https://ddstdt.tj",
  "Инновационный институт Душанбе (негосударственный)": "https://dii.tj/",
  "Филиал Национального исследовательского университета «Московский энергетический институт» в городе Душанбе": "https://df.mpei.ru",
  "Филиал Национального исследовательского технологического университета «МИСиС» в городе Душанбе": "https://df.misis.ru",
};

// --- universities ----------------------------------------------------------
const usedSlugs = new Set();
const uniqSlug = (base) => { let s = base || "uni", i = 2; while (usedSlugs.has(s)) s = `${base}-${i++}`; usedSlugs.add(s); return s; };

const uniByName = {};
const universities = universitiesRaw.map((u, i) => {
  const type = /негосударственн/i.test(u.name) ? "private" : "state";
  const isBranch = /^филиал/i.test(u.name);
  const rec = {
    id: `u${i + 1}`,
    slug: uniqSlug(slugify(u.name.replace(/\(негосударственный\)/i, ""))),
    name: u.name,
    shortName: SHORT_OVERRIDES[u.name] || acronym(u.name),
    type, isBranch,
    region: u.region,
    city: u.city,
    address: u.address,
    phone: u.phone,
    website: WEBSITE[u.name] || null,
    languages: [], forms: [], clusters: [],
    specialtyCount: 0, programCount: 0, totalSeats: 0,
  };
  uniByName[u.name] = rec;
  return rec;
});

// --- offerings + attach to specialties & universities ----------------------
const LANG_SPLIT = (s) => (s || "").split(/\s*,\s*/).map((x) => x.trim()).filter(Boolean);
const specByCode = Object.fromEntries(specialtiesRaw.map((s) => [s.code, {
  code: s.code, slug: s.code, name: s.name, cluster: s.cluster,
  offerings: [], universityIds: [],
}]));

const uniSpecSet = {}; // uniId -> Set(codes)
for (const r of programs) {
  if (!r.universityName || !specByCode[r.code]) continue;
  const uni = uniByName[r.universityName];
  if (!uni) continue;
  const sp = specByCode[r.code];
  const off = {
    universityId: uni.id,
    form: r.form || "",
    paid: !!r.paid,
    tuition: r.tuition ?? null,
    language: r.language || "",
    seats: r.seats ?? 0,
  };
  sp.offerings.push(off);
  uni.programCount++;
  uni.totalSeats += off.seats;
  for (const l of LANG_SPLIT(off.language)) if (!uni.languages.includes(l)) uni.languages.push(l);
  if (off.form && !uni.forms.includes(off.form)) uni.forms.push(off.form);
  if (!uni.clusters.includes(sp.cluster)) uni.clusters.push(sp.cluster);
  (uniSpecSet[uni.id] ||= new Set()).add(sp.code);
}

// finalize specialties: dedupe uni list + stats
const specialties = Object.values(specByCode).map((sp) => {
  const uids = [...new Set(sp.offerings.map((o) => o.universityId))];
  const langs = [...new Set(sp.offerings.flatMap((o) => LANG_SPLIT(o.language)))];
  const forms = [...new Set(sp.offerings.map((o) => o.form).filter(Boolean))];
  const tuitions = sp.offerings.map((o) => o.tuition).filter((t) => t != null && t > 0);
  const totalSeats = sp.offerings.reduce((a, o) => a + o.seats, 0);
  const freeSeats = sp.offerings.filter((o) => !o.paid).reduce((a, o) => a + o.seats, 0);
  return {
    ...sp,
    universityIds: uids,
    stats: {
      universities: uids.length,
      offerings: sp.offerings.length,
      totalSeats, freeSeats,
      tuitionMin: tuitions.length ? Math.min(...tuitions) : null,
      tuitionMax: tuitions.length ? Math.max(...tuitions) : null,
      languages: langs, forms,
    },
  };
});

for (const u of universities) {
  u.specialtyCount = uniSpecSet[u.id]?.size || 0;
  u.clusters.sort();
  u.languages.sort();
}

// --- cluster summaries ------------------------------------------------------
const CLUSTER_NAMES = {
  1: "Естественный и технический", 2: "Экономика и география",
  3: "Филология, педагогика и искусство", 4: "Обществоведение и право",
  5: "Медицина, биология и спорт",
};
const clusters = [1, 2, 3, 4, 5].map((id) => {
  const specs = specialties.filter((s) => s.cluster === id);
  return {
    id, name: CLUSTER_NAMES[id],
    specialtyCount: specs.length,
    programCount: specs.reduce((a, s) => a + s.stats.offerings, 0),
    totalSeats: specs.reduce((a, s) => a + s.stats.totalSeats, 0),
  };
});

const out = {
  generatedAt: "2026-07-27",
  source: "Национальный центр тестирования при Президенте РТ — план приёма 2026–2027",
  sourceUrl: "https://ntc.tj/ru/abiturientu/plan-priyoma-2022-2023.html",
  totals: {
    universities: universities.length,
    specialties: specialties.length,
    programs: programs.filter((r) => r.universityName).length,
    seats: universities.reduce((a, u) => a + u.totalSeats, 0),
  },
  clusters, universities, specialties,
};

fs.mkdirSync("lib/ntc", { recursive: true });
fs.writeFileSync("lib/ntc/data.json", JSON.stringify(out));
console.log("Wrote lib/ntc/data.json");
console.log("totals:", out.totals);
console.log("clusters:", clusters.map((c) => `${c.id}. ${c.name} — ${c.specialtyCount} спец., ${c.programCount} прогр., ${c.totalSeats} мест`).join("\n  "));
console.log("sample uni:", JSON.stringify(universities[20], null, 1));
console.log("sample specialty:", JSON.stringify({ ...specialties[0], offerings: specialties[0].offerings.slice(0, 2) }, null, 1));
