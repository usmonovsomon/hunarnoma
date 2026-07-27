import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LOCALES, LOCALE_META, asLocale, getDict, href, isLocale, type Locale } from "@/lib/i18n";

const SITE_URL = "https://rohnamo.tj";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.site.titleDefault, template: "%s · Rohnamo" },
    description: d.site.description,
    alternates: {
      canonical: href(locale),
      // Tell crawlers the same page exists in the other two languages.
      languages: Object.fromEntries([
        ...LOCALES.map((l) => [LOCALE_META[l].htmlLang, href(l)]),
        ["x-default", href("ru")],
      ]),
    },
    openGraph: {
      title: d.site.ogTitle,
      description: d.site.ogDescription,
      locale: LOCALE_META[locale].ogLocale,
      type: "website",
      url: href(locale),
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={LOCALE_META[locale].htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
