import type { Metadata } from "next";
import { asLocale, getDict, LOCALES } from "@/lib/i18n";
import CareerTest from "./CareerTest";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.test.metaTitle, description: d.test.metaDescription };
}

export default function CareerTestPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  return <CareerTest locale={locale} dict={getDict(locale)} />;
}
