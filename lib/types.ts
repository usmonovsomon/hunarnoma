// ---------------------------------------------------------------------------
// Rohnamo domain model
// Encodes the core entity graph:
//   ProfessionalField → Profession → EducationField → Program → University
// with Skills / Subjects / CareerPaths / Admission data hanging off them.
//
// Every fact that can go stale carries a `source` provenance object so the UI
// can show "Источник / Дата обновления / Проверьте на офиц. сайте".
// ---------------------------------------------------------------------------

export type Locale = "ru" | "tg" | "en";

/** Provenance for any piece of data that may change over time. */
export interface Source {
  label: string; // e.g. "Официальный сайт ТНУ"
  url?: string;
  updatedAt: string; // ISO date
  verified: boolean; // true = confirmed by moderator against official source
}

export type Level = 0 | 1 | 2 | 3 | 4; // 0 = none .. 4 = very high

export interface RangeValue {
  min: number;
  max: number;
  currency?: string;
  period?: "month" | "year";
  source?: Source;
}

// --- Taxonomy ---------------------------------------------------------------

export interface ProfessionalField {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  short: string;
  description: string;
  professionIds: string[];
}

export interface Profession {
  id: string;
  slug: string;
  name: string;
  fieldId: string;
  tagline: string;
  whoIsThis: string;
  dayInLife: string[];
  tasks: string[];
  hardSkills: string[];
  softSkills: string[];
  schoolSubjects: string[]; // subjects to focus on at school
  studyTopics: string[]; // what you study at university
  studyYears: string;
  jobRoles: string[]; // roles you can hold
  careerPath: string[]; // progression ladder
  alternatives: string[]; // slugs of alternative professions
  educationFieldIds: string[]; // which education fields lead here
  demand: Level; // labor-market demand
  salary?: RangeValue;
  remoteFriendly: Level;
  outlook: string;
  pros: string[];
  cons: string[];
  fitsIf: string[];
  notFitIf: string[];
  // dimensions used for radar / comparison / test matching (0..4)
  traits: {
    math: Level;
    programming: Level;
    communication: Level;
    creativity: Level;
    people: Level;
    data: Level;
    entryDifficulty: Level;
  };
  // which test dimensions this profession scores on (for recommendations)
  testAffinity: Partial<Record<TestDimension, number>>;
}

export interface EducationField {
  id: string;
  slug: string;
  name: string;
  degree: "bachelor" | "master" | "specialist";
  goal: string;
  description: string;
  coreDisciplines: string[];
  learningOutcomes: string[];
  mathLevel: Level;
  programmingLevel: Level;
  universality: Level; // how broadly applicable
  fitsIf: string[];
  notFitIf: string[];
  professionIds: string[]; // professions reachable from this field
  relatedFieldIds: string[]; // for "difference between X and Y"
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  description: string;
  website?: string;
  languages: string[];
  hasDormitory: boolean;
  international: string[];
  partners: string[];
  programIds: string[];
  source: Source;
}

export interface Program {
  id: string;
  slug: string;
  universityId: string;
  educationFieldId: string;
  faculty: string;
  name: string;
  durationYears: number;
  languages: string[];
  formats: ("full-time" | "part-time" | "online")[];
  tuition?: RangeValue; // per year
  budgetSeats?: number;
  passingScore?: number;
  entranceExams: string[];
  internships: string[];
  source: Source;
}

// --- Career test ------------------------------------------------------------

export type TestDimension =
  | "analytical"
  | "technical"
  | "creative"
  | "communication"
  | "people"
  | "entrepreneurial"
  | "science"
  | "business";

export interface TestQuestion {
  id: string;
  text: string;
  // maps a 1..5 agreement onto dimension weights
  dimension: TestDimension;
  reverse?: boolean;
}

export interface TestResult {
  scores: Record<TestDimension, number>; // normalized 0..100
  topFields: { fieldId: string; score: number }[];
  topProfessions: { professionId: string; score: number; reasons: string[] }[];
  recommendedEducationFieldIds: string[];
}
