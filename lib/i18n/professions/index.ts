// Merges the locale-independent professions structure (fields, emoji, colour,
// specialty links) with the per-locale editorial prose. Mirrors
// lib/i18n/content/index.ts.
import {
  PROFESSION_FIELD_BASE,
  PROFESSION_FIELD_IDS,
  type ProfessionFieldId,
  type ProfessionText,
} from "@/lib/professions/base";
import { DEFAULT_LOCALE, isLocale, type Locale } from "../config";
import ru from "./ru";
import tj from "./tj";
import en from "./en";

const BUNDLES = { ru, tj, en };

const bundleFor = (locale: string) => BUNDLES[isLocale(locale) ? locale : DEFAULT_LOCALE];

export interface ProfessionFieldMeta {
  id: ProfessionFieldId;
  emoji: string;
  color: (typeof PROFESSION_FIELD_BASE)[ProfessionFieldId]["color"];
  name: string;
  tagline: string;
}

/** Full field metadata for a locale, keyed by field id. */
export function getProfessionFieldMeta(locale: Locale): Record<ProfessionFieldId, ProfessionFieldMeta> {
  const { fields } = bundleFor(locale);
  const out = {} as Record<ProfessionFieldId, ProfessionFieldMeta>;
  for (const id of PROFESSION_FIELD_IDS) out[id] = { ...PROFESSION_FIELD_BASE[id], ...fields[id] };
  return out;
}

export const getProfessionField = (locale: Locale, id: ProfessionFieldId): ProfessionFieldMeta =>
  ({ ...PROFESSION_FIELD_BASE[id], ...bundleFor(locale).fields[id] });

/** Curated copy for a profession, or null when it has none (should not happen — every id in base.ts has text). */
export const getProfessionText = (locale: Locale, id: string): ProfessionText | null =>
  bundleFor(locale).professions[id] ?? null;
