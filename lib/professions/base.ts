// Structural (locale-independent) part of the professions pilot layer:
// which professional fields and professions exist, their emoji/colour, and
// which real NTC specialty codes lead to each profession.
//
// This is an editorial layer, same spirit as lib/ntc/content.ts — the NTC
// admission-plan dataset has no notion of "profession" at all, so the list
// below, and all prose describing it (lib/i18n/professions/*), is curated by
// hand rather than sourced from official data. Only the specialtyCodes are
// real: they must match codes in lib/ntc/data.json so a profession page can
// link straight into the existing, dataset-backed specialty → university
// chain.

export type ProfessionFieldColor = "blue" | "emerald" | "violet" | "amber" | "rose" | "cyan" | "orange";

export const PROFESSION_FIELD_IDS = [
  "it",
  "engineering",
  "medicine",
  "business",
  "law",
  "education",
  "media",
] as const;

export type ProfessionFieldId = (typeof PROFESSION_FIELD_IDS)[number];

export interface ProfessionFieldBase {
  id: ProfessionFieldId;
  emoji: string;
  color: ProfessionFieldColor;
}

export const PROFESSION_FIELD_BASE: Record<ProfessionFieldId, ProfessionFieldBase> = {
  it: { id: "it", emoji: "💻", color: "blue" },
  engineering: { id: "engineering", emoji: "🏗️", color: "amber" },
  medicine: { id: "medicine", emoji: "🩺", color: "rose" },
  business: { id: "business", emoji: "📈", color: "emerald" },
  law: { id: "law", emoji: "⚖️", color: "violet" },
  education: { id: "education", emoji: "📚", color: "cyan" },
  media: { id: "media", emoji: "🎨", color: "orange" },
};

export const PROFESSION_FIELD_COLOR: Record<
  ProfessionFieldColor,
  { chip: string; dot: string; ring: string; text: string }
> = {
  blue: { chip: "bg-blue-50 text-blue-700 ring-blue-100", dot: "bg-blue-500", ring: "ring-blue-200", text: "text-blue-700" },
  emerald: { chip: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500", ring: "ring-emerald-200", text: "text-emerald-700" },
  violet: { chip: "bg-violet-50 text-violet-700 ring-violet-100", dot: "bg-violet-500", ring: "ring-violet-200", text: "text-violet-700" },
  amber: { chip: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500", ring: "ring-amber-200", text: "text-amber-700" },
  rose: { chip: "bg-rose-50 text-rose-700 ring-rose-100", dot: "bg-rose-500", ring: "ring-rose-200", text: "text-rose-700" },
  cyan: { chip: "bg-cyan-50 text-cyan-700 ring-cyan-100", dot: "bg-cyan-500", ring: "ring-cyan-200", text: "text-cyan-700" },
  orange: { chip: "bg-orange-50 text-orange-700 ring-orange-100", dot: "bg-orange-500", ring: "ring-orange-200", text: "text-orange-700" },
};

export interface ProfessionBase {
  id: string;
  slug: string;
  fieldId: ProfessionFieldId;
  /** Real NTC specialty codes (lib/ntc/data.json) that lead to this profession. */
  specialtyCodes: string[];
}

export const PROFESSIONS: ProfessionBase[] = [
  // IT и технологии
  { id: "software-developer", slug: "software-developer", fieldId: "it", specialtyCodes: ["1400101", "140010202"] },
  { id: "web-ui-designer", slug: "web-ui-designer", fieldId: "it", specialtyCodes: ["131030408"] },
  { id: "ai-data-specialist", slug: "ai-data-specialist", fieldId: "it", specialtyCodes: ["1400301", "1310304"] },

  // Инженерия и архитектура
  { id: "architect", slug: "architect", fieldId: "engineering", specialtyCodes: ["1690101"] },

  // Медицина и здоровье
  { id: "doctor", slug: "doctor", fieldId: "medicine", specialtyCodes: ["1790101"] },
  { id: "dentist", slug: "dentist", fieldId: "medicine", specialtyCodes: ["1790107"] },
  { id: "pharmacist", slug: "pharmacist", fieldId: "medicine", specialtyCodes: ["1790108"] },

  // Бизнес и финансы
  { id: "economist", slug: "economist", fieldId: "business", specialtyCodes: ["1250103"] },
  { id: "financier", slug: "financier", fieldId: "business", specialtyCodes: ["1250104"] },
  { id: "accountant", slug: "accountant", fieldId: "business", specialtyCodes: ["1250108"] },
  { id: "manager", slug: "manager", fieldId: "business", specialtyCodes: ["1260202"] },

  // Право и государство
  { id: "lawyer", slug: "lawyer", fieldId: "law", specialtyCodes: ["1240102"] },
  { id: "diplomat", slug: "diplomat", fieldId: "law", specialtyCodes: ["1230101"] },
  { id: "civil-servant", slug: "civil-servant", fieldId: "law", specialtyCodes: ["1260101", "1260102"] },

  // Образование и языки
  { id: "primary-teacher", slug: "primary-teacher", fieldId: "education", specialtyCodes: ["1010201"] },
  { id: "english-teacher", slug: "english-teacher", fieldId: "education", specialtyCodes: ["1020306"] },
  { id: "philologist-teacher", slug: "philologist-teacher", fieldId: "education", specialtyCodes: ["1020301"] },

  // Медиа и туризм
  { id: "journalist", slug: "journalist", fieldId: "media", specialtyCodes: ["1230108"] },
  { id: "tourism-specialist", slug: "tourism-specialist", fieldId: "media", specialtyCodes: ["1890101"] },
];

/** Per-locale text for one profession — the curated "what is this job" copy. */
export interface ProfessionText {
  name: string;
  tagline: string;
  summary: string;
  whatTheyDo: string[];
  skills: string[];
  schoolSubjects: string[];
  pros: string[];
  cons: string[];
}

export interface ProfessionFieldText {
  name: string;
  tagline: string;
}

/** The shape each lib/i18n/professions/<locale>.ts file must satisfy. */
export interface ProfessionContentBundle {
  fields: Record<ProfessionFieldId, ProfessionFieldText>;
  professions: Record<string, ProfessionText>;
}
