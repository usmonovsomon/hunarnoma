import Link from "next/link";
import { PROFESSION_FIELD_COLOR, type ProfessionFieldId } from "@/lib/professions/base";
import { getProfessionFieldMeta } from "@/lib/i18n/professions";
import { href, plural, type Dict, type Locale } from "@/lib/i18n";

/** A static field badge — professions don't have per-field pages, only a filter on the catalog. */
export function FieldPill({
  locale,
  id,
  className = "",
}: {
  locale: Locale;
  id: ProfessionFieldId;
  className?: string;
}) {
  const m = getProfessionFieldMeta(locale)[id];
  if (!m) return null;
  const c = PROFESSION_FIELD_COLOR[m.color];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${c.chip} ${className}`}>
      <span>{m.emoji}</span>
      <span>{m.name}</span>
    </span>
  );
}

export function InternationalBadge({ dict, className = "" }: { dict: Dict; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-ink-soft ${className}`}>
      🌍 {dict.labels.international}
    </span>
  );
}

export function ProfessionCard({
  locale,
  dict,
  slug,
  fieldId,
  name,
  tagline,
  specialtyCount,
  international = false,
}: {
  locale: Locale;
  dict: Dict;
  slug: string;
  fieldId: ProfessionFieldId;
  name: string;
  tagline: string;
  specialtyCount: number;
  international?: boolean;
}) {
  const field = getProfessionFieldMeta(locale)[fieldId];
  return (
    <Link href={href(locale, `/professions/${slug}`)} className="card group flex flex-col p-4">
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <span>{field?.emoji}</span>
        <span className="truncate">{field?.name}</span>
      </div>
      <div className="mt-1.5 font-bold leading-snug text-ink group-hover:text-brand-700">{name}</div>
      <div className="mt-1 line-clamp-2 text-sm text-ink-soft">{tagline}</div>
      <div className="mt-auto pt-3 text-xs text-ink-muted">
        {international ? (
          <InternationalBadge dict={dict} />
        ) : (
          <span>🎓 {specialtyCount} {plural(locale, specialtyCount, dict.units.specialty)}</span>
        )}
      </div>
    </Link>
  );
}
