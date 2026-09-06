import type { Metadata } from "next";
import { asLocale, getDict, LOCALES } from "@/lib/i18n";
import { PROFESSION_FIELD_IDS, professionsInField } from "@/lib/professions";
import { getProfessionFieldMeta, getProfessionText } from "@/lib/i18n/professions";
import TestResultView, { type FieldExampleProfession } from "./TestResult";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  // Results live in sessionStorage — nothing here is worth indexing.
  return { title: d.result.metaTitle, robots: { index: false, follow: true } };
}

const EXAMPLES_PER_FIELD = 3;

export default function ResultPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);

  const professionsByField = Object.fromEntries(
    PROFESSION_FIELD_IDS.map((fieldId) => {
      const examples: FieldExampleProfession[] = professionsInField(fieldId)
        .slice(0, EXAMPLES_PER_FIELD)
        .map((p) => {
          const text = getProfessionText(locale, p.id);
          return { slug: p.slug, name: text?.name ?? p.id };
        });
      return [fieldId, examples];
    }),
  ) as Record<string, FieldExampleProfession[]>;

  return (
    <TestResultView
      locale={locale}
      dict={getDict(locale)}
      fields={getProfessionFieldMeta(locale)}
      professionsByField={professionsByField}
    />
  );
}
