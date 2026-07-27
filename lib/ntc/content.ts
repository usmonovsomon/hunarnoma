// Structural (locale-independent) part of the curated editorial layer:
// which clusters exist, their emoji/colour, and which specialties have a
// hand-written description.
//
// The prose itself — cluster names, taglines, descriptions, exam subjects and
// the per-specialty "what is this / what you study" copy — lives per locale in
// lib/i18n/content/{ru,tj,en}.ts. Facts (места, стоимость, язык, вузы) always
// come from the dataset; this layer only adds explanation.

export type ClusterColor = "blue" | "emerald" | "violet" | "amber" | "rose";

export interface ClusterBase {
  id: number;
  emoji: string;
  color: ClusterColor;
}

export const CLUSTER_IDS = [1, 2, 3, 4, 5] as const;

export const CLUSTER_BASE: Record<number, ClusterBase> = {
  1: { id: 1, emoji: "🔬", color: "blue" },
  2: { id: 2, emoji: "📈", color: "emerald" },
  3: { id: 3, emoji: "🎨", color: "violet" },
  4: { id: 4, emoji: "⚖️", color: "amber" },
  5: { id: 5, emoji: "🩺", color: "rose" },
};

export const CLUSTER_COLOR: Record<ClusterColor, { chip: string; dot: string; ring: string; text: string }> = {
  blue: { chip: "bg-brand-50 text-brand-700 ring-brand-100", dot: "bg-brand-500", ring: "ring-brand-200", text: "text-brand-700" },
  emerald: { chip: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500", ring: "ring-emerald-200", text: "text-emerald-700" },
  violet: { chip: "bg-violet-50 text-violet-700 ring-violet-100", dot: "bg-violet-500", ring: "ring-violet-200", text: "text-violet-700" },
  amber: { chip: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500", ring: "ring-amber-200", text: "text-amber-700" },
  rose: { chip: "bg-rose-50 text-rose-700 ring-rose-100", dot: "bg-rose-500", ring: "ring-rose-200", text: "text-rose-700" },
};

/** Text half of a cluster — one entry per locale. */
export interface ClusterText {
  name: string;
  tagline: string;
  description: string;
  examSubjects: string[];
  /** Codes are locale-independent; the label shown is localised. */
  exampleSpecialties: { code: string; name: string }[];
}

export interface ClusterMeta extends ClusterBase, ClusterText {}

export interface SpecialtyContent {
  summary: string;
  whatYouStudy: string[];
  careers: string[];
}

/** The shape each lib/i18n/content/<locale>.ts file must satisfy. */
export interface ContentBundle {
  clusters: Record<number, ClusterText>;
  specialties: Record<string, SpecialtyContent>;
}
