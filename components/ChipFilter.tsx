"use client";
import { useState } from "react";
import BottomSheet from "@/components/BottomSheet";

export interface ChipOption<T> {
  value: T;
  label: string;
  emoji?: string;
}

/**
 * Single-choice filter: a row of chips on wider screens, and on phones a
 * single button that opens the options in a bottom sheet — a dozen wrapped
 * chips would otherwise fill half of a sticky header.
 */
export default function ChipFilter<T extends string | number>({
  value,
  onChange,
  options,
  allValue,
  allLabel,
  title,
  closeLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  options: ChipOption<T>[];
  allValue: T;
  allLabel: string;
  title: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const all: ChipOption<T>[] = [{ value: allValue, label: allLabel }, ...options];
  const selected = all.find((o) => o.value === value) ?? all[0];
  const isFiltered = value !== allValue;

  return (
    <>
      <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
        {all.map((o) => (
          <button key={String(o.value)} type="button" onClick={() => onChange(o.value)} className={chip(o.value === value)}>
            {o.emoji ? `${o.emoji} ` : ""}
            {o.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`mt-2.5 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition sm:hidden ${
          isFiltered ? "border-brand-300 bg-brand-50" : "border-slate-300 bg-white"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-muted">
          <path d="M3 5h14M6 10h8M8.5 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="shrink-0 text-ink-muted">{title}:</span>
        <span className={`min-w-0 flex-1 truncate font-semibold ${isFiltered ? "text-brand-700" : "text-ink"}`}>
          {selected.emoji ? `${selected.emoji} ` : ""}
          {selected.label}
        </span>
        <svg viewBox="0 0 12 8" fill="none" aria-hidden="true" className="h-2 w-2.5 shrink-0 text-ink-muted">
          <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title={title} closeLabel={closeLabel}>
        <ul>
          {all.map((o) => {
            const active = o.value === value;
            return (
              <li key={String(o.value)}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-left text-[15px] font-semibold transition ${
                    active ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-slate-50"
                  }`}
                >
                  <span className="w-6 text-center text-lg">{o.emoji ?? "✨"}</span>
                  <span className="flex-1">{o.label}</span>
                  {active && (
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-600">
                      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </BottomSheet>
    </>
  );
}

function chip(active: boolean) {
  return `rounded-full px-3 py-1.5 text-xs font-semibold transition ${
    active ? "bg-brand-600 text-white shadow-sm" : "bg-white text-ink-soft ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
  }`;
}
