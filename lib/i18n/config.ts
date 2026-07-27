// Locale configuration. Kept dependency-free so both server and client
// components (and middleware) can import it.

export const LOCALES = ["ru", "tj", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

export const isLocale = (x: string): x is Locale => (LOCALES as readonly string[]).includes(x);

export interface LocaleMeta {
  /** Name of the language in that language — for the switcher. */
  native: string;
  /** 2–3 letter badge shown on narrow screens. */
  short: string;
  /** value for <html lang> */
  htmlLang: string;
  /** BCP-47 tag for Intl.NumberFormat / localeCompare */
  intl: string;
  /** OpenGraph locale */
  ogLocale: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  // `tg` is the ISO-639 code for Tajik; the URL segment stays the friendlier "tj".
  ru: { native: "Русский", short: "RU", htmlLang: "ru", intl: "ru-RU", ogLocale: "ru_RU" },
  tj: { native: "Тоҷикӣ", short: "TJ", htmlLang: "tg", intl: "ru-RU", ogLocale: "tg_TJ" },
  en: { native: "English", short: "EN", htmlLang: "en", intl: "en-US", ogLocale: "en_US" },
};

/** Best locale for an Accept-Language header value. */
export function matchLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const wanted = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of wanted) {
    const base = tag.split("-")[0];
    if (base === "tg" || base === "tj") return "tj";
    if (base === "en") return "en";
    if (base === "ru") return "ru";
  }
  return DEFAULT_LOCALE;
}
