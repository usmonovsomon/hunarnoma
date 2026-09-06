// A small, real-data illustration of the product's core idea — the graph is
// not decorative sample text, it's one real chain pulled straight out of the
// NTC dataset: a profession, the specialty that leads to it, and the actual
// top universities that teach that specialty. See BLUEPRINT §6/§8 for the
// "профессия → направление → университет" concept this visualises.
import Link from "next/link";
import { getProfession, specialtiesForProfession } from "@/lib/professions";
import { getProfessionText } from "@/lib/i18n/professions";
import { offeringsAt, universitiesForSpecialty } from "@/lib/ntc";
import { specialtyName, universityShortName } from "@/lib/i18n/data";
import { fmt, fmtNum, getDict, href, type Locale } from "@/lib/i18n";

const SPOTLIGHT_SLUG = "software-developer";
const UNI_COUNT = 3;

function Node({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: React.ReactNode }) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div
        // @ts-expect-error -- foreignObject's HTML namespace has no `xmlns` type
        xmlns="http://www.w3.org/1999/xhtml"
        className="flex h-full items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
      >
        {children}
      </div>
    </foreignObject>
  );
}

export function ProfessionGraph({ locale, professionCount }: { locale: Locale; professionCount: number }) {
  const p = getProfession(SPOTLIGHT_SLUG);
  if (!p) return null;
  const text = getProfessionText(locale, p.id);
  const specialty = specialtiesForProfession(p)[0];
  if (!text || !specialty) return null;
  const d = getDict(locale);

  const unis = universitiesForSpecialty(specialty)
    .map((u) => ({ u, seats: offeringsAt(specialty, u.id).reduce((n, o) => n + o.seats, 0) }))
    .sort((a, b) => b.seats - a.seats)
    .slice(0, UNI_COUNT)
    .map((x) => x.u);

  const W = 720, H = 260;
  const profBox = { x: 16, y: H / 2 - 30, w: 190, h: 60 };
  const specBox = { x: 266, y: H / 2 - 30, w: 190, h: 60 };
  const uniW = 190, uniH = 56;
  const uniGap = 16;
  const uniTotalH = unis.length * uniH + (unis.length - 1) * uniGap;
  const uniStartY = H / 2 - uniTotalH / 2;
  const uniBoxes = unis.map((u, i) => ({ x: 516, y: uniStartY + i * (uniH + uniGap), w: uniW, h: uniH, u }));

  const specCenter = { x: specBox.x + specBox.w, y: specBox.y + specBox.h / 2 };

  return (
    <section className="container-page py-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight">{d.home.graphTitle}</h2>
        <p className="mx-auto mt-1 max-w-xl text-ink-soft">{d.home.graphLead}</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="mx-auto block" style={{ minWidth: 640 }}>
          <defs>
            <marker id="graph-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-brand-300" />
            </marker>
          </defs>

          {/* profession -> specialty */}
          <path
            d={`M ${profBox.x + profBox.w} ${profBox.y + profBox.h / 2} L ${specBox.x - 10} ${specBox.y + specBox.h / 2}`}
            className="stroke-brand-300" strokeWidth={2} fill="none" markerEnd="url(#graph-arrow)"
          />
          {/* specialty -> each university */}
          {uniBoxes.map((b) => (
            <path
              key={b.u.id}
              d={`M ${specCenter.x} ${specCenter.y} C ${specCenter.x + 110} ${specCenter.y}, ${b.x - 90} ${b.y + b.h / 2}, ${b.x - 10} ${b.y + b.h / 2}`}
              className="stroke-brand-200" strokeWidth={2} fill="none" markerEnd="url(#graph-arrow)"
            />
          ))}

          <Node {...profBox}>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">{d.nav.professions}</div>
              <div className="truncate text-sm font-bold text-ink">{text.name}</div>
            </div>
          </Node>

          <Node {...specBox}>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">{d.nav.specialties}</div>
              <div className="truncate text-sm font-bold text-ink">{specialtyName(locale, specialty.name)}</div>
            </div>
          </Node>

          {uniBoxes.map(({ u, ...box }) => (
            <Node key={u.id} {...box}>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">{d.nav.universities}</div>
                <div className="truncate text-sm font-bold text-ink">{universityShortName(locale, u.id, u.shortName)}</div>
              </div>
            </Node>
          ))}
        </svg>
      </div>

      <p className="mt-4 text-center text-sm text-ink-muted">
        {fmt(d.home.graphCaption, { count: fmtNum(locale, professionCount) })}{" "}
        <Link href={href(locale, "/professions")} className="font-semibold text-brand-600 hover:underline">
          {d.home.professionsCta} →
        </Link>
      </p>
    </section>
  );
}
