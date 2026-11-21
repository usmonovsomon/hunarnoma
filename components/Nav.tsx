import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import MobileMenu from "@/components/MobileMenu";
import { getDict, href, type Locale } from "@/lib/i18n";

export default function Nav({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const links = [
    { href: href(locale, "/professions"), label: d.nav.professions },
    { href: href(locale, "/specialties"), label: d.nav.specialties },
    { href: href(locale, "/universities"), label: d.nav.universities },
    { href: href(locale, "/colleges"), label: d.nav.colleges },
    { href: `${href(locale)}#clusters`, label: d.nav.clusters },
    { href: href(locale, "/mentorship"), label: d.nav.mentorship },
    { href: href(locale, "/career-test"), label: d.nav.careerTest },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href={href(locale)} className="flex items-center gap-2">
          <Image src="/logo-mark.png" alt="" className="h-9 w-9" width={36} height={36} priority />
          <span className="text-lg font-extrabold tracking-tight">
            HunarNoma<span className="text-brand-600">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-slate-100 hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher locale={locale} label={d.nav.switchLanguage} />
          <Link href={href(locale, "/career-test")} className="btn-primary hidden sm:inline-flex">
            {d.nav.takeTest}
          </Link>
          <MobileMenu
            links={links}
            ctaHref={href(locale, "/career-test")}
            labels={{
              menu: d.nav.menu,
              close: d.nav.close,
              takeTest: d.nav.takeTest,
              installApp: d.nav.installApp,
              installAppHint: d.nav.installAppHint,
              installIosHint: d.nav.installIosHint,
            }}
          />
        </div>
      </div>
    </header>
  );
}
