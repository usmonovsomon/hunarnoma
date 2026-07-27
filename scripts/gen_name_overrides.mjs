// Generate cleaned specialty-name overrides for wrapped / truncated names by
// reconstructing the specialty column from the -table PDF text.
// Manual curated overrides (data/name_overrides_manual.json) always win.
import fs from "fs";

const d = JSON.parse(fs.readFileSync("lib/ntc/data.json", "utf8"));
const files = Object.fromEntries([1, 2, 3, 4, 5].map((n) => [n, fs.readFileSync(`data/parsed/t_cluster_${n}.txt`, "utf8").split(/\r?\n/)]));
const REC = /^\s*(\d+)\s+(\d[\d.]{4,})\s*[-–—]\s*(.*)$/;
const NOISE = [/кластер:/i, /^\s*Специальность/i, /^\s*ID\b/, /код и название/i, /Страница/i, /Примечание/i, /ОБРАЗОВАТЕЛЬНЫЕ/i, /СПЕЦИАЛЬНОСТИ,/i];
const isNoise = (l) => NOISE.some((re) => re.test(l));
const dehyph = (s) => s.replace(/([а-яё])-\s+/gi, "$1");
const uniWord = /университ|институт|филиал|академи|таджикск|технологическ|международн|национальн|худжандск|универсистет|куляб|худжанд|душанбе|бохтар|дангар|хорог|моёншо|абуабдулло|носири|гафуров|бободжон|улугзаде|турсунзаде|ломоносов|шириншох|шотемур|садриддин|айни|сино|назаршоев|осими|рудаки|хусрав|собит|предпринимательства|в городе|м\. с\.|м\. в\./i;

const CUT_TOKENS = ["Таджикский", "Худжандский", "Кулябский", "Бохтарский", "Дангаринский", "Хорогский", "Российско", "Политехнический", "Горно-металлургический", "Технологический", "Международный университет", "Медико-социальный", "Педагогический", "Институт", "Филиал", "Академия", "Университет", "Государственный", "Международного", "в городе", "предпринимательства", "Таджикистана", "академика", "Моёншо", "Абуабдулло", "Носири", "Гафуров", "Бободжона", "Улугзаде", "Турсунзаде", "Ломоносова", "Шириншоха", "Шотемура", "Садриддина", "Айни", "ибни", "Сино", "Назаршоева", "Осими", "Рудаки", "Хусрава", "Собит", "М. С.", "М. В."];

// strong university-name tokens (used to excise a run inserted mid-name)
const STRONG = /^(университет\w*|институт\w*|филиал\w*|академи\w*|государственн\w+|технически\w+|технологическ\w+|международн\w+|национальн\w+|российско-таджикский|политехническ\w+|педагогическ\w+|аграрн\w+|славянск\w+|медико-социальн\w+|инновац\w+|цифровых|коммерции|туризма|имени|академика|при|президенте|республики|таджикистан\w*|универсистет|моёншо|назаршоева|абуабдулло|рудаки|носири|хусрава|бободжона|гафуров\w*|улугзаде|турсунзаде|ломоносова|шириншоха|шотемура|садриддина|айни|сино|осими|собит|нуъмон|аъзам|имоми|правобизнеса)$/i;

function clean(s) {
  s = s.replace(/\s+\d{2,4}(?=\s*\()/g, " ").replace(/\s+\d{2,4}\s*$/, "");
  // art specialties end with a "(...ЭСН)" faculty tag — cut anything after it
  const esn = s.match(/\(Т[ЭЕ]или[^)]*\)/);
  if (esn) s = s.slice(0, esn.index + esn[0].length);
  // trailing cut at a university/founder token
  let cut = s.length;
  for (const t of CUT_TOKENS) { const i = s.indexOf(" " + t); if (i >= 0 && i < cut) cut = i; }
  s = s.slice(0, cut);
  // excise an interleaved run of >=2 strong university tokens (never at pos 0)
  const w = s.split(/\s+/);
  let bestI = -1, bestLen = 0;
  for (let i = 1; i < w.length; i++) {
    let j = i; while (j < w.length && STRONG.test(w[j].replace(/[«».,]/g, ""))) j++;
    if (j - i >= 2 && j - i > bestLen) { bestLen = j - i; bestI = i; }
  }
  let words = w;
  if (bestI >= 0) words = w.slice(0, bestI).concat(w.slice(bestI + bestLen));
  return words.join(" ").replace(/\s+/g, " ").replace(/[,\s]+$/, "").trim();
}

function reconstruct(code, cluster) {
  const lines = files[cluster]; const cands = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(REC); if (!(m && m[2].replace(/\.$/, "") === code)) continue;
    let name = m[3].split(/\s{3,}/)[0].trim();
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j].replace(/\s+$/, ""); if (!l.trim()) continue;
      if (REC.test(l) || isNoise(l)) break;
      const indent = l.length - l.trimStart().length;
      if (indent < 40) { const tail = l.trim().split(/\s{3,}/)[0].trim(); if (tail) name += " " + tail; }
    }
    cands.push(dehyph(name).replace(/\s+/g, " ").trim());
  }
  const freq = {}; cands.forEach((c) => (freq[c] = (freq[c] || 0) + 1));
  return Object.entries(freq).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0]?.[0] || null;
}

const auto = {};
const rejected = [];
for (const s of d.specialties) {
  const cur = s.name; const rec = reconstruct(s.code, s.cluster); if (!rec) continue;
  const c = clean(rec);
  if (c.split(" ").length > cur.split(" ").length &&
      c.toLowerCase().replace(/ё/g, "е").startsWith(cur.toLowerCase().replace(/ё/g, "е").slice(0, Math.min(cur.length, 12))) &&
      c.length >= 5 && c.length < 90 && !/платный|дневная|заочная|\(\d/i.test(c) &&
      !/\d{5}| - /.test(c) && !/\s(и|в|во|с|г|на|по|о|от)$/i.test(c)) {
    if (uniWord.test(c)) rejected.push([s.code, c]);
    else auto[s.code] = c;
  }
}
fs.writeFileSync("data/name_overrides_auto.json", JSON.stringify(auto, null, 2));
console.log("auto overrides:", Object.keys(auto).length);
console.log("rejected (still contaminated — handle manually):", rejected.length);
rejected.forEach(([k, v]) => console.log("  " + k + " :: " + v));
