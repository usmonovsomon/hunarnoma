// Geocode each university's real street (from lib/ntc/data.json's address
// field) via Nominatim (OpenStreetMap's own geocoder — same provider as the
// map's tiles, so results and rendering stay visually consistent). House
// numbers aren't reliably mapped for Tajikistan in OSM, so this resolves to
// street-level accuracy and falls back to the city centre when a street
// can't be found. Output is a small overlay file, not a rewrite of
// lib/ntc/data.json (which is itself a build artifact of scripts/build_data.mjs).
import fs from "fs";

const universities = JSON.parse(fs.readFileSync("lib/ntc/data.json", "utf8")).universities;
const OUT = "data/i18n/university_coords.json";
const UA = "HunarNoma-education-platform/1.0 (student project; no contact email on file)";

// same fallback centroids the map currently jitters around
const CITY_FALLBACK = {
  "Душанбе": [38.5598, 68.787], "Худжанд": [40.2833, 69.6333], "Бустон": [40.2167, 69.75],
  "Пенджикент": [39.4938, 67.6086], "Исфара": [40.1247, 70.6333], "Куляб": [37.9142, 69.7822],
  "Бохтар": [37.8322, 68.7803], "Дангара": [38.0333, 69.3333], "Кушониён": [37.6833, 68.6333],
  "Левакант": [37.7667, 68.9333], "Хорог": [37.4938, 71.5417], "Рашт": [39.0206, 70.6528],
};

function extractStreet(address) {
  // "город Душанбе, проспект Рудаки, 17" -> "проспект Рудаки"
  // "город Худжанд, посёлок 17, дом 1" -> null (no real street — settlement/plot number only)
  const parts = address.split(",").map((s) => s.trim());
  const rest = parts.slice(1); // drop "город X" / "район X"
  // (?=\s|$) instead of \b — \b is ASCII-\w-based in JS and never fires
  // between two Cyrillic letters, so it silently rejects every match here.
  const street = rest.find((p) => /^(улица|проспект|переулок|проезд|шоссе|бульвар)(?=\s|$)/i.test(p));
  return street || null;
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=tj&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ru" } });
  if (!res.ok) return null;
  const rows = await res.json();
  if (!rows.length) return null;
  return { lat: +rows[0].lat, lon: +rows[0].lon, display: rows[0].display_name };
}

let cache = {};
try { cache = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch {}

const results = { ...cache };
for (const u of universities) {
  if (results[u.id]?.source === "street") continue; // already geocoded to street precision
  const street = extractStreet(u.address);
  let hit = null;
  if (street) {
    hit = await geocode(`${street}, ${u.city}, Tajikistan`);
    await new Promise((r) => setTimeout(r, 1100)); // Nominatim usage policy: max 1 req/s
  }
  if (hit) {
    results[u.id] = { lat: hit.lat, lon: hit.lon, source: "street", street, display: hit.display };
    console.log(`OK   ${u.id} ${street} -> ${hit.lat},${hit.lon}`);
  } else {
    const fb = CITY_FALLBACK[u.city];
    results[u.id] = fb ? { lat: fb[0], lon: fb[1], source: "city-fallback" } : { source: "none" };
    console.log(`MISS ${u.id} ${street ?? "(no street in address)"} -> city fallback`);
  }
}

fs.mkdirSync("data/i18n", { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
const street = Object.values(results).filter((r) => r.source === "street").length;
console.log(`\nGeocoded ${street}/${universities.length} to street precision. Wrote ${OUT}.`);
