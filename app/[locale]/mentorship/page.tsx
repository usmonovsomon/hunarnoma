import type { Metadata } from "next";
import Link from "next/link";
import { asLocale, getDict, href, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.mentorshipPage.title, description: d.mentorshipPage.metaDescription };
}

export default function MentorshipPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);

  const steps = [
    { n: "1", t: d.mentorshipPage.step1Title, text: d.mentorshipPage.step1Text },
    { n: "2", t: d.mentorshipPage.step2Title, text: d.mentorshipPage.step2Text },
    { n: "3", t: d.mentorshipPage.step3Title, text: d.mentorshipPage.step3Text },
  ];

  return (
    <div className="container-page py-8">
      <header className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-ember-50 px-3 py-1 text-xs font-semibold text-ember-700 ring-1 ring-inset ring-ember-100">
          {d.mentorshipPage.badge}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="mr-2">🤝</span>
          {d.mentorshipPage.title}
        </h1>
        <p className="mt-3 text-ink-soft">{d.mentorshipPage.lead}</p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="card p-5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 font-bold text-white">{s.n}</div>
            <h3 className="mt-3 font-bold">{s.t}</h3>
            <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-ember-200 bg-ember-50/40 p-6 sm:p-8">
        <p className="text-ink-soft">{d.mentorshipPage.ctaText}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={href(locale, "/career-test")} className="btn-primary">
            {d.mentorshipPage.ctaTest}
          </Link>
          <Link href={href(locale, "/professions")} className="btn-ghost">
            {d.mentorshipPage.ctaCatalog}
          </Link>
        </div>
      </div>
    </div>
  );
}
