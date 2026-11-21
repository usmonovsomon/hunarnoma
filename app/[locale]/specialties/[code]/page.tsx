import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  specialties, getSpecialty, universitiesForSpecialty, offeringsAt, specialtiesInCluster,
  type SpecStats,
} from "@/lib/ntc";
import { getCluster, getSpecialtyContent } from "@/lib/i18n/content";
import {
  asLocale, fmt, fmtNum, fmtSomoni, fmtSomoniRange, getDict, href, plural, type Dict, type Locale,
} from "@/lib/i18n";
import { cityName, formLabel, languageList, parseLanguages, specialtyName, universityName, universityShortName } from "@/lib/i18n/data";
import { ClusterPill, Stat, SourceNote } from "@/components/ntc";

export function generateStaticParams() {
  return specialties.map((s) => ({ code: s.code }));
}

export function generateMetadata({ params }: { params: { locale: string; code: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const s = getSpecialty(params.code);
  if (!s) return { title: d.specialtyPage.fallbackTitle };
  const name = specialtyName(locale, s.name);
  const content = getSpecialtyContent(locale, s.code);
  return {
    title: name,
    description: content?.summary ?? fmt(d.specialtyPage.metaDescription, { name }),
  };
}

function tuitionRange(locale: Locale, d: Dict, s: SpecStats): string {
  if (s.tuitionMin == null) return "—";
  return fmtSomoniRange(locale, s.tuitionMin, s.tuitionMax ?? s.tuitionMin, d);
}

export default function SpecialtyPage({ params }: { params: { locale: string; code: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const s = getSpecialty(params.code);
  if (!s) notFound();

  const name = specialtyName(locale, s.name);
  const meta = getCluster(locale, s.cluster);
  const content = getSpecialtyContent(locale, s.code);

  const unis = universitiesForSpecialty(s).sort(
    (a, b) => offeringsAt(s, b.id).reduce((n, o) => n + o.seats, 0) - offeringsAt(s, a.id).reduce((n, o) => n + o.seats, 0),
  );
  const related = specialtiesInCluster(s.cluster).filter((x) => x.code !== s.code)
    .sort((a, b) => b.stats.universities - a.stats.universities).slice(0, 6);

  // The source's language column is noisy for a few rows; keep only real languages.
  const languages = parseLanguages(s.stats.languages);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        <Link href={href(locale, "/specialties")} className="hover:text-brand-600">{d.nav.specialties}</Link>
        <span>/</span>
        <Link href={href(locale, `/clusters/${s.cluster}`)} className="hover:text-brand-600">{meta?.name}</Link>
      </nav>

      <header>
        <ClusterPill locale={locale} id={s.cluster} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{name}</h1>
        <p className="mt-2 text-sm text-ink-muted">{fmt(d.specialtyPage.code, { code: s.code })}</p>
        {content && <p className="mt-4 max-w-3xl text-lg text-ink-soft">{content.summary}</p>}
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat
          value={s.stats.universities}
          label={plural(locale, s.stats.universities, d.units.universityFull)}
        />
        <Stat value={fmtNum(locale, s.stats.totalSeats)} label={d.labels.seatsTotal} />
        <Stat
          value={fmtNum(locale, s.stats.freeSeats)}
          label={d.labels.freeSeats}
          sub={s.stats.freeSeats === 0 ? d.labels.none : undefined}
        />
        <Stat value={tuitionRange(locale, d, s.stats)} label={d.labels.tuitionPerYear} />
        <Stat
          value={languages.length}
          label={d.labels.languagesOfStudy}
          sub={languageList(d, languages)}
        />
      </div>

      {content && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="card p-5">
            <h2 className="text-lg font-bold">{d.specialtyPage.whatYouStudy}</h2>
            <ul className="mt-3 space-y-2">
              {content.whatYouStudy.map((x) => (
                <li key={x} className="flex gap-2 text-sm text-ink-soft"><span className="text-brand-500">▹</span>{x}</li>
              ))}
            </ul>
          </section>
          <section className="card p-5">
            <h2 className="text-lg font-bold">{d.specialtyPage.careers}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.careers.map((x) => <span key={x} className="chip-brand">{x}</span>)}
            </div>
          </section>
        </div>
      )}

      {meta && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold">{d.specialtyPage.examSubjects}</h2>
          <p className="mt-1 text-xs text-ink-muted">
            {fmt(d.specialtyPage.examSubjectsHint, { cluster: meta.name })}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.examSubjects.map((x) => <span key={x} className="chip">{x}</span>)}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-bold">
          {fmt(d.specialtyPage.whereTaught, {
            count: s.stats.universities,
            unit: plural(locale, s.stats.universities, d.units.university),
          })}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">{d.specialtyPage.whereTaughtHint}</p>
        <div className="mt-4 space-y-3">
          {unis.map((u) => {
            const offs = offeringsAt(s, u.id);
            return (
              <div key={u.id} className="card p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link href={href(locale, `/universities/${u.slug}`)} className="font-bold text-ink hover:text-brand-700">
                      {universityName(locale, u.id, u.name)}
                    </Link>
                    <div className="mt-0.5 text-xs text-ink-muted">
                      📍 {cityName(d, u.city)} · {universityShortName(locale, u.id, u.shortName)}
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-ink-soft">
                    {offs.reduce((n, o) => n + o.seats, 0)} {d.labels.seatsShort}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 sm:hidden">
                  {offs.map((o, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                      <div className="min-w-0">
                        <div className="font-medium text-ink">{formLabel(d, o.form)}</div>
                        <div className="truncate text-xs text-ink-soft">{languageList(d, o.language)}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-xs">
                          {o.paid
                            ? <span className="text-ink-soft">{o.tuition ? fmtSomoni(locale, o.tuition, d) : d.labels.paid}</span>
                            : <span className="font-semibold text-green-700">{d.labels.budget}</span>}
                        </div>
                        <div className="font-bold text-ink">{o.seats} <span className="text-xs font-normal text-ink-muted">{d.labels.seatsShort}</span></div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 hidden sm:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-ink-muted">
                        <th className="py-1 pr-3 font-medium">{d.specialtyPage.thForm}</th>
                        <th className="py-1 pr-3 font-medium">{d.specialtyPage.thLanguage}</th>
                        <th className="py-1 pr-3 font-medium">{d.specialtyPage.thPayment}</th>
                        <th className="py-1 pr-3 text-right font-medium">{d.specialtyPage.thSeats}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offs.map((o, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="py-1.5 pr-3">{formLabel(d, o.form)}</td>
                          <td className="py-1.5 pr-3 text-ink-soft">{languageList(d, o.language)}</td>
                          <td className="py-1.5 pr-3">
                            {o.paid
                              ? <span className="text-ink-soft">{o.tuition ? fmtSomoni(locale, o.tuition, d) : d.labels.paid}</span>
                              : <span className="font-medium text-green-700">{d.labels.budget}</span>}
                          </td>
                          <td className="py-1.5 pr-3 text-right font-semibold">{o.seats}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">{d.specialtyPage.related}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.code} href={href(locale, `/specialties/${r.code}`)} className="chip">
                {specialtyName(locale, r.name)}
              </Link>
            ))}
          </div>
        </section>
      )}

      <SourceNote locale={locale} className="mt-8" />
    </div>
  );
}
