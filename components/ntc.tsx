import Link from "next/link";
import { CLUSTER_COLOR } from "@/lib/ntc/content";
import { getClusterMeta } from "@/lib/i18n/content";
import { SOURCE, type Specialty, type University } from "@/lib/ntc";
import { COLLEGE_SOURCE, type CollegeSpecialty } from "@/lib/colleges";
import { fmtNum, getDict, href, plural, type Locale } from "@/lib/i18n";
import { cityName, specialtyName, uniTypeLabel, universityName, universityShortName } from "@/lib/i18n/data";
import { parsePhones } from "@/lib/phone";

export function ClusterPill({ locale, id, className = "" }: { locale: Locale; id: number; className?: string }) {
  const m = getClusterMeta(locale)[id];
  if (!m) return null;
  const c = CLUSTER_COLOR[m.color];
  return (
    <Link
      href={href(locale, `/clusters/${id}`)}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition hover:brightness-95 ${c.chip} ${className}`}
    >
      <span>{m.emoji}</span>
      <span>{m.name}</span>
    </Link>
  );
}

export function ClusterDot({ locale, id }: { locale: Locale; id: number }) {
  const m = getClusterMeta(locale)[id];
  if (!m) return null;
  return <span className={`inline-block h-2 w-2 rounded-full ${CLUSTER_COLOR[m.color].dot}`} />;
}

export function Stat({ value, label, sub }: { value: React.ReactNode; label: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-ink sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs font-medium text-ink-soft">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] text-ink-muted">{sub}</div>}
    </div>
  );
}

export function SourceNote({ locale, className = "" }: { locale: Locale; className?: string }) {
  const d = getDict(locale);
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-ink-muted ${className}`}>
      <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-700">
        {d.source.badge}
      </span>
      {d.source.prefix} {d.source.label}.{" "}
      <a href={SOURCE.url} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline">
        ntc.tj ↗
      </a>{" "}
      · {d.source.note}
    </div>
  );
}

export function CollegeSourceNote({ locale, className = "" }: { locale: Locale; className?: string }) {
  const d = getDict(locale);
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-ink-muted ${className}`}>
      <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 font-semibold text-green-700">
        {d.source.badge}
      </span>
      {d.source.prefix} {d.collegeSource.label}.{" "}
      <a href={COLLEGE_SOURCE.url} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline">
        ntc.tj ↗
      </a>{" "}
      · {d.collegeSource.note}
    </div>
  );
}

/**
 * Tap-to-call links. A field can hold several numbers; each becomes its own
 * link, and anything that cannot be normalised to +992 stays as plain text.
 */
export function PhoneLinks({ locale, phone }: { locale: Locale; phone: string }) {
  const d = getDict(locale);
  const numbers = parsePhones(phone);
  if (!numbers.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-1.5">
      <span aria-hidden>📞</span>
      {numbers.map((p, i) => (
        <span key={p.href ?? p.display} className="flex items-center gap-1.5">
          {p.href ? (
            <a
              href={p.href}
              aria-label={d.universityPage.callAria.replace("{phone}", p.display)}
              className="font-medium text-brand-600 hover:underline"
            >
              {p.display}
            </a>
          ) : (
            <span>{p.display}</span>
          )}
          {i < numbers.length - 1 && <span className="text-ink-muted">·</span>}
        </span>
      ))}
    </div>
  );
}

export function SpecialtyCard({ locale, s }: { locale: Locale; s: Specialty }) {
  const d = getDict(locale);
  const m = getClusterMeta(locale)[s.cluster];
  return (
    <Link href={href(locale, `/specialties/${s.code}`)} className="card group flex flex-col p-4">
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <span>{m?.emoji}</span>
        <span className="truncate">{m?.name}</span>
      </div>
      <div className="mt-1.5 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">
        {specialtyName(locale, s.name)}
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
        <span>🏛 {s.stats.universities} {plural(locale, s.stats.universities, d.units.university)}</span>
        <span>🎟 {fmtNum(locale, s.stats.totalSeats)} {d.labels.seatsShort}</span>
        {s.stats.freeSeats > 0 && (
          <span className="text-green-700">{fmtNum(locale, s.stats.freeSeats)} {d.labels.budget}</span>
        )}
      </div>
    </Link>
  );
}

/** Info card for a college (ССУЗ) specialty — no detail page exists for these yet, so it just links onward to the colleges catalog rather than a specific specialty URL. */
export function CollegeSpecialtyCard({ locale, s }: { locale: Locale; s: CollegeSpecialty }) {
  const d = getDict(locale);
  const m = getClusterMeta(locale)[s.cluster];
  return (
    <Link href={href(locale, "/colleges")} className="card group flex flex-col p-4">
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <span>{m?.emoji}</span>
        <span className="truncate">{m?.name}</span>
      </div>
      <div className="mt-1.5 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">
        {specialtyName(locale, s.name)}
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
        <span>🏫 {s.stats.colleges} {d.labels.colleges}</span>
        <span>🎟 {fmtNum(locale, s.stats.totalSeats)} {d.labels.seatsShort}</span>
      </div>
    </Link>
  );
}

export function UniversityCard({ locale, u }: { locale: Locale; u: University }) {
  const d = getDict(locale);
  return (
    <Link href={href(locale, `/universities/${u.slug}`)} className="card group flex flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">
          {universityShortName(locale, u.id, u.shortName)}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${u.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
          {uniTypeLabel(d, u.type)}
        </span>
      </div>
      <div className="mt-2 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">
        {universityName(locale, u.id, u.name)}
      </div>
      <div className="mt-1 text-xs text-ink-muted">📍 {cityName(d, u.city)}</div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
        <span>{u.specialtyCount} {d.labels.specialties}</span>
        <span>🎟 {fmtNum(locale, u.totalSeats)} {d.labels.seatsShort}</span>
      </div>
    </Link>
  );
}
