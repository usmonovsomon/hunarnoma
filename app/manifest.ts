import type { MetadataRoute } from "next";

// One manifest for all locales: start_url and the shortcuts are locale-less on
// purpose, so the middleware sends each user to their remembered language.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "HunarNoma — профессии, направления и вузы",
    short_name: "HunarNoma",
    description:
      "Выбери профессию осознанно: что делает специалист, какие направления к ней ведут и где этому учат в Таджикистане.",
    lang: "ru",
    start_url: "/",
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
      { name: "Профессии", url: "/professions", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Профориентация", url: "/career-test", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Университеты", url: "/universities", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
