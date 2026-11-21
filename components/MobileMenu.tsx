"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type InstallState = "unavailable" | "prompt" | "ios";

/** Chromium hands us an install prompt; iOS Safari never does, so there we show the manual steps instead. */
function useInstall() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [state, setState] = useState<InstallState>("unavailable");

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)) setState("ios");

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setState("prompt");
    };
    const onInstalled = () => {
      setEvent(null);
      setState("unavailable");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!event) return;
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted") setState("unavailable");
    setEvent(null);
  };

  return { state, install };
}

export default function MobileMenu({
  links,
  ctaHref,
  labels,
}: {
  links: { href: string; label: string }[];
  ctaHref: string;
  labels: { menu: string; close: string; takeTest: string; installApp: string; installAppHint: string; installIosHint: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { state: installState, install } = useInstall();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (linkHref: string) => !linkHref.includes("#") && (pathname === linkHref || pathname?.startsWith(`${linkHref}/`));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.menu}
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-ink transition hover:border-brand-200 hover:bg-brand-50 lg:hidden"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
            <div
              onClick={() => setOpen(false)}
              className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
            />
            <nav
              aria-label={labels.menu}
              className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
                <div className="flex items-center gap-2">
                  <Image src="/logo-mark.png" alt="" className="h-8 w-8" width={32} height={32} />
                  <span className="text-base font-extrabold tracking-tight">
                    HunarNoma<span className="text-brand-600">.</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={labels.close}
                  className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-ink-soft transition hover:bg-slate-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                    <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {links.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition ${
                          active ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-slate-50"
                        }`}
                      >
                        {l.label}
                        <svg viewBox="0 0 8 12" fill="none" aria-hidden="true" className="h-3 w-2 text-ink-muted">
                          <path d="m1.5 1 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="shrink-0 space-y-3 border-t border-slate-100 p-4">
                {installState === "prompt" && (
                  <button
                    type="button"
                    onClick={install}
                    className="flex w-full items-center gap-3 rounded-2xl bg-brand-50 p-3 text-left ring-1 ring-inset ring-brand-100 transition hover:bg-brand-100"
                  >
                    <Image src="/logo-mark.png" alt="" className="h-10 w-10 rounded-xl bg-white p-1" width={40} height={40} />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-brand-700">{labels.installApp}</span>
                      <span className="block text-xs text-ink-soft">{labels.installAppHint}</span>
                    </span>
                  </button>
                )}
                {installState === "ios" && (
                  <div className="flex items-center gap-3 rounded-2xl bg-brand-50 p-3 ring-1 ring-inset ring-brand-100">
                    <Image src="/logo-mark.png" alt="" className="h-10 w-10 rounded-xl bg-white p-1" width={40} height={40} />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-brand-700">{labels.installApp}</span>
                      <span className="block text-xs text-ink-soft">{labels.installIosHint}</span>
                    </span>
                  </div>
                )}
                <Link href={ctaHref} onClick={() => setOpen(false)} className="btn-primary w-full rounded-2xl py-3.5 text-base">
                  {labels.takeTest}
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
