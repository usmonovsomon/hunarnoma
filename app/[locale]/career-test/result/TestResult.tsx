"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { scoreTest, type TestResult, type TestDimension } from "@/lib/test";
import { PROFESSION_FIELD_COLOR } from "@/lib/professions/base";
import type { ProfessionFieldMeta } from "@/lib/i18n/professions";
import { fmt, href, type Dict, type Locale } from "@/lib/i18n";

export interface FieldExampleProfession {
  slug: string;
  name: string;
}

/**
 * Field metadata and example professions are passed in from the server
 * component so this page does not pull the professions content bundle into
 * the client bundle.
 */
export default function TestResultView({
  locale,
  dict,
  fields,
  professionsByField,
}: {
  locale: Locale;
  dict: Dict;
  fields: Record<string, ProfessionFieldMeta>;
  professionsByField: Record<string, FieldExampleProfession[]>;
}) {
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("rohnamo_test");
    if (raw) setResult(scoreTest(JSON.parse(raw)));
  }, []);

  if (!result) {
    return (
      <div className="container-page max-w-xl py-20 text-center">
        <p className="text-ink-muted">{dict.result.emptyState}</p>
        <Link href={href(locale, "/career-test")} className="btn-primary mt-4">{dict.result.emptyCta}</Link>
      </div>
    );
  }

  const dims = (Object.entries(result.scores) as [TestDimension, number][]).sort((a, b) => b[1] - a[1]);
  const top = result.topFields.slice(0, 3);

  return (
    <div className="container-page max-w-4xl py-12">
      <span className="chip-brand">{dict.result.badge}</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{dict.result.title}</h1>
      <p className="mt-2 text-ink-muted">{dict.result.lead}</p>

      <div className="mt-8 space-y-4">
        {top.map((f, i) => {
          const m = fields[f.fieldId];
          if (!m) return null;
          const col = PROFESSION_FIELD_COLOR[m.color];
          const reasons = f.reasons.map((r) => dict.dimensions[r].toLowerCase());
          const examples = professionsByField[f.fieldId] ?? [];
          return (
            <div key={f.fieldId} className={`card p-5 ring-1 ring-inset ${col.ring}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{m.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      {i === 0 && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${col.chip}`}>
                          {dict.result.bestMatch}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold">{m.name}</h2>
                    <p className="text-sm text-ink-soft">{m.tagline}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-extrabold ${col.text}`}>{f.score}%</div>
                  <div className="text-[11px] text-ink-muted">{dict.result.matchLabel}</div>
                </div>
              </div>

              {reasons.length > 0 && (
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{dict.result.whyLabel}</span>{" "}
                  {fmt(dict.result.whyText, { reasons: reasons.join(dict.result.reasonsJoin) })}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((p) => (
                  <Link key={p.slug} href={href(locale, `/professions/${p.slug}`)} className="chip">{p.name}</Link>
                ))}
              </div>
              <Link
                href={href(locale, `/professions?field=${f.fieldId}`)}
                className="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:underline"
              >
                {dict.result.fieldLink}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="card mt-8 p-6">
        <h2 className="font-bold">{dict.result.profileTitle}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {dims.map(([dim, v]) => (
            <div key={dim}>
              <div className="flex justify-between text-sm">
                <span className="text-ink-soft">{dict.dimensions[dim]}</span>
                <span className="font-semibold">{v}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full bg-brand-500" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={href(locale, "/professions")} className="btn-primary">{dict.result.seeAllProfessions}</Link>
        <Link href={href(locale, "/career-test")} className="btn-ghost">{dict.result.retake}</Link>
      </div>
      <p className="mt-6 text-xs text-ink-muted">{dict.result.disclaimer}</p>
    </div>
  );
}
