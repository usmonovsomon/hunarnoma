// Explainable career test (no ML). Maps Likert answers → 8 dimensions →
// the 5 NTC clusters. Self-contained: no dataset import, so it stays light
// in the client bundle. Recommendations are always explainable ("почему").
//
// Question wording and dimension labels are localised — they live under
// `questions` / `dimensions` in lib/i18n/dictionaries/*. This file keeps only
// the question ids and scoring model, which are language-independent.

export type TestDimension =
  | "analytical" | "technical" | "creative" | "communication"
  | "people" | "entrepreneurial" | "science" | "business";

export interface TestQuestion {
  /** Also the key into `dict.questions`. */
  id: string;
  dimension: TestDimension;
  reverse?: boolean;
}

export const testQuestions: TestQuestion[] = [
  { id: "q1", dimension: "analytical" },
  { id: "q2", dimension: "analytical" },
  { id: "q3", dimension: "technical" },
  { id: "q4", dimension: "technical" },
  { id: "q5", dimension: "creative" },
  { id: "q6", dimension: "creative" },
  { id: "q7", dimension: "communication" },
  { id: "q8", dimension: "communication" },
  { id: "q9", dimension: "people" },
  { id: "q10", dimension: "people" },
  { id: "q11", dimension: "entrepreneurial" },
  { id: "q12", dimension: "entrepreneurial" },
  { id: "q13", dimension: "science" },
  { id: "q14", dimension: "science" },
  { id: "q15", dimension: "business" },
  { id: "q16", dimension: "people", reverse: false },
];

const DIMENSIONS: TestDimension[] = [
  "analytical", "technical", "creative", "communication",
  "people", "entrepreneurial", "science", "business",
];

// how much each cluster relies on each dimension
const CLUSTER_AFFINITY: Record<number, Partial<Record<TestDimension, number>>> = {
  1: { technical: 3, analytical: 3, science: 2 },                       // естеств. и технический
  2: { business: 3, analytical: 2, entrepreneurial: 2, communication: 1 }, // экономика и география
  3: { creative: 3, communication: 3, people: 1 },                     // филология, педагогика, искусство
  4: { communication: 2, analytical: 2, people: 2, business: 1 },      // обществоведение и право
  5: { science: 3, people: 2, analytical: 1 },                         // медицина, биология, спорт
};

export interface TestResult {
  scores: Record<TestDimension, number>; // 0..100
  /** `reasons` are dimension keys — the caller localises them. */
  topClusters: { clusterId: number; score: number; reasons: TestDimension[] }[];
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

  const topClusters = Object.entries(CLUSTER_AFFINITY)
    .map(([id, aff]) => {
      let s = 0, wsum = 0;
      for (const [dim, w] of Object.entries(aff)) { s += (scores[dim as TestDimension] / 100) * w!; wsum += w!; }
      const reasons = Object.entries(aff)
        .sort((a, b) => scores[b[0] as TestDimension] - scores[a[0] as TestDimension])
        .slice(0, 2)
        .filter(([d]) => scores[d as TestDimension] >= 45)
        .map(([d]) => d as TestDimension);
      return { clusterId: Number(id), score: Math.round((s / (wsum || 1)) * 100), reasons };
    })
    .sort((a, b) => b.score - a.score);

  return { scores, topClusters };
}
