import Link from "next/link";
import { specialties, clusterSummaries, totals } from "@/lib/ntc";
import { CLUSTER_COLOR } from "@/lib/ntc/content";
import { getClusterMeta } from "@/lib/i18n/content";
import { asLocale, fmt, fmtNum, getDict, href } from "@/lib/i18n";
import { SpecialtyCard, Stat, SourceNote } from "@/components/ntc";

export default function Home({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const clusterMeta = getClusterMeta(locale);
  const popular = [...specialties].sort((a, b) => b.stats.universities - a.stats.universities).slice(0, 8);

  const steps = [
    { n: "1", t: d.home.step1Title, text: fmt(d.home.step1Text, { count: fmtNum(locale, totals.specialties) }) },
    { n: "2", t: d.home.step2Title, text: d.home.step2Text },
    { n: "3", t: d.home.step3Title, text: d.home.step3Text },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="blob -left-24 top-0 h-72 w-72 bg-brand-200/40" />
        <div className="blob right-0 top-10 h-72 w-72 bg-brand-300/30" />
        <div className="container-page relative py-14 sm:py-20">
          <span className="eyebrow">{d.home.eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {d.home.titleLead}
            <span className="gradient-text">{d.home.titleAccent}</span>
            {d.home.titleTail}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            {d.home.lead1} <b>{d.home.leadBold}</b> {d.home.lead2}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={href(locale, "/career-test")} className="btn-primary">{d.home.ctaTest}</Link>
            <Link href={href(locale, "/specialties")} className="btn-ghost">{d.home.ctaCatalog}</Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={fmtNum(locale, totals.universities)} label={d.labels.universities} />
            <Stat value={fmtNum(locale, totals.specialties)} label={d.labels.specialties} />
            <Stat value={fmtNum(locale, totals.programs)} label={d.labels.programs} />
            <Stat value={fmtNum(locale, totals.seats)} label={d.labels.seatsFor} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card p-5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 font-bold text-white">{s.n}</div>
              <h3 className="mt-3 font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clusters */}
      <section id="clusters" className="container-page scroll-mt-20 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">{d.home.clustersTitle}</h2>
            <p className="mt-1 text-ink-soft">{d.home.clustersLead}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clusterSummaries.map((c) => {
            const m = clusterMeta[c.id];
            const col = CLUSTER_COLOR[m.color];
            return (
              <Link key={c.id} href={href(locale, `/clusters/${c.id}`)} className={`card group p-5 ring-1 ring-inset ${col.ring}`}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{m.emoji}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${col.chip}`}>
                    {fmt(d.home.clusterBadge, { n: c.id })}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold group-hover:text-brand-700">{m.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{m.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <span><b className="text-ink-soft">{c.specialtyCount}</b> {d.labels.specialties}</span>
                  <span><b className="text-ink-soft">{fmtNum(locale, c.totalSeats)}</b> {d.labels.seatsShort}</span>
                </div>
              </Link>
            );
          })}
          <Link href={href(locale, "/specialties")} className="card group grid place-items-center p-5 text-center">
            <div>
              <div className="text-3xl">🔎</div>
              <h3 className="mt-3 text-lg font-bold group-hover:text-brand-700">{d.home.allSpecialtiesTitle}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {fmt(d.home.allSpecialtiesText, { count: fmtNum(locale, totals.specialties) })}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Popular specialties */}
      <section className="container-page py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">{d.home.popularTitle}</h2>
          <Link href={href(locale, "/specialties")} className="text-sm font-semibold text-brand-600 hover:underline">
            {d.home.seeAll}
          </Link>
        </div>
        <p className="mt-1 text-ink-soft">{d.home.popularLead}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((s) => <SpecialtyCard key={s.code} locale={locale} s={s} />)}
        </div>
      </section>

      {/* Universities CTA */}
      <section className="container-page py-8">
        <div className="overflow-hidden rounded-3xl bg-brand-600 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {fmt(d.home.unisCtaTitle, { count: fmtNum(locale, totals.universities) })}
          </h2>
          <p className="mt-2 max-w-2xl text-brand-50">{d.home.unisCtaText}</p>
          <Link href={href(locale, "/universities")} className="btn mt-5 bg-white text-brand-700 hover:bg-brand-50">
            {d.home.unisCtaButton}
          </Link>
        </div>
      </section>

      <div className="container-page pb-12">
        <SourceNote locale={locale} />
      </div>
    </div>
  );
}
