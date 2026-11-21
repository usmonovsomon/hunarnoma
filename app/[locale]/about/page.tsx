import type { Metadata } from "next";
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

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ember-50 via-white to-brand-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob left-[-10%] top-[-5%] h-[28rem] w-[28rem] bg-ember-300/45" />
        <div className="blob right-[-12%] top-[18%] h-[32rem] w-[32rem] bg-brand-300/40" />
        <div className="blob bottom-[10%] left-[20%] h-[26rem] w-[26rem] bg-wine-200/35" />
        <div className="blob bottom-[-10%] right-[10%] h-[24rem] w-[24rem] bg-ember-200/40" />
      </div>
      <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{a.title}</h1>
        <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
          {a.paragraphs.map((p) => (
            <p key={p} className="text-pretty text-xl leading-relaxed text-ink-soft sm:text-2xl sm:leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
