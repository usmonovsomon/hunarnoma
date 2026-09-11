// HunarNoma data layer — real NTC 2026 admission-plan data.
// Source: Национальный центр тестирования при Президенте РТ (ntc.tj),
// план приёма 2026–2027. Parsed from the official cluster PDFs.
import raw from "./data.json";

export interface Offering {
  universityId: string;
  form: string; // дневная | заочная | дистанционная | вечерняя
  paid: boolean;
  tuition: number | null; // сомони / год
  language: string; // e.g. "таджикский, русский"
  seats: number;
}
export interface SpecStats {
  universities: number;
  offerings: number;
  totalSeats: number;
  freeSeats: number;
  tuitionMin: number | null;
  tuitionMax: number | null;
  languages: string[];
  forms: string[];
}
export interface Specialty {
  code: string;
  slug: string;
  name: string;
  cluster: number;
  offerings: Offering[];
  universityIds: string[];
  stats: SpecStats;
}
export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  type: "state" | "private";
  isBranch: boolean;
  region: string;
  city: string;
  address: string;
  phone: string;
  website: string | null;
  languages: string[];
  forms: string[];
  clusters: number[];
  specialtyCount: number;
  programCount: number;
  totalSeats: number;
}
export interface ClusterSummary {
  id: number;
  name: string;
  specialtyCount: number;
  programCount: number;
  totalSeats: number;
}
export interface Dataset {
  generatedAt: string;
  source: string;
  sourceUrl: string;
  totals: { universities: number; specialties: number; programs: number; seats: number };
  clusters: ClusterSummary[];
  universities: University[];
  specialties: Specialty[];
}

export const dataset = raw as unknown as Dataset;
export const universities = dataset.universities;
export const specialties = dataset.specialties;
export const clusterSummaries = dataset.clusters;
export const totals = dataset.totals;
export const SOURCE = { label: dataset.source, url: dataset.sourceUrl, updatedAt: dataset.generatedAt };

// --- indexes ---------------------------------------------------------------
const uniById = new Map(universities.map((u) => [u.id, u]));
const uniBySlug = new Map(universities.map((u) => [u.slug, u]));
const specByCode = new Map(specialties.map((s) => [s.code, s]));

export const getUniversityById = (id: string) => uniById.get(id) ?? null;
export const getUniversity = (slug: string) => uniBySlug.get(slug) ?? null;
export const getSpecialty = (code: string) => specByCode.get(code) ?? null;

export const specialtiesInCluster = (clusterId: number) =>
  specialties.filter((s) => s.cluster === clusterId);

export const universitiesForSpecialty = (s: Specialty): University[] =>
  s.universityIds.map((id) => uniById.get(id)!).filter(Boolean);

// offerings of one specialty at one university
export const offeringsAt = (s: Specialty, uniId: string) =>
  s.offerings.filter((o) => o.universityId === uniId);

// all specialties offered by a university, grouped with that uni's offerings
export interface UniSpecialty { specialty: Specialty; offerings: Offering[] }
export const specialtiesAtUniversity = (uniId: string): UniSpecialty[] => {
  const out: UniSpecialty[] = [];
  for (const s of specialties) {
    const offs = s.offerings.filter((o) => o.universityId === uniId);
    if (offs.length) out.push({ specialty: s, offerings: offs });
  }
  return out;
};

// --- search ----------------------------------------------------------------
const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();
export function searchSpecialties(q: string, clusterId?: number): Specialty[] {
  const f = fold(q);
  let list = specialties;
  if (clusterId) list = list.filter((s) => s.cluster === clusterId);
  if (!f) return list;
  return list.filter((s) => fold(s.name).includes(f) || s.code.includes(f));
}
export function searchUniversities(q: string): University[] {
  const f = fold(q);
  if (!f) return universities;
  return universities.filter(
    (u) => fold(u.name).includes(f) || fold(u.shortName).includes(f) || fold(u.city).includes(f),
  );
}

// --- formatting ------------------------------------------------------------
// Locale-aware formatting lives in lib/i18n (fmtNum / fmtSomoni / fmtSomoniRange)
// and lib/i18n/data (formLabel / cityName / regionName / languageName), because
// it needs the active locale and dictionary. Only locale-independent ordering
// stays here.
export const REGION_ORDER = ["Город Душанбе", "Согдийская область", "Хатлонская область", "Горно-Бадахшанская автономная область", "Район Рашт"];
