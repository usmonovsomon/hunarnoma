"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { ClusterColor } from "@/lib/ntc/content";
import { collator, fmtNum, href, plural, type Dict, type Locale } from "@/lib/i18n";

export interface SpecItem {
  code: string;
  /** Already localised by the server component. */
  name: string;
  cluster: number;
  universities: number;
  totalSeats: number;
  freeSeats: number;
}

/** Minimal cluster info the filter chips need — no dataset import client-side. */
export interface ClusterChip {
  id: number;
  name: string;
  emoji: string;
  color: ClusterColor;
}

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export default function SpecialtyCatalog({
  locale,
  dict,
  clusters,
  items,
  initialCluster = 0,
  showClusterFilter = true,
}: {
  locale: Locale;
  dict: Dict;
  clusters: ClusterChip[];
  items: SpecItem[];
  initialCluster?: number;
  showClusterFilter?: boolean;
}) {
  const [q, setQ] = useState("");
  const [cluster, setCluster] = useState(initialCluster);
  const [sort, setSort] = useState<"popular" | "seats" | "name">("popular");

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    const cmp = collator(locale);
    let list = items.filter((s) => (cluster ? s.cluster === cluster : true));
    if (f) list = list.filter((s) => fold(s.name).includes(f) || s.code.includes(f));
    list = [...list].sort((a, b) =>
      sort === "name" ? cmp.compare(a.name, b.name)
        : sort === "seats" ? b.totalSeats - a.totalSeats
        : b.universities - a.universities || b.totalSeats - a.totalSeats);
    return list;
  }, [items, q, cluster, sort, locale]);

  const byId = useMemo(() => new Map(clusters.map((c) => [c.id, c])), [clusters]);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 bg-slate-50/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={dict.specialtiesPage.searchPlaceholder}
              aria-label={dict.specialtiesPage.searchPlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "popular" | "seats" | "name")}
            aria-label={dict.specialtiesPage.sortPopular}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          >
            <option value="popular">{dict.specialtiesPage.sortPopular}</option>
            <option value="seats">{dict.specialtiesPage.sortSeats}</option>
            <option value="name">{dict.specialtiesPage.sortName}</option>
          </select>
        </div>
        {showClusterFilter && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setCluster(0)} className={chip(cluster === 0)}>
              {dict.specialtiesPage.allClusters}
            </button>
            {clusters.map((c) => (
              <button key={c.id} onClick={() => setCluster(c.id)} className={chip(cluster === c.id)}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {dict.specialtiesPage.found} <b className="text-ink">{fmtNum(locale, filtered.length)}</b>
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const m = byId.get(s.cluster);
          return (
            <Link key={s.code} href={href(locale, `/specialties/${s.code}`)} className="card group flex flex-col p-4">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <span>{m?.emoji}</span><span className="truncate">{m?.name}</span>
              </div>
              <div className="mt-1.5 line-clamp-2 font-bold leading-snug text-ink group-hover:text-brand-700">{s.name}</div>
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-ink-soft">
                <span>🏛 {s.universities} {plural(locale, s.universities, dict.units.university)}</span>
                <span>🎟 {fmtNum(locale, s.totalSeats)} {dict.labels.seatsShort}</span>
                {s.freeSeats > 0 && (
                  <span className="text-green-700">{fmtNum(locale, s.freeSeats)} {dict.labels.budget}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-ink-muted">
          {dict.specialtiesPage.empty}
        </div>
      )}
    </div>
  );
}

function chip(active: boolean) {
  return `rounded-full px-3 py-1.5 text-xs font-semibold transition ${
    active ? "bg-brand-600 text-white shadow-sm" : "bg-white text-ink-soft ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
  }`;
}
