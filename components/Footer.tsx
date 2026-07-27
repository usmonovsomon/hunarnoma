import Link from "next/link";
import { LOCALE_META, LOCALES, getDict, href, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-extrabold">Rohnamo<span className="text-brand-600">.</span></div>
          <p className="mt-2 text-sm text-ink-muted">{d.footer.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">{d.footer.product}</div>
          <ul className="mt-2 space-y-1 text-ink-muted">
            <li><Link href={href(locale, "/specialties")} className="hover:text-brand-600">{d.nav.specialties}</Link></li>
            <li><Link href={href(locale, "/universities")} className="hover:text-brand-600">{d.nav.universities}</Link></li>
            <li><Link href={`${href(locale)}#clusters`} className="hover:text-brand-600">{d.nav.clusters}</Link></li>
            <li><Link href={href(locale, "/career-test")} className="hover:text-brand-600">{d.nav.careerTest}</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold">{d.footer.region}</div>
          <ul className="mt-2 space-y-1 text-ink-muted">
            <li>{d.footer.tajikistan}</li>
            <li className="flex flex-wrap gap-x-1.5">
              {LOCALES.map((l, i) => (
                <span key={l}>
                  <Link href={href(l)} hrefLang={LOCALE_META[l].htmlLang} className="hover:text-brand-600">
                    {LOCALE_META[l].native}
                  </Link>
                  {i < LOCALES.length - 1 && <span className="ml-1.5">·</span>}
                </span>
              ))}
            </li>
          </ul>
        </div>
        <div className="text-sm text-ink-muted">
          <div className="font-semibold text-ink">{d.footer.important}</div>
          <p className="mt-2">{d.footer.importantText}</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-ink-muted">
        {d.footer.copyright}
      </div>
    </footer>
  );
}
