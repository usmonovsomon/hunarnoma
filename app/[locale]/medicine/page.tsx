import type { Metadata } from "next";
import Link from "next/link";
import { professionsInField, specialtiesForProfession, collegeSpecialtiesForProfession } from "@/lib/professions";
import { universitiesForSpecialty } from "@/lib/ntc";
import { collegesForSpecialty } from "@/lib/colleges";
import { getProfessionText } from "@/lib/i18n/professions";
import { asLocale, fmtNum, getDict, href, LOCALES } from "@/lib/i18n";
import { ProfessionCard } from "@/components/professions";
import { Stat } from "@/components/ntc";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.medicinePage.title, description: d.medicinePage.metaDescription };
}

export default function MedicinePage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);

  const medicineProfessions = professionsInField("medicine");

  const universityIds = new Set<string>();
  const collegeIds = new Set<string>();
  const items = medicineProfessions
    .map((p) => {
      const text = getProfessionText(locale, p.id);
      const specialties = specialtiesForProfession(p);
      const collegeSpecialties = collegeSpecialtiesForProfession(p);
      for (const s of specialties) for (const u of universitiesForSpecialty(s)) universityIds.add(u.id);
      for (const s of collegeSpecialties) for (const c of collegesForSpecialty(s)) collegeIds.add(c.id);
      return {
        p,
        text,
        specialtyCount: specialties.length + collegeSpecialties.length,
      };
    })
    .filter((x): x is { p: (typeof medicineProfessions)[number]; text: NonNullable<typeof x.text>; specialtyCount: number } => !!x.text);

  return (
    <div className="container-page py-8">
      <header className="max-w-3xl">
        <span className="eyebrow">🩺</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{d.medicinePage.title}</h1>
        <p className="mt-3 text-ink-soft">{d.medicinePage.lead}</p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat value={fmtNum(locale, items.length)} label={d.medicinePage.statsProfessions} />
        <Stat value={fmtNum(locale, universityIds.size)} label={d.medicinePage.statsUniversities} />
        <Stat value={fmtNum(locale, collegeIds.size)} label={d.medicinePage.statsColleges} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ p, text, specialtyCount }) => (
          <ProfessionCard
            key={p.id}
            locale={locale}
            dict={d}
            slug={p.slug}
            fieldId={p.fieldId}
            name={text.name}
            tagline={text.tagline}
            specialtyCount={specialtyCount}
          />
        ))}
      </div>

      <div className="mt-8">
        <Link href={href(locale, "/professions")} className="text-sm font-semibold text-brand-600 hover:underline">
          {d.medicinePage.seeAllLink}
        </Link>
      </div>
    </div>
  );
}
