import type { Metadata } from "next";
import { specialties, totals } from "@/lib/ntc";
import { CLUSTER_IDS } from "@/lib/ntc/content";
import { getClusterMeta } from "@/lib/i18n/content";
import { asLocale, fmt, fmtNum, getDict, LOCALES } from "@/lib/i18n";
import { specialtyName } from "@/lib/i18n/data";
import SpecialtyCatalog, { type ClusterChip, type SpecItem } from "@/components/SpecialtyCatalog";
import { SourceNote } from "@/components/ntc";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.specialtiesPage.title, description: d.specialtiesPage.metaDescription };
}

export default function SpecialtiesPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const meta = getClusterMeta(locale);

  const items: SpecItem[] = specialties.map((s) => ({
    code: s.code,
    name: specialtyName(locale, s.name),
    cluster: s.cluster,
    universities: s.stats.universities,
    totalSeats: s.stats.totalSeats,
    freeSeats: s.stats.freeSeats,
  }));

  const clusters: ClusterChip[] = CLUSTER_IDS.map((id) => ({
    id, name: meta[id].name, emoji: meta[id].emoji, color: meta[id].color,
  }));

  return (
    <div className="container-page py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{d.specialtiesPage.title}</h1>
        <p className="mt-3 text-ink-soft">
          {fmt(d.specialtiesPage.lead, { count: fmtNum(locale, totals.specialties) })}
        </p>
      </header>
      <div className="mt-6">
        <SpecialtyCatalog locale={locale} dict={d} clusters={clusters} items={items} />
      </div>
      <SourceNote locale={locale} className="mt-8" />
    </div>
  );
}
