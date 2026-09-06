import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFESSIONS, getProfession, professionsInField, specialtiesForProfession } from "@/lib/professions";
import { getProfessionField, getProfessionText } from "@/lib/i18n/professions";
import { asLocale, fmt, getDict, href, type Locale } from "@/lib/i18n";
import { SpecialtyCard } from "@/components/ntc";
import { FieldPill, InternationalBadge } from "@/components/professions";

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const p = getProfession(params.slug);
  if (!p) return { title: d.professionPage.fallbackTitle };
  const text = getProfessionText(locale, p.id);
  const name = text?.name ?? p.id;
  return { title: name, description: fmt(d.professionPage.metaDescription, { name }) };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((x) => (
          <li key={x} className="flex gap-2 text-sm text-ink-soft">
            <span className="text-brand-500">▹</span>{x}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProfessionPage({ params }: { params: { locale: string; slug: string } }) {
  const locale: Locale = asLocale(params.locale);
  const d = getDict(locale);
  const p = getProfession(params.slug);
  if (!p) notFound();

  const text = getProfessionText(locale, p.id);
  if (!text) notFound();

  const field = getProfessionField(locale, p.fieldId);
  const specialties = specialtiesForProfession(p);
  const related = professionsInField(p.fieldId)
    .filter((x) => x.id !== p.id)
    .map((x) => ({ p: x, text: getProfessionText(locale, x.id) }))
    .filter((x): x is { p: typeof p; text: NonNullable<typeof x.text> } => !!x.text);

  return (
    <div className="container-page py-8">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        <Link href={href(locale, "/professions")} className="hover:text-brand-600">{d.nav.professions}</Link>
        <span>/</span>
        <span className="text-ink-soft">{field.name}</span>
      </nav>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <FieldPill locale={locale} id={p.fieldId} />
          {p.international && <InternationalBadge dict={d} />}
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{text.name}</h1>
        <p className="mt-2 text-lg text-ink-soft">{text.tagline}</p>
        <p className="mt-4 max-w-3xl text-ink-soft">{text.summary}</p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <List title={d.professionPage.whatTheyDo} items={text.whatTheyDo} />
        <List title={d.professionPage.skills} items={text.skills} />
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold">{d.professionPage.schoolSubjects}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {text.schoolSubjects.map((x) => <span key={x} className="chip">{x}</span>)}
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="text-sm font-bold text-emerald-800">{d.professionPage.pros}</h2>
          <ul className="mt-2 space-y-1.5">
            {text.pros.map((x) => <li key={x} className="text-sm text-emerald-900">+ {x}</li>)}
          </ul>
        </section>
        <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
          <h2 className="text-sm font-bold text-amber-800">{d.professionPage.cons}</h2>
          <ul className="mt-2 space-y-1.5">
            {text.cons.map((x) => <li key={x} className="text-sm text-amber-900">− {x}</li>)}
          </ul>
        </section>
      </div>

      {specialties.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold">{d.professionPage.studyThisTitle}</h2>
          <p className="mt-1 text-sm text-ink-muted">{d.professionPage.studyThisHint}</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((s) => <SpecialtyCard key={s.code} locale={locale} s={s} />)}
          </div>
        </section>
      ) : p.international ? (
        <p className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink-soft">
          {d.professionPage.internationalNote}
        </p>
      ) : null}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold">{fmt(d.professionPage.related, { field: field.name })}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map(({ p: r, text: rt }) => (
              <Link key={r.id} href={href(locale, `/professions/${r.slug}`)} className="chip">
                {rt.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
