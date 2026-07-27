import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specialtiesInCluster, clusterSummaries } from "@/lib/ntc";
import { CLUSTER_COLOR, CLUSTER_IDS } from "@/lib/ntc/content";
import { getCluster, getClusterMeta } from "@/lib/i18n/content";
import { asLocale, fmt, fmtNum, getDict, href } from "@/lib/i18n";
import { specialtyName } from "@/lib/i18n/data";
import SpecialtyCatalog, { type ClusterChip, type SpecItem } from "@/components/SpecialtyCatalog";
import { Stat, SourceNote } from "@/components/ntc";

export function generateStaticParams() {
  return CLUSTER_IDS.map((id) => ({ slug: String(id) }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const m = getCluster(locale, Number(params.slug));
  if (!m) return { title: d.clusterPage.fallbackTitle };
  return { title: fmt(d.clusterPage.metaTitle, { name: m.name }), description: m.description };
}

export default function ClusterPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const id = Number(params.slug);
  const meta = getCluster(locale, id);
  const summary = clusterSummaries.find((c) => c.id === id);
  if (!meta || !summary) notFound();
  const color = CLUSTER_COLOR[meta.color];
  const allMeta = getClusterMeta(locale);

  const items: SpecItem[] = specialtiesInCluster(id).map((s) => ({
    code: s.code,
    name: specialtyName(locale, s.name),
    cluster: s.cluster,
    universities: s.stats.universities,
    totalSeats: s.stats.totalSeats,
    freeSeats: s.stats.freeSeats,
  }));

  const clusters: ClusterChip[] = CLUSTER_IDS.map((cid) => ({
    id: cid, name: allMeta[cid].name, emoji: allMeta[cid].emoji, color: allMeta[cid].color,
  }));

  const badge = fmt(d.clusterPage.badge, { n: id });

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-muted">
        <Link href={`${href(locale)}#clusters`} className="hover:text-brand-600">{d.nav.clusters}</Link>
        <span>/</span><span className="text-ink-soft">{badge}</span>
      </nav>

      <header className={`overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-inset ${color.ring} sm:p-8`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{meta.emoji}</span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-wide ${color.text}`}>{badge}</p>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{meta.name}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-ink-soft">{meta.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-ink-soft">{d.clusterPage.examSubjects}</span>
          {meta.examSubjects.map((x) => (
            <span key={x} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${color.chip}`}>{x}</span>
          ))}
        </div>
      </header>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat value={fmtNum(locale, summary.specialtyCount)} label={d.labels.specialties} />
        <Stat value={fmtNum(locale, summary.programCount)} label={d.labels.programsAtUnis} />
        <Stat value={fmtNum(locale, summary.totalSeats)} label={d.labels.seatsIntake} />
      </div>

      <h2 className="mt-8 text-xl font-bold">{d.clusterPage.specialtiesTitle}</h2>
      <div className="mt-3">
        <SpecialtyCatalog
          locale={locale}
          dict={d}
          clusters={clusters}
          items={items}
          initialCluster={id}
          showClusterFilter={false}
        />
      </div>
      <SourceNote locale={locale} className="mt-8" />
    </div>
  );
}
