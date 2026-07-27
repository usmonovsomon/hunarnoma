// Parse NTC 2026 admission-plan cluster PDFs into structured JSON.
//
// Uses two pdftotext renderings (already produced in data/parsed/):
//   cluster_N.txt   — `pdftotext -layout`  (used for the HEI appendix)
//   t_cluster_N.txt — `pdftotext -table`   (used for the specialty rows)
//
// Output: universities.json, programs.json, specialties.json, report.json
import fs from "fs";

const base = "data/parsed";
const CLUSTERS = {
  1: "Естественный и технический",
  2: "Экономика и география",
  3: "Филология, педагогика и искусство",
  4: "Обществоведение и право",
  5: "Медицина, биология и спорт",
};
const REGIONS = [
  "Горно-Бадахшанская автономная область",
  "Согдийская область",
  "Хатлонская область",
  "Город Душанбе",
  "Район Рашт",
];
const LANGS = ["таджикский", "русский", "английский", "узбекский", "туркменский", "персидский", "немецкий", "французский", "французкий", "арабский", "китайский"];
const FORMS = ["дневная", "заочная", "дистанционная", "вечерняя"];
const LANG_COL = 130; // char offset: continuation text at/after this = language column

const norm = (s) => s.replace(/\s+/g, " ").trim();
const dehyph = (s) => s.replace(/([а-яё])-\s+([а-яё])/gi, "$1$2");
const findAll = (lines, re) => { const o = []; lines.forEach((l, i) => re.test(l) && o.push(i)); return o; };

// ===========================================================================
// 1) HEI appendix -> canonical universities
// ===========================================================================
function parseUniversities(lines) {
  const vpo = findAll(lines, /^\s*ОБРАЗОВАТЕЛЬНЫЕ УЧРЕЖДЕНИЯ ВЫСШЕГО ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ\s*$/i);
  const spo = findAll(lines, /^\s*ОБРАЗОВАТЕЛЬНЫЕ УЧРЕЖДЕНИЯ СРЕДНЕГО ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ\s*$/i);
  const start = vpo[vpo.length - 1];
  const end = spo.find((i) => i > start) ?? lines.length;
  const seg = lines.slice(start + 1, end);

  const unis = [];
  let region = null, cur = null;
  const flush = () => { if (cur) { unis.push(cur); cur = null; } };
  for (const raw of seg) {
    const l = raw.replace(/\s+$/, "");
    if (!l.trim() || /№\s+Название/i.test(l) || /кластер:/i.test(l) || /Страница/i.test(l)) continue;
    const reg = REGIONS.find((r) => l.trim().startsWith(r));
    if (reg) { flush(); region = reg; continue; }
    const m = l.match(/^\s*(\d+)\s+(.+)$/);
    if (m) {
      flush();
      let rest = m[2], phone = "";
      const ph = rest.match(/\(\d[\d\s\-()]{4,}.*$/);
      if (ph) { phone = norm(ph[0]); rest = rest.slice(0, ph.index).trim(); }
      let name = rest, address = "";
      const ad = rest.match(/(город|район)\s+[А-ЯЁ][А-Яа-яЁё\-]+\s*,/);
      if (ad) { name = rest.slice(0, ad.index).trim(); address = rest.slice(ad.index).trim(); }
      cur = { num: +m[1], region, name: dehyph(norm(name)), address: norm(address), phone };
    } else if (cur) {
      const lead = l.length - l.trimStart().length;
      let t = l.trim();
      const ph = t.match(/\(\d[\d\s\-()]{4,}.*$/);
      if (ph) { cur.phone = norm(cur.phone + " " + ph[0]); t = t.slice(0, ph.index).trim(); }
      if (!t) { /* phone only */ }
      else if (lead < 30) cur.name = dehyph(norm(cur.name + " " + t)); // name-column wrap
      else cur.address = norm(cur.address + " " + t); // address-column wrap
    }
  }
  flush();
  for (const u of unis) {
    const cm = u.address.match(/(город|район)\s+([А-ЯЁ][А-Яа-яЁё\-]+)/);
    u.city = cm ? cm[2] : "";
  }
  return unis;
}

// ===========================================================================
// 2) specialty × university rows (from -table output)
// ===========================================================================
const NOISE = [
  /кластер:/i, /^\s*Специальность/i, /^\s*ID\b/, /код и название/i,
  /профессионального образования/i, /Тип обучения/i, /в сомони/i,
  /обучения\*/i, /город\/район/i, /^\s*Форма\b/, /^\s*Язык\b/, /^\s*План\b/,
  /^\s*Примечание/i, /Страница\s+\d+/i, /С\s?О\s?Д\s?Е\s?Р\s?Ж/i,
  /СПЕЦИАЛЬНОСТИ, (ПРЕДЛОЖЕННЫЕ|ТРЕБУЮЩИЕ)/i, /ОБРАЗОВАТЕЛЬНЫЕ УЧРЕЖДЕНИЯ/i,
  /ПЛАН ПРИЁМА/i, /УЧЕБНЫЙ ГОД/i, /НАЦИОНАЛЬНЫЙ ЦЕНТР/i, /ПРЕЗИДЕНТЕ/i,
  /ВСТУПИТЕЛЬНЫЕ ЭКЗАМЕНЫ/i, /ПЕРИОД РЕГИСТРАЦИИ/i, /ПЕРЕЧЕНЬ КОМБИНАЦИЙ/i,
];
const isNoise = (l) => NOISE.some((re) => re.test(l));
const REC = /^\s*(\d+)\s+(\d[\d.]{4,})\s*[-–—]\s*(.*)$/;

function stripFields(text) {
  // right-to-left: seats, language, payment, form -> returns fields + leftover middle
  let s = norm(text), out = {};
  const seat = s.match(/(\d+)\s*$/);
  if (!seat) return null;
  out.seats = +seat[1]; s = s.slice(0, seat.index).trim();
  const la = LANGS.join("|");
  const lm = s.match(new RegExp(`((?:${la})(?:\\s*,\\s*(?:${la}))*)\\s*,?\\s*$`, "i"));
  if (lm) { out.language = norm(lm[1]); s = s.slice(0, lm.index).trim(); }
  else out.language = "";
  const pm = s.match(/(бесплатный|платный)\s*(\(\s*([\d\s]+)\s*\))?\s*$/i);
  if (pm) { out.paid = /платный/i.test(pm[1]); if (pm[3]) out.tuition = +pm[3].replace(/\s/g, ""); s = s.slice(0, pm.index).trim(); }
  const fm = s.match(new RegExp(`(${FORMS.join("|")})\\s*$`, "i"));
  if (fm) { out.form = fm[1].toLowerCase(); s = s.slice(0, fm.index).trim(); }
  out.middle = norm(s);
  return out;
}

function parseRows(lines, cluster) {
  const rows = [];
  let buf = null;
  const flush = () => {
    if (!buf) return;
    let f = stripFields(dehyph(buf.first));
    if (!f) {
      // rare: fields wrapped entirely off the main line -> parse from joined text
      f = stripFields(dehyph(norm(buf.first + " " + buf.cont.map((c) => c.text).join(" "))));
      if (f) rows.push({ cluster, code: buf.code, rowId: buf.rowId, ...f });
      else rows.push({ cluster, code: buf.code, rowId: buf.rowId, _bad: true, _raw: norm(buf.first) });
      buf = null; return;
    }
    // route continuation lines by column: left = uni/specialty tail, right = language tail
    const uniTail = [], langTail = [];
    for (const c of buf.cont) {
      const left = c.raw.slice(0, LANG_COL), right = c.raw.slice(LANG_COL);
      if (left.trim()) uniTail.push(left.trim());
      if (right.trim() && LANGS.some((x) => right.includes(x))) langTail.push(right.trim());
    }
    f.middle = dehyph(norm(f.middle + " " + uniTail.join(" ")));
    if (langTail.length) f.language = norm([f.language, ...langTail].filter(Boolean).join(", "));
    rows.push({ cluster, code: buf.code, rowId: buf.rowId, ...f });
    buf = null;
  };
  for (const raw of lines) {
    const l = raw.replace(/\s+$/, "");
    if (!l.trim()) continue; // blank lines separate main row from its wrapped continuation — do NOT flush
    if (isNoise(l)) { flush(); continue; }
    const m = l.match(REC);
    if (m) { flush(); buf = { rowId: +m[1], code: m[2].replace(/\.$/, ""), first: m[3], cont: [] }; }
    else if (buf) buf.cont.push({ raw: l, text: l.trim() });
  }
  flush();
  return rows;
}

// ===========================================================================
// 3) fuzzy university matcher (declension/typo tolerant + city disambiguation)
// ===========================================================================
const STOP = new Set(["и", "в", "имени", "им", "на", "по", "с", "у", "го", "the", "of"]);
const tok = (s) => dehyph(s.toLowerCase()).replace(/[«»"',().]/g, " ").replace(/ё/g, "е")
  .split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
const lev = (a, b) => {
  const m = a.length, n = b.length; if (Math.abs(m - n) > 1) return 2;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
};
const tmatch = (t, set) => {
  if (set.has(t)) return true;
  for (const m of set) {
    if (t.length >= 5 && m.length >= 5 && t.slice(0, 5) === m.slice(0, 5)) return true;
    if (Math.abs(t.length - m.length) <= 1 && lev(t, m) <= 1) return true;
  }
  return false;
};
// short-form aliases used in the source that fuzzy matching can't reach
const ALIASES = [
  { toks: ["академия", "государственного", "управления"], name: "Академия государственного управления при Президенте Республики Таджикистан" },
  { toks: ["бизнеса", "политики"], name: "Таджикский государственный университет права, бизнеса и политики" },
];
function buildMatcher(unis) {
  const idx = unis.map((u) => ({ u, tokens: tok(u.name), cityTok: tok(u.city)[0] }));
  const byName = Object.fromEntries(unis.map((u) => [u.name, u]));
  return (middle) => {
    const mset = new Set(tok(middle));
    for (const a of ALIASES) if (a.toks.every((t) => mset.has(t)) && byName[a.name]) return { uni: byName[a.name], score: 0.9 };
    let best = null, bestScore = 0.45;
    for (const { u, tokens, cityTok } of idx) {
      let hit = 0; for (const t of tokens) if (tmatch(t, mset)) hit++;
      const recall = hit / tokens.length;
      if (recall < 0.5 || hit < 2) continue;
      let score = recall * (0.5 + Math.min(tokens.length, 12) / 24) + hit * 0.02;
      if (cityTok && mset.has(cityTok)) score += 0.12; // branch disambiguation by city
      if (recall === 1) score += 0.1;
      if (score > bestScore) { bestScore = score; best = u; }
    }
    return best ? { uni: best, score: +bestScore.toFixed(3) } : null;
  };
}

// ===========================================================================
// main
// ===========================================================================
const universities = parseUniversities(fs.readFileSync(`${base}/cluster_1.txt`, "utf8").split(/\r?\n/));
console.log(`Universities: ${universities.length}`);
const matchUni = buildMatcher(universities);

let rows = [];
for (let n = 1; n <= 5; n++) {
  const lines = fs.readFileSync(`${base}/t_cluster_${n}.txt`, "utf8").split(/\r?\n/);
  const vpo = findAll(lines, /^\s*СПЕЦИАЛЬНОСТИ, ПРЕДЛОЖЕННЫЕ ОБРАЗОВАТЕЛЬНЫМИ УЧРЕЖДЕНИЯМИ ВЫСШЕГО/i);
  const spo = findAll(lines, /^\s*СПЕЦИАЛЬНОСТИ, ПРЕДЛОЖЕННЫЕ ОБРАЗОВАТЕЛЬНЫМИ УЧРЕЖДЕНИЯМИ СРЕДНЕГО/i);
  const seg = lines.slice(vpo[vpo.length - 1] + 1, (spo[spo.length - 1] ?? lines.length));
  const r = parseRows(seg, n);
  rows = rows.concat(r);
  console.log(`cluster ${n}: ${r.length} rows (bad ${r.filter((x) => x._bad).length})`);
}

const good = rows.filter((r) => !r._bad);
const unmatched = [];
for (const r of good) {
  const m = matchUni(r.middle);
  if (m) { r.universityName = m.uni.name; r.city = m.uni.city; r.uniScore = m.score; }
  else { r.universityName = null; unmatched.push(r.middle); }
}

// specialty name per code:
//  - primary: word-wise common prefix across the code's rows (specialty is
//    identical across universities, so it's the shared prefix; the differing
//    university names diverge after it). Robust for multi-university codes.
//  - fallback (single-university codes, where the prefix == whole middle and
//    still carries the university): strip university/city/structural words.
const wtok = (w) => w.toLowerCase().replace(/[«»"',()]/g, "").replace(/ё/g, "е");
const UNIWORD = /университ|институт|филиал|академи|консерватор/i;
const STRUCT = new Set(["имени", "им", "при", "президенте", "республики", "городе", "город", "районе", "район", "государственный", "государственного"]);
function stripUni(middle, uniName, city) {
  const uniSet = new Set(tok(uniName));
  const cityW = wtok(city || "");
  const kept = middle.split(/\s+/).filter((w) => {
    const n = wtok(w);
    if (!n) return false;
    if (n === cityW || STRUCT.has(n)) return false;
    if (/^[А-Яа-яЁёA-Za-z]\.$/.test(w) || /^[А-ЯA-Z]$/.test(w)) return false; // initials «М.» «В.» «С.» (keep lowercase conjunction «и»)
    for (const t of uniSet) {
      if (t === n) return false;
      if (n.length >= 5 && t.length >= 5 && n.slice(0, 5) === t.slice(0, 5)) return false;
    }
    return true;
  });
  return kept.join(" ").replace(/[,\s]+$/, "").trim();
}
const cpw = (arr) => {
  if (arr.length === 1) return arr[0];
  const sp = arr.map((s) => s.split(" ")); let i = 0;
  outer: for (; ; i++) { const w = sp[0][i]; if (w === undefined) break; for (const s of sp) if (s[i] !== w) break outer; }
  return sp[0].slice(0, i).join(" ");
};
// manual overrides for a few long/wrapping names the auto-parser can't clean
const NAME_OVERRIDES = {
  "1570101": "Охрана окружающей среды и рациональное использование природных ресурсов",
  "11000101": "Ядерная и радиационная безопасность",
  "148020102": "Технология лекарственных препаратов",
  "121060102": "Английский язык (перевод)",
  "121040203": "Искусствоведение",
  "12106010201": "Современные иностранные языки",
  // reconstructed from source (wrapped / uni-bled names)
  "380302": "Менеджмент (менеджмент в организации) (СФМУТПТиРГУТС)",
  "380304": "Государственное и местное управление (Г.1)",
  "430301": "Сервис (СФМУТПТиРГУТС)",
  "430302": "Туризм (СФМУТПТиРГУТС)",
  "430303": "Гостиничная деятельность (СФМУТПТиРГУТС)",
  "1210471": "Искусствоведение (по направлениям) (ТЭилиЭСН)",
  "1210501": "Таджикская филология",
  "1210601": "Современные иностранные языки (СТРФНПТ)",
  "1260204": "Документоведение и информационное обеспечение управления",
  "1370401": "Техническая эксплуатация воздушных судов и двигателей",
  "1400102": "Информационные системы и технологии (по направлениям)",
  "1700301": "Автомобильные дороги",
  "1700403": "Промышленное и гражданское строительство",
  "1700501": "Проектирование, сооружение и эксплуатация газонефтепроводов и газонефтехранилищ",
  "1740206": "Производство, хранение и переработка продукции растениеводства (по отраслям)",
  "1930102": "Судебная экспертиза",
  "101010202": "Дошкольное образование. Музыкальное искусство и хореография (ТЭилиЭСН)",
  "102030307": "Таджикский язык и литература. Классическая письменность",
  "102030607": "Английский язык. Китайский язык",
  "102060206": "Технология (обслуживание). Социальная педагогика",
  "103020109": "Страноведение и туризм",
  "117010104": "Актерское искусство музыкально-комедийного театра (ТЭилиЭСН)",
  "119010103": "Дизайн (графический) (ТЭилиЭСН)",
  "119010105": "Дизайн костюма и тканей (ТЭилиЭСН)",
  "123010603": "Политология (научно-педагогическая деятельность)",
  "123011104": "Библиотековедение и библиография (филология и языковедение)",
  "123011203": "Музейное дело и охрана историко-культурного наследия (музееведение)",
  "123011301": "Архивоведение",
  "124010203": "Судебно-прокурорско-следственная деятельность",
  "124010221": "Правовое регулирование и противодействие коррупции",
  "125010104": "Экономика научно-технологического развития",
  "125010301": "Управление внешнеэкономической деятельности",
  "125010404": "Страхование",
  "125010407": "Финансы и кредит во внешнеэкономической деятельности",
  "125010412": "Государственный финансовый надзор",
  "125010728": "Экономика и управление на малых и средних предприятиях",
  "125011004": "Коммерческая деятельность на внешнем рынке",
  "126020207": "Производственный менеджмент",
  "131050103": "Химия (фармацевтическая деятельность)",
  "140030101": "Искусственный интеллект в экономике",
  "143010202": "Проектирование, монтаж и эксплуатация электрических сетей",
  "148010209": "Технология отделки и крашения текстильных материалов",
  "149010201": "Технология мяса и мясных продуктов",
  "149010202": "Технология молока и молочной продукции",
  "150010105": "Технология трикотажа",
  "150030102": "Технология ткацкого производства",
  "151010105": "Геология, строительство гидроэнергетических сооружений и тоннелей",
  "152020101": "Технология и оборудование ювелирных изделий",
  "154010101": "Метрология, стандартизация и сертификация (машиностроение и приборостроение)",
  "174060301": "Организация и технология технического сервиса",
  "175010101": "Лесоведение и лесоводство",
  "189010101": "Туризм и гостеприимство",
  "198010203": "Кибербезопасность и защита данных",
  "19801010205": "Безопасность автоматизированных систем обработки информации и управления",
  "19801010103": "Защищённые информационные системы",
  "174060136012602": "Инженерное машиностроение-менеджмент",
  "12104010203": "Информационные системы в культуре",
  "12104010201": "Менеджмент социальной сферы",
  "11901010303": "Промышленный дизайн и 3D-моделирование",
  "14301020301": "Управление электрическими сетями с использованием искусственного интеллекта",
  "14401020101": "Цифровизация логистики и транспорта",
  "14001020201": "Информационные технологии бухгалтерского учёта",
  "11901010103": "Дизайн мебели (ТЭилиЭСН)",
  "11901010402": "Дизайн рекламы (ТЭилиЭСН)",
  "11901010501": "Дизайн швейных изделий (ТЭилиЭСН)",
  "1210601010601": "Иностранный язык и литература — арабский-английский",
  "12106010202": "Художественный перевод",
  "12103010112": "История и теория культуры",
  "12301060103": "Политика и государственное управление",
  "17402042501": "Агрономия-садоводчество-экономика",
  "13104010112": "Медицинская биофизика",
  // second pass — truncations / no-space / glue the auto-pass could not clean
  "126020401": "Документоведение и документационное обеспечение управления",
  "1950202": "Эксплуатация беспилотных летательных аппаратов",
  "101020202": "Начальное образование. Изобразительное искусство (ТЭилиЭСН)",
  "102020202": "Филология и обучение языкам (таджикский-английский языки)",
  "102030401": "Русский язык и литература",
  "124010211": "Правовое регулирование трудовых отношений",
  "125010202": "Финансовая и банковская деятельность",
  "125010803": "Бухгалтерский учёт, анализ и аудит в бюджетных и научных организациях",
  "140010205": "Информационные системы и технологии (управленческая деятельность)",
  "191010101": "Технология продукции и организация общественного питания",
  "1500201": "Конструирование и технология изделий из кожи",
  "1020303": "Таджикский язык и литература. Семейная грамотность",
  "131010101": "Биология (научно-производственная деятельность)",
  "170020105": "Проектирование зданий и сооружений",
  // unbalanced-parenthesis fixes (wrapped parenthetical tail lost)
  "380301": "Экономика",
  "123010601": "Политология (политико-юридическая деятельность)",
  "131030102": "Математика (научно-педагогическая деятельность)",
  "131040103": "Физика (научно-педагогическая деятельность)",
  "131050101": "Химия (научно-производственная деятельность)",
};

// merge auto-generated reconstruction overrides (manual entries win on conflict)
let AUTO_OVERRIDES = {};
try { AUTO_OVERRIDES = JSON.parse(fs.readFileSync("data/name_overrides_auto.json", "utf8")); } catch {}
const OVERRIDES = { ...AUTO_OVERRIDES, ...NAME_OVERRIDES };
const byCode = {};
for (const r of good) (byCode[r.code] ||= []).push(r);
const specialties = {};
for (const [code, rs] of Object.entries(byCode)) {
  let name = cpw(rs.map((r) => r.middle)).replace(/[,\s]+$/, "").trim();
  if (name.length < 3 || UNIWORD.test(name)) {
    // use the shortest stripped candidate across matched rows
    const cands = rs.filter((r) => r.universityName)
      .map((r) => stripUni(r.middle, r.universityName, r.city || "").replace(/[,\s]+$/, "").trim())
      .filter((n) => n.length >= 3 && !UNIWORD.test(n))
      .sort((a, b) => a.length - b.length);
    if (cands[0]) name = cands[0];
  }
  name = name.replace(/\s+(в|г|и|с)$/i, "").trim(); // trailing preposition left from "в городе X"
  if (OVERRIDES[code]) name = OVERRIDES[code];
  specialties[code] = { code, name, cluster: rs[0].cluster };
}

console.log(`\nTotal ${rows.length}, parsed ${good.length}, bad ${rows.length - good.length}`);
console.log(`University matched: ${good.filter((r) => r.universityName).length}/${good.length}`);
console.log(`Distinct specialties: ${Object.keys(specialties).length}`);
console.log(`Unmatched sample:`);
console.log([...new Set(unmatched)].slice(0, 15).map((s) => "  · " + s.slice(0, 95)).join("\n"));

fs.writeFileSync(`${base}/universities.json`, JSON.stringify(universities, null, 2));
fs.writeFileSync(`${base}/programs.json`, JSON.stringify(good, null, 2));
fs.writeFileSync(`${base}/specialties.json`, JSON.stringify(Object.values(specialties), null, 2));
fs.writeFileSync(`${base}/report.json`, JSON.stringify({
  unmatched: [...new Set(unmatched)],
  bad: rows.filter((r) => r._bad),
}, null, 2));
console.log("\nWrote JSON outputs.");
