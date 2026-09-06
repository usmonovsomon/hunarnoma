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

export type ProfessionFieldColor =
  | "blue" | "emerald" | "violet" | "amber" | "rose" | "cyan" | "orange" | "sky" | "fuchsia" | "lime";

export const PROFESSION_FIELD_IDS = [
  "it",
  "engineering",
  "science",
  "medicine",
  "agriculture",
  "business",
  "law",
  "education",
  "media",
  "arts",
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
  science: { id: "science", emoji: "🔬", color: "sky" },
  medicine: { id: "medicine", emoji: "🩺", color: "rose" },
  agriculture: { id: "agriculture", emoji: "🌾", color: "lime" },
  business: { id: "business", emoji: "📈", color: "emerald" },
  law: { id: "law", emoji: "⚖️", color: "violet" },
  education: { id: "education", emoji: "📚", color: "cyan" },
  media: { id: "media", emoji: "🎙️", color: "orange" },
  arts: { id: "arts", emoji: "🎨", color: "fuchsia" },
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
  sky: { chip: "bg-sky-50 text-sky-700 ring-sky-100", dot: "bg-sky-500", ring: "ring-sky-200", text: "text-sky-700" },
  fuchsia: { chip: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100", dot: "bg-fuchsia-500", ring: "ring-fuchsia-200", text: "text-fuchsia-700" },
  lime: { chip: "bg-lime-50 text-lime-700 ring-lime-100", dot: "bg-lime-500", ring: "ring-lime-200", text: "text-lime-700" },
};

export interface ProfessionBase {
  id: string;
  slug: string;
  fieldId: ProfessionFieldId;
  /**
   * Real NTC specialty codes (lib/ntc/data.json) that lead to this profession.
   * Empty for `international` professions — the Tajik admission plan has no
   * matching program for them, so the profession page skips the "where it's
   * taught" section instead of forcing a fake local match.
   */
  specialtyCodes: string[];
  /**
   * True for professions built around studying/working abroad or fully
   * remote/global roles, rather than a specific NTC-listed program. Shown as
   * an "international" badge; never paired with a fabricated specialty link.
   */
  international?: boolean;
}

export const PROFESSIONS: ProfessionBase[] = [
  // IT и технологии
  { id: "software-developer", slug: "software-developer", fieldId: "it", specialtyCodes: ["1400101", "140010202"] },
  { id: "web-ui-designer", slug: "web-ui-designer", fieldId: "it", specialtyCodes: ["131030408"] },
  { id: "ai-data-specialist", slug: "ai-data-specialist", fieldId: "it", specialtyCodes: ["1400301", "1310304"] },
  { id: "cybersecurity-specialist", slug: "cybersecurity-specialist", fieldId: "it", specialtyCodes: ["198010101"] },
  { id: "telecom-engineer", slug: "telecom-engineer", fieldId: "it", specialtyCodes: ["1450101", "1450103", "145010201"] },
  { id: "robotics-engineer", slug: "robotics-engineer", fieldId: "it", specialtyCodes: ["1530106"] },
  { id: "automation-engineer", slug: "automation-engineer", fieldId: "it", specialtyCodes: ["1530101", "153010403"] },
  { id: "radio-engineer", slug: "radio-engineer", fieldId: "it", specialtyCodes: ["1390101"] },

  // Инженерия и архитектура
  { id: "architect", slug: "architect", fieldId: "engineering", specialtyCodes: ["1690101"] },
  { id: "civil-engineer", slug: "civil-engineer", fieldId: "engineering", specialtyCodes: ["1700201", "1700403"] },
  { id: "power-engineer", slug: "power-engineer", fieldId: "engineering", specialtyCodes: ["1430102", "1430105", "1430103", "143010301", "143010305"] },
  { id: "mechanical-engineer", slug: "mechanical-engineer", fieldId: "engineering", specialtyCodes: ["1360101", "1360102"] },
  { id: "oil-gas-engineer", slug: "oil-gas-engineer", fieldId: "engineering", specialtyCodes: ["1510202", "1700501"] },
  { id: "textile-engineer", slug: "textile-engineer", fieldId: "engineering", specialtyCodes: ["1500102", "150010204"] },
  { id: "mining-engineer", slug: "mining-engineer", fieldId: "engineering", specialtyCodes: ["151020101", "151020102"] },
  { id: "geodesist-cartographer", slug: "geodesist-cartographer", fieldId: "engineering", specialtyCodes: ["1560201", "1560202"] },
  { id: "quality-control-engineer", slug: "quality-control-engineer", fieldId: "engineering", specialtyCodes: ["154010101", "154010104", "154010105", "154010106"] },
  { id: "printing-technologist", slug: "printing-technologist", fieldId: "engineering", specialtyCodes: ["1470201"] },
  { id: "food-technologist", slug: "food-technologist", fieldId: "engineering", specialtyCodes: ["1360901", "1490101", "1490102", "149010111", "119030205"] },
  { id: "chemical-engineer", slug: "chemical-engineer", fieldId: "engineering", specialtyCodes: ["1480104"] },
  { id: "utilities-engineer", slug: "utilities-engineer", fieldId: "engineering", specialtyCodes: ["170040201", "170040301"] },
  { id: "metallurgical-engineer", slug: "metallurgical-engineer", fieldId: "engineering", specialtyCodes: ["14201010104", "136020105"] },

  // Наука
  { id: "biologist", slug: "biologist", fieldId: "science", specialtyCodes: ["1020401", "131010101"] },
  { id: "chemist", slug: "chemist", fieldId: "science", specialtyCodes: ["1020403", "131050101"] },
  { id: "physicist", slug: "physicist", fieldId: "science", specialtyCodes: ["1310402", "13104010207"] },
  { id: "geologist", slug: "geologist", fieldId: "science", specialtyCodes: ["151010104", "151010102"] },
  { id: "ecologist", slug: "ecologist", fieldId: "science", specialtyCodes: ["1330101", "1330102", "1330103"] },
  { id: "biotechnologist", slug: "biotechnologist", fieldId: "science", specialtyCodes: ["1480201", "131010103", "174020203"] },
  { id: "geographer", slug: "geographer", fieldId: "science", specialtyCodes: ["131020103"] },

  // Медицина и здоровье
  { id: "doctor", slug: "doctor", fieldId: "medicine", specialtyCodes: ["1790101"] },
  { id: "dentist", slug: "dentist", fieldId: "medicine", specialtyCodes: ["1790107"] },
  { id: "pharmacist", slug: "pharmacist", fieldId: "medicine", specialtyCodes: ["1790108"] },

  // Сельское хозяйство
  { id: "agronomist", slug: "agronomist", fieldId: "agriculture", specialtyCodes: ["1740201", "17402012602", "17402042501", "1740206"] },
  { id: "veterinarian", slug: "veterinarian", fieldId: "agriculture", specialtyCodes: ["1740302", "1740372", "174030201"] },
  { id: "zootechnician", slug: "zootechnician", fieldId: "agriculture", specialtyCodes: ["1740301", "17403012602"] },
  { id: "irrigation-engineer", slug: "irrigation-engineer", fieldId: "agriculture", specialtyCodes: ["1740501", "17405012602", "174050102"] },

  // Бизнес и финансы
  { id: "economist", slug: "economist", fieldId: "business", specialtyCodes: ["1250103"] },
  { id: "financier", slug: "financier", fieldId: "business", specialtyCodes: ["1250104"] },
  { id: "accountant", slug: "accountant", fieldId: "business", specialtyCodes: ["1250108"] },
  { id: "manager", slug: "manager", fieldId: "business", specialtyCodes: ["1260202", "1260201", "126020101"] },
  { id: "foreign-trade-specialist", slug: "foreign-trade-specialist", fieldId: "business", specialtyCodes: ["125010301", "125010407"] },
  { id: "marketing-specialist", slug: "marketing-specialist", fieldId: "business", specialtyCodes: ["126020305"] },
  { id: "banking-specialist", slug: "banking-specialist", fieldId: "business", specialtyCodes: ["125010202", "126020217"] },
  { id: "auditor", slug: "auditor", fieldId: "business", specialtyCodes: ["1250111", "125011101", "125010803"] },
  { id: "insurance-specialist", slug: "insurance-specialist", fieldId: "business", specialtyCodes: ["125010404"] },
  { id: "statistician", slug: "statistician", fieldId: "business", specialtyCodes: ["1250105", "125010501"] },
  { id: "logistics-manager", slug: "logistics-manager", fieldId: "business", specialtyCodes: ["1260205", "126020323", "126020324", "1440101", "14401020101"] },
  { id: "real-estate-manager", slug: "real-estate-manager", fieldId: "business", specialtyCodes: ["1700202"] },
  { id: "innovation-manager", slug: "innovation-manager", fieldId: "business", specialtyCodes: ["126020203"] },
  { id: "entrepreneur", slug: "entrepreneur", fieldId: "business", specialtyCodes: ["102060209"] },

  // Право и государство
  { id: "lawyer", slug: "lawyer", fieldId: "law", specialtyCodes: ["1240102"] },
  { id: "diplomat", slug: "diplomat", fieldId: "law", specialtyCodes: ["1230101"] },
  { id: "civil-servant", slug: "civil-servant", fieldId: "law", specialtyCodes: ["1260101", "1260102"] },
  { id: "customs-officer", slug: "customs-officer", fieldId: "law", specialtyCodes: ["1960101", "196010101"] },
  { id: "political-scientist", slug: "political-scientist", fieldId: "law", specialtyCodes: ["121030105", "123010601", "123010602", "123010603"] },
  { id: "sociologist", slug: "sociologist", fieldId: "law", specialtyCodes: ["1230105"] },
  { id: "religious-studies-scholar", slug: "religious-studies-scholar", fieldId: "law", specialtyCodes: ["121010102", "102010205"] },
  { id: "area-studies-specialist", slug: "area-studies-specialist", fieldId: "law", specialtyCodes: ["123010106"] },
  { id: "police-officer", slug: "police-officer", fieldId: "law", specialtyCodes: ["1930101", "1930103", "193010101"] },
  { id: "forensic-expert", slug: "forensic-expert", fieldId: "law", specialtyCodes: ["1930102"] },
  { id: "investigator-prosecutor", slug: "investigator-prosecutor", fieldId: "law", specialtyCodes: ["124010203"] },

  // Образование и языки
  { id: "primary-teacher", slug: "primary-teacher", fieldId: "education", specialtyCodes: ["1010201"] },
  { id: "english-teacher", slug: "english-teacher", fieldId: "education", specialtyCodes: ["1020306"] },
  { id: "philologist-teacher", slug: "philologist-teacher", fieldId: "education", specialtyCodes: ["1020301"] },
  { id: "psychologist", slug: "psychologist", fieldId: "education", specialtyCodes: ["1030403", "102060202"] },
  { id: "preschool-teacher", slug: "preschool-teacher", fieldId: "education", specialtyCodes: ["101010206", "101020201"] },
  { id: "translator", slug: "translator", fieldId: "education", specialtyCodes: ["121050404", "121050604"] },
  { id: "foreign-language-teacher", slug: "foreign-language-teacher", fieldId: "education", specialtyCodes: ["121050106", "1210601010601", "102030702"] },
  { id: "sports-coach", slug: "sports-coach", fieldId: "education", specialtyCodes: ["1880201"] },

  // Медиа и туризм
  { id: "journalist", slug: "journalist", fieldId: "media", specialtyCodes: ["1230108", "12301080202", "12301080201"] },
  { id: "tourism-specialist", slug: "tourism-specialist", fieldId: "media", specialtyCodes: ["1890101", "1890201"] },
  { id: "pr-specialist", slug: "pr-specialist", fieldId: "media", specialtyCodes: ["12301060302"] },
  { id: "hotel-manager", slug: "hotel-manager", fieldId: "media", specialtyCodes: ["1910201", "191020101"] },

  // Творчество
  { id: "advertising-designer", slug: "advertising-designer", fieldId: "arts", specialtyCodes: ["11901010402", "126020103"] },
  { id: "fine-artist", slug: "fine-artist", fieldId: "arts", specialtyCodes: ["115010101"] },
  { id: "fashion-designer", slug: "fashion-designer", fieldId: "arts", specialtyCodes: ["150010107", "11901010504"] },
  { id: "choreographer-dancer", slug: "choreographer-dancer", fieldId: "arts", specialtyCodes: ["117020104", "101010202"] },
  { id: "actor", slug: "actor", fieldId: "arts", specialtyCodes: ["117010104"] },
  { id: "musician", slug: "musician", fieldId: "arts", specialtyCodes: ["1030102", "118010102"] },
  { id: "stage-designer", slug: "stage-designer", fieldId: "arts", specialtyCodes: ["115010102"] },
  { id: "ceramic-artist", slug: "ceramic-artist", fieldId: "arts", specialtyCodes: ["115020101"] },
  { id: "furniture-designer", slug: "furniture-designer", fieldId: "arts", specialtyCodes: ["11901010103"] },
  { id: "museum-culturologist", slug: "museum-culturologist", fieldId: "arts", specialtyCodes: ["1210401", "121040101", "123011203"] },
  { id: "librarian", slug: "librarian", fieldId: "arts", specialtyCodes: ["123011101", "123011103", "123011104"] },

  // Международные профессии — глобальные роли без привязки к плану приёма НЦТ
  { id: "product-manager", slug: "product-manager", fieldId: "business", specialtyCodes: [], international: true },
  { id: "management-consultant", slug: "management-consultant", fieldId: "business", specialtyCodes: [], international: true },
  { id: "investment-analyst", slug: "investment-analyst", fieldId: "business", specialtyCodes: [], international: true },
  { id: "actuary", slug: "actuary", fieldId: "business", specialtyCodes: [], international: true },
  { id: "devops-engineer", slug: "devops-engineer", fieldId: "it", specialtyCodes: [], international: true },
  { id: "cloud-engineer", slug: "cloud-engineer", fieldId: "it", specialtyCodes: [], international: true },
  { id: "ux-researcher", slug: "ux-researcher", fieldId: "it", specialtyCodes: [], international: true },
  { id: "game-developer", slug: "game-developer", fieldId: "it", specialtyCodes: [], international: true },
  { id: "remote-support-specialist", slug: "remote-support-specialist", fieldId: "it", specialtyCodes: [], international: true },
  { id: "international-ngo-specialist", slug: "international-ngo-specialist", fieldId: "law", specialtyCodes: [], international: true },
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
