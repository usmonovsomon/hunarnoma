"use client";
import { useEffect } from "react";

// Production only: in dev a cache-first worker would keep serving stale bundles.
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch((err) => console.error("Service worker registration failed", err));
  }, []);
  return null;
}
