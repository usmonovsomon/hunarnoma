# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

HunarNoma (older docs still call it "Rohnamo"): a career and education discovery site for school graduates in Tajikistan. It runs on Next.js 14 (App Router), TypeScript and Tailwind, is fully statically generated and deploys to Vercel. The product idea is the explicit link **profession → specialty (направление) → university/college**, with the university always as the last step. `docs/BLUEPRINT.md` has the full product concept, and `README.md` (in Russian) covers data sources and known parsing artifacts in detail.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # static build; the real end-to-end check
npm run typecheck    # tsc --noEmit — the main correctness gate
npm run data         # re-parse NTC PDFs → data/parsed/*.json → lib/ntc/data.json
```

There is no test suite. There is also no ESLint config, so `npm run lint` prompts for interactive setup. Use `typecheck` and `build` to verify changes.

Other data scripts are run by hand with `node scripts/<name>.mjs` from the repo root, because they use repo-relative paths:
- `parse_college_specialties.mjs` → `data/parsed/college_*.json`, then `build_college_data.mjs` merges it into `lib/colleges/data.json`
- `gen_name_overrides.mjs` → `data/name_overrides_auto.json` (cleans up wrapped or truncated specialty names). Manual `NAME_OVERRIDES` in `parse_ntc.mjs` take priority.
- `build_colleges.mjs` reads a raw registry HTML file from `COLLEGES_HTML`. It has a hardcoded fallback path to someone's local machine.
- `geocode_universities.mjs` queries Nominatim and writes a `*_review.json` sidecar for a person to check. It does not commit matches automatically.

`parse_ntc.mjs` reads pre-rendered `pdftotext -layout` (`cluster_N.txt`) and `pdftotext -table` (`t_cluster_N.txt`) output that is already in `data/parsed/`, not the PDFs themselves.

## Architecture

### Routing and locales
- Every page lives under `app/[locale]/` (locales `ru` (default), `tj`, `en`). `app/[locale]/layout.tsx` is the root layout that sets `<html lang>`. The Tajik URL segment is `tj`, but the HTML/hreflang code is `tg` (`LOCALE_META` in `lib/i18n/config.ts`).
- `middleware.ts` redirects paths without a locale prefix using the cookie `hunarnoma_locale`, then `Accept-Language`, then `ru`. It skips `_next`, `api`, and any path containing a dot.
- Every page exports `generateStaticParams`, and the site is meant to stay fully static. The CSP in `next.config.mjs` allows `'unsafe-inline'` instead of nonces for exactly this reason, so don't add anything that forces dynamic rendering. If you add an external host (tiles, fonts, analytics), you must also add it to that CSP.
- Pages turn the route param into a locale with `asLocale(params.locale)` and get strings from `getDict(locale)`. Build internal links with `href(locale, path)`.

### Three data layers (keep them separate)
1. **Factual NTC data** (official 2026–2027 admission plan, Russian only):
   - `lib/ntc/` holds universities, specialties and offerings from `data.json`.
   - `lib/colleges/` holds colleges/ССУЗ and deliberately uses the same Specialty/Offering/stats shape.
   - The generated `data.json` files are build outputs. Fix data problems in the scripts, or in the override layers below, never by hand-editing those files.
2. **Editorial content** (written by hand, not official):
   - `lib/i18n/content/{ru,tj,en}.ts` holds cluster and specialty descriptions on top of `lib/ntc/content.ts` (emoji, colour).
   - `lib/professions/base.ts` is the curated profession list. Professions link to real data only through `specialtyCodes` and `collegeSpecialtyCodes`, and each code must exist in the dataset. `international: true` professions have no local specialty (`specialtyCodes: []`), and the UI states this openly instead of inventing a link.
   - Per-locale profession prose is in `lib/i18n/professions/`.
   - Don't add made-up numbers such as salary or demand. Figures must come from the dataset.
3. **Translations and corrections over the Russian source**:
   - `data/i18n/*.json` is keyed by Russian specialty name or by university/college id. It also holds fixed university `shortName`s in `universities.ru.json`.
   - `lib/i18n/data.ts` provides the accessors. Every accessor falls back to the Russian source value, so a missing translation shows Russian text, never a blank.
   - `parseLanguages()` removes PDF column bleed from the "language of instruction" field. The underlying data is still corrupted.

### i18n
- `lib/i18n/dictionaries/ru.ts` is the reference dictionary. Its `Dict` type checks `tj.ts` and `en.ts`, so a missing key is a compile error. Add every new UI string to all three files.
- Use `fmt(template, vars)` to fill `{name}` placeholders and `plural(locale, n, [one, few, many])`: ru uses Slavic rules, en uses one/other, and tj always uses the singular. For numbers and money use `fmtNum` and `fmtSomoni`, and for locale-aware sorting use `collator`.
- Dictionaries are plain data, so you can pass them as props into client components.
- To add a locale, update `LOCALES` and `LOCALE_META`, the dictionary, the content bundle (and register it in `content/index.ts` and `professions/index.ts`), and optionally `data/i18n/*.<code>.json`.

### Other pieces
- `lib/test.ts` is the career test. It scores interests against profession fields without ML and returns an explanation. Question texts are in the dictionaries.
- `lib/phone.ts` (`parsePhones`) splits the NTC phone fields (one field can hold several numbers, separated by commas or just spaces) into `tel:+992…` links. A number that can't be normalized is shown as plain text.
- The university map uses Leaflet with OpenStreetMap tiles. `UniversityMap.tsx` lazy-loads `UniversityMapLeaflet.tsx` on the client. Coordinates are in `data/i18n/university_coords.json`.
- The PWA service worker (`public/sw.js`) is registered in production only. Bump its `VERSION` to clear old caches after changing caching behaviour.
- The font is Onest via `next/font`, chosen because it renders the Tajik letters (ӣ ӯ қ ғ ҳ ҷ).

## Notes

- Parts of `README.md` are out of date. It mentions `components/ProfessionGraph.tsx` (which no longer exists) and the cookie `rohnamo_locale`, and it leaves out colleges, medicine and mentorship pages. Trust the code over the README.
- `lib/types.ts` describes an aspirational domain model (with `Locale = "ru" | "tg" | "en"`). The live locale type is the one in `lib/i18n/config.ts`.
