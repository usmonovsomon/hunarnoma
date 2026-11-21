import type { Metadata } from "next";
import { colleges, collegeTotals, COLLEGE_REGION_ORDER } from "@/lib/colleges";
import { asLocale, fmt, fmtNum, getDict, LOCALES } from "@/lib/i18n";
import { collegeLocation, collegeName, regionName } from "@/lib/i18n/data";
import CollegeCatalog, { type RegionOption, type CollegeItem } from "@/components/CollegeCatalog";
import { CollegeSourceNote } from "@/components/ntc";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.collegesPage.title, description: d.collegesPage.metaDescription };
}

export default function CollegesPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);

  const items: CollegeItem[] = colleges.map((c) => ({
    slug: c.slug,
    name: collegeName(locale, c.id, c.name),
    location: collegeLocation(locale, c.id, c.location),
    region: c.region,
    type: c.type,
    specialtyCount: c.specialtyCount,
    totalSeats: c.totalSeats,
  }));

  const regions: RegionOption[] = COLLEGE_REGION_ORDER
    .filter((r) => colleges.some((c) => c.region === r))
    .map((r) => ({ value: r, label: regionName(d, r) }));

  return (
    <div className="container-page py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{d.collegesPage.title}</h1>
        <p className="mt-3 text-ink-soft">
          {fmt(d.collegesPage.lead, { count: fmtNum(locale, collegeTotals.colleges) })}
        </p>
      </header>
      <div className="mt-6">
        <CollegeCatalog locale={locale} dict={d} items={items} regions={regions} />
      </div>
      <CollegeSourceNote locale={locale} className="mt-8" />
    </div>
  );
}
