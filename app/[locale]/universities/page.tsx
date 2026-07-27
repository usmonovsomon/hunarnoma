import type { Metadata } from "next";
import { universities, totals, REGION_ORDER } from "@/lib/ntc";
import { asLocale, fmt, fmtNum, getDict, LOCALES } from "@/lib/i18n";
import { cityName, regionName, universityName, universityShortName } from "@/lib/i18n/data";
import UniversityCatalog, { type RegionOption, type UniItem } from "@/components/UniversityCatalog";
import { SourceNote } from "@/components/ntc";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.universitiesPage.title, description: d.universitiesPage.metaDescription };
}

export default function UniversitiesPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);

  const items: UniItem[] = universities.map((u) => ({
    slug: u.slug,
    name: universityName(locale, u.id, u.name),
    shortName: universityShortName(locale, u.id, u.shortName),
    city: cityName(d, u.city),
    region: u.region,
    type: u.type,
    specialtyCount: u.specialtyCount,
    totalSeats: u.totalSeats,
    // Keep the Russian name searchable in every locale — applicants often know
    // a university by its Russian name or original abbreviation.
    searchAlias: `${u.name} ${u.shortName} ${u.city}`,
  }));

  const regions: RegionOption[] = REGION_ORDER
    .filter((r) => universities.some((u) => u.region === r))
    .map((r) => ({ value: r, label: regionName(d, r) }));

  return (
    <div className="container-page py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{d.universitiesPage.title}</h1>
        <p className="mt-3 text-ink-soft">
          {fmt(d.universitiesPage.lead, { count: fmtNum(locale, totals.universities) })}
        </p>
      </header>
      <div className="mt-6">
        <UniversityCatalog locale={locale} dict={d} items={items} regions={regions} />
      </div>
      <SourceNote locale={locale} className="mt-8" />
    </div>
  );
}
