"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * A panel that slides up from the bottom of the screen — the mobile-native
 * replacement for dropdowns and long rows of chips. Portaled to <body>
 * because the sticky headers it opens from use backdrop-filter, which would
 * otherwise become the containing block for `position: fixed`.
 */
export default function BottomSheet({
  open,
  onClose,
  title,
  closeLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-slate-200" />
        <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-3">
          <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-ink-soft transition hover:bg-slate-200"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
              <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-3 pb-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
