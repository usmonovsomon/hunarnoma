// Merge parsed college specialty/program data (data/parsed/college_*.json,
// from scripts/parse_college_specialties.mjs) into lib/colleges/data.json —
// same shape as scripts/build_data.mjs does for lib/ntc/data.json, so the
// college pages can reuse the university pages' patterns directly.
import fs from "fs";

const P = "data/parsed";
const programs = JSON.parse(fs.readFileSync(`${P}/college_programs.json`, "utf8"));
const specialtiesRaw = JSON.parse(fs.readFileSync(`${P}/college_specialties.json`, "utf8"));
const current = JSON.parse(fs.readFileSync("lib/colleges/data.json", "utf8"));

const LANG_SPLIT = (s) => (s || "").split(/\s*,\s*/).map((x) => x.trim()).filter(Boolean);

const colleges = current.colleges.map((c) => ({
  ...c,
  languages: [], forms: [], clusters: [],
  specialtyCount: 0, programCount: 0, totalSeats: 0,
}));
const collegeById = Object.fromEntries(colleges.map((c) => [c.id, c]));

const specByCode = Object.fromEntries(specialtiesRaw.map((s) => [s.code, {
  code: s.code, slug: s.code, name: s.name, cluster: s.cluster,
  offerings: [], collegeIds: [],
}]));

const collegeSpecSet = {};
for (const r of programs) {
  if (!r.collegeId || !specByCode[r.code]) continue;
  const college = collegeById[r.collegeId];
  if (!college) continue;
  const sp = specByCode[r.code];
  const off = {
    collegeId: college.id,
    form: r.form || "",
    paid: !!r.paid,
    tuition: r.tuition ?? null,
    language: r.language || "",
    seats: r.seats ?? 0,
  };
  sp.offerings.push(off);
  college.programCount++;
  college.totalSeats += off.seats;
  for (const l of LANG_SPLIT(off.language)) if (!college.languages.includes(l)) college.languages.push(l);
  if (off.form && !college.forms.includes(off.form)) college.forms.push(off.form);
  if (!college.clusters.includes(sp.cluster)) college.clusters.push(sp.cluster);
  (collegeSpecSet[college.id] ||= new Set()).add(sp.code);
}

const specialties = Object.values(specByCode).map((sp) => {
  const cids = [...new Set(sp.offerings.map((o) => o.collegeId))];
  const langs = [...new Set(sp.offerings.flatMap((o) => LANG_SPLIT(o.language)))];
  const forms = [...new Set(sp.offerings.map((o) => o.form).filter(Boolean))];
  const tuitions = sp.offerings.map((o) => o.tuition).filter((t) => t != null && t > 0);
  const totalSeats = sp.offerings.reduce((a, o) => a + o.seats, 0);
  const freeSeats = sp.offerings.filter((o) => !o.paid).reduce((a, o) => a + o.seats, 0);
  return {
    ...sp,
    collegeIds: cids,
    stats: {
      colleges: cids.length,
      offerings: sp.offerings.length,
      totalSeats, freeSeats,
      tuitionMin: tuitions.length ? Math.min(...tuitions) : null,
      tuitionMax: tuitions.length ? Math.max(...tuitions) : null,
      languages: langs, forms,
    },
  };
});

for (const c of colleges) {
  c.specialtyCount = collegeSpecSet[c.id]?.size || 0;
  c.clusters.sort();
  c.languages.sort();
}

const out = {
  ...current,
  source: "Национальный центр тестирования при Президенте РТ — реестр учреждений СПО и план приёма 2026–2027",
  totals: {
    colleges: colleges.length,
    specialties: specialties.length,
    programs: programs.filter((r) => r.collegeId).length,
    seats: colleges.reduce((a, c) => a + c.totalSeats, 0),
  },
  colleges,
  specialties,
};

fs.writeFileSync("lib/colleges/data.json", JSON.stringify(out, null, 2));
console.log("Wrote lib/colleges/data.json");
console.log("totals:", out.totals);
console.log("colleges with 0 specialties:", colleges.filter((c) => c.specialtyCount === 0).length);
console.log("sample college:", JSON.stringify(colleges.find((c) => c.specialtyCount > 0), null, 1));
console.log("sample specialty:", JSON.stringify({ ...specialties[0], offerings: specialties[0].offerings.slice(0, 2) }, null, 1));
