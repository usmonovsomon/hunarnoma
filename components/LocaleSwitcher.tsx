"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_META, switchLocalePath, type Locale } from "@/lib/i18n";

/**
 * Swaps the locale segment of the current path, so the visitor stays on the
 * same page when they change language. A custom dropdown rather than a
 * native <select> so it can carry the project's own colors and styling.
 */
export default function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition ${
          open
            ? "border-brand-400 bg-brand-50 text-brand-700"
            : "border-slate-200 bg-slate-50 text-brand-700 hover:border-brand-200 hover:bg-brand-50"
        }`}
      >
        {LOCALE_META[locale].short}
        <svg
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
          className={`h-2 w-2.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg shadow-brand-900/10"
        >
          {LOCALES.map((l) => {
            const active = l === locale;
            return (
              <Link
                key={l}
                href={switchLocalePath(pathname, l)}
                hrefLang={LOCALE_META[l].htmlLang}
                role="option"
                aria-selected={active}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-slate-50 hover:text-ink"
                }`}
              >
                {LOCALE_META[l].native}
                {active && (
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-600">
                    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
