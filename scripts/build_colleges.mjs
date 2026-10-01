import fs from "node:fs";

const RAW_HTML_PATH = process.env.COLLEGES_HTML || "C:/Users/somon.usmonov/AppData/Local/Temp/id66.html";
const html = fs.readFileSync(RAW_HTML_PATH, "utf-8");
const table = html.match(/<table[\s\S]*?<\/table>/g)[0];
const rows = table.match(/<tr[\s\S]*?<\/tr>/g);

function textOf(cellHtml) {
  const paras = cellHtml.match(/<p[^>]*>[\s\S]*?<\/p>/g) || [cellHtml];
  return paras
    .map((p) => p.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const REGION_MAP = {
  "Горно-Бадахшанская автономная область": "Горно-Бадахшанская автономная область",
  "Согдийская область": "Согдийская область",
  "Вилояти Хатлон": "Хатлонская область",
  "Шаҳри Душанбе": "Город Душанбе",
  "Шаҳру ноҳияҳои тобеи ҷумҳурӣ": "Районы республиканского подчинения",
};

let regionRaw = null;
const parsed = [];
for (const row of rows) {
  const cells = row.match(/<td[\s\S]*?<\/td>/g);
  if (!cells) continue;
  if (cells.length === 1) {
    const t = textOf(cells[0]).join(" ");
    if (t) regionRaw = t;
    continue;
  }
  if (cells.length < 4) continue;
  const num = textOf(cells[0]).join(" ");
  if (!/^\d+$/.test(num)) continue;
  const name = textOf(cells[1]).join(" ");
  const address = textOf(cells[2]).join(" ");
  const phone = textOf(cells[3])
    .map((p) => p.replace(/,\s*$/, ""))
    .join(", ");
  parsed.push({ regionRaw, name, address, phone });
}

// --- transliteration (same spirit as the existing university slugs) --------
const TRANS = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y",
  ь: "", э: "e", ю: "yu", я: "ya",
};
function transliterate(s) {
  return s
    .toLowerCase()
    .split("")
    .map((ch) => (ch in TRANS ? TRANS[ch] : /[a-z0-9]/.test(ch) ? ch : " "))
    .join("");
}
function slugify(s, maxLen = 60) {
  return transliterate(s).trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, maxLen).replace(/-+$/, "");
}

const usedSlugs = new Set();
function uniqueSlug(name) {
  let base = slugify(name) || "college";
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${i++}`;
  usedSlugs.add(slug);
  return slug;
}

const colleges = parsed.map((row, i) => {
  const region = REGION_MAP[row.regionRaw] ?? row.regionRaw;
  const isPrivate = /\(негосударственн|\(частн/i.test(row.name);
  const location = row.address.split(",")[0].trim();
  return {
    id: `c${i + 1}`,
    slug: uniqueSlug(row.name),
    name: row.name,
    type: isPrivate ? "private" : "state",
    region,
    location,
    address: row.address,
    phone: row.phone,
  };
});

const byRegion = {};
for (const c of colleges) byRegion[c.region] = (byRegion[c.region] ?? 0) + 1;

const dataset = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: "Национальный центр тестирования при Президенте РТ (ntc.tj) — реестр учреждений среднего профессионального образования",
  sourceUrl: "https://ntc.tj/ru/abiturientu/obrazovatelnye-uchrezhdeniya-vysshego-i-srednego-professionalnogo-obrazovaniya.html?view=article&id=66",
  totals: { colleges: colleges.length },
  colleges,
};

fs.mkdirSync("lib/colleges", { recursive: true });
fs.writeFileSync("lib/colleges/data.json", JSON.stringify(dataset, null, 2));
console.log("colleges:", colleges.length);
console.log("by region:", byRegion);
