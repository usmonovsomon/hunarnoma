"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_META, switchLocalePath, type Locale } from "@/lib/i18n";

/**
 * Swaps the locale segment of the current path, so the visitor stays on the
 * same page when they change language.
 */
export default function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="flex items-center gap-0.5 rounded-xl bg-slate-100 p-0.5" role="group" aria-label={label}>
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={LOCALE_META[l].htmlLang}
            aria-current={active ? "true" : undefined}
            title={LOCALE_META[l].native}
            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
              active ? "bg-white text-brand-700 shadow-sm" : "text-ink-muted hover:text-ink"
            }`}
          >
            {LOCALE_META[l].short}
          </Link>
        );
      })}
    </div>
  );
}
