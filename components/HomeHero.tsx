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

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeHero({
  locale,
  dict,
  subtitle,
  professions,
  universitiesCount,
}: {
  locale: Locale;
  dict: Dict;
  subtitle: string;
  professions: HeroProfession[];
  universitiesCount: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ember-50 via-white to-brand-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob left-[30%] top-[-10%] h-[28rem] w-[28rem] bg-ember-300/50" />
        <div className="blob left-[45%] top-[45%] h-[24rem] w-[24rem] bg-wine-200/40" />
        <div className="blob right-[-8%] top-[5%] h-[32rem] w-[32rem] bg-brand-300/40" />
        <div className="blob bottom-[-20%] left-[-10%] h-[24rem] w-[24rem] bg-brand-200/40" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-24">
        <div className="relative z-10 min-w-0">
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

        <DeviceMockup locale={locale} dict={dict} professions={professions} universitiesCount={universitiesCount} />
      </div>
    </section>
  );
}

function DeviceMockup({
  locale,
  dict,
  professions,
  universitiesCount,
}: {
  locale: Locale;
  dict: Dict;
  professions: HeroProfession[];
  universitiesCount: number;
}) {
  const fieldMeta = getProfessionFieldMeta(locale);

  return (
    <div aria-hidden className="pointer-events-none relative min-w-0 select-none -mr-16 sm:mr-0 lg:-mr-40 xl:-mr-64">
      <div className="relative rounded-[2rem] bg-ink p-2.5 shadow-2xl shadow-ink/30 ring-1 ring-black/10 sm:p-3.5">
        <div className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-white/20 sm:top-1.5" />
        <div className="overflow-hidden rounded-[1.4rem] bg-slate-50">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex shrink-0 items-center gap-1.5">
              <Image src="/logo-mark.png" alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-sm font-extrabold tracking-tight">
                HunarNoma<span className="text-brand-600">.</span>
              </span>
            </div>
            <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-ink-muted sm:flex">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 shrink-0">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                <path d="m14 14 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="truncate">{dict.professionsPage.searchPlaceholder}</span>
            </div>
            <span className="ml-auto shrink-0 rounded-lg bg-brand-600 px-3 py-1.5 text-[11px] font-semibold text-white">
              {dict.nav.takeTest}
            </span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
                <div className="text-2xl">🧭</div>
                <div className="mt-2 text-sm font-bold leading-tight">{dict.home.step1Title}</div>
                <div className="mt-3 inline-grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-ember-400 to-wine-500 p-4 text-white">
                <div className="text-2xl">🏛️</div>
                <div className="mt-2 text-sm font-bold leading-tight">
                  {fmtNum(locale, universitiesCount)} {plural(locale, universitiesCount, dict.units.universityFull)}
                </div>
                <div className="mt-3 inline-grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-hidden">
              {PROFESSION_FIELD_IDS.slice(0, 8).map((id, i) => (
                <div
                  key={id}
                  className={`flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl px-1 py-2 ${
                    i === 0 ? "bg-white shadow-sm ring-1 ring-brand-200" : ""
                  }`}
                >
                  <span className="text-xl">{fieldMeta[id]?.emoji}</span>
                  <span className="w-full truncate text-center text-[10px] font-medium text-ink-soft">{fieldMeta[id]?.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-sm font-extrabold tracking-tight">{dict.nav.professions}</div>
            <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {professions.slice(0, 3).map((p, i) => {
                const field = fieldMeta[p.fieldId];
                const color = field ? PROFESSION_FIELD_COLOR[field.color] : null;
                return (
                  <div key={p.slug} className={`rounded-xl border border-slate-200 bg-white p-3 ${i === 2 ? "hidden sm:block" : ""}`}>
                    <div className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${color?.dot ?? "bg-slate-300"}`} />
                      <span className="truncate">{field?.name}</span>
                    </div>
                    <div className="mt-1 truncate text-xs font-bold text-ink">{p.name}</div>
                    <div className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-ink-soft">{p.tagline}</div>
                    <div className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold ring-1 ring-inset ${color?.chip ?? ""}`}>
                      🎓 {p.specialtyCount} {plural(locale, p.specialtyCount, dict.units.specialty)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -bottom-6 -left-4 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-xl ring-1 ring-slate-200 backdrop-blur sm:block lg:-left-10">
        <div className="text-xs font-semibold text-ink-muted">{dict.nav.careerTest}</div>
        <div className="mt-0.5 flex items-center gap-2 text-sm font-bold text-ink">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-brand-700">✓</span>
          {dict.home.step3Title}
        </div>
      </div>
    </div>
  );
}
