import type { Metadata } from "next";
import { asLocale, getDict, LOCALES } from "@/lib/i18n";
import { getClusterMeta } from "@/lib/i18n/content";
import TestResultView from "./TestResult";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  // Results live in sessionStorage — nothing here is worth indexing.
  return { title: d.result.metaTitle, robots: { index: false, follow: true } };
}

export default function ResultPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  return <TestResultView locale={locale} dict={getDict(locale)} clusters={getClusterMeta(locale)} />;
}
