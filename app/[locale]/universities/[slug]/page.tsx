import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { universities, getUniversity, specialtiesAtUniversity, type Offering } from "@/lib/ntc";
import { getClusterMeta } from "@/lib/i18n/content";
import { CLUSTER_IDS } from "@/lib/ntc/content";
import {
  asLocale, fmt, fmtNum, fmtSomoni, fmtSomoniRange, getDict, href, plural, type Dict, type Locale,
} from "@/lib/i18n";
import {
  cityName, formLabel, languageList, parseLanguages, regionName, specialtyName,
  uniTypeLabel, universityName, universityShortName,
} from "@/lib/i18n/data";
import { Stat, SourceNote, ClusterDot, PhoneLinks } from "@/components/ntc";

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const u = getUniversity(params.slug);
  if (!u) return { title: d.universityPage.fallbackTitle };
  const name = universityName(locale, u.id, u.name);
  return {
    title: name,
    description: fmt(d.universityPage.metaDescription, {
      name,
      city: cityName(d, u.city),
      specialties: u.specialtyCount,
      programs: u.programCount,
    }),
  };
}

const seatSum = (offs: Offering[]) => offs.reduce((n, o) => n + o.seats, 0);

function tuitionOf(locale: Locale, d: Dict, offs: Offering[]) {
  const t = offs.map((o) => o.tuition).filter((x): x is number => x != null && x > 0);
  if (!t.length) return offs.some((o) => !o.paid) ? d.labels.budget : "—";
  const mn = Math.min(...t), mx = Math.max(...t);
  return mn === mx ? fmtSomoni(locale, mn, d) : fmtSomoniRange(locale, mn, mx, d);
}

export default function UniversityPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const u = getUniversity(params.slug);
  if (!u) notFound();

  const clusterMeta = getClusterMeta(locale);
  const list = specialtiesAtUniversity(u.id);
  const byCluster = CLUSTER_IDS
    .map((cid) => ({
      cid,
      items: list
        .filter((x) => x.specialty.cluster === cid)
        .sort((a, b) => seatSum(b.offerings) - seatSum(a.offerings)),
    }))
    .filter((g) => g.items.length);

  const languages = parseLanguages(u.languages);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-muted">
        <Link href={href(locale, "/universities")} className="hover:text-brand-600">{d.nav.universities}</Link>
        <span>/</span><span className="text-ink-soft">{universityShortName(locale, u.id, u.shortName)}</span>
      </nav>

      <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-700">
            {universityShortName(locale, u.id, u.shortName)}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
            {uniTypeLabel(d, u.type)}
          </span>
          {u.isBranch && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-ink-soft">{d.labels.branch}</span>}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{universityName(locale, u.id, u.name)}</h1>
        <div className="mt-3 space-y-1 text-sm text-ink-soft">
          <div>📍 {u.address || cityName(d, u.city)}{u.region ? ` · ${regionName(d, u.region)}` : ""}</div>
          {u.phone && <PhoneLinks locale={locale} phone={u.phone} />}
          {u.website && (
            <div>
              🔗{" "}
              <a href={u.website} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline">
                {u.website.replace(/^https?:\/\//, "")} ↗
              </a>
            </div>
          )}
        </div>
        {languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => <span key={l} className="chip">{languageList(d, l)}</span>)}
          </div>
        )}
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={fmtNum(locale, u.specialtyCount)} label={d.labels.specialties} />
        <Stat value={fmtNum(locale, u.programCount)} label={d.labels.programs} />
        <Stat value={fmtNum(locale, u.totalSeats)} label={d.labels.seatsTotal} />
        <Stat value={u.clusters.length} label={plural(locale, u.clusters.length, d.units.cluster)} />
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{d.universityPage.programsTitle}</h2>
        <p className="mt-1 text-sm text-ink-muted">{d.universityPage.programsHint}</p>

        <div className="mt-4 space-y-8">
          {byCluster.map(({ cid, items }) => {
            const m = clusterMeta[cid];
            return (
              <div key={cid}>
                <h3 className="flex items-center gap-2 text-sm font-bold text-ink-soft">
                  <ClusterDot locale={locale} id={cid} /> {m?.emoji} {m?.name}
                  <span className="font-normal text-ink-muted">· {items.length}</span>
                </h3>
                <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-xs text-ink-muted">
                        <th className="px-4 py-2 font-medium">{d.universityPage.thSpecialty}</th>
                        <th className="px-3 py-2 font-medium">{d.universityPage.thForms}</th>
                        <th className="px-3 py-2 font-medium">{d.universityPage.thLanguage}</th>
                        <th className="px-3 py-2 font-medium">{d.universityPage.thTuition}</th>
                        <th className="px-3 py-2 text-right font-medium">{d.universityPage.thSeats}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(({ specialty, offerings }) => {
                        const forms = [...new Set(offerings.map((o) => o.form).filter(Boolean))];
                        const langs = parseLanguages(offerings.map((o) => o.language).join(", "));
                        return (
                          <tr key={specialty.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                            <td className="px-4 py-2.5">
                              <Link href={href(locale, `/specialties/${specialty.code}`)} className="font-medium text-ink hover:text-brand-700">
                                {specialtyName(locale, specialty.name)}
                              </Link>
                            </td>
                            <td className="px-3 py-2.5 text-ink-soft">{forms.map((f) => formLabel(d, f)).join(", ")}</td>
                            <td className="px-3 py-2.5 text-ink-soft">{languageList(d, langs)}</td>
                            <td className="px-3 py-2.5 text-ink-soft">{tuitionOf(locale, d, offerings)}</td>
                            <td className="px-3 py-2.5 text-right font-semibold">{seatSum(offerings)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SourceNote locale={locale} className="mt-8" />
    </div>
  );
}
