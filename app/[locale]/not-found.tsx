import Link from "next/link";
import { DEFAULT_LOCALE, getDict, href } from "@/lib/i18n";

// A not-found triggered inside the [locale] segment cannot read params, so this
// falls back to the default locale's copy.
export default function NotFound() {
  const d = getDict(DEFAULT_LOCALE);
  return (
    <div className="container-page max-w-xl py-24 text-center">
      <div className="text-5xl">🧭</div>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">{d.notFound.title}</h1>
      <p className="mt-2 text-ink-muted">{d.notFound.text}</p>
      <Link href={href(DEFAULT_LOCALE)} className="btn-primary mt-6">{d.notFound.cta}</Link>
    </div>
  );
}
