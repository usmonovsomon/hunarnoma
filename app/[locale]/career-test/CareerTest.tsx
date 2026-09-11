"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { testQuestions } from "@/lib/test";
import { fmt, href, type Dict, type Locale } from "@/lib/i18n";

export default function CareerTest({ locale, dict }: { locale: Locale; dict: Dict }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const q = testQuestions[step];
  const progress = Math.round((step / testQuestions.length) * 100);
  const isLast = step === testQuestions.length - 1;

  function answer(v: number) {
    const next = { ...answers, [q.id]: v };
    setAnswers(next);
    if (isLast) {
      sessionStorage.setItem("hunarnoma_test", JSON.stringify(next));
      router.push(href(locale, "/career-test/result"));
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="container-page max-w-2xl py-12">
      <div className="mb-2 flex items-center justify-between text-sm text-ink-muted">
        <span>{fmt(dict.test.question, { n: step + 1, total: testQuestions.length })}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="card mt-8 p-8">
        <h1 className="text-2xl font-bold leading-snug">{dict.questions[q.id]}</h1>
        <div className="mt-6 space-y-2">
          {dict.test.options.map((label, i) => {
            const v = i + 1;
            return (
              <button
                key={v}
                onClick={() => answer(v)}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-brand-400 hover:bg-brand-50"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-sm font-bold">{v}</span>
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-ink-muted hover:underline">
          {dict.test.back}
        </button>
      )}
      <p className="mt-6 text-center text-xs text-ink-muted">{dict.test.disclaimer}</p>
    </div>
  );
}
