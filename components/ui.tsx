import type { Source, Level } from "@/lib/types";

const LEVEL_LABELS = ["—", "низкий", "ниже среднего", "средний", "высокий", "очень высокий"];

export function LevelBar({ value, label }: { value: Level; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-soft">{label}</span>
        <span className="text-ink-muted">{LEVEL_LABELS[value]}</span>
      </div>
      <div className="mt-1 flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= value ? "bg-brand-500" : "bg-slate-200"}`} />
        ))}
      </div>
    </div>
  );
}

export function SourceBadge({ source }: { source: Source }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-ink-muted">
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${source.verified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
        {source.verified ? "✓ проверено" : "⚠ требует проверки"}
      </span>
      <span>Источник: {source.label}</span>
      <span>· Обновлено: {source.updatedAt}</span>
      {source.url && (
        <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline">
          официальный сайт ↗
        </a>
      )}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function TagList({ items, brand }: { items: string[]; brand?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <span key={i} className={brand ? "chip-brand" : "chip"}>{i}</span>
      ))}
    </div>
  );
}
