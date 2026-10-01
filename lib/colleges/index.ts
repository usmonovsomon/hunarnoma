// Secondary vocational education (ССУЗ — колледжи и техникумы), separate from
// the higher-education dataset in lib/ntc.
//
// Contact info (name/address/phone) comes from the NTC registry of secondary
// professional education institutions. Specialties, offerings and seats come
// from the same 5 NTC cluster admission-plan PDFs lib/ntc is built from —
// each one also carries a college specialty table alongside the university
// one (see scripts/parse_college_specialties.mjs) — so this layer mirrors
// lib/ntc's shape (Specialty/Offering/stats) rather than staying contacts-only.
import raw from "./data.json";

export interface CollegeOffering {
  collegeId: string;
  form: string;
  paid: boolean;
  tuition: number | null;
  language: string;
  seats: number;
}
export interface CollegeSpecStats {
  colleges: number;
  offerings: number;
  totalSeats: number;
  freeSeats: number;
  tuitionMin: number | null;
  tuitionMax: number | null;
  languages: string[];
  forms: string[];
}
export interface CollegeSpecialty {
  code: string;
  slug: string;
  name: string;
  cluster: number;
  offerings: CollegeOffering[];
  collegeIds: string[];
  stats: CollegeSpecStats;
}
export interface College {
  id: string;
  slug: string;
  name: string;
  type: "state" | "private";
  region: string;
  /** First segment of the address — a city or district name, display-only. */
  location: string;
  address: string;
  phone: string;
  languages: string[];
  forms: string[];
  clusters: number[];
  specialtyCount: number;
  programCount: number;
  totalSeats: number;
}
export interface CollegeDataset {
  generatedAt: string;
  source: string;
  sourceUrl: string;
  totals: { colleges: number; specialties: number; programs: number; seats: number };
  colleges: College[];
  specialties: CollegeSpecialty[];
}

export const collegeDataset = raw as unknown as CollegeDataset;
export const colleges = collegeDataset.colleges;
export const collegeSpecialties = collegeDataset.specialties;
export const collegeTotals = collegeDataset.totals;
export const COLLEGE_SOURCE = { label: collegeDataset.source, url: collegeDataset.sourceUrl, updatedAt: collegeDataset.generatedAt };

export const COLLEGE_REGION_ORDER = [
  "Город Душанбе",
  "Согдийская область",
  "Хатлонская область",
  "Горно-Бадахшанская автономная область",
  "Районы республиканского подчинения",
];

const bySlug = new Map(colleges.map((c) => [c.slug, c]));
const byId = new Map(colleges.map((c) => [c.id, c]));
const specByCode = new Map(collegeSpecialties.map((s) => [s.code, s]));

export const getCollege = (slug: string) => bySlug.get(slug) ?? null;
export const getCollegeById = (id: string) => byId.get(id) ?? null;
export const getCollegeSpecialty = (code: string) => specByCode.get(code) ?? null;

export const collegesForSpecialty = (s: CollegeSpecialty): College[] =>
  s.collegeIds.map((id) => byId.get(id)!).filter(Boolean);

export const offeringsAtCollege = (s: CollegeSpecialty, collegeId: string) =>
  s.offerings.filter((o) => o.collegeId === collegeId);

export interface CollegeSpecialtyOfferings { specialty: CollegeSpecialty; offerings: CollegeOffering[] }
export const specialtiesAtCollege = (collegeId: string): CollegeSpecialtyOfferings[] => {
  const out: CollegeSpecialtyOfferings[] = [];
  for (const s of collegeSpecialties) {
    const offs = s.offerings.filter((o) => o.collegeId === collegeId);
    if (offs.length) out.push({ specialty: s, offerings: offs });
  }
  return out;
};

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();
export function searchColleges(q: string): College[] {
  const f = fold(q);
  if (!f) return colleges;
  return colleges.filter((c) => fold(`${c.name} ${c.location}`).includes(f));
}
export function searchCollegeSpecialties(q: string, clusterId?: number): CollegeSpecialty[] {
  const f = fold(q);
  let list = collegeSpecialties;
  if (clusterId) list = list.filter((s) => s.cluster === clusterId);
  if (!f) return list;
  return list.filter((s) => fold(s.name).includes(f) || s.code.includes(f));
}
