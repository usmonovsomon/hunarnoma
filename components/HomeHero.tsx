import Image from "next/image";
import Link from "next/link";
import { PROFESSION_FIELD_COLOR, PROFESSION_FIELD_IDS, type ProfessionFieldId } from "@/lib/professions/base";
import { getProfessionFieldMeta } from "@/lib/i18n/professions";
import { fmtNum, href, plural, type Dict, type Locale } from "@/lib/i18n";

export interface HeroProfession {
  slug: string;
  fieldId: ProfessionFieldId;
  name: string;
  tagline: string;
  specialtyCount: number;
}

export interface HeroFeaturedProfession {
  fieldId: ProfessionFieldId;
  name: string;
  tagline: string;
  whatTheyDo: string[];
  schoolSubjects: string[];
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ size = "sm" }: { size?: "xs" | "sm" }) {
  const box = size === "xs" ? "h-3.5 w-3.5" : "h-5 w-5";
  const text = size === "xs" ? "text-[8px]" : "text-[11px]";
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Image src="/logo-mark.png" alt="" width={20} height={20} className={box} />
      <span className={`${text} font-extrabold tracking-tight`}>
        HunarNoma<span className="text-brand-600">.</span>
      </span>
    </div>
  );
}

export default function HomeHero({
  locale,
  dict,
  subtitle,
  professions,
  featured,
  professionsCount,
}: {
  locale: Locale;
  dict: Dict;
  subtitle: string;
  professions: HeroProfession[];
  featured: HeroFeaturedProfession | null;
  professionsCount: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ember-50 via-white to-brand-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob left-[30%] top-[-10%] h-[28rem] w-[28rem] bg-ember-300/50" />
        <div className="blob left-[45%] top-[45%] h-[24rem] w-[24rem] bg-wine-200/40" />
        <div className="blob right-[-8%] top-[5%] h-[32rem] w-[32rem] bg-brand-300/40" />
        <div className="blob bottom-[-20%] left-[-10%] h-[24rem] w-[24rem] bg-brand-200/40" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-12 pt-14 sm:pt-20 lg:min-h-[680px] lg:grid-cols-[1fr_1.1fr] lg:gap-6 lg:pt-16">
        <div className="relative z-10 min-w-0 lg:pb-16 lg:pr-6">
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {dict.home.heroTitle} <span className="gradient-text-flow">{dict.home.heroAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-ink-soft sm:text-xl">{subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={href(locale, "/career-test")}
              className="btn-primary group whitespace-normal rounded-2xl px-6 py-4 text-base"
            >
              {dict.home.ctaTest}
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={href(locale, "/professions")} className="btn-ghost rounded-2xl bg-white/70 px-6 py-4 text-base backdrop-blur">
              {dict.home.ctaCatalog}
            </Link>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none relative min-w-0 select-none self-end -mr-24 sm:-mr-32 lg:-mr-48 xl:-mr-72">
          <Monitor locale={locale} dict={dict} professions={professions} professionsCount={professionsCount} />
          {featured && <Phone locale={locale} dict={dict} featured={featured} />}
        </div>
      </div>
    </section>
  );
}

function Monitor({
  locale,
  dict,
  professions,
  professionsCount,
}: {
  locale: Locale;
  dict: Dict;
  professions: HeroProfession[];
  professionsCount: number;
}) {
  const fieldMeta = getProfessionFieldMeta(locale);
  const navLinks = [dict.nav.professions, dict.nav.specialties, dict.nav.universities, dict.nav.colleges, dict.nav.careerTest];

  return (
    <div className="relative">
      <div className="relative rounded-[1.75rem] bg-ink p-2.5 shadow-2xl shadow-ink/30 ring-1 ring-black/10 sm:p-3">
        <div className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-white/25 sm:top-[5px]" />
        <div className="aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-slate-50">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
            <Logo />
            <div className="hidden min-w-0 items-center gap-2.5 overflow-hidden sm:flex">
              {navLinks.map((l) => (
                <span key={l} className="whitespace-nowrap text-[9px] font-medium text-ink-soft">
                  {l}
                </span>
              ))}
            </div>
            <span className="ml-auto shrink-0 rounded-md border border-slate-200 px-1.5 py-0.5 text-[8px] font-semibold text-brand-700">RU</span>
            <span className="shrink-0 rounded-md bg-brand-600 px-2.5 py-1 text-[9px] font-semibold text-white">{dict.nav.takeTest}</span>
          </div>

          <div className="px-5 pt-4">
            <div className="text-lg font-extrabold tracking-tight text-ink">{dict.professionsPage.title}</div>
            <div className="mt-0.5 max-w-md truncate text-[9px] text-ink-soft">{dict.professionsPage.lead}</div>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[9px] text-ink-muted">
              <span>🔍</span>
              <span className="truncate">{dict.professionsPage.searchPlaceholder}</span>
            </div>

            <div className="mt-2 flex gap-1 overflow-hidden">
              <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-[8px] font-semibold text-white">
                {dict.professionsPage.allFields}
              </span>
              {PROFESSION_FIELD_IDS.map((id) => (
                <span
                  key={id}
                  className="flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[8px] font-medium text-ink-soft"
                >
                  <span>{fieldMeta[id]?.emoji}</span>
                  {fieldMeta[id]?.name}
                </span>
              ))}
            </div>

            <div className="mt-2.5 text-[9px] text-ink-soft">
              {dict.professionsPage.found} <b className="text-ink">{fmtNum(locale, professionsCount)}</b>
            </div>

            <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {professions.slice(0, 9).map((p) => {
                const field = fieldMeta[p.fieldId];
                return (
                  <div key={p.slug} className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                    <div className="flex items-center gap-1 text-[7px] text-ink-muted">
                      <span>{field?.emoji}</span>
                      <span className="truncate">{field?.name}</span>
                    </div>
                    <div className="mt-0.5 truncate text-[10px] font-bold text-ink">{p.name}</div>
                    <div className="mt-0.5 truncate text-[8px] text-ink-soft">{p.tagline}</div>
                    <div className="mt-1.5 text-[7px] text-ink-muted">
                      🎓 {p.specialtyCount} {plural(locale, p.specialtyCount, dict.units.specialty)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-10 w-[22%] bg-gradient-to-b from-slate-400 to-slate-300 [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)] sm:h-14" />
      <div className="mx-auto h-2 w-[34%] rounded-t-xl bg-slate-300 shadow-[0_8px_24px_rgba(33,23,18,0.18)]" />
    </div>
  );
}

function Phone({ locale, dict, featured }: { locale: Locale; dict: Dict; featured: HeroFeaturedProfession }) {
  const field = getProfessionFieldMeta(locale)[featured.fieldId];
  const color = field ? PROFESSION_FIELD_COLOR[field.color] : null;

  return (
    <div className="animate-float absolute -left-6 bottom-10 hidden w-[28%] min-w-[150px] max-w-[190px] sm:block lg:-left-4">
      <div className="rounded-[1.6rem] bg-ink p-1.5 shadow-2xl shadow-ink/40 ring-1 ring-black/10">
        <div className="relative aspect-[9/15] overflow-hidden rounded-[1.25rem] bg-slate-50">
          <div className="absolute left-1/2 top-1.5 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-ink" />
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-2.5 pb-1.5 pt-5">
            <Logo size="xs" />
            <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[6px] font-semibold text-white">{dict.nav.takeTest}</span>
          </div>
          <div className="px-2.5 pt-2">
            <div className="text-[6px] text-ink-muted">
              {dict.nav.professions} / {field?.name}
            </div>
            <span className={`mt-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[6px] font-semibold ring-1 ring-inset ${color?.chip ?? ""}`}>
              {field?.emoji} {field?.name}
            </span>
            <div className="mt-1 text-[11px] font-extrabold leading-tight tracking-tight text-ink">{featured.name}</div>
            <div className="mt-0.5 text-[7px] leading-snug text-ink-soft">{featured.tagline}</div>

            <div className="mt-2 rounded-lg border border-slate-200 bg-white p-1.5">
              <div className="text-[7px] font-bold text-ink">{dict.professionPage.whatTheyDo}</div>
              <ul className="mt-1 space-y-0.5">
                {featured.whatTheyDo.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-1 text-[6px] leading-snug text-ink-soft">
                    <span className="text-brand-500">▸</span>
                    <span className="line-clamp-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-1.5 rounded-lg border border-slate-200 bg-white p-1.5">
              <div className="text-[7px] font-bold text-ink">{dict.professionPage.schoolSubjects}</div>
              <div className="mt-1 flex flex-wrap gap-0.5">
                {featured.schoolSubjects.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[6px] font-medium text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
