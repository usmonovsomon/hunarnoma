// i18n runtime. Everything here is plain data + pure functions so a dictionary
// can be handed straight to a client component as a prop.
import ru from "./dictionaries/ru";
import tj from "./dictionaries/tj";
import en from "./dictionaries/en";
import { DEFAULT_LOCALE, LOCALE_META, isLocale, type Locale } from "./config";
import type { Dict } from "./dictionaries/ru";

export * from "./config";
export type { Dict };

const DICTS: Record<Locale, Dict> = { ru, tj, en };

export function getDict(locale: string): Dict {
  return DICTS[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

/** Narrows a raw route param to a Locale, falling back to the default. */
export const asLocale = (x: string): Locale => (isLocale(x) ? x : DEFAULT_LOCALE);

/** Fills `{name}` placeholders: fmt(d.home.clusterBadge, { n: 3 }) */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (all, key) =>
    key in vars ? String(vars[key]) : all,
  );
}

/**
 * Picks a plural form from a [one, few, many] tuple.
 * ru — full Slavic rule; tj — always the singular (no numeral agreement);
 * en — one vs. other.
 */
export function plural(locale: Locale, n: number, forms: string[]): string {
  const [one, few, many] = forms;
  if (locale === "tj") return one;
  if (locale === "en") return n === 1 ? one : few;
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}

// --- number / money formatting --------------------------------------------
export const fmtNum = (locale: Locale, n: number) => n.toLocaleString(LOCALE_META[locale].intl);

export const fmtSomoni = (locale: Locale, n: number, d: Dict) =>
  `${fmtNum(locale, n)} ${d.labels.perYearSomoni}`;

export const fmtSomoniRange = (locale: Locale, min: number, max: number, d: Dict) =>
  min === max
    ? fmtSomoni(locale, min, d)
    : `${fmtNum(locale, min)}–${fmtNum(locale, max)} ${d.labels.perYearSomoni}`;

/** Locale-aware sort key for name columns. */
export const collator = (locale: Locale) =>
  new Intl.Collator(LOCALE_META[locale].intl, { sensitivity: "base", numeric: true });

// --- URL helpers -----------------------------------------------------------
/** Builds a locale-prefixed path: href("tj", "/specialties") -> "/tj/specialties" */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swaps the locale segment of an existing in-app pathname. */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts[0] = next;
  else parts.unshift(next);
  return `/${parts.join("/")}`;
}
