"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { fmtNum, href, type Dict, type Locale } from "@/lib/i18n";

export interface CollegeItem {
  slug: string;
  name: string;
  location: string;
  region: string;
  type: "state" | "private";
  specialtyCount: number;
  totalSeats: number;
}

export interface RegionOption {
  value: string;
  label: string;
}

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export default function CollegeCatalog({
  locale,
  dict,
  items,
  regions,
}: {
  locale: Locale;
  dict: Dict;
  items: CollegeItem[];
  regions: RegionOption[];
}) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    return items.filter((c) => {
      if (region && c.region !== region) return false;
      if (type && c.type !== type) return false;
      if (f && !fold(`${c.name} ${c.location}`).includes(f)) return false;
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
            placeholder={dict.collegesPage.searchPlaceholder}
            aria-label={dict.collegesPage.searchPlaceholder}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label={dict.collegesPage.allRegions}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">{dict.collegesPage.allRegions}</option>
          {regions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label={dict.collegesPage.allTypes}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
        >
          <option value="">{dict.collegesPage.allTypes}</option>
          <option value="state">{dict.labels.statePlural}</option>
          <option value="private">{dict.labels.privatePlural}</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {dict.collegesPage.found} <b className="text-ink">{filtered.length}</b>
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} href={href(locale, `/colleges/${c.slug}`)} className="card group flex flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c.type === "state" ? "bg-slate-100 text-ink-soft" : "bg-amber-50 text-amber-700"}`}>
                {c.type === "state" ? dict.labels.state : dict.labels.private}
              </span>
            </div>
            <div className="mt-2 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">{c.name}</div>
            <div className="mt-1 text-xs text-ink-muted">📍 {c.location}</div>
            {c.specialtyCount > 0 && (
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
                <span>{c.specialtyCount} {dict.labels.specialties}</span>
                <span>🎟 {fmtNum(locale, c.totalSeats)} {dict.labels.seatsShort}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-ink-muted">
          {dict.collegesPage.empty}
        </div>
      )}
    </div>
  );
}
