"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { fmtNum, href, type Dict, type Locale } from "@/lib/i18n";

export interface UniItem {
  slug: string;
  /** Already localised by the server component. */
  name: string;
  shortName: string;
  /** Localised city label. */
  city: string;
  /** Raw Russian region key — used for filtering, matched against RegionOption.value. */
  region: string;
  type: "state" | "private";
  specialtyCount: number;
  totalSeats: number;
  /** Extra haystack so search still matches the Russian source name. */
  searchAlias?: string;
}

export interface RegionOption {
  value: string;
  label: string;
}

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export default function UniversityCatalog({
  locale,
  dict,
  items,
  regions,
}: {
  locale: Locale;
  dict: Dict;
  items: UniItem[];
  regions: RegionOption[];
}) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    return items.filter((u) => {
      if (region && u.region !== region) return false;
      if (type && u.type !== type) return false;
      if (f) {
        const haystack = fold(`${u.name} ${u.shortName} ${u.city} ${u.searchAlias ?? ""}`);
        if (!haystack.includes(f)) return false;
      }
      return true;
    });
  }, [items, q, region, type]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.universitiesPage.searchPlaceholder}
            aria-label={dict.universitiesPage.searchPlaceholder}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label={dict.universitiesPage.allRegions}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">{dict.universitiesPage.allRegions}</option>
          {regions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label={dict.universitiesPage.allTypes}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">{dict.universitiesPage.allTypes}</option>
          <option value="state">{dict.labels.statePlural}</option>
          <option value="private">{dict.labels.privatePlural}</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {dict.universitiesPage.found} <b className="text-ink">{fmtNum(locale, filtered.length)}</b>
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <Link key={u.slug} href={href(locale, `/universities/${u.slug}`)} className="card group flex flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex items-center rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700">{u.shortName}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${u.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
                {u.type === "state" ? dict.labels.state : dict.labels.private}
              </span>
            </div>
            <div className="mt-2 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">{u.name}</div>
            <div className="mt-1 text-xs text-ink-muted">📍 {u.city}</div>
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
              <span>{u.specialtyCount} {dict.labels.specialties}</span>
              <span>🎟 {fmtNum(locale, u.totalSeats)} {dict.labels.seatsShort}</span>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-ink-muted">
          {dict.universitiesPage.empty}
        </div>
      )}
    </div>
  );
}
