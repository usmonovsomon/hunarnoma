import type { MetadataRoute } from "next";
import { LOCALE_META, LOCALES, asLocale, getDict, href } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// One manifest per locale so the installed app's name and shortcuts match the
// language it was installed from. The shared `id` keeps it a single app.
export function GET(_request: Request, { params }: { params: { locale: string } }) {
  const locale = asLocale(params.locale);
  const d = getDict(locale);
  const icon = [{ src: "/icons/icon-192.png", sizes: "192x192" }];

  const manifest: MetadataRoute.Manifest = {
    id: "/",
    name: d.site.titleDefault,
    short_name: "HunarNoma",
    description: d.site.description,
    lang: LOCALE_META[locale].htmlLang,
    start_url: href(locale),
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8fafc",
    theme_color: "#167a5e",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: d.nav.professions, url: href(locale, "/professions"), icons: icon },
      { name: d.nav.careerTest, url: href(locale, "/career-test"), icons: icon },
      { name: d.nav.universities, url: href(locale, "/universities"), icons: icon },
    ],
  };

  return Response.json(manifest, { headers: { "Content-Type": "application/manifest+json" } });
}
