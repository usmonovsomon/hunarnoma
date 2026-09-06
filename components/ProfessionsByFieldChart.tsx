// Horizontal bar chart: how many professions sit in each field. This is a
// magnitude comparison across categories, so per dataviz convention it's one
// hue (brand), not a rainbow per bar — the field names on the axis already
// carry identity, color only carries "how much".
import { PROFESSION_FIELD_IDS, professionsInField, type ProfessionFieldId } from "@/lib/professions";
import { getProfessionFieldMeta } from "@/lib/i18n/professions";
import { getDict, type Locale } from "@/lib/i18n";

const ROW_H = 34;
const ROW_GAP = 10;
const LABEL_W = 230;
const BAR_X = 246;
const BAR_MAX_W = 350;
const BAR_THICK = 18;
const RADIUS = 4;
const W = BAR_X + BAR_MAX_W + 60;

/** A rect path rounded only on the right (tip) end — square at the baseline, per spec. */
function barPath(x: number, y: number, w: number, h: number, r: number): string {
  if (w <= r) return `M ${x},${y} h ${w} v ${h} h ${-w} Z`;
  return [
    `M ${x},${y}`,
    `H ${x + w - r}`,
    `A ${r},${r} 0 0 1 ${x + w},${y + r}`,
    `V ${y + h - r}`,
    `A ${r},${r} 0 0 1 ${x + w - r},${y + h}`,
    `H ${x}`,
    "Z",
  ].join(" ");
}

export function ProfessionsByFieldChart({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const fieldMeta = getProfessionFieldMeta(locale);

  const rows = PROFESSION_FIELD_IDS
    .map((id: ProfessionFieldId) => ({ id, meta: fieldMeta[id], count: professionsInField(id).length }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...rows.map((r) => r.count));
  const H = rows.length * ROW_H + (rows.length - 1) * ROW_GAP;

  return (
    <section className="container-page py-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">{d.home.graphTitle}</h2>
        <p className="mx-auto mt-1 max-w-xl text-ink-soft">{d.home.graphLead}</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="mx-auto block" style={{ minWidth: 560 }}>
          {/* zero baseline */}
          <line x1={BAR_X} y1={0} x2={BAR_X} y2={H} className="stroke-slate-200" strokeWidth={1} />

          {rows.map((row, i) => {
            const y = i * (ROW_H + ROW_GAP);
            const barW = Math.max((row.count / maxCount) * BAR_MAX_W, RADIUS * 2);
            return (
              <g key={row.id} className="group">
                {/* full-row transparent hit target, bigger than the bar itself */}
                <rect x={0} y={y} width={W} height={ROW_H} fill="transparent" />

                <foreignObject x={0} y={y} width={LABEL_W} height={ROW_H}>
                  <div
                    // @ts-expect-error -- foreignObject's HTML namespace has no `xmlns` type
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="flex h-full items-center gap-1.5 pr-2 text-sm text-ink-soft"
                  >
                    <span aria-hidden>{row.meta.emoji}</span>
                    <span className="truncate">{row.meta.name}</span>
                  </div>
                </foreignObject>

                <path
                  d={barPath(BAR_X, y + (ROW_H - BAR_THICK) / 2, barW, BAR_THICK, RADIUS)}
                  className="fill-brand-500 transition-opacity group-hover:opacity-80"
                >
                  <title>{`${row.meta.name}: ${row.count}`}</title>
                </path>

                <text
                  x={BAR_X + barW + 10}
                  y={y + ROW_H / 2}
                  dominantBaseline="middle"
                  className="fill-ink text-[13px] font-bold"
                >
                  {row.count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
