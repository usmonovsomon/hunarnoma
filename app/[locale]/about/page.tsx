import type { Metadata } from "next";
import Image from "next/image";
import { asLocale, getDict, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.aboutPage.title, description: d.aboutPage.metaDescription };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const a = getDict(asLocale(params.locale)).aboutPage;
  const [lead, ...rest] = a.paragraphs;
  const closing = rest.pop();

  return (
    <section data-bleed className="relative isolate overflow-hidden bg-gradient-to-br from-ember-50 via-white to-brand-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob left-[-10%] top-[-5%] h-[28rem] w-[28rem] bg-ember-300/45" />
        <div className="blob right-[-12%] top-[18%] h-[32rem] w-[32rem] bg-brand-300/40" />
        <div className="blob bottom-[10%] left-[20%] h-[26rem] w-[26rem] bg-wine-200/35" />
        <div className="blob bottom-[-10%] right-[10%] h-[24rem] w-[24rem] bg-ember-200/40" />
      </div>

      <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-20 lg:py-24">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <Image src="/logo-mark.png" alt="" width={64} height={64} className="h-14 w-14 sm:h-16 sm:w-16" />
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">{a.title}</h1>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-wine-500 via-ember-500 to-brand-500" />
        </header>

        <article className="max-w-2xl">
          <p className="text-pretty text-xl font-semibold leading-snug text-ink sm:text-2xl">{lead.replace(" — ", " — ")}</p>
          <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            {rest.map((p) => (
              <p key={p} className="text-pretty text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
                {p}
              </p>
            ))}
          </div>
          {closing && (
            <p className="mt-8 border-t border-slate-200/80 pt-6 text-pretty text-base font-semibold leading-7 text-brand-700 sm:mt-10 sm:text-lg sm:leading-8">
              {closing}
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
