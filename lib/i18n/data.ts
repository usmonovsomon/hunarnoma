// Localised views over the factual NTC dataset.
//
// The source is Russian-only, so names live in override files under data/i18n/.
// Every accessor falls back to the Russian source value, which means an
// untranslated entry degrades to "shown in Russian" rather than to a blank.
import type { Dict } from "./dictionaries/ru";
import type { Locale } from "./config";

import specTj from "@/data/i18n/specialties.tj.json";
import specEn from "@/data/i18n/specialties.en.json";
import uniRu from "@/data/i18n/universities.ru.json";
import uniTj from "@/data/i18n/universities.tj.json";
import uniEn from "@/data/i18n/universities.en.json";
import colTj from "@/data/i18n/colleges.tj.json";
import colEn from "@/data/i18n/colleges.en.json";

type NameMap = Record<string, string>;
type UniMap = Record<string, { name?: string; shortName?: string } | string>;

const SPECIALTY_NAMES: Partial<Record<Locale, NameMap>> = {
  tj: specTj as NameMap,
  en: specEn as NameMap,
};

const UNIVERSITY_NAMES: Record<Locale, UniMap> = {
  ru: uniRu as UniMap,
  tj: uniTj as UniMap,
  en: uniEn as UniMap,
};

/** Specialty name in `locale`, falling back to the Russian source name. */
export function specialtyName(locale: Locale, ruName: string): string {
  return SPECIALTY_NAMES[locale]?.[ruName] ?? ruName;
}

function uniEntry(locale: Locale, id: string) {
  const raw = UNIVERSITY_NAMES[locale]?.[id];
  return raw && typeof raw === "object" ? raw : undefined;
}

export function universityName(locale: Locale, id: string, ruName: string): string {
  return uniEntry(locale, id)?.name ?? ruName;
}

export function universityShortName(locale: Locale, id: string, ruShortName: string): string {
  return uniEntry(locale, id)?.shortName ?? ruShortName;
}

type CollegeMap = Record<string, { name?: string; location?: string; address?: string }>;

const COLLEGES: Partial<Record<Locale, CollegeMap>> = {
  tj: colTj as CollegeMap,
  en: colEn as CollegeMap,
};

export const collegeName = (locale: Locale, id: string, ruName: string): string => COLLEGES[locale]?.[id]?.name ?? ruName;
export const collegeLocation = (locale: Locale, id: string, ruLocation: string): string =>
  COLLEGES[locale]?.[id]?.location ?? ruLocation;
export const collegeAddress = (locale: Locale, id: string, ruAddress: string): string =>
  COLLEGES[locale]?.[id]?.address ?? ruAddress;

// --- enumerable value sets -------------------------------------------------
export const formLabel = (d: Dict, form: string): string => d.forms[form] ?? form;
export const cityName = (d: Dict, city: string): string => d.cities[city] ?? city;
export const regionName = (d: Dict, region: string): string => d.regions[region] ?? region;
export const languageName = (d: Dict, lang: string): string => d.languages[lang] ?? lang;
export const uniTypeLabel = (d: Dict, type: "state" | "private"): string =>
  type === "state" ? d.labels.state : d.labels.private;

/**
 * The `language` column of the source PDFs bled into neighbouring columns for
 * ~2% of rows, leaving values like
 *   "таджикский, бесплатный таджикский 4, платный (3850) таджикский 17".
 * Only the four languages the plan actually uses are meaningful, so keep those
 * (in first-seen order) and drop the rest.
 */
const KNOWN_LANGUAGES = ["таджикский", "русский", "английский", "узбекский"] as const;

export function parseLanguages(raw: string | string[] | null | undefined): string[] {
  if (!raw) return [];
  const text = (Array.isArray(raw) ? raw.join(", ") : raw).toLowerCase();
  const found: string[] = [];
  // Scan positionally so the original order is preserved.
  const hits: { at: number; lang: string }[] = [];
  for (const lang of KNOWN_LANGUAGES) {
    const at = text.indexOf(lang);
    if (at !== -1) hits.push({ at, lang });
  }
  for (const { lang } of hits.sort((a, b) => a.at - b.at)) {
    if (!found.includes(lang)) found.push(lang);
  }
  return found;
}

/** Cleaned, localised, comma-joined language list for a table cell. */
export const languageList = (d: Dict, raw: string | string[] | null | undefined): string =>
  parseLanguages(raw).map((l) => languageName(d, l)).join(", ");
