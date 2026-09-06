// Professions pilot — locale-independent helpers.
// Mirrors the shape of lib/ntc/index.ts, but the underlying list lives in
// base.ts (hand-curated) instead of being parsed from the NTC dataset.
import { getSpecialty, type Specialty } from "@/lib/ntc";
import { PROFESSIONS, type ProfessionBase, type ProfessionFieldId } from "./base";

export * from "./base";

const bySlug = new Map(PROFESSIONS.map((p) => [p.slug, p]));

export const getProfession = (slug: string): ProfessionBase | null => bySlug.get(slug) ?? null;

export const professionsInField = (fieldId: ProfessionFieldId): ProfessionBase[] =>
  PROFESSIONS.filter((p) => p.fieldId === fieldId);

/** Real specialties (from the NTC dataset) that lead to this profession. */
export const specialtiesForProfession = (p: ProfessionBase): Specialty[] =>
  p.specialtyCodes.map((c) => getSpecialty(c)).filter((s): s is Specialty => !!s);
