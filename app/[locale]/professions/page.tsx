import type { Metadata } from "next";
import { PROFESSIONS, PROFESSION_FIELD_IDS, specialtiesForProfession } from "@/lib/professions";
import { getProfessionFieldMeta, getProfessionText } from "@/lib/i18n/professions";
import { asLocale, getDict, LOCALES } from "@/lib/i18n";
import ProfessionCatalog, { type FieldChip, type ProfessionItem } from "@/components/ProfessionCatalog";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const d = getDict(asLocale(params.locale));
  return { title: d.professionsPage.title, description: d.professionsPage.metaDescription };
}

export default function ProfessionsPage({ params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const fieldMeta = getProfessionFieldMeta(locale);

  const items: ProfessionItem[] = PROFESSIONS.map((p) => {
    const text = getProfessionText(locale, p.id);
    return {
      id: p.id,
      slug: p.slug,
      fieldId: p.fieldId,
      name: text?.name ?? p.id,
      tagline: text?.tagline ?? "",
      specialtyCount: specialtiesForProfession(p).length,
      international: p.international,
    };
  });

  const fields: FieldChip[] = PROFESSION_FIELD_IDS.map((id) => ({
    id, name: fieldMeta[id].name, emoji: fieldMeta[id].emoji, color: fieldMeta[id].color,
  }));

  return (
    <div className="container-page py-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{d.professionsPage.title}</h1>
        <p className="mt-3 text-ink-soft">{d.professionsPage.lead}</p>
      </header>
      <div className="mt-6">
        <ProfessionCatalog locale={locale} dict={d} fields={fields} items={items} />
      </div>
      <p className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-ink-muted">
        {d.professionsPage.editorialNote}
      </p>
    </div>
  );
}
