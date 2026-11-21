import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { colleges, getCollege, specialtiesAtCollege, type CollegeOffering } from "@/lib/colleges";
import { getClusterMeta } from "@/lib/i18n/content";
import { CLUSTER_IDS } from "@/lib/ntc/content";
import { asLocale, fmt, fmtNum, fmtSomoni, fmtSomoniRange, getDict, href, plural, type Dict, type Locale } from "@/lib/i18n";
import { formLabel, languageList, parseLanguages, regionName, specialtyName, uniTypeLabel, collegeAddress, collegeLocation, collegeName } from "@/lib/i18n/data";
import { Stat, CollegeSourceNote, ClusterDot, PhoneLinks } from "@/components/ntc";

export function generateStaticParams() {
  return colleges.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const c = getCollege(params.slug);
  if (!c) return { title: d.collegePage.fallbackTitle };
  return {
    title: collegeName(locale, c.id, c.name),
    description: fmt(d.collegePage.metaDescription, {
      name: collegeName(locale, c.id, c.name),
      location: collegeLocation(locale, c.id, c.location),
    }),
  };
}

const seatSum = (offs: CollegeOffering[]) => offs.reduce((n, o) => n + o.seats, 0);

function tuitionOf(locale: Locale, d: Dict, offs: CollegeOffering[]) {
  const t = offs.map((o) => o.tuition).filter((x): x is number => x != null && x > 0);
  if (!t.length) return offs.some((o) => !o.paid) ? d.labels.budget : "—";
  const mn = Math.min(...t), mx = Math.max(...t);
  return mn === mx ? fmtSomoni(locale, mn, d) : fmtSomoniRange(locale, mn, mx, d);
}

export default function CollegePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const c = getCollege(params.slug);
  if (!c) notFound();

  const clusterMeta = getClusterMeta(locale);
  const list = specialtiesAtCollege(c.id);
  const byCluster = CLUSTER_IDS
    .map((cid) => ({
      cid,
      items: list
        .filter((x) => x.specialty.cluster === cid)
        .sort((a, b) => seatSum(b.offerings) - seatSum(a.offerings)),
    }))
    .filter((g) => g.items.length);

  const languages = parseLanguages(c.languages);
  const name = collegeName(locale, c.id, c.name);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-muted">
        <Link href={href(locale, "/colleges")} className="hover:text-brand-600">{d.nav.colleges}</Link>
        <span>/</span><span className="text-ink-soft">{name}</span>
      </nav>

      <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
            {uniTypeLabel(d, c.type)}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{name}</h1>
        <div className="mt-3 space-y-1 text-sm text-ink-soft">
          <div>📍 {collegeAddress(locale, c.id, c.address)}{c.region ? ` · ${regionName(d, c.region)}` : ""}</div>
          {c.phone && <PhoneLinks locale={locale} phone={c.phone} />}
        </div>
        {languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => <span key={l} className="chip">{languageList(d, l)}</span>)}
          </div>
        )}
      </header>

      {c.specialtyCount > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={fmtNum(locale, c.specialtyCount)} label={d.labels.specialties} />
          <Stat value={fmtNum(locale, c.programCount)} label={d.labels.programs} />
          <Stat value={fmtNum(locale, c.totalSeats)} label={d.labels.seatsTotal} />
          <Stat value={c.clusters.length} label={plural(locale, c.clusters.length, d.units.cluster)} />
        </div>
      )}

      {byCluster.length > 0 && (
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
                  <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white sm:hidden">
                    {items.map(({ specialty, offerings }) => {
                      const forms = [...new Set(offerings.map((o) => o.form).filter(Boolean))];
                      const langs = parseLanguages(offerings.map((o) => o.language).join(", "));
                      return (
                        <li key={specialty.code} className="px-4 py-3">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-semibold leading-snug text-ink">{specialtyName(locale, specialty.name)}</span>
                            <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                              {seatSum(offerings)} {d.labels.seatsShort}
                            </span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-ink-soft">
                            <span>{forms.map((f) => formLabel(d, f)).join(", ")}</span>
                            <span className="text-ink-muted">·</span>
                            <span>{languageList(d, langs)}</span>
                            <span className="text-ink-muted">·</span>
                            <span>{tuitionOf(locale, d, offerings)}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-3 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white sm:block">
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
                              <td className="px-4 py-2.5 font-medium text-ink">{specialtyName(locale, specialty.name)}</td>
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
      )}

      <CollegeSourceNote locale={locale} className="mt-8" />
    </div>
  );
}
