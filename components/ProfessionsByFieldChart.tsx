// Horizontal bar chart: how many professions sit in each field. This is a
// magnitude comparison across categories, so per dataviz convention it's one
// hue (brand), not a rainbow per bar — the field names on the axis already
// carry identity, color only carries "how much".
// Plain HTML rather than SVG so it reflows to any width: on phones the label
// sits above its bar instead of forcing a horizontal scroll.
import { PROFESSION_FIELD_IDS, professionsInField, type ProfessionFieldId } from "@/lib/professions";
import { getProfessionFieldMeta } from "@/lib/i18n/professions";
import { getDict, type Locale } from "@/lib/i18n";

export function ProfessionsByFieldChart({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const fieldMeta = getProfessionFieldMeta(locale);

  const rows = PROFESSION_FIELD_IDS
    .map((id: ProfessionFieldId) => ({ id, meta: fieldMeta[id], count: professionsInField(id).length }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...rows.map((r) => r.count));

  return (
    <section className="container-page py-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">{d.home.graphTitle}</h2>
        <p className="mx-auto mt-1 max-w-xl text-ink-soft">{d.home.graphLead}</p>
      </div>

      <ul className="mx-auto mt-6 max-w-2xl space-y-3 sm:space-y-2.5">
        {rows.map((row) => (
          <li
            key={row.id}
            title={`${row.meta.name}: ${row.count}`}
            className="group grid grid-cols-1 gap-1 sm:grid-cols-[14rem_1fr] sm:items-center sm:gap-4"
          >
            <div className="flex min-w-0 items-center gap-1.5 text-sm text-ink-soft">
              <span aria-hidden>{row.meta.emoji}</span>
              <span className="truncate">{row.meta.name}</span>
            </div>
            <div className="flex items-center gap-2.5 border-l border-slate-200">
              <div
                className="h-[18px] rounded-r bg-brand-500 transition-opacity group-hover:opacity-80"
                style={{ width: `${Math.max((row.count / maxCount) * 85, 2)}%` }}
              />
              <span className="text-[13px] font-bold text-ink">{row.count}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
