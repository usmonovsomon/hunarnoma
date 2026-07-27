// Merges the locale-independent cluster structure (emoji, colour) with the
// per-locale editorial prose.
import { CLUSTER_BASE, CLUSTER_IDS, type ClusterMeta, type SpecialtyContent } from "@/lib/ntc/content";
import { DEFAULT_LOCALE, isLocale, type Locale } from "../config";
import ru from "./ru";
import tj from "./tj";
import en from "./en";

const BUNDLES = { ru, tj, en };

const bundleFor = (locale: string) => BUNDLES[isLocale(locale) ? locale : DEFAULT_LOCALE];

/** Full cluster metadata for a locale, keyed by cluster id. */
export function getClusterMeta(locale: Locale): Record<number, ClusterMeta> {
  const { clusters } = bundleFor(locale);
  const out: Record<number, ClusterMeta> = {};
  for (const id of CLUSTER_IDS) out[id] = { ...CLUSTER_BASE[id], ...clusters[id] };
  return out;
}

export const getCluster = (locale: Locale, id: number): ClusterMeta | null =>
  CLUSTER_BASE[id] ? { ...CLUSTER_BASE[id], ...bundleFor(locale).clusters[id] } : null;

/** Curated copy for a specialty, or null when it has none yet. */
export const getSpecialtyContent = (locale: Locale, code: string): SpecialtyContent | null =>
  bundleFor(locale).specialties[code] ?? null;

export type { ClusterMeta, SpecialtyContent };
