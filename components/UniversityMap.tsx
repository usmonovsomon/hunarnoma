"use client";
import dynamic from "next/dynamic";
import type { University } from "@/lib/ntc";
import type { Locale } from "@/lib/i18n";

// Leaflet touches `window`/`document` at import time, so it can only load
// client-side — ssr:false skips it during the server render pass.
const UniversityMapLeaflet = dynamic(() => import("./UniversityMapLeaflet"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[460px] w-full max-w-2xl animate-pulse rounded-2xl bg-slate-100" />,
});

export default function UniversityMap({ locale, universities }: { locale: Locale; universities: University[] }) {
  return <UniversityMapLeaflet locale={locale} universities={universities} />;
}
