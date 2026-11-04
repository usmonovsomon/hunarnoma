"use client";
import { useEffect, useMemo, useState } from "react";
import type { ProfessionFieldColor, ProfessionFieldId } from "@/lib/professions/base";
import { collator, fmtNum, type Dict, type Locale } from "@/lib/i18n";
import { ProfessionCard } from "@/components/professions";

export interface ProfessionItem {
  id: string;
  slug: string;
  fieldId: ProfessionFieldId;
  /** Already localised by the server component. */
  name: string;
  tagline: string;
  specialtyCount: number;
  international?: boolean;
}

/** Minimal field info the filter chips need — no content bundle import client-side. */
export interface FieldChip {
  id: ProfessionFieldId;
  name: string;
  emoji: string;
  color: ProfessionFieldColor;
}

const fold = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export default function ProfessionCatalog({
  locale,
  dict,
  fields,
  items,
}: {
  locale: Locale;
  dict: Dict;
  fields: FieldChip[];
  items: ProfessionItem[];
}) {
  const [q, setQ] = useState("");
  const [fieldId, setFieldId] = useState<ProfessionFieldId | "">("");

  // Read ?field= on the client so the page itself stays statically generated.
  useEffect(() => {
    const field = new URLSearchParams(window.location.search).get("field");
    if (field && fields.some((f) => f.id === field)) setFieldId(field as ProfessionFieldId);
  }, [fields]);

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    const cmp = collator(locale);
    let list = items.filter((p) => (fieldId ? p.fieldId === fieldId : true));
    if (f) list = list.filter((p) => fold(p.name).includes(f) || fold(p.tagline).includes(f));
    return [...list].sort((a, b) => cmp.compare(a.name, b.name));
  }, [items, q, fieldId, locale]);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 bg-slate-50/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:px-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.professionsPage.searchPlaceholder}
            aria-label={dict.professionsPage.searchPlaceholder}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => setFieldId("")} className={chip(fieldId === "")}>
            {dict.professionsPage.allFields}
          </button>
          {fields.map((f) => (
            <button key={f.id} onClick={() => setFieldId(f.id)} className={chip(fieldId === f.id)}>
              {f.emoji} {f.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {dict.professionsPage.found} <b className="text-ink">{fmtNum(locale, filtered.length)}</b>
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProfessionCard
            key={p.id}
            locale={locale}
            dict={dict}
            slug={p.slug}
            fieldId={p.fieldId}
            name={p.name}
            tagline={p.tagline}
            specialtyCount={p.specialtyCount}
            international={p.international}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-ink-muted">
          {dict.professionsPage.empty}
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
