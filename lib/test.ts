// Explainable career test (no ML). Maps Likert answers → 8 dimensions →
// the 10 profession fields (lib/professions). Self-contained: no dataset
// import, so it stays light in the client bundle. Recommendations are always
// explainable ("почему").
//
// Question wording and dimension labels are localised — they live under
// `questions` / `dimensions` in lib/i18n/dictionaries/*. This file keeps only
// the question ids and scoring model, which are language-independent.
import { PROFESSION_FIELD_IDS, type ProfessionFieldId } from "@/lib/professions/base";

export type TestDimension =
  | "analytical" | "technical" | "creative" | "communication"
  | "people" | "entrepreneurial" | "science" | "business";

export interface TestQuestion {
  /** Also the key into `dict.questions`. */
  id: string;
  dimension: TestDimension;
  reverse?: boolean;
}

// One question per dimension, plus a second question on "science" and
// "communication" — the two dimensions FIELD_AFFINITY below leans on most
// (science feeds 4 of 10 fields, communication feeds 4), so a single noisy
// answer there does the most damage to which field comes out on top.
// Questions are written as concrete behaviour ("what I actually do / notice"),
// not abstract trait labels — easier to answer honestly and it separates
// fields better than a generic "I like X" statement.
export const testQuestions: TestQuestion[] = [
  { id: "q1", dimension: "analytical" },
  { id: "q2", dimension: "technical" },
  { id: "q3", dimension: "creative" },
  { id: "q4", dimension: "communication" },
  { id: "q5", dimension: "people" },
  { id: "q6", dimension: "entrepreneurial" },
  { id: "q7", dimension: "science" },
  { id: "q8", dimension: "business" },
  { id: "q9", dimension: "communication" },
  { id: "q10", dimension: "science" },
];

const DIMENSIONS: TestDimension[] = [
  "analytical", "technical", "creative", "communication",
  "people", "entrepreneurial", "science", "business",
];

// How much each profession field leans on each dimension. A heuristic,
// explainable weighting (same spirit as the old cluster-affinity table it
// replaces) — not a validated psychometric model.
const FIELD_AFFINITY: Record<ProfessionFieldId, Partial<Record<TestDimension, number>>> = {
  it: { technical: 3, analytical: 3, creative: 1 },
  engineering: { technical: 3, analytical: 2, science: 1 },
  science: { science: 3, analytical: 2 },
  medicine: { science: 3, people: 2 },
  agriculture: { science: 2, technical: 2 },
  business: { business: 3, analytical: 2, entrepreneurial: 2 },
  law: { communication: 2, analytical: 2, people: 1 },
  education: { communication: 2, people: 3 },
  media: { creative: 2, communication: 3 },
  arts: { creative: 3, communication: 1 },
};

export interface TestResult {
  scores: Record<TestDimension, number>; // 0..100
  /** `reasons` are dimension keys — the caller localises them. */
  topFields: { fieldId: ProfessionFieldId; score: number; reasons: TestDimension[] }[];
}

export function scoreTest(answers: Record<string, number>): TestResult {
  const raw = Object.fromEntries(DIMENSIONS.map((d) => [d, 0])) as Record<TestDimension, number>;
  const counts = Object.fromEntries(DIMENSIONS.map((d) => [d, 0])) as Record<TestDimension, number>;

  for (const q of testQuestions) {
    const a = answers[q.id];
    if (!a) continue;
    raw[q.dimension] += q.reverse ? 6 - a : a;
    counts[q.dimension] += 1;
  }

  const scores = {} as Record<TestDimension, number>;
  for (const d of DIMENSIONS) scores[d] = Math.round((raw[d] / (counts[d] * 5 || 1)) * 100);

  const topFields = PROFESSION_FIELD_IDS
    .map((fieldId) => {
      const aff = FIELD_AFFINITY[fieldId];
      let s = 0, wsum = 0;
      for (const [dim, w] of Object.entries(aff)) { s += (scores[dim as TestDimension] / 100) * w!; wsum += w!; }
      const reasons = Object.entries(aff)
        .sort((a, b) => scores[b[0] as TestDimension] - scores[a[0] as TestDimension])
        .slice(0, 2)
        .filter(([d]) => scores[d as TestDimension] >= 45)
        .map(([d]) => d as TestDimension);
      return { fieldId, score: Math.round((s / (wsum || 1)) * 100), reasons };
    })
    .sort((a, b) => b.score - a.score);

  return { scores, topFields };
}
