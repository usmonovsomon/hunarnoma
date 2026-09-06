import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getDict, href, type Locale } from "@/lib/i18n";

export default function Nav({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const links = [
    { href: href(locale, "/professions"), label: d.nav.professions },
    { href: href(locale, "/specialties"), label: d.nav.specialties },
    { href: href(locale, "/universities"), label: d.nav.universities },
    { href: `${href(locale)}#clusters`, label: d.nav.clusters },
    { href: href(locale, "/career-test"), label: d.nav.careerTest },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href={href(locale)} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-black text-white">R</span>
          <span className="text-lg font-extrabold tracking-tight">
            Rohnamo<span className="text-brand-600">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-slate-100 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} label={d.nav.switchLanguage} />
          <Link href={href(locale, "/career-test")} className="btn-primary hidden sm:inline-flex">
            {d.nav.takeTest}
          </Link>
        </div>
      </div>
      <nav className="container-page flex gap-1 overflow-x-auto pb-2 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-ink-soft hover:bg-slate-100">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
