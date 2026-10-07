// Parse the secondary-vocational (ССУЗ/колледж) specialty tables out of the
// same 5 NTC cluster PDFs already used for the university dataset — each one
// also contains a "СПЕЦИАЛЬНОСТИ, ПРЕДЛОЖЕННЫЕ ОБРАЗОВАТЕЛЬНЫМИ УЧРЕЖДЕНИЯМИ
// СРЕДНЕГО ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ" table, structurally identical to
// the higher-ed one scripts/parse_ntc.mjs already parses (same columns: ID,
// code, specialty, institution, city, form, payment, language, seats).
//
// Institutions are matched against lib/colleges/data.json (already built
// from the NTC ССУЗ contact registry) by fuzzy name — same matcher as
// parse_ntc.mjs uses for universities. Output: data/parsed/college_*.json,
// merged into lib/colleges/data.json by build_college_specialties.mjs.
import fs from "fs";

const base = "data/parsed";
const CLUSTERS = {
  1: "Естественный и технический",
  2: "Экономика и география",
  3: "Филология, педагогика и искусство",
  4: "Обществоведение и право",
  5: "Медицина, биология и спорт",
};
const LANGS = ["таджикский", "русский", "английский", "узбекский", "туркменский", "персидский", "немецкий", "французский", "французкий", "арабский", "китайский"];
const FORMS = ["дневная", "заочная", "дистанционная", "вечерняя"];
const LANG_COL = 130;

const norm = (s) => s.replace(/\s+/g, " ").trim();
const dehyph = (s) => s.replace(/([а-яё])-\s+([а-яё])/gi, "$1$2");
const findAll = (lines, re) => { const o = []; lines.forEach((l, i) => re.test(l) && o.push(i)); return o; };

// ===========================================================================
// specialty x college rows (from -table output), same shape as parse_ntc.mjs
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
// See scripts/parse_ntc.mjs for why this exists: when both the specialty name
// and the institution name need to wrap, the row id sometimes lands on a line
// of its own, separate from "code - name" — REC alone misses both halves and
// silently swallows the row into a neighbouring record.
const CODE_ONLY = /^\s*(\d[\d.]{3,})\s*[-–—]\s*(.+)$/;
const ROWID_CONT = /^\s*(\d{1,6})\s+(.+)$/;

function stripFields(text) {
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
  let pending = null; // { code, nameStart } — a headless "code - name" line seen, its row id not found yet
  const flush = () => {
    if (!buf) return;
    let f = stripFields(dehyph(buf.first));
    if (!f) {
      f = stripFields(dehyph(norm(buf.first + " " + buf.cont.map((c) => c.text).join(" "))));
      if (f) rows.push({ cluster, code: buf.code, rowId: buf.rowId, ...f });
      else rows.push({ cluster, code: buf.code, rowId: buf.rowId, _bad: true, _raw: norm(buf.first) });
      buf = null; return;
    }
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
    if (!l.trim()) continue;
    if (isNoise(l)) { flush(); pending = null; continue; }
    const m = l.match(REC);
    if (m) { flush(); pending = null; buf = { rowId: +m[1], code: m[2].replace(/\.$/, ""), first: m[3], cont: [] }; continue; }
    if (pending) {
      const rm = l.match(ROWID_CONT);
      if (rm) {
        buf = { rowId: +rm[1], code: pending.code, first: norm(pending.nameStart + " " + rm[2]), cont: [] };
        pending = null;
        continue;
      }
      pending.nameStart = norm(pending.nameStart + " " + l.trim());
      continue;
    }
    const co = l.match(CODE_ONLY);
    if (co) { flush(); pending = { code: co[1].replace(/\.$/, ""), nameStart: co[2] }; continue; }
    if (buf) buf.cont.push({ raw: l, text: l.trim() });
  }
  flush();
  return rows;
}

// ===========================================================================
// fuzzy college matcher — identical technique to parse_ntc.mjs's university
// matcher, pointed at lib/colleges/data.json instead.
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
function buildMatcher(colleges) {
  const idx = colleges.map((c) => ({ c, tokens: tok(c.name), cityTok: tok(c.location)[0] }));
  return (middle) => {
    const mset = new Set(tok(middle));
    let best = null, bestScore = 0.45;
    for (const { c, tokens, cityTok } of idx) {
      let hit = 0; for (const t of tokens) if (tmatch(t, mset)) hit++;
      const recall = hit / tokens.length;
      if (recall < 0.5 || hit < 2) continue;
      let score = recall * (0.5 + Math.min(tokens.length, 12) / 24) + hit * 0.02;
      if (cityTok && mset.has(cityTok)) score += 0.12;
      if (recall === 1) score += 0.1;
      if (score > bestScore) { bestScore = score; best = c; }
    }
    return best ? { college: best, score: +bestScore.toFixed(3) } : null;
  };
}

// ===========================================================================
// specialty name reconstruction — same common-prefix technique as parse_ntc
// ===========================================================================
const wtok = (w) => w.toLowerCase().replace(/[«»"',()]/g, "").replace(/ё/g, "е");
const UNIWORD = /университ|институт|филиал|академи|консерватор|колледж|техникум/i;
const STRUCT = new Set(["имени", "им", "при", "президенте", "республики", "городе", "город", "районе", "район", "государственный", "государственного"]);
function stripCollege(middle, collegeName, location) {
  const cSet = new Set(tok(collegeName));
  const locW = wtok(location || "");
  const kept = middle.split(/\s+/).filter((w) => {
    const n = wtok(w);
    if (!n) return false;
    if (n === locW || STRUCT.has(n)) return false;
    if (/^[А-Яа-яЁёA-Za-z]\.$/.test(w) || /^[А-ЯA-Z]$/.test(w)) return false;
    for (const t of cSet) {
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

// ===========================================================================
// main
// ===========================================================================
const { colleges } = JSON.parse(fs.readFileSync("lib/colleges/data.json", "utf8"));
console.log(`Colleges (from registry): ${colleges.length}`);
const matchCollege = buildMatcher(colleges);

let rows = [];
for (let n = 1; n <= 5; n++) {
  const lines = fs.readFileSync(`${base}/t_cluster_${n}.txt`, "utf8").split(/\r?\n/);
  const spoStart = findAll(lines, /^\s*СПЕЦИАЛЬНОСТИ, ПРЕДЛОЖЕННЫЕ ОБРАЗОВАТЕЛЬНЫМИ УЧРЕЖДЕНИЯМИ СРЕДНЕГО/i);
  const spoEnd = findAll(lines, /^\s*ОБРАЗОВАТЕЛЬНЫЕ УЧРЕЖДЕНИЯ СРЕДНЕГО ПРОФЕССИОНАЛЬНОГО ОБРАЗОВАНИЯ\s*$/i);
  const start = spoStart[spoStart.length - 1];
  const end = spoEnd[0] ?? lines.length;
  const seg = lines.slice(start + 1, end);
  const r = parseRows(seg, n);
  rows = rows.concat(r);
  console.log(`cluster ${n}: ${r.length} rows (bad ${r.filter((x) => x._bad).length})`);
}

const good = rows.filter((r) => !r._bad);
const unmatched = [];
for (const r of good) {
  const m = matchCollege(r.middle);
  if (m) { r.collegeId = m.college.id; r.collegeName = m.college.name; r.location = m.college.location; r.collegeScore = m.score; }
  else { r.collegeId = null; unmatched.push(r.middle); }
}

// hand-reconstructed — the auto pass truncated these (single-college codes
// where the specialty name itself runs into the institution name with no
// reliable boundary; same class of gap as parse_ntc.mjs's NAME_OVERRIDES).
const NAME_OVERRIDES = {
  "2030201": "Физическая культура (ТЭилиЭСН)",
  "2740301": "Ветеринария",
  "202060102": "Технология (технический труд и черчение)",
  "240010133": "Компьютерная графика",
  "2240101": "Биология",
  "2400202": "Электронные вычислительные средства",
  "2450304": "Почтовая связь",
  "2880231": "Спортивно-педагогическая деятельность (ТЭилиЭСН)",
  "201020138": "Социально-педагогическая деятельность",
  "224010232": "Хозяйственно-правовая деятельность",
  "225011008": "Коммерческая деятельность на рынке радиоэлектронных средств и информационных услуг",
  "227013107": "Экономика и организация производства на предприятии коммунального хозяйства",
  "227013112": "Экономика и организация производства на предприятии радиоэлектроники",
  "227013114": "Экономика и организация производства на предприятии связи",
  "227013118": "Экономика и организация производства на предприятии химической промышленности",
  "245010234": "Системы радиовещания и телевидения",
  "245010331": "Линейно-кабельные сооружения связи",
  "274030208": "Ветеринарно-фармацевтическая медицина",
  "227013126": "Экономика и организация ресторанного хозяйства",
  "2001020135": "Иностранный язык (английский язык)",
  "2250110019": "Коммерческая деятельность на рынке услуг",
  "2270131123": "Экономика и организация в сфере туризма",
  "22401020235": "Право и организация социального обеспечения",
  // duplicate code shared by two distinct specialties in the source PDF
  // (see README "known parsing artifacts") — picked the majority name.
  "2790136": "Физиотерапия",
  "2800151": "Использование медицинской техники и оборудования",
  "2860101": "Работы по социальной защите",
  // recovered by the CODE_ONLY/ROWID_CONT fix above — see parse_ntc.mjs for
  // why the auto name extraction needs a hand override for these.
  "253013203": "Автоматизация технологических процессов и производств химической промышленности",
};

const byCode = {};
for (const r of good) (byCode[r.code] ||= []).push(r);
const specialties = {};
for (const [code, rs] of Object.entries(byCode)) {
  let name = cpw(rs.map((r) => r.middle)).replace(/[,\s]+$/, "").trim();
  if (name.length < 3 || UNIWORD.test(name)) {
    const cands = rs.filter((r) => r.collegeId)
      .map((r) => stripCollege(r.middle, r.collegeName, r.location || "").replace(/[,\s]+$/, "").trim())
      .filter((n) => n.length >= 3 && !UNIWORD.test(n))
      .sort((a, b) => a.length - b.length);
    if (cands[0]) name = cands[0];
  }
  name = name.replace(/\s+(в|г|и|с)$/i, "").trim();
  if (NAME_OVERRIDES[code]) name = NAME_OVERRIDES[code];
  specialties[code] = { code, name, cluster: rs[0].cluster };
}

console.log(`\nTotal ${rows.length}, parsed ${good.length}, bad ${rows.length - good.length}`);
console.log(`College matched: ${good.filter((r) => r.collegeId).length}/${good.length}`);
console.log(`Distinct specialties: ${Object.keys(specialties).length}`);
console.log(`Unmatched sample:`);
console.log([...new Set(unmatched)].slice(0, 20).map((s) => "  · " + s.slice(0, 95)).join("\n"));

fs.writeFileSync(`${base}/college_programs.json`, JSON.stringify(good, null, 2));
fs.writeFileSync(`${base}/college_specialties.json`, JSON.stringify(Object.values(specialties), null, 2));
fs.writeFileSync(`${base}/college_report.json`, JSON.stringify({
  unmatched: [...new Set(unmatched)],
  bad: rows.filter((r) => r._bad),
}, null, 2));
console.log("\nWrote JSON outputs.");
