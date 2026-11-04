import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LOCALES, LOCALE_META, asLocale, getDict, href, isLocale, type Locale } from "@/lib/i18n";

const SITE_URL = "https://hunarnoma.tj";

// Self-hosted at build time, so no request to Google Fonts at runtime.
const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.site.titleDefault, template: "%s · HunarNoma" },
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
    <html lang={LOCALE_META[locale].htmlLang} className={manrope.variable}>
      <body>
        <Nav locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
